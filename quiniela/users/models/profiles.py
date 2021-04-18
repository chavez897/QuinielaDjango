"""Profile model."""

# Django
from django.db import models

# Utilities
from quiniela.utils.models import BaseModel


class UserProfileRole(models.Model):
    """
    UserProfileRole.
    Table with available roles.
    """

    role = models.CharField(
        verbose_name="Rol",
        unique=True,
        max_length=24,
        primary_key=True,
    )
    created_at = models.DateTimeField(
        verbose_name="Fecha de creación",
        auto_now_add=True,
        help_text="Fecha en que el registro fue creado.",
    )
    modified_at = models.DateTimeField(
        verbose_name="Ultima modificación",
        auto_now=True,
        help_text="Última fecha en que el registro fue modificado",
    )

    class Meta:
        verbose_name = "Rol de usuario"
        verbose_name_plural = "Roles de usuarios"

    def __str__(self):
        """Return role."""
        return self.role


class UserProfile(BaseModel):
    """Profile model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """

    user = models.OneToOneField(
        verbose_name="Usuario", to="users.User", on_delete=models.CASCADE
    )
    picture = models.ImageField(  # noqa DJ01
        verbose_name="Avatar",
        upload_to="users/profiles/user-profile/picture/%Y/%m/%d/",
        max_length=1000,
        blank=True,
        null=True,
    )
    role = models.ForeignKey(
        verbose_name="Rol de usuario",
        on_delete=models.CASCADE,
        to="users.UserProfileRole",
        default="admin",
    )
    leagues = models.ManyToManyField(
        verbose_name="Ligas",
        to="league.League",
        blank=True,
        null=True,
    )
    created_by = None
    modified_by = None

    class Meta:
        verbose_name = "Perfil de usuario"
        verbose_name_plural = "Perfiles de usuarios"

    def __str__(self):
        """Return user's str representation."""
        return str(self.user)
