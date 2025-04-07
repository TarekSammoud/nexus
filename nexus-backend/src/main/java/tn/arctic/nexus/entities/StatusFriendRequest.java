package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonValue;

public enum StatusFriendRequest {
    @JsonValue
    PENDING,
    ACCEPTED,
    REJECTED
}
