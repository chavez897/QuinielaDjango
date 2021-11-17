from rest_framework import serializers

from quiniela.predictions.models.game_predictions import GamePredictions
from quiniela.games.serializers.games import GamesModelSerializer
from quiniela.league.serializers.userprofile_league_enrollment import UserprofileLeagueEnrollmentModelSerializer


class GamePredictionsModelSerializer(serializers.ModelSerializer):
    enrollment = UserprofileLeagueEnrollmentModelSerializer(read_only=True)
    game = GamesModelSerializer(read_only=True)

    class Meta:
        model = GamePredictions
        fields = [
            "id",
            "enrollment",
            "game",
            "prediction",
            "scored",
        ]
        read_only_fields = ('scored')