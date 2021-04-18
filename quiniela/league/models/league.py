"""Shop Packages model."""

from django.db import models

from quiniela.utils.models import BaseModel
from django.template.defaultfilters import slugify


class League(BaseModel):

    name = models.CharField(
        verbose_name="Nombre de la liga", max_length=120,
    )
    slug = models.SlugField(
        max_length=120,
        default="na",
    )
    picture = models.ImageField(  # noqa DJ01
        verbose_name="Avatar",
        upload_to="league/picture/%Y/%m/%d/",
        max_length=1000,
        blank=True,
        null=True,
    )

    is_public = models.BooleanField(
        verbose_name="Publica",
        default=True,
    )
    
    enroll_code = models.CharField(
        verbose_name="Codigo Inscripción",
        max_length=120,
        blank=True,
        null=True,
    )


    def save(self, *args, **kwargs):
        if self.slug == "na":
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return "{}".format(self.name)