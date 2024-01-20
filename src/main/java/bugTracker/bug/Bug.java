package bugTracker.bug;

import bugTracker.userManager.user.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Entity
@Table(name = "bugs")
@SQLDelete(sql = "UPDATE bugs SET deleted = true WHERE bug_Id=?")
@Where(clause = "deleted=false")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bug {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bug_Id")
    private Long bugId;

    @Column(name = "bug_title")
    private String title;

    @Column(name = "bug_description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "steps_to_reproduce")
    private String stepsToReproduce;

    @Column(name = "environment_details")
    private String environmentDetails;

    @Enumerated(EnumType.STRING)
    @Column(name = "bug_severity")
    private BugSeverity severity;

    @Enumerated(EnumType.STRING)
    @Column(name = "bug_status")
    private BugStatus status;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private Users createdBy;

    @ManyToOne
    @JoinColumn(name = "assigned_developer_id")
    private Users assignedUser;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted")
    private boolean deleted;
}

