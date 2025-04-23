package tn.arctic.nexus.entities.FinanceModule;

public class WalletNotifications {
    private String userId;   // The ID of the user to whom the notification is sent
    private String message;  // The notification message

    // Getters and Setters
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
}
