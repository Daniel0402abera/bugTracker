package bugTracker.bug.bugHistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BugHistoryRepository extends JpaRepository<BugHistory, Long> {
    List<BugHistory> findByBugBugIdOrderByTimestampDesc(Long bugId);
}
