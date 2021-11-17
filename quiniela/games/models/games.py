"""Shop Packages model."""

from django.db import models

from quiniela.utils.models import BaseModel
from django.template.defaultfilters import slugify


class Games(BaseModel):

    home_team = models.ForeignKey(
        verbose_name="Home Team",
        to="games.NflTeams",
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="home_team"
    )
    away_team = models.ForeignKey(
        verbose_name="Away Team",
        to="games.NflTeams",
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="away_team"
    )
    
    season = models.IntegerField(blank=False, null=False)

    week = models.IntegerField(blank=False, null=False)

    home_score = models.IntegerField(blank=True, null=True)

    away_score = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return "{}-{}".format(self.home_team, self.away_team)
