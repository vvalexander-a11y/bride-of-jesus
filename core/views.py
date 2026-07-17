from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.core import signing
from django.core.cache import cache
from django.db.models import Q
import secrets
from .models import Article, Link, GalleryAccessRequest, Photo, DailyVerse, FAQ, Talent, LeadershipPhoto, SiteSettings


class ArticleListView(APIView):
    def get(self, request):
        articles = Article.objects.filter(is_published=True)
        data = []
        for a in articles:
            data.append({
                'id': a.id,
                'title_en': a.title_en,
                'title_ru': a.title_ru,
                'title_he': a.title_he,
                'content_en': a.content_en,
                'content_ru': a.content_ru,
                'content_he': a.content_he,
                'image': request.build_absolute_uri(a.image.url) if a.image else None,
                'created_at': a.created_at,
            })
        return Response(data)


class LinkListView(APIView):
    def get(self, request):
        links = Link.objects.all()
        data = []
        for l in links:
            data.append({
                'id': l.id,
                'title': l.title,
                'url': l.url,
                'description': l.description,
            })
        return Response(data)


class CheckPasswordView(APIView):
    def post(self, request):
        ip = request.META.get('REMOTE_ADDR', 'unknown')
        cache_key = f'login_attempts_{ip}'
        attempts = cache.get(cache_key, 0)

        if attempts >= 5:
            return Response(
                {'success': False, 'error': 'Too many attempts. Try again in 15 minutes.'},
                status=429
            )

        password = request.data.get('password', '')
        if password == settings.CONGREGATION_PASSWORD:
            cache.delete(cache_key)
            token = signing.dumps({'role': 'member'})
            return Response({'success': True, 'token': token})

        cache.set(cache_key, attempts + 1, 60 * 15)
        return Response({'success': False}, status=400)


def verify_member_token(token):
    try:
        data = signing.loads(token, max_age=60 * 60 * 24 * 30)
        return data.get('role') == 'member'
    except (signing.BadSignature, signing.SignatureExpired):
        return False


class RequestGalleryAccessView(APIView):
    def post(self, request):
        name = request.data.get('name', '').strip()
        if not name:
            return Response({'error': 'Name required'}, status=400)
        token = secrets.token_hex(32)
        GalleryAccessRequest.objects.create(name=name, token=token)
        return Response({'success': True})


class CheckGalleryAccessView(APIView):
    def post(self, request):
        token = request.data.get('token', '')
        try:
            req = GalleryAccessRequest.objects.get(token=token, status='approved')
            return Response({'approved': True, 'name': req.name})
        except GalleryAccessRequest.DoesNotExist:
            return Response({'approved': False}, status=403)


class PhotoListView(APIView):
    def get(self, request):
        token = request.query_params.get('token', '')
        try:
            GalleryAccessRequest.objects.get(token=token, status='approved')
        except GalleryAccessRequest.DoesNotExist:
            return Response({'error': 'Unauthorized'}, status=403)
        photos = Photo.objects.filter(
            Q(album__isnull=True) | Q(album__is_published=True),
            is_published=True,
        ).select_related('album')
        data = []
        for p in photos:
            data.append({
                'id': p.id,
                'title_en': p.title_en,
                'title_ru': p.title_ru,
                'title_he': p.title_he,
                'image': request.build_absolute_uri(p.image.url),
                'date': p.date,
                'album_id': p.album_id,
                'album_title_en': p.album.title_en if p.album else None,
                'album_title_ru': p.album.title_ru if p.album else None,
                'album_title_he': p.album.title_he if p.album else None,
                'album_date': p.album.date if p.album else None,
                'album_cover': request.build_absolute_uri(p.album.cover.url) if p.album and p.album.cover else None,
            })
        return Response(data)


import datetime

class DailyVerseView(APIView):
    def get(self, request):
        verses = list(DailyVerse.objects.filter(is_active=True).order_by('id'))
        if not verses:
            return Response(None)
        day_of_year = datetime.date.today().timetuple().tm_yday
        verse = verses[day_of_year % len(verses)]
        return Response({
            'text_en': verse.text_en,
            'text_ru': verse.text_ru,
            'text_he': verse.text_he,
            'reference_en': verse.reference_en,
            'reference_ru': verse.reference_ru,
            'reference_he': verse.reference_he,
        })


class FAQListView(APIView):
    def get(self, request):
        faqs = FAQ.objects.filter(is_published=True)
        data = []
        for f in faqs:
            data.append({
                'id': f.id,
                'question_en': f.question_en,
                'question_ru': f.question_ru,
                'question_he': f.question_he,
                'answer_en': f.answer_en,
                'answer_ru': f.answer_ru,
                'answer_he': f.answer_he,
            })
        return Response(data)


class TalentListView(APIView):
    def get(self, request):
        token = request.query_params.get('token', '')
        if not verify_member_token(token):
            return Response({'error': 'Unauthorized'}, status=403)

        talents = Talent.objects.filter(is_published=True)
        data = []
        for t in talents:
            data.append({
                'id': t.id,
                'title_en': t.title_en,
                'title_ru': t.title_ru,
                'title_he': t.title_he,
                'author': t.author,
                'image': request.build_absolute_uri(t.image.url) if t.image else None,
                'description_en': t.description_en,
                'description_ru': t.description_ru,
                'description_he': t.description_he,
                'created_at': t.created_at,
'created_at': t.created_at,
            })
        return Response(data)


class LeadershipPhotoView(APIView):
    def get(self, request):
        photo = LeadershipPhoto.objects.filter(is_active=True).first()
        if not photo or not photo.image:
            return Response(None)
        return Response({
            'image': request.build_absolute_uri(photo.image.url)
        })


class SiteSettingsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        s = SiteSettings.objects.first()
        if not s:
            return Response(None)
        return Response({
            'email': s.email,
            'phone': s.phone,
            'phone_display': s.phone_display,
            'whatsapp_number': s.whatsapp_number,
            'address_en': s.address_en,
            'address_ru': s.address_ru,
            'address_he': s.address_he,
            'address_es': s.address_es,
            'service_hours_en': s.service_hours_en,
            'service_hours_ru': s.service_hours_ru,
            'service_hours_he': s.service_hours_he,
            'service_hours_es': s.service_hours_es,
        })