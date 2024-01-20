package bugTracker.bug.bugHistory;

import bugTracker.bug.Bug;
import bugTracker.userManager.user.Users;

import java.util.List;

public interface BugHistoryService {

    BugHistory addBugHistory(Bug bug, BugAction action, Users user);

    List<BugHistoryResponse> getBugHistoryByBugId(Long bugId);
}

