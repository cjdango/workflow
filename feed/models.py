from django.db import models
from django.db.models import Q
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
        now = timezone.now()
        any_val = '*'

        once_q = Q(event_date=now)
        daily_q = Q(freq_day=any_val, freq_mo=any_val, freq_week_idx=any_val)
        weekly_q = Q(freq_day=any_val, freq_mo=any_val, freq_week_idx=now.weekday() + 1)
        monthly_q = Q(freq_day=now.day, freq_mo=any_val, freq_week_idx=any_val)
        yearly_q = Q(freq_day=now.day, freq_mo=now.month, freq_week_idx=any_val)
        query = (once_q | daily_q | weekly_q | monthly_q | yearly_q) & Q(event_date__lte=now)

        events_today = super().get_queryset().filter(query)

        return events_today


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

    # Frequency fields (cron schedule expressions separated into fields)
    freq_min = models.CharField(max_length=20, null=True, blank=True)
    freq_hr = models.CharField(max_length=20, null=True, blank=True)
    freq_day = models.CharField(max_length=20, null=True, blank=True)
    freq_mo = models.CharField(max_length=20, null=True, blank=True)
    freq_week_idx = models.CharField(max_length=20, null=True, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateField(auto_now=True)

    objects = EventManager()

    def __str__(self):
        return f"{self.title}"

    @property
    def frequency(self):
        return f'{self.freq_min} {self.freq_hr} {self.freq_day} {self.freq_mo} {self.freq_week_idx}'.strip()
    
    @frequency.setter
    def frequency(self, frequency):
        # Separate cron expression into a list.
        freq_list = frequency.split()
        # frequency related fields in this model
        freq_parts = ['freq_min', 'freq_hr', 'freq_day', 'freq_mo', 'freq_week_idx']

        if len(freq_list):      
            # Creates a dictionary with field name as key and expression parts as values.   
            freq_exp = { x : freq_list[idx] for idx, x in enumerate(freq_parts) }
            # Map freq `freq_exp` to `self`
            for key, value in freq_exp.items():
                setattr(self, key, value)
        else:
            # Set self's fields that is in `freq_parts` to an empty string.
            for key in freq_parts:
                setattr(self, key, '')
