package tn.arctic.nexus.services.GamesModule;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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

    public List<List<String>> readExcelFromBytes(byte[] fileData) throws IOException {
        List<List<String>> data = new ArrayList<>();

        InputStream inputStream = new ByteArrayInputStream(fileData);
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0);
        Iterator<Row> rowIterator = sheet.iterator();

        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            List<String> rowData = new ArrayList<>();
            for (Cell cell : row) {
                rowData.add(cell.toString());
            }
            data.add(rowData);
        }

        workbook.close();
        inputStream.close();

        return data;
    }

    // Method to download and read the Excel file from FTP
    public List<List<String>> getExcelDataFromFTP(String fileName) throws IOException {
        byte[] fileData = downloadFile(fileName);
        return readExcelFromBytes(fileData);
    }
}
