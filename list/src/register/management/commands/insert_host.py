from django.core.management.base import BaseCommand
from ...models import Date, Hour, Website, Entry, BlackHosts
import datetime


class Command(BaseCommand):
    help = 'This script inserts the host for you'

    def __init__(self):
        super(Command, self).__init__()
        self.terms_list = [
            "cdn",
            "static",
            "api",
            "ajax."
            "s.",
            "stats"
        ]

    def add_arguments(self, parser):
        parser.add_argument('host', nargs='+', type=str)

    def handle(self, *args, **options):
        now = datetime.datetime.now()

        try:
            d = Date.objects.get(year=now.year, month=now.month, day=now.day)
        except Date.DoesNotExist:
            d = Date.objects.create(year=now.year, month=now.month, day=now.day)

        try:
            h = Hour.objects.get(hour=now.hour, date=d)
        except Hour.DoesNotExist:
            h = Hour.objects.create(hour=now.hour, date=d)

        for host in options['host']:
            # black_hosts = BlackHosts.objects.filter(host__contains=host).count()

            # host_valid = host.startswith("www") or (len(host.split(".")) == 2)
            term_valid = True

            for term in self.terms_list:
                if term in host:
                    term_valid = False
                    break

            if black_hosts == 0 and term_valid:  # and host_valid:
                print host

                try:
                    website = Website.objects.get(host=host)
                except Website.DoesNotExist:
                    website = Website.objects.create(host=host)

                try:
                    entry = Entry.objects.get(hour=h, website=website)
                except Entry.DoesNotExist:
                    entry = Entry.objects.create(hour=h, website=website)

                entry.hits += 1
                entry.save()
