from rest_framework import serializers
from django.db import transaction

from quiniela.games.models.games import Games
from quiniela.games.serializers.nfl_teams import NflTeamsModelSerializer
from quiniela.predictions.tasks.score_predictions import scorePredictions


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
            "away_score",
        ]


class SaveScoresSerializer(serializers.Serializer):
    games = serializers.ListField(required=True)

    def validate(self, attrs):
        scores = []
        for score in attrs["games"]:
            try:
                print(score)
                game = Games.objects.get(id=score["id"])
                game.home_score = score["home_score"]
                game.away_score = score["away_score"]
                scores.append(game)
            except Games.DoesNotExist:
                raise serializers.ValidationError({"game": "Invalid Game id"})
        Games.objects.bulk_update(scores, ["home_score", "away_score"])
        transaction.on_commit(lambda: scorePredictions.delay())
        return attrs
