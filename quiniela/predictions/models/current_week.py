"""Shop Packages model."""

from django.db import models

from quiniela.utils.models import BaseModel


class CurrentWeek(BaseModel):
    
    season = models.IntegerField(blank=False, null=False)

    week = models.IntegerField(blank=False, null=False)

    def __str__(self):
        return "{}-{}".format(self.season, self.week)