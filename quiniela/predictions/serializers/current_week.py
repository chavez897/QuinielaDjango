from rest_framework import serializers

from quiniela.predictions.models.current_week import CurrentWeek


class CurrentWeekModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentWeek
        fields = [
            "id",
            "season",
            "week",
        ]
