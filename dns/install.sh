#!/usr/bin/env bash
apt-get update
apt-get install bind9
apt-get install bind9-doc

# config
sudo vim /etc/bind/named.conf.options
sudo vim /etc/bind/named.conf.default-zones
sudo rndc reload
