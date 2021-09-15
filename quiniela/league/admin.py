from django.contrib import admin

from quiniela.league.models.league import League
from quiniela.league.models.userprofile_league_enrollment import UserprofileLeagueEnrollment


@admin.register(League)
class LeagueModelAdmin(admin.ModelAdmin):
    list_display = ("id", "slug", "name", "picture")
    list_display_links = ("id", "slug")


@admin.register(UserprofileLeagueEnrollment)
class LeagueEnrollmentModelAdmin(admin.ModelAdmin):
    list_display = ("id", "league", "userprofile", "team_name")
    list_display_links = ("id", )
