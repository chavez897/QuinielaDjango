from rest_framework import serializers

from quiniela.league.models.userprofile_league_enrollment import UserprofileLeagueEnrollment


class UserprofileLeagueEnrollmentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserprofileLeagueEnrollment
        fields = [
            "id",
            "userprofile",
            "league",
            "team_name"
        ]
