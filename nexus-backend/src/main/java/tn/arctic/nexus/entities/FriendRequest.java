package tn.arctic.nexus.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequest implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idFriendRequest;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recipient_id", nullable = false)
    private User recipient;


    @Temporal(TemporalType.DATE)
    private Date createdAt ;
    @Temporal(TemporalType.DATE)
    private Date updatedAt ;
    @Temporal(TemporalType.DATE)
    private Date deletedAt ;

    @Enumerated(EnumType.STRING)
    private StatusFriendRequest status;

}
