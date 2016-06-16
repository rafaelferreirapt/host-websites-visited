import argparse
import pyshark
import subprocess
import os

"""
To use in the ubuntu server:
sudo apt-get install -y tshark
"""


def pkt_callback(pkt):
    try:
        subprocess.Popen(['python',  os.path.dirname(os.path.abspath(__file__)) + '/manage.py', 'insert_host', pkt.http.host])
    except AttributeError:
        pass


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--interface', nargs='?', required=True, help='capture interface')
    parser.add_argument('-t', '--tcpport', nargs='?', required=True, help='service TCP port (or range)')
    args = parser.parse_args()

    cfilter = 'tcp portrange ' + args.tcpport

    cint = args.interface
    print('Filter: %s on %s' % (cfilter, cint))

    try:
        capture = pyshark.LiveCapture(interface=cint, bpf_filter=cfilter)
        capture.apply_on_packets(pkt_callback)
    except KeyboardInterrupt:
        print("It's done!")

if __name__ == '__main__':
    import os

    print os.path.dirname(os.path.abspath(__file__))

    main()
