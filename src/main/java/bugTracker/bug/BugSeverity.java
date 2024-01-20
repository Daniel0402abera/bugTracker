package bugTracker.bug;

import java.util.Arrays;

public enum BugSeverity {
    LOW, MEDIUM, HIGH, CRITICAL;

    public static BugSeverity getEnum(String bugSeverity) {
        try {
            return BugSeverity.valueOf(bugSeverity.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid bug severity. " + bugSeverity +
                    "Allowed values are: " + Arrays.toString(BugSeverity.values()));
        }
    }
}
