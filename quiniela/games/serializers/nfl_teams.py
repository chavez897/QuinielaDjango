from rest_framework import serializers

from quiniela.games.models.nfl_teams import NflTeams

class NflTeamsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = NflTeams
        fields = [
            "id",
            "city",
            "name",
            "logo",
        ]