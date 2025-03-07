package tn.arctic.nexus.entities.FinanceModule;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tn.arctic.nexus.entities.User;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Wallet implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long coinBalance;
    private String metamask_public_key;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @OneToOne
    private User user;
    @OneToMany(mappedBy = "wallet")
    private List<Payment> payments;
    @OneToMany(mappedBy = "wallet")
    private List<transfer> transfers;
    @OneToMany(mappedBy = "wallet")
    private List<Purchase> Purchase;


}
