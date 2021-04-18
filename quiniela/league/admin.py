from django.contrib import admin

from quiniela.league.models.league import League


@admin.register(League)
class LeagueModelAdmin(admin.ModelAdmin):
    list_display = ("id", "slug", "name", "picture")
    list_display_links = ("id", "slug")