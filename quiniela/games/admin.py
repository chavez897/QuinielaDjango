from django.contrib import admin

from quiniela.games.models.games import Games
from quiniela.games.models.nfl_teams import NflTeams


@admin.register(Games)
class LeagueModelAdmin(admin.ModelAdmin):
    list_display = ("id", "week", "season", "home_team", "away_team", "date", "home_score", "away_score")
    list_display_links = ("id", )
    list_editable = ("home_score", "away_score" )


@admin.register(NflTeams)
class LeagueEnrollmentModelAdmin(admin.ModelAdmin):
    list_display = ("id", "city", "name")
    list_display_links = ("id", )
