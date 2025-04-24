package tn.arctic.nexus.entities;

public class GitHubCodeRequest {
    private String code;

    // ✅ Constructeur par défaut requis pour la désérialisation
    public GitHubCodeRequest() {}

    // ✅ Getter
    public String getCode() {
        return code;
    }

    // ✅ Setter
    public void setCode(String code) {
        this.code = code;
    }
}
