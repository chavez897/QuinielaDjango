from rest_framework import serializers

from quiniela.points.models.points import Points


class PointsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Points
        fields = [
            "id",
            "enrollment",
            "season",
            "week",
            "points",
        ]
