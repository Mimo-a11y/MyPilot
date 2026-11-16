package devpilot.backend.entity;

import java.time.Instant;
import java.util.UUID;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
@Table(name = "users")
@Builder 
public class User {

    @Id 
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name="github_id", unique = true, nullable = false)
    private long githubId;

    @Column(name="github_username", unique = true, nullable = false, length= 255)
    private String githubUserName;

    @Column(name="display_name", nullable = false, length= 200)
    private String displayName;

    @Column(name="avatar_url", length= 500)
    private String avatarURL;

    @Column(name="access_token", nullable = false, columnDefinition = "TEXT")
    private String accessToken;

    @Column(name="token_scope", length= 500)
    private String tokenScopes;

    @Column(name="created_at", updatable= false)
    private Instant createdAt;

    @PrePersist 
    void onCreate() {
        if(createdAt == null){
            createdAt = Instant.now();

        }
    }
    
}
