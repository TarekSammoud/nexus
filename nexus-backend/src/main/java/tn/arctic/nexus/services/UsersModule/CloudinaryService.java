package tn.arctic.nexus.services.UsersModule;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService() {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dp6v1vurq",
                "api_key", "941789893419574",
                "api_secret", "DCcM7jYV8D6j7RMBKd1VTiEBSVo"
        ));
    }

    public String uploadImage(File file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
        return (String) uploadResult.get("secure_url");
    }
}
