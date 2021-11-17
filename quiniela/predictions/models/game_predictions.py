from django.db import models

from quiniela.utils.models import BaseModel


class Prediction(models.TextChoices):
    HOME_LESS = "HL", "Home less"
    HOME_GREATER = "HG", "Home greater"
    AWAY_LESS = "AL", "Away less"
    AWAY_GREATER = "AG", "Away greater"

class GamePredictions(BaseModel):

    enrollment = models.ForeignKey(
        verbose_name="Enrollment",
        to="league.UserprofileLeagueEnrollment",
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )
    game = models.ForeignKey(
        verbose_name="Game",
        to="games.Games",
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )

    prediction = models.CharField(
        verbose_name="Prediction",
        max_length=10,
        choices=Prediction.choices,
        null=True,
        blank=True,
    )
    
    scored = models.BooleanField(
        verbose_name="Scored",
        default=False,
    )

    def __str__(self):
        return "{}-{}-{}".format(self.game, self.enrollment, self.prediction)
