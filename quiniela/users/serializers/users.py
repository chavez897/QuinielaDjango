from django.contrib.auth import get_user_model

from rest_framework import serializers

from quiniela.users.models import UserProfile
from quiniela.league.serializers.userprofile_league_enrollment import UserprofileLeagueEnrollmentModelSerializer

User = get_user_model()


class UserProfileModelSerializer(serializers.ModelSerializer):
    """ User Profile Model Serializer. """
    leagues = UserprofileLeagueEnrollmentModelSerializer(many=True, read_only=True)
    class Meta:
        model = UserProfile
        fields = (
            "id",
            "picture",
            "leagues",
            "role",
        )


class UserProfilePlayerSerializer(serializers.ModelSerializer):
    """ User Profile Model Serializer. """
    class Meta:
        model = UserProfile
        fields = (
            "id",
            "picture",
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


class UserPlayerSerializer(serializers.ModelSerializer):
    """ UserModelSerializer."""

    userprofile = UserProfilePlayerSerializer()

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
        )
