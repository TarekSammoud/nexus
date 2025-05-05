#!/bin/bash

# Check if the required directories exist, create them if not
mkdir -p /home/vsftpd/nexus-ftp/n64
mkdir -p /home/vsftpd/nexus-ftp/psp

# Copy the hardware.xlsx file from default_dir to nexus-ftp
cp /tmp/hardware.xlsx /home/vsftpd/nexus-ftp/

# Change ownership of the files and directories to the FTP user
chown -R ftp:ftp /home/vsftpd/nexus-ftp

# Ensure the vsftpd service starts properly
service vsftpd start

# Keep the container running
tail -f /dev/null
