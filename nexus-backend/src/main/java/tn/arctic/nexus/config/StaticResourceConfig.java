package tn.arctic.nexus.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 🔓 Permet d’accéder aux images via http://localhost:9000/images/nom.png
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:D:/avatars/");
    }
}
