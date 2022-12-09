# from django_filters.rest_framework import DjangoFilterBackend
from xml.etree.ElementTree import tostring
from django.db.models.aggregates import Count
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

from .nornir_netmiko_actions import show_ip_int_br, get_all_ip, locate_ip, get_loopback_ip, ping_test, failed_list, target_list, duplicates, ip_list
from collections import Counter


from netmiko import ConnectHandler
from nornir import InitNornir
from genie.utils import Dq
from nornir.core.task import Task, Result
from genie.libs.parser.utils import get_parser_commands
from nornir_netmiko.tasks import netmiko_send_command
from nornir_utils.plugins.functions import print_result
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

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def show_ip_int_br(self, request):
        if request.method == 'GET':
            results = nr.run(task=show_ip_int_br)
            print_result(results)
            return Response(
                json.dumps(nr.inventory.hosts["R1"]["facts"], indent=4), status=status.HTTP_200_OK
            )

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_duplicates(self, request):
        nr.run(task=get_all_ip)
        targets = [k for k, v in Counter(ip_list).items() if v > 1]
        if targets:
            nr.run(task=locate_ip)
            return Response(
                json.dumps(duplicates, indent=4), status=status.HTTP_200_OK
            )
        else:
            return Response(
                json.dumps({}, indent=4), status=status.HTTP_200_OK
            )

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
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
            return Response(
                json.dumps({}, indent=4), status=status.HTTP_200_OK
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


# def post(self, request, *args, **kwargs):
#     """
#     Create the Todo with given todo data
#     """

#     data = {
#         "ip": request.data.get("ip"),
#         "completed": request.data.get("completed"),
#         "user": request.user.id,
#     }

#     serializer = ZeroTouchSerializer(data=data)

#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
