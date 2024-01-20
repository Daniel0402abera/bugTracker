package bugTracker.bug;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BugRepository extends JpaRepository<Bug, Long> {
    List<Bug> findByStatus(BugStatus status);

    List<Bug> findBySeverity(BugSeverity severity);

    List<Bug> findByStatusAndSeverity(BugStatus status, BugSeverity severity);
}
