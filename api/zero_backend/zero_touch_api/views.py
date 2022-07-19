from typing import Iterable
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from yaml import serialize
from .models import ZeroTouch
from .serializers import ZeroTouchSerializer
from netmiko import ConnectHandler

cisco_881 = {
    "device_type": "cisco_ios",
    "host": "192.168.19.251",
    "username": "admin",
    "password": "Aa123456",
    "port": 22,  # optional, defaults to 22
    "secret": "Aa123456",  # optional, defaults to ''
}

net_connect = ConnectHandler(**cisco_881)
output = net_connect.send_command("show ip int brief")
print(output)


# Create your views here.
class ZeroTouchListApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):

        """
        List all the zeroTouch items for given requested user
        """
        # filter(user=request.user.id)
        fields = ZeroTouch.objects.filter(ip=request.data.get("ip"))
        print(request.user.id)
        print(request.data.get("ip"))
        print(request.data)
        print(request.query_params)
        # print(request.body.decode("utf-8"))

        serializer = ZeroTouchSerializer(fields, many=True)
        return Response(output, status=status.HTTP_200_OK)
        # return Response(serializer.data, status=status.HTTP_200_OK)


def post(self, request, *args, **kwargs):
    """
    Create the Todo with given todo data
    """

    data = {
        "ip": request.data.get("ip"),
        "completed": request.data.get("completed"),
        "user": request.user.id,
    }

    serializer = ZeroTouchSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
