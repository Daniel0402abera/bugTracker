package bugTracker.bug.bugHistory;

import bugTracker.bug.Bug;
import bugTracker.userManager.user.Users;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BugHistoryServiceImpl implements BugHistoryService {

    private final BugHistoryRepository bugHistoryRepository;

    public BugHistoryServiceImpl(BugHistoryRepository bugHistoryRepository) {
        this.bugHistoryRepository = bugHistoryRepository;
    }

    @Override
    public BugHistory addBugHistory(Bug bug, BugAction action, Users user) {
        BugHistory bugHistory = new BugHistory(bug, action, user);
        return bugHistoryRepository.save(bugHistory);
    }

    @Override
    public List<BugHistoryResponse> getBugHistoryByBugId(Long bugId) {
        List<BugHistory> bugHistories = bugHistoryRepository.findByBugBugIdOrderByTimestampDesc(bugId);

        return bugHistories.stream()
                .map(BugHistoryResponse::toResponse)
                .toList();
    }
}
