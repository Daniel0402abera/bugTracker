package bugTracker.bug.bugHistory;

public enum BugAction {
    BUG_CREATED("Bug Created"),
    BUG_UPDATED("Bug Updated"),
    STATUS_CHANGED("Status Changed"),
    ASSIGNEE_CHANGED("Assignee Changed"),
    BUG_RESOLVED("Bug Resolved"),
    BUG_REOPENED("Bug Reopened"),
    BUG_CLOSED("Bug Closed");

    private final String description;

    BugAction(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
