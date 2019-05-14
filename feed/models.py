from django.db import models
from django.utils import timezone

from users.models import User


class EventManager(models.Manager):
    """Custom event manager"""
    def on_year(self, year=timezone.now().year):
        """ Return events for the given `year`
        """
        year_events = super().get_queryset().filter(
            event_date__year=year,
        )
        return year_events

    def triggered_today(self):
        """Returns all events that are or will be triggered today.
        """
        past_events = super().get_queryset().filter(
            event_date__lte=timezone.now(),
        )

        day_today = timezone.now().day
        month_today = timezone.now().month

        # Have to add 2 since django's week_day lookup for DateField
        # Starts with 1 as Sunday and 7 as Saturday but python's 
        # datetime.datetime.weekday() starts with 0 as Monday and 6 as Sunday
        week_day_today = timezone.now().weekday() + 2

        onetime_events = past_events.filter(frequency=None, event_date__day=day_today)
        daily_events = past_events.filter(frequency='x x * * *')
        weekly_events = past_events.filter(frequency='x x * * x', event_date__week_day=week_day_today)
        monthly_events = past_events.filter(frequency='x x x * *', event_date__day=day_today)
        yearly_events = past_events.filter(
            frequency='x x x x *',
            event_date__day=day_today,
            event_date__month=month_today
        )

        # Combine querysets
        return onetime_events | daily_events | weekly_events | monthly_events | yearly_events


class Event(models.Model):
    """ event schedules
    """
    title = models.CharField(max_length=200)
    content = models.TextField()

    organizer = models.ForeignKey(User, null=True, related_name="organizer", on_delete=models.SET_NULL)
    participants = models.ManyToManyField(User, related_name="participants")

    event_date = models.DateField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)

    frequency = models.CharField(max_length=50, null=True, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateField(auto_now=True)

    objects = EventManager()

    def __str__(self):
        return f"{self.title}"
