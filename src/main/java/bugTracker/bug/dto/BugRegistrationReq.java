package bugTracker.bug.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BugRegistrationReq {

    @NotBlank(message = "Title is required")
    @Size(min = 2, message = "Title must be at least 2 characters")
    private String title;

    private String description;

    private String stepsToReproduce;

    private String environmentDetails;

    @NotBlank(message = "Bug Severity is required")
    @Pattern(regexp = "^(?i)(LOW|MEDIUM|HIGH|CRITICAL)$", message = "Bug Severity Must be 'LOW','MEDIUM','HIGH' or 'CRITICAL'")
    private String bugSeverity;
}

