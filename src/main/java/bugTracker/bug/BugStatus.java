package bugTracker.bug;

import java.util.Arrays;

public enum BugStatus {
    OPEN, ASSIGNED, IN_PROGRESS, IN_TEST, RESOLVED, CLOSED;

    public static BugStatus getEnum(String bugStatus) {
        try {
            return BugStatus.valueOf(bugStatus.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid bug status. "+
                    "Allowed values are: " + Arrays.toString(BugStatus.values()));
        }
    }
}
