from django.contrib import admin
from .models import Article, Link, GalleryAccessRequest, Photo, Album, DailyVerse, FAQ, Talent, LeadershipPhoto


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'is_published', 'created_at']
    list_editable = ['is_published']
    search_fields = ['title_en', 'title_ru', 'title_he']


@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    list_display = ['title', 'url', 'order']
    list_editable = ['order']


@admin.register(GalleryAccessRequest)
class GalleryAccessRequestAdmin(admin.ModelAdmin):
    list_display = ['name', 'requested_at', 'status', 'token']
    list_editable = ['status']
    list_filter = ['status']
    readonly_fields = ['token', 'requested_at']


class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 5
    fields = ['image', 'title_en', 'title_ru', 'title_he', 'date', 'is_published']


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'date', 'is_published']
    list_editable = ['is_published']
    inlines = [PhotoInline]


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'album', 'date', 'is_published']
    list_editable = ['is_published']
    list_filter = ['album']


@admin.register(DailyVerse)
class DailyVerseAdmin(admin.ModelAdmin):
    list_display = ['reference_en', 'is_active', 'created_at']
    list_editable = ['is_active']
    list_filter = ['is_active']


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question_en', 'order', 'is_published']
    list_editable = ['order', 'is_published']
    search_fields = ['question_en', 'question_ru', 'question_he']


@admin.register(Talent)
class TalentAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'author', 'is_published', 'created_at']
    list_editable = ['is_published']
    search_fields = ['title_en', 'author']


@admin.register(LeadershipPhoto)
class LeadershipPhotoAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'is_active', 'created_at']
    list_editable = ['is_active']   