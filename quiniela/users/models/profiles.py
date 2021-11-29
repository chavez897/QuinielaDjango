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
        verbose_name="Role",
        unique=True,
        max_length=24,
        primary_key=True,
    )
    created_at = models.DateTimeField(
        verbose_name="Creation Date",
        auto_now_add=True,
    )
    modified_at = models.DateTimeField(
        verbose_name="Modify Date",
        auto_now=True,
    )

    class Meta:
        verbose_name = "role"
        verbose_name_plural = "Roles"

    def __str__(self):
        """Return role."""
        return self.role


class UserProfile(BaseModel):
    """Profile model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """

    user = models.OneToOneField(
        verbose_name="User", to="users.User", on_delete=models.CASCADE
    )
    picture = models.ImageField(  # noqa DJ01
        verbose_name="Avatar",
        upload_to="users/profiles/user-profile/picture/%Y/%m/%d/",
        max_length=1000,
        blank=True,
        null=True,
    )
    role = models.ForeignKey(
        verbose_name="User Role",
        on_delete=models.CASCADE,
        to="users.UserProfileRole",
        default="admin",
    )
    created_by = None
    modified_by = None

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "Users Profiles"

    def __str__(self):
        """Return user's str representation."""
        return str(self.user)
