from django.core.management.base import BaseCommand
from ...models import BlackHosts
import json


class Command(BaseCommand):
    help = 'This script inserts the black list host for you'

    def __init__(self):
        super(Command, self).__init__()

    def add_arguments(self, parser):
        parser.add_argument('host_file', nargs='+', type=str)

    def handle(self, *args, **options):

        # open the file with json probe
        with open(options['host_file'][0]) as data_file:
            data = json.load(data_file)

        for host in data["hosts"]:
            BlackHosts.objects.create(host=host)
