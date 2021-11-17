from rest_framework import mixins, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from url_filter.integrations.drf import DjangoFilterBackend

from quiniela.games.models.games import Games
from quiniela.games.serializers.games import GamesModelSerializer


class GamesViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):

    serializer_class = GamesModelSerializer
    queryset = Games.objects.filter(is_active=True)
    filter_backends = [
         DjangoFilterBackend,
    ]
    # For quick search
    filter_fields = [
        'week',
        'season'
    ]


    def get_permissions(self):
        permissions = [ IsAuthenticated ]
        return (permission() for permission in permissions)
