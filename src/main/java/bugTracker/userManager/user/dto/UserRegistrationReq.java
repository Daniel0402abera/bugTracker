package bugTracker.userManager.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRegistrationReq {

    @NotBlank(message = "Full name is required")
    @Size(min = 2, message = "Full name must be at least 2 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "password is required")
    @Size(min = 4, max = 6, message = "password must be between 6 and 20 characters")
    private String password;

    @NotBlank(message = "Role is required")
    @Pattern(regexp = "^(?i)(TESTER|DEVELOPER|ADMIN)$", message = "Role Must be 'ADMIN','DEVELOPER' or 'TESTER'")
    private String roleName;
}