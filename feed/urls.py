from django.urls import path, re_path
from .views import Feed, Calendar, Notification


urlpatterns = [
    path('', Feed.as_view(), name="feed"),

    path('notifications/events/', Notification.as_view({
        'get': 'events',
        'post': 'create',
    }), name="notification_events"),

    path('notifications/events/<int:pk>/', Notification.as_view({
        'put': 'update',
        'delete': 'remove',
    }), name="notification_event_details"),

    path('notifications/pending/', Notification.as_view({
        'get': 'pending'
    }), name="notification_events"),
]