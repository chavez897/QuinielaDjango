from rest_framework import serializers

from quiniela.league.models.league import League
from quiniela.league.models.userprofile_league_enrollment import UserprofileLeagueEnrollment
from quiniela.users.models import UserProfile


class LeagueModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = [
            "id",
            "name",
            "slug",
            "picture",
            "is_public",
            "enroll_code",
        ]
        extra_kwargs = {
            'enroll_code': {'write_only': True},
        }


class EnrollLeagueSerializer(serializers.Serializer):
    id_league = serializers.IntegerField(required=True)
    id_user = serializers.IntegerField(required=True)
    enroll_code = serializers.CharField(required=True, allow_null=True)
    team_name = serializers.CharField(required=True)

    def validate(self, attrs):
        # Validate id league
        if not League.objects.filter(id=attrs['id_league']).exists():
            raise serializers.ValidationError({"league_id": "League does not exist"})
        # Validate id user
        if not UserProfile.objects.filter(user_id=attrs['id_user']).exists():
            raise serializers.ValidationError({"user_id": "User does not exist"})
        user = UserProfile.objects.get(user_id=attrs['id_user'])
        league = League.objects.get(id=attrs['id_league'])
        enrolled_leagues_results = UserprofileLeagueEnrollment.objects.filter(userprofile=user)
        enrolled_leagues = []
        for item in enrolled_leagues_results:
            enrolled_leagues.append(item.league.id)
        teams = UserprofileLeagueEnrollment.objects.filter(league=league)
        team_names = []
        for item in teams:
            team_names.append(item.team_name)
        if attrs["team_name"] in team_names:
            raise serializers.ValidationError({"team_name": "There is a team with the same name in the league"})
        if league.id in enrolled_leagues:
            raise serializers.ValidationError({"enroll": "You are already enrolled in this league"})
        if not league.is_public:
            if attrs["enroll_code"] != league.enroll_code:
                raise serializers.ValidationError({"enroll_code": "Incorrect Code"})
        UserprofileLeagueEnrollment.objects.create(
            team_name=attrs['team_name'],
            league=league,
            userprofile=user,
        )
        return attrs


