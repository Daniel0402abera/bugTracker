package bugTracker.bug;

import bugTracker.bug.dto.BugRegistrationReq;
import bugTracker.bug.dto.BugResponse;

import java.util.List;

public interface BugService {
    BugResponse createBug(BugRegistrationReq bugRegistrationReq);

    BugResponse updateBug(Long id, Bug bug);

    BugResponse assignToUser(Long bugId, Long userId);

    BugResponse updateStatus(Long bugId, String status);

    BugResponse closeBug(Long bugId);
    BugResponse reOpenBug(Long bugId);

    List<BugResponse> getBugs(String status, String severity);

    Bug getBugById(Long id);

    void deleteBug(Long id);

}
