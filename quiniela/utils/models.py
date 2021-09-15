"""Django models utilities."""
# Django
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class CustomAbstractUser(AbstractBaseUser, PermissionsMixin):
    """
    An abstract base class implementing a fully featured User model with
    admin-compliant permissions.

    Username and password are required. Other fields are optional.
    """

    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _("username"),
        max_length=32,
        unique=True,
        help_text=_(
            "Required. 32 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    name = models.CharField("Names", max_length=120, blank=True)
    last_name = models.CharField(_("Last Name"), max_length=45, blank=True)
    second_last_name = models.CharField(
        "Second last name", max_length=45, blank=True, default=""
    )
    email = models.EmailField(_("email address"), blank=True)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        abstract = True

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the name plus the last_name, with a space in between.
        """
        full_name = "%s %s %s" % (self.name, self.last_name, self.second_last_name)
        return full_name.strip()


class BaseModel(models.Model):
    """Django custom base model.
    BaseModel acts as an abstract base class from which every
    other model in the project will inherit. This class provides
    every table with the following attributes:
        + is_active (Boolean): Indicates if the object is active.
        + created_at (DateTime): Store the datetime the object was created.
        + modified_at (DateTime): Store the last datetime the object was modified.
    """

    is_active = models.BooleanField(
        _("active"),
        default=True,
    )
    created_at = models.DateTimeField(
        verbose_name="Creation Date",
        auto_now_add=True,
        blank=True,
        null=True,
    )
    modified_at = models.DateTimeField(
        verbose_name="Modify Date",
        auto_now=True,
        blank=True,
        null=True,
    )
    created_by = models.ForeignKey(
        to="users.User",
        on_delete=models.CASCADE,
        default=1,
        related_name="%(app_label)s_%(class)s_created",
    )
    modified_by = models.ForeignKey(
        to="users.User",
        on_delete=models.CASCADE,
        null=True,
        related_name="%(app_label)s_%(class)s_modified",
    )

    class Meta:
        """Meta option."""

        abstract = True

        ordering = ["-created_at", "-modified_at"]

    def __str__(self):
        return self.id
