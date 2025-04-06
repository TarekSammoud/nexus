package tn.arctic.nexus.services.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Role;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IRoleRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.util.List;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository roleRepository;



    @Override
    public Role addUserRole(Role role) {
        return roleRepository.save(role);
    }
}
