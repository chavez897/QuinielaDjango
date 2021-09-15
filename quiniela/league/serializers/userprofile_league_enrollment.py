from rest_framework import serializers

from quiniela.league.models.userprofile_league_enrollment import UserprofileLeagueEnrollment
from quiniela.users.serializers.users import UserProfilePlayerSerializer


class UserprofileLeagueEnrollmentModelSerializer(serializers.ModelSerializer):
    userprofile_info = UserProfilePlayerSerializer(read_only=True, source='userprofile')

    class Meta:
        model = UserprofileLeagueEnrollment
        fields = [
            "id",
            "league",
            "team_name",
            "userprofile",
            "userprofile_info"
        ]
