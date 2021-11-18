from django.contrib import admin

from quiniela.predictions.models.game_predictions import GamePredictions
from quiniela.predictions.models.current_week import CurrentWeek


@admin.register(GamePredictions)
class LeagueModelAdmin(admin.ModelAdmin):
    list_display = ("id", "game", "enrollment", "prediction", "scored")
    list_display_links = ("id", )


@admin.register(CurrentWeek)
class CurrentWeekModelAdmin(admin.ModelAdmin):
    list_display = ("id", "season", "week")
    list_display_links = ("id", )
