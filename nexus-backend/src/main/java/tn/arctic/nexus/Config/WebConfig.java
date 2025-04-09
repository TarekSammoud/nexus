package tn.arctic.nexus.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Autorise toutes les requêtes
                .allowedOrigins("http://localhost:4200") // Autorise uniquement l'origine de votre frontend Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*") // Autorise tous les en-têtes
                .allowCredentials(true); // Autorise l'envoi de cookies avec les requêtes
    }
}
