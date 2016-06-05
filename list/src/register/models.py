from django.db import models


class Date(models.Model):
    year = models.IntegerField(blank=False)
    month = models.IntegerField(blank=False)
    day = models.IntegerField(blank=False)

    class Meta:
        unique_together = ('year', 'month', 'day',)


class Hour(models.Model):
    hour = models.IntegerField(unique=True, blank=False)


class Website(models.Model):
    host = models.CharField(blank=False, max_length=200, unique=True)


class Entry(models.Model):
    website = models.ForeignKey(Website, blank=False)
    date = models.ForeignKey(Date, blank=False)
    hour = models.ForeignKey(Hour, blank=False)
    hits = models.BigIntegerField(default=0)
