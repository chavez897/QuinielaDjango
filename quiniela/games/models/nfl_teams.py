"""Shop Packages model."""

from django.db import models

from quiniela.utils.models import BaseModel


class NflTeams(BaseModel):

    name = models.CharField(
        verbose_name="Teams", max_length=120, 
    )
    city = models.CharField(
        verbose_name="City", max_length=120,
    )
    logo = models.ImageField(  # noqa DJ01
        verbose_name="Logo",
        upload_to="nfl_teams/logo/%Y/%m/%d/",
        max_length=1000,
        blank=True,
        null=True,
    )

    def __str__(self):
        return "{} {}".format(self.city, self.name)
