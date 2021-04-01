"""User model."""

from django.core.validators import RegexValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from quiniela.utils.models import BaseModel, CustomAbstractUser


class User(BaseModel, CustomAbstractUser):
    """User model.
    Extend from Django's Abstract User, change the username field
    to email and add some extra fields.
    """

    is_active = models.BooleanField(
        _("active"),
        default=False,
        help_text=(
            "Indica si el registro debe ser tratado como activo.",
            "Desmarque esta opción en lugar de borrar el registro",
        ),
    )
    email = models.EmailField(
        "email address",
        unique=True,
        error_messages={"unique": "A user with that email already exists."},
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "name", "last_name"]

    is_verified = models.BooleanField(
        "verified",
        default=False,
        help_text="Set to true when the user have verified its email address.",
    )
    created_by = models.ForeignKey(
        verbose_name="Usuario creador",
        to="users.User",
        on_delete=models.CASCADE,
        null=True,
        related_name="%(app_label)s_%(class)s_created",
    )
    modified_by = models.ForeignKey(
        verbose_name="Usuario editor",
        to="users.User",
        on_delete=models.CASCADE,
        null=True,
        related_name="%(app_label)s_%(class)s_modified",
    )

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        """Return username."""
        return self.username
