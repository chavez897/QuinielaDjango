from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from quiniela.points.models.points import Points
from quiniela.points.serializers.points import PointsModelSerializer


class PointsViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):

    serializer_class = PointsModelSerializer
    queryset = Points.objects.filter(is_active=True)

    def get_permissions(self):
        permissions = [IsAuthenticated]
        return (permission() for permission in permissions)
