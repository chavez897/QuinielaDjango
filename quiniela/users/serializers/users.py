from django.contrib.auth import get_user_model

from rest_framework import serializers

from quiniela.users.models import UserProfile
from quiniela.league.serializers.league import LeagueModelSerializer

User = get_user_model()


class UserProfileModelSerializer(serializers.ModelSerializer):
    """ User Profile Model Serializer. """
    leagues = LeagueModelSerializer(many=True, read_only=True)
    class Meta:
        model = UserProfile
        fields = (
            "id",
            "picture",
            "leagues",
            "role",
        )


class UserModelSerializer(serializers.ModelSerializer):
    """ UserModelSerializer."""

    userprofile = UserProfileModelSerializer()

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "name",
            "last_name",
            "second_last_name",
            "email",
            "userprofile",
            "is_active",
            "is_verified",
        )
        read_only_fields = ("username",)

    def create(self, validated_date):
        return super(UserModelSerializer, self).create(validated_date)
