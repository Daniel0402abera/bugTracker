package bugTracker.userManager.user;

import bugTracker.exceptions.customExceptions.ForbiddenException;
import bugTracker.exceptions.customExceptions.ResourceAlreadyExistsException;
import bugTracker.exceptions.customExceptions.ResourceNotFoundException;
import bugTracker.userManager.role.Role;
import bugTracker.userManager.role.RoleService;
import bugTracker.userManager.user.dto.UserRegistrationReq;
import bugTracker.userManager.user.dto.UserResponse;
import bugTracker.userManager.user.dto.UserUpdateReq;
import bugTracker.utils.CurrentlyLoggedInUser;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@CacheConfig(cacheNames = "user")
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final CurrentlyLoggedInUser inUser;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    @CacheEvict(allEntries = true)
    public UserResponse register(UserRegistrationReq userReq) {
        Users loggedInUser = inUser.getUser();

        if (!loggedInUser.getRole().getRoleName().equalsIgnoreCase("ADMIN"))
            throw new ForbiddenException("Access Denied: Only administrators are authorized to create new users.");

        if (userRepository.findByUsername(userReq.getEmail()).isPresent())
            throw new ResourceAlreadyExistsException("Email is already taken");

        Role role = roleService.getRoleByRoleName(userReq.getRoleName());

        Users user = Users.builder()
                .username(userReq.getEmail())
                .fullName(userReq.getFullName())
                .password(passwordEncoder.encode(userReq.getPassword()))
                .role(role)
                .build();

        user = userRepository.save(user);
        return UserResponse.toResponse(user);
    }

    @Override
    @Transactional
    @CacheEvict(allEntries = true)
    public UserResponse editUser(UserUpdateReq updateReq) {
        Users user = inUser.getUser();

        if (updateReq.getFullName() != null)
            user.setFullName(updateReq.getFullName());

        // use email as username
        // Update it if provided email is different from the current email
        if (updateReq.getEmail() != null && !user.getUsername().equals(updateReq.getEmail())) {
            // Check if the new Phone Number is already taken
            if (userRepository.findByUsername(updateReq.getEmail()).isPresent())
                throw new ResourceAlreadyExistsException("Email is already taken");

            user.setUsername(updateReq.getEmail());
        }

        user = userRepository.save(user);
        return UserResponse.toResponse(user);
    }

    @Override
    public Users getUserByEmail(String email) {
        return userRepository.findByUsername(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
    }

    @Override
    public Users getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
    }

    @Override
    public UserResponse me() {
        Users user = inUser.getUser();
        return UserResponse.toResponse(user);
    }

    @Override
    @Cacheable
    public List<UserResponse> getAllUsers() {
        List<Users> users = userRepository.findAll(Sort.by(Sort.Order.asc("userId")));
        return users.stream().
                map(UserResponse::toResponse).
                toList();
    }
}
