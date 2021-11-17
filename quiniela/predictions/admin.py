from django.contrib import admin

from quiniela.predictions.models.game_predictions import GamePredictions


@admin.register(GamePredictions)
class LeagueModelAdmin(admin.ModelAdmin):
    list_display = ("id", "game", "enrollment", "prediction", "scored")
    list_display_links = ("id", )
