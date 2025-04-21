package tn.arctic.nexus.controllers.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.arctic.nexus.services.GamesModule.FtpService;

import java.io.IOException;
import java.net.URLConnection;
import java.util.List;

@RestController
@RequestMapping("/games/upload")
@CrossOrigin(origins = "http://localhost:4200")
public class FileUploadController {
    @Autowired
    private FtpService ftpService;

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        System.out.println("adding");
        try {
            String message = ftpService.uploadFile(file);
            return ResponseEntity.ok(message);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading file: " + e.getMessage());
        }
    }


    @PostMapping("/n64")
    public ResponseEntity<String> uploadN64File(@RequestParam("file") MultipartFile file) {
        System.out.println("adding");
        try {
            String message = ftpService.uploadN64File(file);
            return ResponseEntity.ok(message);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading file: " + e.getMessage());
        }
    }

    @PostMapping("/psp")
    public ResponseEntity<String> uploadPSPFile(@RequestParam("file") MultipartFile file) {
        System.out.println("adding");
        try {
            String message = ftpService.uploadPSPFile(file);
            return ResponseEntity.ok(message);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading file: " + e.getMessage());
        }
    }

    @PostMapping("/rar")
    public ResponseEntity<String> uploadRARFile(@RequestParam("file") MultipartFile file) {
        System.out.println("adding");
        try {
            String message = ftpService.handleZipAndExtractToFtp(file);

            return ResponseEntity.ok(message);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading file: " + e.getMessage());
        }
    }

    @GetMapping("/download/excel")
    public List<List<String>> getExcelDataFromFTP(@RequestParam String fileName) throws IOException {
        return ftpService.getExcelDataFromFTP(fileName);
    }

    @GetMapping("/download/{filename}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String filename) {
        try {
            // Get the file data from the FTP server
            byte[] fileData = ftpService.downloadFile(filename);

            // Guess the content type based on the filename (extension)
            String contentType = URLConnection.guessContentTypeFromName(filename);
            if (contentType == null) {
                contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // fallback
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(fileData);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(("Error downloading file: " + e.getMessage()).getBytes());
        }
    }

}
