from rest_framework.views import APIView
from rest_framework.response import Response
from core.views import verify_member_token
from .models import Event, PrayerRequest


class EventListView(APIView):
    def get(self, request):
        token = request.query_params.get('token', '')
        if not verify_member_token(token):
            return Response({'error': 'Unauthorized'}, status=403)

        events = Event.objects.filter(is_published=True)
        data = []
        for e in events:
            data.append({
                'id': e.id,
                'title_en': e.title_en,
                'title_ru': e.title_ru,
                'title_he': e.title_he,
                'description_en': e.description_en,
                'description_ru': e.description_ru,
                'description_he': e.description_he,
                'date': e.date,
                'location': e.location,
            })
        return Response(data)


class PrayerRequestListView(APIView):
    def get(self, request):
        token = request.query_params.get('token', '')
        if not verify_member_token(token):
            return Response({'error': 'Unauthorized'}, status=403)

        prayers = PrayerRequest.objects.filter(is_published=True)
        data = []
        for p in prayers:
            data.append({
                'id': p.id,
                'name': p.name,
                'text_en': p.text_en,
                'text_ru': p.text_ru,
                'text_he': p.text_he,
                'is_answered': p.is_answered,
                'created_at': p.created_at,
            })
        return Response(data)