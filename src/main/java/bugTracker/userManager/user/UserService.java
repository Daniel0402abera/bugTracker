package bugTracker.userManager.user;

import bugTracker.userManager.user.dto.UserRegistrationReq;
import bugTracker.userManager.user.dto.UserResponse;
import bugTracker.userManager.user.dto.UserUpdateReq;

import java.util.List;

public interface UserService {
    UserResponse register(UserRegistrationReq userReq);

    UserResponse me();

    List<UserResponse> getAllUsers();

    UserResponse editUser(UserUpdateReq updateReq);

    Users getUserByEmail(String email);

    Users getUserById(Long userId);
}
