from config import celery_app
from quiniela.predictions.models.game_predictions import GamePredictions, Prediction
from quiniela.predictions.models.current_week import CurrentWeek
from quiniela.games.models.games import Games
from quiniela.points.models.points import Points


@celery_app.task(name="predictions__score_predictions", max_retries=3)
def scorePredictions():
    current = CurrentWeek.objects.get(id=1)
    games = Games.objects.filter(
        season=current.season,
        week=current.week,
        home_score__isnull=False,
        away_score__isnull=False,
    )
    predictions = GamePredictions.objects.filter(
        game__in=games, scored=False
    ).select_related(
        "enrollment",
        "enrollment__league",
        "enrollment__userprofile",
        "enrollment__userprofile__user",
        "game",
        "game__home_team",
        "game__away_team",
    )
    points_queryset = Points.objects.filter(
        season=current.season, week=current.week
    ).select_related(
        "enrollment",
        "enrollment__league",
        "enrollment__userprofile",
        "enrollment__userprofile__user",
    )
    points = {}
    update_points = []
    update_predictions = []
    for point in points_queryset:
        points[point.enrollment.id] = point
    for prediction in predictions:
        points[prediction.enrollment.id].points = points[
            prediction.enrollment.id
        ].points + calculatePoints(
            prediction.game.home_score,
            prediction.game.away_score,
            prediction.prediction,
            6,
        )
        prediction.scored = True
        update_points.append(points[prediction.enrollment.id])
        update_predictions.append(prediction)
    GamePredictions.objects.bulk_update(update_predictions, ["scored"])
    Points.objects.bulk_update(update_points, ["points"])
    return


def calculatePoints(home_points, away_points, prediction, target_difference):
    scored_points = 0
    if home_points > away_points:
        if prediction == Prediction.HOME_LESS or prediction == Prediction.HOME_GREATER:
            print("Home Winner")
            scored_points = scored_points + 1
        if (
            home_points - away_points > target_difference
            and prediction == Prediction.HOME_GREATER
        ):
            print("Home Greater")
            scored_points = scored_points + 1
        elif (
            home_points - away_points <= target_difference
            and prediction == Prediction.HOME_LESS
        ):
            print("Home Less")
            scored_points = scored_points + 1
    elif home_points < away_points:
        if prediction == Prediction.AWAY_LESS or prediction == Prediction.AWAY_GREATER:
            print("Away Winner")
            scored_points = scored_points + 1
        if (
            away_points - home_points > target_difference
            and prediction == Prediction.AWAY_GREATER
        ):
            print("Away Greater")
            scored_points = scored_points + 1
        elif (
            away_points - home_points <= target_difference
            and prediction == Prediction.AWAY_LESS
        ):
            print("Away Less")
            scored_points = scored_points + 1
    return scored_points
