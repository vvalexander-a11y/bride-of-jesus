from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Sermon

class SermonListView(APIView):
    def get(self, request):
        sermons = Sermon.objects.filter(is_published=True)
        data = []
        for s in sermons:
            data.append({
                'id': s.id,
                'title_en': s.title_en,
                'title_ru': s.title_ru,
                'title_he': s.title_he,
                'description_en': s.description_en,
                'description_ru': s.description_ru,
                'description_he': s.description_he,
                'content_en': s.content_en,
                'content_ru': s.content_ru,
                'content_he': s.content_he,
                'media_type': s.media_type,
                'file': request.build_absolute_uri(s.file.url) if s.file else None,
                'url': s.url,
                'date': s.date,
                'speaker': s.speaker,
            })
        return Response(data)