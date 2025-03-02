package tn.arctic.nexus.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notification implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idNotification;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private String message ;
    private boolean isRead ;
    private NotificationType notificationType;

}
