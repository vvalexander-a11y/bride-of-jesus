from django.db import models
from PIL import Image


class Article(models.Model):
    title_en = models.CharField(max_length=200)
    title_ru = models.CharField(max_length=200, blank=True)
    title_he = models.CharField(max_length=200, blank=True)
    content_en = models.TextField()
    content_ru = models.TextField(blank=True)
    content_he = models.TextField(blank=True)
    image = models.ImageField(upload_to='articles/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.title_en


class Link(models.Model):
    title = models.CharField(max_length=200)
    url = models.URLField()
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order']


class GalleryAccessRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    name = models.CharField(max_length=100)
    requested_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    token = models.CharField(max_length=64, unique=True, blank=True)

    def __str__(self):
        return f"{self.name} — {self.status}"

    class Meta:
        ordering = ['-requested_at']


class Album(models.Model):
    title_en = models.CharField(max_length=200)
    title_ru = models.CharField(max_length=200, blank=True)
    title_he = models.CharField(max_length=200, blank=True)
    date = models.DateField(blank=True, null=True)
    cover = models.ImageField(upload_to='gallery/covers/', blank=True, null=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title_en

    class Meta:
        ordering = ['-date']


class Photo(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='photos', null=True, blank=True)
    title_en = models.CharField(max_length=200, blank=True)
    title_ru = models.CharField(max_length=200, blank=True)
    title_he = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='gallery/')
    date = models.DateField(blank=True, null=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title_en or str(self.created_at)

    class Meta:
        ordering = ['-date']

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            img_path = self.image.path
            img = Image.open(img_path)
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            max_size = (1920, 1920)
            img.thumbnail(max_size, Image.LANCZOS)
            img.save(img_path, 'JPEG', quality=85, optimize=True)


class DailyVerse(models.Model):
    text_en = models.TextField()
    text_ru = models.TextField(blank=True)
    text_he = models.TextField(blank=True)
    reference_en = models.CharField(max_length=100)
    reference_ru = models.CharField(max_length=100, blank=True)
    reference_he = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.reference_en

    class Meta:
        ordering = ['-created_at']


class FAQ(models.Model):
    question_en = models.CharField(max_length=300)
    question_ru = models.CharField(max_length=300, blank=True)
    question_he = models.CharField(max_length=300, blank=True)
    answer_en = models.TextField()
    answer_ru = models.TextField(blank=True)
    answer_he = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.question_en

    class Meta:
        ordering = ['order']


class Talent(models.Model):
    title_en = models.CharField(max_length=200, blank=True)
    title_ru = models.CharField(max_length=200, blank=True)
    title_he = models.CharField(max_length=200, blank=True)
    author = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='talents/', blank=True, null=True)
    description_en = models.TextField(blank=True)
    description_ru = models.TextField(blank=True)
    description_he = models.TextField(blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title_en or f"Talent by {self.author}"

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            img_path = self.image.path
            img = Image.open(img_path)
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            max_size = (1920, 1920)
            img.thumbnail(max_size, Image.LANCZOS)
            img.save(img_path, 'JPEG', quality=85, optimize=True)
class LeadershipPhoto(models.Model):
    image = models.ImageField(upload_to='leadership/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Leadership photo {self.id}"

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            img_path = self.image.path
            img = Image.open(img_path)
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            max_size = (1600, 1600)
            img.thumbnail(max_size, Image.LANCZOS)
            img.save(img_path, 'JPEG', quality=88, optimize=True)            