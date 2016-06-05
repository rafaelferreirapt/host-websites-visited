from django.core.management.base import BaseCommand
from ...models import Date, Hour, Website, Entry
import datetime


class Command(BaseCommand):
    help = 'This script inserts the host for you'

    def __init__(self):
        super(Command, self).__init__()

    def add_arguments(self, parser):
        parser.add_argument('host', nargs='+', type=str)

    def handle(self, *args, **options):
        now = datetime.datetime.now()

        try:
            h = Hour.objects.get(hour=now.hour)
        except Hour.DoesNotExist:
            h = Hour.objects.create(hour=now.hour)

        try:
            d = Date.objects.get(year=now.year, month=now.month, day=now.day)
        except Date.DoesNotExist:
            d = Date.objects.create(year=now.year, month=now.month, day=now.day)

        for host in options['host']:
            try:
                website = Website.objects.get(host=host)
            except Website.DoesNotExist:
                website = Website.objects.create(host=host)

            try:
                entry = Entry.objects.get(date=d, hour=h, website=website)
            except Entry.DoesNotExist:
                entry = Entry.objects.create(date=d, hour=h, website=website)

            entry.hits += 1
            entry.save()
