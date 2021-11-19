from rest_framework import serializers

from quiniela.predictions.models.game_predictions import GamePredictions, Prediction
from quiniela.games.serializers.games import GamesModelSerializer
from quiniela.league.models.userprofile_league_enrollment import (
    UserprofileLeagueEnrollment,
)
from quiniela.predictions.models.current_week import CurrentWeek
from quiniela.games.models.games import Games
from quiniela.points.models.points import Points


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


class CreatePredictionsSerializer(serializers.Serializer):
    def validate(self, attrs):
        enrollments = UserprofileLeagueEnrollment.objects.filter(is_active=True)
        current = CurrentWeek.objects.get(id=1)
        games = Games.objects.filter(season=current.season, week=current.week)
        predictions = []
        for enrollment in enrollments:
            for game in games:
                predictions.append(
                    GamePredictions(
                        enrollment=enrollment, game=game, prediction=None, scored=False
                    )
                )
        GamePredictions.objects.bulk_create(predictions)
        return attrs


class ScorePredictionsSerializer(serializers.Serializer):
    def validate(self, attrs):
        current = CurrentWeek.objects.get(id=1)
        games = Games.objects.filter(
            season=current.season,
            week=current.week,
            home_score__isnull=False,
            away_score__isnull=False,
        )
        predictions = GamePredictions.objects.filter(
            game__in=games, scored=False
        ).select_related(
            "enrollment",
            "enrollment__league",
            "enrollment__userprofile",
            "enrollment__userprofile__user",
            "game",
            "game__home_team",
            "game__away_team",
        )
        points_queryset = Points.objects.filter(
            season=current.season, week=current.week
        ).select_related(
            "enrollment",
            "enrollment__league",
            "enrollment__userprofile",
            "enrollment__userprofile__user",
        )
        points = {}
        update_points = []
        update_predictions = []
        for point in points_queryset:
            points[point.enrollment.id] = point
        for prediction in predictions:
            points[prediction.enrollment.id].points = self.calculatePoints(
                prediction.game.home_score,
                prediction.game.away_score,
                prediction.prediction,
                6,
            )
            prediction.scored = True
            update_points.append(points[prediction.enrollment.id])
            update_predictions.append(prediction)

        GamePredictions.objects.bulk_update(update_predictions, ["scored"])
        Points.objects.bulk_update(update_points, ["points"])
        return attrs

    def calculatePoints(self, home_points, away_points, prediction, target_difference):
        scored_points = 0
        if home_points > away_points:
            if (
                prediction == Prediction.HOME_LESS
                or prediction == Prediction.HOME_GREATER
            ):
                print("Home Winner")
                scored_points = scored_points + 1
            if (
                home_points - away_points > target_difference
                and prediction == Prediction.HOME_GREATER
            ):
                print("Home Greater")
                scored_points = scored_points + 1
            elif (
                home_points - away_points <= target_difference
                and prediction == Prediction.HOME_LESS
            ):
                print("Home Less")
                scored_points = scored_points + 1
        elif home_points < away_points:
            if (
                prediction == Prediction.AWAY_LESS
                or prediction == Prediction.AWAY_GREATER
            ):
                print("Away Winner")
                scored_points = scored_points + 1
            if (
                away_points - home_points > target_difference
                and prediction == Prediction.AWAY_GREATER
            ):
                print("Away Greater")
                scored_points = scored_points + 1
            elif (
                away_points - home_points <= target_difference
                and prediction == Prediction.AWAY_LESS
            ):
                print("Away Less")
                scored_points = scored_points + 1
        return scored_points
