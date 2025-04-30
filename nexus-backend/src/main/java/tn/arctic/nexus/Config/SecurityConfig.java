package tn.arctic.nexus.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import tn.arctic.nexus.Config.JwtAuthenticationFilter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(@Lazy JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/user/BlockList/**").permitAll()
                        .requestMatchers("/api/publications/**").permitAll()
                        .requestMatchers("/api/categories/**").permitAll()
                        .requestMatchers("/api/likes/**").permitAll()
                        .requestMatchers("/api/reports/**").permitAll()
                        .requestMatchers("/api/commentaires/**").permitAll()
                        .requestMatchers(("/api/sondages/**")).permitAll()
                        .requestMatchers(("/api/streamers/**")).permitAll()
                        .requestMatchers(("/api/votes/**")).permitAll()
                        .requestMatchers("/user/**").permitAll()
                        .requestMatchers("/friendRequests/**").permitAll()
                        .requestMatchers("/pic/**").permitAll()
                        .requestMatchers("/ws/**").permitAll()
                        .requestMatchers("/api/avatar/**").permitAll()
                        .requestMatchers("/games/**").permitAll()
                        .requestMatchers("/games/**").permitAll()
                        .requestMatchers("/api/entries/**").permitAll()
                        .requestMatchers("/api/entry-ratings/**").permitAll()
                        .requestMatchers("/api/gamejams/**").permitAll()
                        .requestMatchers("/api/vip-jams/**").permitAll()
                        .requestMatchers("/api/entry-media/**").permitAll()
                        .requestMatchers("/marketlistings/**").permitAll()

                        .requestMatchers("/bids/**").permitAll()
                        .requestMatchers("/gameitem/**").permitAll()
                        .requestMatchers("/wallet/**").permitAll()
                        .requestMatchers("/refund/**").permitAll()
                        .requestMatchers("/transfer/**").permitAll()
                        .requestMatchers("/purchase/**").permitAll()
                        .requestMatchers("/payment/**").permitAll()
                        .requestMatchers("/**").permitAll()


                        .requestMatchers("/games/library/**").permitAll()

                        .requestMatchers("/support/**").permitAll()


                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}