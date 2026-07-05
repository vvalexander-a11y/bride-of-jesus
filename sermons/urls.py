from django.urls import path
from .views import SermonListView

urlpatterns = [
    path('sermons/', SermonListView.as_view()),
]