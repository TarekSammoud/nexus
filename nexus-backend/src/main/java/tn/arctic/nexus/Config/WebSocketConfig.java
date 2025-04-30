package tn.arctic.nexus.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.ArrayList;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtUtil jwtUtil;
    @Autowired
    private WebSocketHandshakeInterceptor handshakeInterceptor;
    public WebSocketConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Ici l'URL de connexion WebSocket STOMP
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();

        //support
        registry.addEndpoint("/ws-notifications").setAllowedOriginPatterns("*").addInterceptors(handshakeInterceptor);

        registry.addEndpoint("/ws-support")
                .setAllowedOriginPatterns("http://localhost:4200").addInterceptors(handshakeInterceptor);  // WebSocket endpoint

        // ou sans SockJS
        // registry.addEndpoint("/ws").setAllowedOrigins("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue"); // destinations de broadcast
        config.setApplicationDestinationPrefixes("/app"); // où les messages sont envoyés
        config.setUserDestinationPrefix("/user");

    }
/*
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    String userId = accessor.getFirstNativeHeader("userId");
                    if (userId != null) {
                        accessor.setUser(new UsernamePasswordAuthenticationToken(userId, null));
                    }
                }
                return message;
            }
        });
    }*/

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    String token = accessor.getFirstNativeHeader("Authorization");

                    if (token != null && token.startsWith("Bearer ")) {
                        token = token.substring(7); // Remove "Bearer "

                        try {
                            Long userId = jwtUtil.extractUserId(token);
                            // Set user ID as principal name for simplicity
                            UsernamePasswordAuthenticationToken principal = new
                                    UsernamePasswordAuthenticationToken(userId.toString(), null, new ArrayList<>());
                            accessor.getSessionAttributes().put("userId", userId.toString());
                            accessor.setUser(principal);
                            System.out.println("WebSocket connected - User ID: " + userId);
                        } catch (Exception e) {
                            System.err.println("Invalid JWT in WebSocket CONNECT: " + e.getMessage());
                            throw new IllegalArgumentException("Invalid JWT token for WebSocket");
                        }
                    } else {
                        throw new IllegalArgumentException("Missing Authorization header for WebSocket connection");
                    }
                }

                return message;
            }
        });
    }


}

