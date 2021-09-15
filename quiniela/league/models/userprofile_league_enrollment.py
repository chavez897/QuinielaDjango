"""Shop Packages model."""

from django.db import models

from quiniela.utils.models import BaseModel


class UserprofileLeagueEnrollment(BaseModel):

    userprofile = models.ForeignKey(
        verbose_name="Perfil de Usuario",
        to="users.UserProfile",
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )

    league = models.ForeignKey(
        verbose_name="Liga",
        to="league.League",
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )

    team_name = models.CharField(
        verbose_name="Team's name", max_length=120,
    )

    class Meta:
        verbose_name = "League Enrollment"
        verbose_name_plural = "Leagues Enrollments"

    def __str__(self):
        return "{} - {}".format(self.userprofile, self.league)
