from rest_framework import views

from .models import Date, Hour, Entry
from rest_framework.response import Response
from django.shortcuts import get_list_or_404, get_object_or_404


class ListHours(views.APIView):

    @staticmethod
    def get(request, year, month, day):
        date = get_object_or_404(Date, year=int(year), month=int(month), day=int(day))
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
        dates = get_list_or_404(Date, year=int(year), month=int(month))

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
        months = get_list_or_404(Date, year=int(year))

        results = []

        prev = None

        for month in months:
            if prev is not None and prev == month.month:
                continue

            results += [{
                "month": month.month
            }]

            prev = month.month

        response = Response(results)
        # response["Access-Control-Allow-Origin"] = "*"
        return response


class HostsForHour(views.APIView):

    @staticmethod
    def get(request, year, month, day, hour):
        date = get_object_or_404(Date, year=year, month=month, day=day)
        hour = get_object_or_404(Hour, date=date, hour=hour)
        entries = get_list_or_404(Entry, hour=hour)

        results = []

        for entry in entries:
            results += [{
              "host": entry.website.host,
              "hits": entry.hits
            }]

        response = Response(results)
        # response["Access-Control-Allow-Origin"] = "*"
        return response

