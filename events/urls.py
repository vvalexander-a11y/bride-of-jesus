from django.urls import path
from .views import EventListView, PrayerRequestListView

urlpatterns = [
    path('events/', EventListView.as_view()),
    path('prayers/', PrayerRequestListView.as_view()),
]