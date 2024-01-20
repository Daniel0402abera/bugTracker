package bugTracker.userManager.account;

import bugTracker.userManager.account.dto.ChangePassword;
import bugTracker.userManager.account.dto.ResetPassword;
import bugTracker.utils.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AccountService {

    ResponseEntity<ApiResponse> changePassword(ChangePassword changePassword);

    ResponseEntity<ApiResponse> resetPassword(String phoneNumber, ResetPassword resetPassword);

}
