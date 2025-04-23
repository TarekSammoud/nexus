package tn.arctic.nexus.config;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.security.Principal;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketEventsLogger {

    // userId (String) -> Set of sessionIds
    private static final Map<String, Set<String>> userSessions = new ConcurrentHashMap<>();
    // sessionId -> userId
    private static final Map<String, String> sessionToUser = new ConcurrentHashMap<>();

    public WebSocketEventsLogger() {
        // Optionally, you can start a thread here if you need to do periodic cleanup or async tasks.
        // For now, no thread is started, as you only want to track connections.
    }

    @EventListener
    public void handleSessionConnected(SessionConnectEvent event) {
        Principal user = event.getUser();
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();

        if (user != null) {
            String userId = user.getName();
            userSessions.computeIfAbsent(userId, k -> ConcurrentHashMap.newKeySet()).add(sessionId);
            sessionToUser.put(sessionId, userId);

            System.out.println("WebSocket CONNECTED: user=" + userId + ", session=" + sessionId);
        } else {
            System.err.println("WebSocket CONNECT: no principal for sessionId=" + sessionId);
        }
    }

    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {
        String sessionId = StompHeaderAccessor.wrap(event.getMessage()).getSessionId();
        String userId = sessionToUser.remove(sessionId);

        if (userId != null) {
            Set<String> sessions = userSessions.get(userId);
            if (sessions != null) {
                sessions.remove(sessionId);
                if (sessions.isEmpty()) {
                    userSessions.remove(userId);
                    System.out.println("WebSocket DISCONNECTED (last session): user=" + userId);
                } else {
                    System.out.println("WebSocket DISCONNECTED (partial): user=" + userId + ", remaining=" + sessions.size());
                }
            }
        } else {
            System.err.println("Could not find userId for disconnected sessionId=" + sessionId);
        }
    }

    @EventListener
    public void handleSessionSubscribe(SessionSubscribeEvent event) {
        Principal user = event.getUser();
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        String dest = sha.getDestination();

        System.out.println("WebSocket SUBSCRIBE: user=" + (user != null ? user.getName() : "null") + " destination=" + dest);
    }


}