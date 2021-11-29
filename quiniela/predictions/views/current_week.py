from rest_framework import mixins, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from quiniela.predictions.serializers.current_week import CurrentWeekModelSerializer
from quiniela.predictions.models.current_week import CurrentWeek


class CurrentWeekViewSet(
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):

    serializer_class = CurrentWeekModelSerializer
    queryset = CurrentWeek.objects.filter(is_active=True)

    def get_permissions(self):
        permissions = [IsAuthenticated]
        return (permission() for permission in permissions)

    @action(detail=False, methods=["post"], url_path="change-week")
    def change_week(self, request):
        return Response({}, status=status.HTTP_200_OK)
