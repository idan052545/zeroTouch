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
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from typing import Iterable
from django.shortcuts import render
from yaml import serialize
import json

from .filters import RouterFilter
from .models import Field, Router
from .serializers import FieldSerializer, RouterSerializer
from djongo import database

# from .models import ZeroTouch
# from .serializers import ZeroTouchSerializer
from netmiko import ConnectHandler
from nornir import InitNornir
from nornir_netmiko.tasks import netmiko_send_command
from nornir_utils.plugins.functions import print_result

nr = InitNornir(config_file="C:\\Projects\\zero_touch\\api\\config.yaml")


def writeHostsYamlFile():
    with open("C:\\Projects\\zero_touch\\api\\hostsTemp.yaml", "w") as outfile:
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


def another_show_command_test(task):
    interfaces_result = task.run(
        task=netmiko_send_command,
        command_string="show ip interface br",
        use_textfsm=True,
    )
    task.host["facts"] = interfaces_result.result
    print(interfaces_result.result[0]["intf"])


# task, commandString


# Create your views here.
class ZeroTouchListApiView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):

        """
        List all the zeroTouch items for given requested user
        """
        # filter(user=request.user.id)
        # fields = ZeroTouch.objects.filter(IP=request.query_params.get("IP"))
        # serializer = ZeroTouchSerializer(fields, many=True)

        # cisco_881 = {
        #     "device_type": "cisco_ios",
        #     "host": request.query_params.get("IP"),
        #     "username": "idan",
        #     "password": "Aa123456",
        #     "port": 22,  # optional, defaults to 22
        #     "secret": "Aa123456",  # optional, defaults to ''
        # }

        # net_connect = ConnectHandler(**cisco_881)
        # output = net_connect.send_command("show ip int brief")
        # print(serializer)
        # print(request.query_params)
        # print(request.body.decode("utf-8"))
        results = nr.run(task=another_show_command_test)
        # print_result(results)
        return Response(
            json.dumps(nr.inventory.hosts["R1"]["facts"]), status=status.HTTP_200_OK
        )

        # return Response(serializer.data, status=status.HTTP_200_OK)


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


class FieldViewSet(ModelViewSet):
    queryset = Field.objects.annotate(fields_count=Count("id")).all()
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
