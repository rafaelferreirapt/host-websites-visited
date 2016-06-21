#!/usr/bin/env bash
sudo apt-get update
sudo apt-get install wget
wget http://www.no-ip.com/client/linux/noip-duc-linux.tar.gz
tar xzf noip-duc-linux.tar.gz
cd noip-2.1.9-1
make
sudo make install
sudo pip install smtplib email


# */5 * * * * /path/disk_space.sh