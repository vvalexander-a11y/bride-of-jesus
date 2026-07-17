from django.db import migrations


SITE_SETTINGS = {
    'email': 'info.meshichit.afula@israelmail.com',
    'phone': '+972552998715',
    'phone_display': '055-299-8715',
    'whatsapp_number': '972552998715',
    'address_en': '',
    'address_ru': '',
    'address_he': '',
    'address_es': '',
    'service_hours_en': 'Meetings usually on Saturday mornings',
    'service_hours_ru': 'Собрания обычно в субботу утром',
    'service_hours_he': 'מפגשים בדרך כלל בשבת בבוקר',
    'service_hours_es': 'Los encuentros suelen ser los sábados por la mañana',
}


def create_site_settings(apps, schema_editor):
    SiteSettings = apps.get_model('core', 'SiteSettings')
    SiteSettings.objects.get_or_create(pk=1, defaults=SITE_SETTINGS)


def remove_site_settings(apps, schema_editor):
    SiteSettings = apps.get_model('core', 'SiteSettings')
    SiteSettings.objects.filter(pk=1).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_sitesettings'),
    ]

    operations = [
        migrations.RunPython(create_site_settings, remove_site_settings),
    ]
