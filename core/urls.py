from django.urls import path
from .views import (
    ArticleListView, LinkListView, CheckPasswordView,
    RequestGalleryAccessView, CheckGalleryAccessView, PhotoListView,
    DailyVerseView, FAQListView, TalentListView, LeadershipPhotoView,
    SiteSettingsView
)

urlpatterns = [
    path('articles/', ArticleListView.as_view()),
    path('links/', LinkListView.as_view()),
    path('check-password/', CheckPasswordView.as_view()),
    path('gallery/request/', RequestGalleryAccessView.as_view()),
    path('gallery/check/', CheckGalleryAccessView.as_view()),
    path('gallery/photos/', PhotoListView.as_view()),
    path('daily-verse/', DailyVerseView.as_view()),
    path('faq/', FAQListView.as_view()),
    path('talents/', TalentListView.as_view()),
    path('leadership-photo/', LeadershipPhotoView.as_view()),
    path('site-settings/', SiteSettingsView.as_view()),
]