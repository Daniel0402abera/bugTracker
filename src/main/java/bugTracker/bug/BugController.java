package bugTracker.bug;

import bugTracker.bug.bugHistory.BugHistoryResponse;
import bugTracker.bug.bugHistory.BugHistoryService;
import bugTracker.bug.dto.BugRegistrationReq;
import bugTracker.bug.dto.BugResponse;
import bugTracker.utils.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bugs")
@Tag(name = "Bug API.")
public class BugController {

    private final BugService bugService;
    private final BugHistoryService bugHistoryService;

    public BugController(BugService bugService, BugHistoryService bugHistoryService) {
        this.bugService = bugService;
        this.bugHistoryService = bugHistoryService;
    }

    @GetMapping
    public ResponseEntity<List<BugResponse>> getAllUsers(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String severity) {
        return ResponseEntity.ok(bugService.getBugs(status, severity));
    }

    @GetMapping("/{bugId}/histories")
    public ResponseEntity<List<BugHistoryResponse>> getAllUsers(@PathVariable Long bugId) {
        return ResponseEntity.ok(bugHistoryService.getBugHistoryByBugId(bugId));
    }

    @PostMapping
    public ResponseEntity<BugResponse> createBug(@RequestBody @Valid BugRegistrationReq bugRegistrationReq) {
        BugResponse user = bugService.createBug(bugRegistrationReq);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/{bugId}")
    public ResponseEntity<BugResponse> editUser(@PathVariable Long bugId, @RequestBody Bug bug) {
        return ResponseEntity.ok(bugService.updateBug(bugId, bug));
    }

    @PutMapping("/{bugId}/assign/{userId}")
    public ResponseEntity<BugResponse> assignToUser(@PathVariable Long bugId, @PathVariable Long userId) {
        return ResponseEntity.ok(bugService.assignToUser(bugId, userId));
    }

    @PutMapping("/{bugId}/update-status")
    public ResponseEntity<BugResponse> updateStatus(@PathVariable Long bugId, @RequestParam String status) {
        return ResponseEntity.ok(bugService.updateStatus(bugId, status));
    }

    @PutMapping("/{bugId}/close")
    public ResponseEntity<BugResponse> closeBug(@PathVariable Long bugId) {
        return ResponseEntity.ok(bugService.closeBug(bugId));
    }

    @PutMapping("/{bugId}/re-open")
    public ResponseEntity<BugResponse> reOpenBug(@PathVariable Long bugId) {
        return ResponseEntity.ok(bugService.reOpenBug(bugId));
    }

    @DeleteMapping("/{bugId}")
    public ResponseEntity<ApiResponse> deleteMember(@PathVariable Long bugId) {
        bugService.deleteBug(bugId);
        return ApiResponse.success("BugHistory Deleted Successfully");
    }
}


