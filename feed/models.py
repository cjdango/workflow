from django.db import models
from django.utils import timezone

from users.models import User


class Event(models.Model):
    """ event schedules
    """
    REPEAT_NONE = 0
    REPEAT_DAILY = 1
    REPEAT_WEEKLY = 2
    REPEAT_MONTHLY = 3
    RECURRENCE_CHOICES = (
        (REPEAT_NONE, 'None'),
        (REPEAT_DAILY, 'Daily'),
        (REPEAT_WEEKLY, 'Weekly'),
        (REPEAT_MONTHLY, 'Monthly')
    )

    title = models.CharField(max_length=200)
    content = models.TextField()

    organizer = models.ForeignKey(User, null=True, related_name="organizer", on_delete=models.SET_NULL)
    participants = models.ManyToManyField(User, related_name="participants")

    event_date = models.DateField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)

    frequency = models.IntegerField(choices=RECURRENCE_CHOICES, default=REPEAT_NONE)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.title}"
