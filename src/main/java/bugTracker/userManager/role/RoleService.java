package bugTracker.userManager.role;

import bugTracker.exceptions.customExceptions.ResourceNotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    // Retrieves all roles.
    public List<Role> getRoles() {
        return roleRepository.findAll(Sort.by(Sort.Direction.ASC, "roleId"));
    }

    // Retrieves a role by id.
    public Role getRoleById(Long roleId) {
        return roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));
    }

    public Role getRoleByRoleName(String roleName) {
        return roleRepository.findByRoleNameIgnoreCase(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));
    }

}
