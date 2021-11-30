from rest_framework import serializers

from quiniela.predictions.models.game_predictions import GamePredictions
from quiniela.games.serializers.games import GamesModelSerializer
from quiniela.league.models.userprofile_league_enrollment import (
    UserprofileLeagueEnrollment,
)
from quiniela.predictions.models.current_week import CurrentWeek


class GamePredictionsModelSerializer(serializers.ModelSerializer):
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
        read_only_fields = ("scored",)


class CurrentWeekPredictionsSerializer(serializers.Serializer):
    id_league = serializers.IntegerField(required=True)
    id_user = serializers.IntegerField(required=True)
    predictions = GamePredictionsModelSerializer(many=True, read_only=True)
    week = serializers.IntegerField(read_only=True)
    season = serializers.IntegerField(read_only=True)

    def validate(self, attrs):
        try:
            enrollment = UserprofileLeagueEnrollment.objects.get(
                league__id=attrs["id_league"],
                userprofile__user_id=attrs["id_user"],
            )
            current = CurrentWeek.objects.get(id=1)
            attrs["week"] = current.week
            attrs["season"] = current.season
            predictions = GamePredictions.objects.filter(
                enrollment=enrollment,
                game__season=current.season,
                game__week=current.week,
            ).select_related("game", "game__home_team", "game__away_team")
            attrs["predictions"] = predictions
        except UserprofileLeagueEnrollment.DoesNotExist:
            raise serializers.ValidationError(
                {"entollment": "Enrollment does not exist"}
            )
        return attrs


class SavePredictionsSerializer(serializers.Serializer):
    id_league = serializers.IntegerField(required=True)
    id_user = serializers.IntegerField(required=True)
    predictions = serializers.ListField(required=True)

    def validate(self, attrs):
        try:
            enrollment = UserprofileLeagueEnrollment.objects.get(
                league__id=attrs["id_league"],
                userprofile__user_id=attrs["id_user"],
            )
            games = []
            for prediction in attrs["predictions"]:
                try:
                    game = GamePredictions.objects.get(
                        enrollment=enrollment, id=prediction["id"]
                    )
                    game.prediction = prediction["prediction"]
                    games.append(game)
                except GamePredictions.DoesNotExist:
                    raise serializers.ValidationError(
                        {"game_prediction": "You can not predict that game"}
                    )
            GamePredictions.objects.bulk_update(games, ["prediction"])
        except UserprofileLeagueEnrollment.DoesNotExist:
            raise serializers.ValidationError(
                {"entollment": "Enrollment does not exist"}
            )
        return attrs
