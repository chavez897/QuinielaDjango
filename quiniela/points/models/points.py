from django.db import models

from quiniela.utils.models import BaseModel


class Points(BaseModel):

    enrollment = models.ForeignKey(
        verbose_name="Enrollment",
        to="league.UserprofileLeagueEnrollment",
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )

    season = models.IntegerField(blank=False, null=False)

    week = models.IntegerField(blank=False, null=False)

    points = models.IntegerField(blank=False, null=False)

    def __str__(self):
        return "{}-{}-{}".format(self.enrollment, self.week, self.points)
