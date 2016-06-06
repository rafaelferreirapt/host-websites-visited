from rest_framework import views

from .models import Date, Hour, Entry
from rest_framework.response import Response
from django.shortcuts import get_list_or_404, get_object_or_404


class ListHours(views.APIView):

    @staticmethod
    def get(request, year, month, day):
        date = get_object_or_404(Date, year=year, month=month, day=day)
        hours = get_list_or_404(Hour, date=date)

        results = []

        for hour in hours:
            results += [{
                "hour": hour.hour
            }]

        response = Response(results)
        # response["Access-Control-Allow-Origin"] = "*"
        return response


class ListDays(views.APIView):

    @staticmethod
    def get(request, year, month):
        dates = get_list_or_404(Date, year=year, month=month)

        results = []

        for date in dates:
            results += [{
                "day": date.day
            }]

        response = Response(results)
        # response["Access-Control-Allow-Origin"] = "*"
        return response


class ListMonths(views.APIView):

    @staticmethod
    def get(request, year):
        months = get_list_or_404(Date, year=year)

        results = []

        for month in months:
            results += [{
                "month": month.month
            }]

        response = Response(results)
        # response["Access-Control-Allow-Origin"] = "*"
        return response


class WebsitesForHour(views.APIView):

    @staticmethod
    def get(request, year, month, day, hour):
        date = get_object_or_404(Date, year=year, month=month, day=day)
        hour = get_object_or_404(Hour, date=date, hour=hour)
        entries = get_list_or_404(Entry, hour=hour)

        results = []

        for entry in entries:
            results += [{
              "website": entry.website,
              "hits": entry.hits
            }]

        response = Response(results)
        # response["Access-Control-Allow-Origin"] = "*"
        return response

