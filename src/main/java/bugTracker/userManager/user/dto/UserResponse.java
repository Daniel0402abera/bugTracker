package bugTracker.userManager.user.dto;

import bugTracker.userManager.user.Users;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {

    private Long userId;
    private String fullName;
    private String email;
    private String role;
    private LocalDateTime lastLoggedIn;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static UserResponse toResponse(Users user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getUsername())
                .role(user.getRole().getRoleName())
                .lastLoggedIn(user.getLastLoggedIn())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public static UserResponse miniToResponse(Users user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getUsername())
                .role(user.getRole().getRoleName())
                .build();
    }
}
