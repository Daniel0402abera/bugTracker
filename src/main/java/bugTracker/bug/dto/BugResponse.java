package bugTracker.bug.dto;

import bugTracker.bug.Bug;
import bugTracker.bug.BugSeverity;
import bugTracker.bug.BugStatus;
import bugTracker.userManager.user.dto.UserResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BugResponse {

    private Long bugId;
    private String title;
    private String description;
    private String stepsToReproduce;
    private String environmentDetails;
    private BugSeverity severity;
    private BugStatus status;
    private UserResponse createdBy;
    private UserResponse assignedUser;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BugResponse toResponse(Bug bug) {

        UserResponse creator = UserResponse.miniToResponse(bug.getCreatedBy());

        UserResponse assignedDeveloper = null;
        if (bug.getAssignedUser() != null)
            assignedDeveloper = UserResponse.miniToResponse(bug.getAssignedUser());

        return BugResponse.builder()
                .bugId(bug.getBugId())
                .title(bug.getTitle())
                .description(bug.getDescription())
                .stepsToReproduce(bug.getStepsToReproduce())
                .environmentDetails(bug.getEnvironmentDetails())
                .severity(bug.getSeverity())
                .status(bug.getStatus())
                .createdBy(creator)
                .assignedUser(assignedDeveloper)
                .createdAt(bug.getCreatedAt())
                .updatedAt(bug.getUpdatedAt())
                .build();
    }
}
