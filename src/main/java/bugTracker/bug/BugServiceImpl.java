package bugTracker.bug;

import bugTracker.bug.bugHistory.BugAction;
import bugTracker.bug.bugHistory.BugHistoryService;
import bugTracker.bug.dto.BugRegistrationReq;
import bugTracker.bug.dto.BugResponse;
import bugTracker.exceptions.customExceptions.ForbiddenException;
import bugTracker.exceptions.customExceptions.ResourceAlreadyExistsException;
import bugTracker.exceptions.customExceptions.ResourceNotFoundException;
import bugTracker.userManager.user.UserService;
import bugTracker.userManager.user.Users;
import bugTracker.utils.CurrentlyLoggedInUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class BugServiceImpl implements BugService {
    private final BugRepository bugRepository;
    private final UserService userService;
    private final BugHistoryService bugHistoryService;
    private final CurrentlyLoggedInUser inUser;

    public BugServiceImpl(BugRepository bugRepository, UserService userService, BugHistoryService bugHistoryService, CurrentlyLoggedInUser inUser) {
        this.bugRepository = bugRepository;
        this.userService = userService;
        this.bugHistoryService = bugHistoryService;
        this.inUser = inUser;
    }

    @Override
    @Transactional
    public BugResponse createBug(BugRegistrationReq bugRegistrationReq) {
        Users user = inUser.getUser();

        Bug bug = new Bug();
        bug.setTitle(bugRegistrationReq.getTitle());
        bug.setDescription(bugRegistrationReq.getDescription());
        bug.setStepsToReproduce(bugRegistrationReq.getStepsToReproduce());
        bug.setEnvironmentDetails(bugRegistrationReq.getEnvironmentDetails());
        bug.setSeverity(BugSeverity.getEnum(bugRegistrationReq.getBugSeverity()));
        bug.setStatus(BugStatus.OPEN);
        bug.setCreatedBy(user);

        bug = bugRepository.save(bug);
        bugHistoryService.addBugHistory(bug, BugAction.BUG_CREATED, user);

        return BugResponse.toResponse(bug);
    }

    @Override
    public BugResponse updateBug(Long id, Bug bug) {
        Bug existingBug = getBugById(id);

        // Update fields if the provided values are not null
        if (bug.getTitle() != null)
            existingBug.setTitle(bug.getTitle());

        if (bug.getDescription() != null)
            existingBug.setDescription(bug.getDescription());

        if (bug.getStepsToReproduce() != null)
            existingBug.setStepsToReproduce(bug.getStepsToReproduce());

        if (bug.getEnvironmentDetails() != null)
            existingBug.setEnvironmentDetails(bug.getEnvironmentDetails());

        if (bug.getSeverity() != null)
            existingBug.setSeverity(bug.getSeverity());

        existingBug = bugRepository.save(existingBug);
        bugHistoryService.addBugHistory(existingBug, BugAction.BUG_UPDATED, inUser.getUser());

        return BugResponse.toResponse(existingBug);
    }

    @Override
    public BugResponse assignToUser(Long bugId, Long userId) {
        Bug bug = getBugById(bugId);
        if (bug.getAssignedUser() != null)
            throw new ResourceAlreadyExistsException(
                    "This bug is already assigned to " + bug.getAssignedUser().getFullName()
            );

        Users assignedUser = userService.getUserById(userId);
        bug.setAssignedUser(assignedUser);
        bug.setStatus(BugStatus.ASSIGNED);

        bug = bugRepository.save(bug);
        bugHistoryService.addBugHistory(bug, BugAction.ASSIGNEE_CHANGED, inUser.getUser());

        return BugResponse.toResponse(bug);
    }

    @Override
    public BugResponse updateStatus(Long bugId, String status) {
        Bug bug = getBugById(bugId);
        Users loggedInUser = inUser.getUser();

        // Check if the bug is assigned to the logged-in user
        if (!Objects.equals(bug.getAssignedUser(), loggedInUser))
            throw new IllegalArgumentException("This bug is not assigned to you. You are not authorized to update its status.");

        // Check if the bug status is CLOSED
        if (bug.getStatus() == BugStatus.CLOSED)
            throw new IllegalStateException("This bug is already closed. Please create a new bug for any further updates.");

        // Allowed status values
        Set<String> allowedStatusValues = Set.of("IN_PROGRESS", "IN_TEST", "RESOLVED");

        // Validate if the provided status is one of the allowed values
        if (allowedStatusValues.contains(status.toUpperCase())) {
            bug.setStatus(BugStatus.valueOf(status.toUpperCase()));
            bug = bugRepository.save(bug);

            BugAction action = status.equalsIgnoreCase("RESOLVED") ?
                    BugAction.BUG_RESOLVED : BugAction.STATUS_CHANGED;

            bugHistoryService.addBugHistory(bug, action, inUser.getUser());
            return BugResponse.toResponse(bug);
        } else {
            throw new IllegalArgumentException("Invalid status. Allowed values are: " +
                    String.join(", ", allowedStatusValues));
        }
    }

    @Override
    public BugResponse closeBug(Long bugId) {
        Bug bug = getBugById(bugId);

        bug.setStatus(BugStatus.CLOSED);
        bug = bugRepository.save(bug);

        bugHistoryService.addBugHistory(bug, BugAction.BUG_CLOSED, inUser.getUser());

        return BugResponse.toResponse(bug);
    }

    @Override
    public BugResponse reOpenBug(Long bugId) {
        Bug bug = getBugById(bugId);

        // Check if the bug status is CLOSED
        if (bug.getStatus() != BugStatus.CLOSED)
            throw new IllegalStateException("This bug can only be reopened if it is in a closed state.");

        bug.setStatus(BugStatus.OPEN);
        bug.setAssignedUser(null);
        bug = bugRepository.save(bug);

        bugHistoryService.addBugHistory(bug, BugAction.BUG_REOPENED, inUser.getUser());

        return BugResponse.toResponse(bug);
    }

    @Override
    public List<BugResponse> getBugs(String status, String severity) {
        List<Bug> bugs;

        if (status == null && severity == null)
            bugs = bugRepository.findAll();
        else if (status != null && severity != null)
            bugs = bugRepository.findByStatusAndSeverity(BugStatus.getEnum(status), BugSeverity.getEnum(severity));
        else if (status != null)
            bugs = bugRepository.findByStatus(BugStatus.getEnum(status));
        else
            bugs = bugRepository.findBySeverity(BugSeverity.getEnum(severity));

        return bugs.stream().map(BugResponse::toResponse).toList();
    }

    @Override
    public Bug getBugById(Long id) {
        return bugRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bug not found with id: " + id));
    }

    @Override
    public void deleteBug(Long id) {
        getBugById(id);
        bugRepository.deleteById(id);
    }
}
