# Use the base image for vsftpd
FROM fauria/vsftpd

# Set environment variables for FTP user and password
ENV FTP_USER=nexus-ftp
ENV FTP_PASS=123456789

# Create necessary directories in the container
RUN mkdir -p /home/vsftpd/nexus-ftp && \
    mkdir -p /home/vsftpd/default_dir

# Copy the required files into the container
COPY default_dir /home/vsftpd/default_dir
COPY hardware.xlsx /tmp/hardware.xlsx

# Set the working directory to /home/vsftpd
WORKDIR /home/vsftpd

# Copy the start.sh script into the container and make it executable
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose FTP ports
EXPOSE 21
EXPOSE 21100-21110

# Set the command to run the start.sh script when the container starts
CMD ["/start.sh"]
