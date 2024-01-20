package bugTracker.bug.bugHistory;

import bugTracker.userManager.user.dto.UserResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BugHistoryResponse {
    private Long id;
    private String action;
    private UserResponse doneBy;
    private LocalDateTime timestamp;

    public static BugHistoryResponse toResponse(BugHistory bugHistory) {

        UserResponse doer = UserResponse.miniToResponse(bugHistory.getDoneBy());

        return BugHistoryResponse.builder()
                .id(bugHistory.getId())
                .action(bugHistory.getAction())
                .doneBy(doer)
                .timestamp(bugHistory.getTimestamp())
                .build();
    }

}
