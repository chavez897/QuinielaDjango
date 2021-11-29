from rest_framework import mixins, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from quiniela.predictions.serializers.game_predictions import (
    GamePredictionsModelSerializer,
    SavePredictionsSerializer,
    CurrentWeekPredictionsSerializer,
    CreatePredictionsSerializer,
)
from quiniela.predictions.models.game_predictions import GamePredictions


class GamePredictionsViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):

    serializer_class = GamePredictionsModelSerializer
    queryset = GamePredictions.objects.filter(is_active=True)

    def get_permissions(self):
        permissions = [IsAuthenticated]
        return (permission() for permission in permissions)

    @action(detail=False, methods=["post"], url_path="current-week")
    def current_week(self, request):
        request.data["id_user"] = request.user.id
        serializer = CurrentWeekPredictionsSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"], url_path="save-predictions")
    def save_predictions(self, request):
        request.data["id_user"] = request.user.id
        serializer = SavePredictionsSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="create-predictions")
    def create_predictions(self, request):
        serializer = CreatePredictionsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
