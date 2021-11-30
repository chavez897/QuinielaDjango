from config import celery_app
from quiniela.predictions.models.game_predictions import GamePredictions
from quiniela.predictions.models.current_week import CurrentWeek
from quiniela.games.models.games import Games
from quiniela.league.models.userprofile_league_enrollment import (
    UserprofileLeagueEnrollment,
)


@celery_app.task(name="predictions__create_predictions", max_retries=3)
def createPredictions():
    enrollments = UserprofileLeagueEnrollment.objects.filter(is_active=True)
    current = CurrentWeek.objects.get(id=1)
    games = Games.objects.filter(season=current.season, week=current.week)
    predictions = []
    for enrollment in enrollments:
        for game in games:
            predictions.append(
                GamePredictions(
                    enrollment=enrollment, game=game, prediction=None, scored=False
                )
            )
    GamePredictions.objects.bulk_create(predictions)
    return
