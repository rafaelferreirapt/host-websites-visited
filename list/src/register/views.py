from rest_framework import views, status

from .models import Token, CompareData
from observedData.models import ObservedDataModel
from modulatedData.models import ModulatedData
from sharedData.models import Station, Pollutant
from rest_framework.response import Response
from django.shortcuts import get_list_or_404, get_object_or_404
import datetime
import estatistica


class CompareInterval(views.APIView):

    @staticmethod
    def get(request, token):
        token = get_object_or_404(Token.objects.all(), token=token)
        data_set = CompareData.objects.filter(token=token)

        observed = []
        modulated = []

        for data in data_set:
            observed.append(data.observed.value)
            modulated.append(data.modulated.value)

        results = {}
        response = Response({'status': 'Bad request',
                             'message': 'Data invalid!'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            for method in estatistica.__all__:
                results[method] = getattr(estatistica, method)(observed, modulated)

            CompareData.objects.filter(token=token).delete()
            token.delete()

            response = Response(results)
        except Exception:
            pass

        response["Access-Control-Allow-Origin"] = "*"
        return response


class GenerateToken(views.APIView):

    @staticmethod
    def get(request):
        token = Token.objects.create()

        response = Response({"token": token.token})
        response["Access-Control-Allow-Origin"] = "*"
        return response


class ModulatedObservedData(views.APIView):

    @staticmethod
    def get(request, station_code, year, month, day, token):

        try:
            datetime.datetime(year=int(year), month=int(month), day=int(day))
        except ValueError:
            response = Response({'status': 'Bad request',
                                 'message': 'Date invalid!'},
                                status=status.HTTP_400_BAD_REQUEST)
            response["Access-Control-Allow-Origin"] = "*"
            return response

        # first get the token, or create a new one in the database to organize the interval to retrieve the statistics
        token = get_object_or_404(Token.objects.all(), token=token)

        # get the station by code
        station = get_object_or_404(Station.objects.all(), code=station_code)

        # array with obverserved and modultated for all pollutants
        data = []

        for pollutant in Pollutant.objects.all():
            # get observed for the data provided
            observed_list = get_list_or_404(ObservedDataModel.objects.all(), year=int(year), month=int(month),
                                            day=int(day), station=station, pollutant=pollutant)

            result_list = []

            for observed in observed_list:
                try:
                    modulated = ModulatedData.objects.get(year=int(year), month=int(month), day=int(day),
                                                          hour=observed.hour,
                                                          station=observed.station, pollutant=observed.pollutant)

                    CompareData.objects.create(token=token, observed=observed, modulated=modulated,
                                               pollutant=observed.pollutant, station=station)

                    result_list += [{'year': observed.year, 'month': observed.month, 'day': observed.day,
                                     'hour': observed.hour, 'modulated': modulated.value, 'observed': observed.value}]
                except ModulatedData.DoesNotExist:
                    continue

            data += [{"pollutant": {"code": pollutant.code, "notation": pollutant.notation},
                      "data": result_list}]

        response = Response(data)
        response["Access-Control-Allow-Origin"] = "*"
        return response
