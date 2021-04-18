from rest_framework import serializers

from quiniela.league.models.league import League
from quiniela.users.models import UserProfile

class LeagueModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = [
            "id",
            "name",
            "slug",
            "picture",
        ]


class EnrollLeagueSerializer(serializers.Serializer):
    id_league = serializers.IntegerField(required=True)
    id_user = serializers.IntegerField(required=True)

    def validate(self, attrs):
        if not League.objects.filter(id=attrs['id_league']).exists():
            raise serializers.ValidationError({"league_id": "No existe la liga"})
        if not UserProfile.objects.filter(user_id=attrs['id_user']).exists():
            raise serializers.ValidationError({"user_id": "No existe el usuario"})
        user = UserProfile.objects.get(user_id=attrs['id_user'])
        league = League.objects.get(id=attrs['id_league'])
        if league in user.leagues.all():
            raise serializers.ValidationError({"enroll": "Ya esta inscrito a esa liga"})
        user.leagues.add(league)
        return attrs

