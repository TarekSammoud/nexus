package tn.arctic.nexus.entities;

import lombok.Data;

import java.util.List;

@Data
public class AvatarRequestDto {
    private String description;
    private String artStyle;
    private List<String> facialFeatures;
    private String negativePrompt = "ugly, deformed, blurry, extra limbs";
}