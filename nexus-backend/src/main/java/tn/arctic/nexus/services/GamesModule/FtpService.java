package tn.arctic.nexus.services.GamesModule;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class FtpService {
    private static final String FTP_SERVER = "localhost";
    private static final int FTP_PORT = 21;
    private static final String FTP_USER = "nexus-ftp";
    private static final String FTP_PASSWORD = "123456789";
    private static final String FTP_UPLOAD_DIR = "/";


    public byte[] downloadFile(String fileName) throws IOException {
        FTPClient ftpClient = new FTPClient();

        try {
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            ftpClient.login(FTP_USER, FTP_PASSWORD);

            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            ftpClient.changeWorkingDirectory(FTP_UPLOAD_DIR);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

            InputStream inputStream = ftpClient.retrieveFileStream(fileName);
            if (inputStream != null) {
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    byteArrayOutputStream.write(buffer, 0, bytesRead);
                }
                inputStream.close();

                boolean success = ftpClient.completePendingCommand();
                if (success) {
                    return byteArrayOutputStream.toByteArray();
                } else {
                    throw new IOException("Failed to download file: " + fileName);
                }
            } else {
                throw new IOException("File not found: " + fileName);
            }
        } finally {
            ftpClient.logout();
            ftpClient.disconnect();
        }
    }

    public String uploadFile(MultipartFile file) throws IOException {
        FTPClient ftpClient = new FTPClient();

        try {
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            ftpClient.login(FTP_USER, FTP_PASSWORD);

            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            ftpClient.changeWorkingDirectory(FTP_UPLOAD_DIR);

            boolean success = ftpClient.storeFile(file.getOriginalFilename(), file.getInputStream());

            if (success) {
                return "File uploaded successfully!";
            } else {
                return "File upload failed!";
            }

        } finally {
            ftpClient.logout();
            ftpClient.disconnect();
        }
    }
}
