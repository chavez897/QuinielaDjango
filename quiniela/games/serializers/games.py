from rest_framework import serializers

from quiniela.games.models.games import Games

class GamesModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = [
            "id",
            "home_team",
            "away_team",
            "season",
            "week",
            "home_score",
            "away_score"
        ]