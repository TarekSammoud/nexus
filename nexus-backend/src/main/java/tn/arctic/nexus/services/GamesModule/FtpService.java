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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
public class FtpService {
    private static final String FTP_SERVER = "192.168.100.100";
    private static final int FTP_PORT = 21;
    private static final String FTP_USER = "nexus-ftp";
    private static final String FTP_PASSWORD = "123456789";
    private static final String FTP_UPLOAD_DIR = "/";


    public String handleZipAndExtractToFtp(MultipartFile zipFile) throws IOException {
        Path tempDir = Files.createTempDirectory("zip-temp-");
        Path zipPath = tempDir.resolve(zipFile.getOriginalFilename());
        Files.copy(zipFile.getInputStream(), zipPath, StandardCopyOption.REPLACE_EXISTING);

        // Step 1: Extract ZIP file
        File extractDir = tempDir.resolve("extracted").toFile();
        extractDir.mkdirs();

        try (ZipInputStream zis = new ZipInputStream(new FileInputStream(zipPath.toFile()))) {
            ZipEntry zipEntry;
            while ((zipEntry = zis.getNextEntry()) != null) {
                File outFile = new File(extractDir, zipEntry.getName());
                if (zipEntry.isDirectory()) {
                    outFile.mkdirs();
                } else {
                    outFile.getParentFile().mkdirs();
                    try (FileOutputStream fos = new FileOutputStream(outFile)) {
                        byte[] buffer = new byte[1024];
                        int len;
                        while ((len = zis.read(buffer)) > 0) {
                            fos.write(buffer, 0, len);
                        }
                    }
                }
            }
        } catch (IOException e) {
            throw new IOException("Failed to extract ZIP file: " + e.getMessage(), e);
        }

        // Step 2: Upload extracted files to FTP server
        FTPClient ftpClient = new FTPClient();
        try {
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            ftpClient.login(FTP_USER, FTP_PASSWORD);
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            ftpClient.changeWorkingDirectory(FTP_UPLOAD_DIR);

            Files.walk(extractDir.toPath())
                    .filter(Files::isRegularFile)
                    .forEach(filePath -> {
                        try (InputStream input = Files.newInputStream(filePath)) {
                            String relativePath = extractDir.toPath().relativize(filePath).toString().replace("\\", "/");
                            ftpClient.makeDirectory(new File(relativePath).getParent());
                            ftpClient.storeFile(relativePath, input);
                        } catch (IOException e) {
                            throw new RuntimeException("FTP upload failed for file: " + filePath, e);
                        }
                    });

        } finally {
            if (ftpClient.isConnected()) {
                ftpClient.logout();
                ftpClient.disconnect();
            }
        }

        return "ZIP extracted and files uploaded to FTP successfully!";
    }


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



    public byte[] downloadFileGame(String fileName,String type) throws IOException {
        FTPClient ftpClient = new FTPClient();

        String path;
        try {
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            ftpClient.login(FTP_USER, FTP_PASSWORD);

            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            if (type.equals("full"))
                path = FTP_UPLOAD_DIR;
            else
             path = FTP_UPLOAD_DIR+"/"+type;

            ftpClient.changeWorkingDirectory(path);
            //System.out.println("FTP working directory: " + ftpClient.printWorkingDirectory());



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

    public String uploadN64File(MultipartFile file) throws IOException {
        FTPClient ftpClient = new FTPClient();

        try {
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            ftpClient.login(FTP_USER, FTP_PASSWORD);

            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            ftpClient.changeWorkingDirectory("/n64");

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


    public String uploadPSPFile(MultipartFile file) throws IOException {
        FTPClient ftpClient = new FTPClient();

        try {
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            ftpClient.login(FTP_USER, FTP_PASSWORD);

            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            ftpClient.changeWorkingDirectory("/psp");

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
