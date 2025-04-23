package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Msg {

    @JsonProperty("userId")
    private String userId;


    private String message;

    private String roomId;
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }
}

