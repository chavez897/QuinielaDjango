from quiniela.predictions.tasks.create_predictions import createPredictions
from rest_framework import serializers
from django.db import transaction

from quiniela.games.models.games import Games
from quiniela.games.serializers.nfl_teams import NflTeamsModelSerializer
from quiniela.predictions.tasks.score_predictions import scorePredictions
from quiniela.predictions.models.current_week import CurrentWeek
from quiniela.games.models.nfl_teams import NflTeams


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
                game = Games.objects.get(id=score["id"])
                game.home_score = score["home_score"]
                game.away_score = score["away_score"]
                scores.append(game)
            except Games.DoesNotExist:
                raise serializers.ValidationError({"game": "Invalid Game id"})
        Games.objects.bulk_update(scores, ["home_score", "away_score"])
        transaction.on_commit(lambda: scorePredictions.delay())
        return attrs


class CreateGameSerializer(serializers.Serializer):
    home = serializers.CharField(required=True)
    away = serializers.CharField(required=True)
    date = serializers.DateTimeField(required=True)


class SetWeekSerializer(serializers.Serializer):
    season = serializers.IntegerField(required=True)
    week = serializers.IntegerField(required=True)
    games = CreateGameSerializer(required=True, many=True)

    def validate(self, attrs):
        CurrentWeek.objects.filter(pk=1).update(
            season=attrs["season"], week=attrs["week"]
        )
        insert_games = []
        teams = NflTeams.objects.all()
        teams_dict = {}
        for team in teams:
            teams_dict[team.name] = team
            teams_dict[team.city] = team
        for game in attrs["games"]:
            insert_games.append(
                Games(
                    home_team=teams_dict[game["home"]],
                    away_team=teams_dict[game["away"]],
                    season=attrs["season"],
                    week=attrs["week"],
                    date=game["date"],
                )
            )
        Games.objects.bulk_create(insert_games)
        transaction.on_commit(lambda: createPredictions.delay())
        return attrs
