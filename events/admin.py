from django.contrib import admin
from .models import Event, PrayerRequest


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'date', 'location', 'is_published']
    list_editable = ['is_published']
    search_fields = ['title_en', 'title_ru', 'title_he']
    list_filter = ['is_published']


@admin.register(PrayerRequest)
class PrayerRequestAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'is_answered', 'is_published', 'created_at']
    list_editable = ['is_answered', 'is_published']
    list_filter = ['is_answered', 'is_published']