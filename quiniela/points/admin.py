from django.contrib import admin

from quiniela.points.models.points import Points


@admin.register(Points)
class PointsModelAdmin(admin.ModelAdmin):
    list_display = ("id", "enrollment", "season", "week", "points")
    list_display_links = ("id",)
