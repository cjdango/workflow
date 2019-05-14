from django.urls import path, re_path
from .views import Feed, Calendar, Notification


urlpatterns = [
    path('', Feed.as_view(), name="feed"),

    path('notifications/events/', Notification.as_view({
        'get': 'events',
    }), name="notification_events"),

    path('notifications/pending/', Notification.as_view({
        'get': 'pending'
    }), name="notification_events"),

    path('calendar/events/', Calendar.as_view({
        'get': 'events',
        'post': 'create',
    }), name="calendar_events"),

    path('calendar/events/<int:pk>/', Calendar.as_view({
        'put': 'update',
        'delete': 'remove',
    }), name="calendar_event_details"),
]