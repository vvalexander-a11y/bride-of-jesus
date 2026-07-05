from django.db import models

class Sermon(models.Model):
    MEDIA_TYPE_CHOICES = [
        ('text', 'Text'),
        ('video', 'Video file'),
        ('audio', 'Audio file'),
        ('youtube', 'YouTube link'),
        ('other', 'Other link'),
    ]

    title_en = models.CharField(max_length=200)
    title_ru = models.CharField(max_length=200, blank=True)
    title_he = models.CharField(max_length=200, blank=True)
    description_en = models.TextField(blank=True)
    description_ru = models.TextField(blank=True)
    description_he = models.TextField(blank=True)
    content_en = models.TextField(blank=True)
    content_ru = models.TextField(blank=True)
    content_he = models.TextField(blank=True)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES, default='text')
    file = models.FileField(upload_to='sermons/', blank=True, null=True)
    url = models.URLField(blank=True)
    date = models.DateField()
    speaker = models.CharField(max_length=100, blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title_en

    class Meta:
        ordering = ['-date']