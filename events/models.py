from django.db import models


class Event(models.Model):
    title_en = models.CharField(max_length=200)
    title_ru = models.CharField(max_length=200, blank=True)
    title_he = models.CharField(max_length=200, blank=True)
    description_en = models.TextField(blank=True)
    description_ru = models.TextField(blank=True)
    description_he = models.TextField(blank=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=200, blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title_en

    class Meta:
        ordering = ['date']


class PrayerRequest(models.Model):
    name = models.CharField(max_length=100, blank=True)
    text_en = models.TextField(blank=True)
    text_ru = models.TextField(blank=True)
    text_he = models.TextField(blank=True)
    is_answered = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name or 'Anonymous'} — {self.created_at.strftime('%d.%m.%Y')}"

    class Meta:
        ordering = ['-created_at']