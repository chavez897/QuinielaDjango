from rest_framework import serializers

from quiniela.games.models.games import Games
from quiniela.games.serializers.nfl_teams import NflTeamsModelSerializer

class GamesModelSerializer(serializers.ModelSerializer):
    home_team = NflTeamsModelSerializer(read_only=True)
    away_team = NflTeamsModelSerializer(read_only=True)
    class Meta:
        model = Games
        fields = [
            "id",
            "home_team",
            "away_team",
            "season",
            "week",
            "date",
            "home_score",
            "away_score"
        ]