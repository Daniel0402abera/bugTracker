package bugTracker.bug.bugHistory;

import bugTracker.bug.Bug;
import bugTracker.userManager.user.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "bug_Histories")
@Data
@NoArgsConstructor
public class BugHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bug_history_Id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bug_id", nullable = false)
    @JsonIgnore
    private Bug bug;

    private String action;

    @ManyToOne
    @JoinColumn(name = "doer_id")
    private Users doneBy;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime timestamp;

    public BugHistory(Bug bug, BugAction action, Users user) {
        this.bug = bug;
        this.action = action.getDescription();
        this.doneBy = user;
    }
}

