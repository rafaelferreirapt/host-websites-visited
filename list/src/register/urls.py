from django.conf.urls import url
from .views import WebsitesForHour, ListMonths, ListDays, ListHours

urlpatterns = [
               url(r'^list_hours/(?P<year>.+)/(?P<month>.+)/(?P<day>.+)/$', ListHours.as_view(),
                   name="List hours of one day"),
               url(r'^list_days/(?P<year>.+)/(?P<month>.+)/$', ListDays.as_view(),
                   name="List days for one month"),
               url(r'^list_months/(?P<year>.+)/$', ListMonths.as_view(),
                   name="List months for one year"),
               url(r'^websites/(?P<year>.+)/(?P<month>.+)/(?P<day>.+)/(?P<hour>.+)/$', WebsitesForHour.as_view(),
                   name="Websites for one hour"),
              ]
