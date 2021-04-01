"""Users permissions classes."""
from rest_framework.permissions import BasePermission

from quiniela.users.models import UserProfile, UserProfileRole


class IsAdmin(BasePermission):
    """Allow access only to admins."""

    def __init__(self):
        super(IsAdmin, self).__init__()
        self.is_admin = UserProfileRole.objects.get(role="admin")

    def has_permission(self, request, view):
        """Verify user has a membership ."""
        try:
            UserProfile.objects.get(
                user=request.user, is_active=True, role=self.is_admin
            )
            return True

        except UserProfile.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        """Verify user has a membership"""

        try:
            UserProfile.objects.get(
                user=request.user, is_active=True, role=self.is_admin
            )
            return True

        except UserProfile.DoesNotExist:
            return False


class IsManager(BasePermission):
    """Allow access only to managers."""

    def __init__(self):
        super(IsManager, self).__init__()
        self.is_manager = UserProfileRole.objects.get(role="manager")

    def has_permission(self, request, view):
        """Verify user has a membership ."""
        try:
            UserProfile.objects.get(
                user=request.user, is_active=True, role=self.is_manager
            )
            return True

        except UserProfile.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        """Verify user has a membership"""

        try:
            UserProfile.objects.get(
                user=request.user, is_active=True, role=self.is_manager
            )

            return True

        except UserProfile.DoesNotExist:
            return False


class IsPlayer(BasePermission):
    """Allow access only to sellers."""

    def __init__(self):
        super(IsPlyaer, self).__init__()
        self.is_player = UserProfileRole.objects.get(role="player")

    def has_permission(self, request, view):
        """Verify user has a membership ."""
        try:
            UserProfile.objects.get(
                user=request.user, is_active=True, role=self.is_player
            )
            return True

        except UserProfile.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        """Verify user has a membership"""

        try:
            UserProfile.objects.get(
                user=request.user, is_active=True, role=self.is_player
            )

            return True

        except UserProfile.DoesNotExist:
            return False


class IsAccountOwner(BasePermission):
    """Allow access only to objects owned by the requesting user."""

    def has_object_permission(self, request, view, obj):
        """Check obj and user are the same."""
        return request.user == obj.user


class IsProfileOwner(BasePermission):
    """Allow access only to objects owned by the requesting user."""

    def has_object_permission(self, request, view, obj):
        """Check obj and user are the same."""
        return request.user == obj
