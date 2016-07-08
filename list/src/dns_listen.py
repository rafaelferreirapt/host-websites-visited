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
        if len(pkt.layers) == 4 and (hasattr(pkt.dns, 'a') and hasattr(pkt.layers[3], 'cname')) or (hasattr(pkt.dns, 'a') and hasattr(pkt.layers[3], 'resp_name')):
            print "ok"
            pass
    except AttributeError:
        pass


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--interface', nargs='?', required=True, help='capture interface')
    args = parser.parse_args()

    cfilter = 'port 53'

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
