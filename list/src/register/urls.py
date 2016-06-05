from django.conf.urls import url
from .views import WebsitesForHour, WebsitesForDay

urlpatterns = [
               url(r'^hour/(?P<year>.+)/(?P<month>.+)/(?P<day>.+)/(?P<hour>.+)/$',
                   WebsitesForHour.as_view(), name="Websites for hour"),
               url(r'^day/(?P<year>.+)/(?P<month>.+)/(?P<day>.+)//$',
                   WebsitesForDay.as_view(), name="Websites for day"),
               ]
