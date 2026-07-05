from django.contrib import admin
from .models import Sermon

@admin.register(Sermon)
class SermonAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'speaker', 'date', 'media_type', 'is_published']
    list_editable = ['is_published']
    search_fields = ['title_en', 'title_ru', 'speaker']
    list_filter = ['media_type', 'is_published']