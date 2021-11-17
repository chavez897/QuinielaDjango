from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from quiniela.predictions.serializers.game_predictions import GamePredictionsModelSerializer
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
        permissions = [ IsAuthenticated ]
        return (permission() for permission in permissions)
