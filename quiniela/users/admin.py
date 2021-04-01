from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from quiniela.users.forms import UserChangeForm, UserCreationForm

from quiniela.users.models import UserProfile, UserProfileRole, User




class ProfileInline(admin.StackedInline):
    model = UserProfile


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """User model admin."""

    list_display = (
        "id",
        "email",
        "username",
        "name",
        "is_active",
        "is_verified",
        "last_name",
        "is_staff",
        "created_at",
    )
    list_filter = ("is_superuser", "is_staff", "created_at", "modified_at")
    list_editable = (
        "is_active",
        "is_verified",
    )
    inlines = [
        ProfileInline,
    ]
    search_fields = ("username", "name", "last_name", "email")
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            _("Personal info"),
            {
                "fields": (
                    "name",
                    "last_name",
                    "second_last_name",
                    "email",
                )
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_verified",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )


@admin.register(UserProfile)
class ProfileAdmin(admin.ModelAdmin):
    """Profile model admin."""

    list_display = (
        "id",
        "user",
        "role",
    )
    list_display_links = ("id", "user")
    search_fields = ("user__username", "user__email", "user__name", "user__last_name")


@admin.register(UserProfileRole)
class UserProfileRoleModelAdmin(admin.ModelAdmin):
    """Profile model admin."""

    list_display = (
        "role",
        "created_at",
        "modified_at",
    )
    list_display_links = ("role",)
