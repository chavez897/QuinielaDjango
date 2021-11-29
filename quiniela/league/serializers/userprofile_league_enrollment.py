from rest_framework import serializers

from quiniela.league.models.userprofile_league_enrollment import UserprofileLeagueEnrollment
from quiniela.users.serializers.users import UserProfilePlayerSerializer
from quiniela.league.serializers.league import LeagueModelSerializer


class UserprofileLeagueEnrollmentModelSerializer(serializers.ModelSerializer):
    userprofile_info = UserProfilePlayerSerializer(read_only=True, source='userprofile')
    league_info = LeagueModelSerializer(read_only=True, source='league')

    class Meta:
        model = UserprofileLeagueEnrollment
        fields = [
            "id",
            "league",
            "league_info",
            "team_name",
            "team_picture",
            "userprofile",
            "userprofile_info"
        ]
