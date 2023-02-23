# from django_filters.rest_framework import DjangoFilterBackend
from xml.etree.ElementTree import tostring
from django.core.exceptions import SuspiciousOperation

from django.db.models.aggregates import Count
from django.http import HttpResponseServerError
from rest_framework.decorators import action, permission_classes
from .pagination import DefaultPagination
import yaml
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.permissions import (
    AllowAny,
    DjangoModelPermissions,
    DjangoModelPermissionsOrAnonReadOnly,
    IsAdminUser,
    IsAuthenticated,
)
from .permissions import IsAdminOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from yaml import serialize
import json

from .filters import RouterFilter
from .models import Field, FieldImage, Router
from .serializers import FieldImageSerializer, FieldSerializer, RouterSerializer
from djongo import database

from .nornir_netmiko_actions import (
    backup_paths_link_outage,
    build_shortests_paths,
    discover_asymmetric,
    generate_node_and_edge_dictionaries,
    get_interfaces_dict,
    get_topology_diff,
    load_ospf,
    print_diff,
    router_shutdown,
    send_show_command,
    show_ip_int_br,
    get_all_ip,
    locate_ip,
    get_loopback_ip,
    ping_test,
    failed_list,
    show_ip_ospf_database_router,
    string_result,
    target_list,
    duplicates,
    ip_list,
    interfaces,
    topology,
)
from collections import Counter

from netmiko import (
    ConnectHandler,
    NetmikoAuthenticationException,
    NetmikoTimeoutException,
)

import jinja2


from nornir import InitNornir
from nornir.core.filter import F

from genie.utils import Dq
from nornir.core.task import Task, Result
from genie.libs.parser.utils import get_parser_commands
from nornir_netmiko.tasks import netmiko_send_command
from nornir_utils.plugins.functions import print_result
from nornir.core.exceptions import NornirExecutionError

nr = InitNornir(config_file="../config.yaml")


def writeHostsYamlFile():
    with open("../hostsTemp.yaml", "w") as outfile:
        routers = Router.objects.all()
        for router in routers:
            yaml.dump(
                {
                    router.hostname: {
                        "hostname": router.ip,
                        # "groups": {router.groups},
                        "platform": router.platform,
                        "username": router.username,
                        "password": router.password,
                        "data": {
                            "network": router.network,
                            "numOfUsers": router.numOfUsers,
                            "siteNumber": router.siteNumber,
                        },
                    }
                },
                outfile,
                default_flow_style=False,
            )


writeHostsYamlFile()


