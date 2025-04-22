package tn.arctic.nexus.services.UsersModule;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class FaceAnimerService {

    @Value("${face.animer.api.key}")
    private String apiKey;

    private final String uploadUrl = "https://face-animer.p.rapidapi.com/webFaceDriven/upload";
    private final String taskInfoUrl = "https://face-animer.p.rapidapi.com/webFaceDriven/getTaskInfo";
    private final String submitTaskUrl = "https://face-animer.p.rapidapi.com/webFaceDriven/submitTaskByUrl";

    // Upload Image to API
    public String uploadImage(byte[] imageBytes, String fileName) throws IOException {
        HttpPost post = new HttpPost(uploadUrl);
        post.setHeader("x-rapidapi-key", apiKey);
        post.setHeader("x-rapidapi-host", "face-animer.p.rapidapi.com");

        MultipartEntityBuilder builder = MultipartEntityBuilder.create();
        builder.addBinaryBody("file", imageBytes, ContentType.DEFAULT_BINARY, fileName);
        post.setEntity(builder.build());

        try (CloseableHttpClient client = HttpClients.createDefault();
             CloseableHttpResponse response = client.execute(post)) {

            String responseBody = EntityUtils.toString(response.getEntity());
            System.out.println("API Response: " + responseBody);  // Debugging the response
            return responseBody;
        }
    }



    // Get task status using taskId
    public String getTaskInfo(String taskId) throws IOException {
        HttpGet get = new HttpGet(taskInfoUrl + "?taskId=" + taskId);
        get.setHeader("x-rapidapi-key", apiKey);
        get.setHeader("x-rapidapi-host", "face-animer.p.rapidapi.com");

        try (CloseableHttpClient client = HttpClients.createDefault();
             CloseableHttpResponse response = client.execute(get)) {
            return EntityUtils.toString(response.getEntity());
        }
    }

    // Submit task using an image URL
    public String submitTaskByUrl(String imageUrl) throws IOException {
        HttpGet get = new HttpGet(submitTaskUrl + "?imageUrl=" + imageUrl + "&templateId=1");
        get.setHeader("x-rapidapi-key", apiKey);
        get.setHeader("x-rapidapi-host", "face-animer.p.rapidapi.com");

        try (CloseableHttpClient client = HttpClients.createDefault();
             CloseableHttpResponse response = client.execute(get)) {
            return EntityUtils.toString(response.getEntity());
        }
    }
}