class RouterViewSet(ModelViewSet):
    queryset = Router.objects.all()
    serializer_class = RouterSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = RouterFilter
    pagination_class = DefaultPagination
    permission_classes = [IsAdminOrReadOnly, IsAdminUser]
    search_fields = ["ip", "hostname", "groups", "network", "platform"]
    ordering_fields = ["platform", "network"]

    # def get_serializer_context(self):
    #     return {"request": self.request}

    def destroy(self, request, *args, **kwargs):
        writeHostsYamlFile()
        return super().destroy(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # call your function Eg.
        writeHostsYamlFile()
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated])
    def show_ip_int_br(self, request):
        if request.method == "GET":
            results = nr.run(task=show_ip_int_br)
            print_result(results)
            return Response(
                json.dumps(nr.inventory.hosts["R1"]["facts"], indent=4),
                status=status.HTTP_200_OK,
            )

    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated])
    def get_duplicates(self, request):
        nr.run(task=get_all_ip)
        targets = [k for k, v in Counter(ip_list).items() if v > 1]
        if targets:
            nr.run(task=locate_ip)
            return Response(json.dumps(duplicates, indent=4), status=status.HTTP_200_OK)
        else:
            return Response(json.dumps({}, indent=4), status=status.HTTP_200_OK)

    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated])
    def get_unreachable_routers(self, request):
        nr.run(task=get_loopback_ip)
        sorted_list = sorted(target_list)
        nr.run(task=ping_test)
        if failed_list:
            sorted_fails = sorted(failed_list)
            return Response(
                json.dumps(sorted_fails, indent=4), status=status.HTTP_200_OK
            )
        else:
            return Response(json.dumps({}, indent=4), status=status.HTTP_200_OK)

    @action(
        detail=False, methods=["POST", "PATCH"], permission_classes=[IsAuthenticated]
    )
    def send_ospf_config(self, request):
        # results =  nr.run(load_ospf)
        # print_result(results)
        # return Response(
        #     json.dumps(string_result(results), indent=4), status=status.HTTP_200_OK
        # )
        DataRequest = json.loads(request.body.decode("utf-8"))
        ip = DataRequest["ip"]
        config = DataRequest["config"]

        template_loader = jinja2.FileSystemLoader(searchpath="../templates")
        template_env = jinja2.Environment(loader=template_loader)
        template = template_env.get_template("ospf.j2")
        jinjaConfig = template.render(host=config)

        # selectedHost = nr.filter(F(hostname=ip))
        # results = selectedHost.run(task=load_ospf, config=jinjaConfig)
        # results.raise_on_error()
        # print(string_result(results))

        return Response(
            json.dumps(jinjaConfig, indent=4),
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated])
    def show_ip_ospf_database_router(self, request):
        if request.method == "GET":
            results = nr.run(task=show_ip_ospf_database_router)
            print_result(results)
            return Response(
                json.dumps(nr.inventory.hosts["R1"]["facts"], indent=4),
                status=status.HTTP_200_OK,
            )

    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated])
    def generate_node_and_edge_dictionaries(self, request):
        if request.method == "GET":
            # interfaces= {}
            results1 = nr.run(task=get_interfaces_dict)
            # print_result(results1)
            results = nr.run(task=generate_node_and_edge_dictionaries)
            # print_result(results)
            return Response(json.dumps(topology, indent=4), status=status.HTTP_200_OK)

    @action(detail=False, methods=["POST"], permission_classes=[IsAuthenticated])
    def check_diff(self, request):
        DataRequest = json.loads(request.body.decode("utf-8"))
        results1 = nr.run(task=get_interfaces_dict)
        results = nr.run(task=generate_node_and_edge_dictionaries)
        # DIFF_DATA = get_topology_diff(topology, DataRequest["topology"])
        DIFF_DATA = get_topology_diff(topology, DataRequest["topology"])
        return Response(
            json.dumps(print_diff(DIFF_DATA), indent=4), status=status.HTTP_200_OK
        )

    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated])
    def build_shortests_paths(self, request):

        return Response(
            json.dumps(
                build_shortests_paths(
                    request.GET.get("source", ""), request.GET.get("target", "")
                ),
                indent=4,
            ),
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated])
    def backup_paths_link_outage(self, request):
        return Response(
            json.dumps(
                backup_paths_link_outage(
                    request.GET.get("srcIP", ""), request.GET.get("tgtIP", "")
                ),
                indent=4,
            ),
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated])
    def router_shutdown(self, request):
        return Response(
            json.dumps(router_shutdown(request.GET.get("shutRouter", "")), indent=4),
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated])
    def discover_asymmetric(self, request):
        return Response(
            json.dumps(discover_asymmetric(), indent=4),
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated])
    def send_show_command(self, request):
        if request.method == "GET":

            try:
                ip = request.GET.get("ip", "")
                command = request.GET.get("command", "")
                selectedHost = nr.filter(F(hostname=ip))
                results = selectedHost.run(task=send_show_command, command=command)
                results.raise_on_error()
                print(string_result(results))
                return Response(
                    json.dumps(string_result(results), indent=4),
                    status=status.HTTP_200_OK,
                )
            except NornirExecutionError as e:
                print(e)
                return Response(
                    {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            except Exception as e:
                print(e)
                return Response(
                    {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )


class FieldViewSet(ModelViewSet):
    # queryset = Field.objects.annotate(fields_count=Count("id")).all()
    queryset = Field.objects.prefetch_related("images").all()
    serializer_class = FieldSerializer
    # permission_classes = [IsAdminOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        # if Field.objects.filter(id=kwargs["pk"]):
        #     return Response(
        #         {
        #         },
        #     status=status.HTTP_405_METHOD_NOT_ALLOWED,
        # )

        return super().destroy(request, *args, **kwargs)


class FieldImageViewSet(ModelViewSet):
    serializer_class = FieldImageSerializer

    def get_serializer_context(self):
        return {"field_id": self.kwargs["field_pk"]}

    def get_queryset(self):
        return FieldImage.objects.filter(field_id=self.kwargs["field_pk"])
