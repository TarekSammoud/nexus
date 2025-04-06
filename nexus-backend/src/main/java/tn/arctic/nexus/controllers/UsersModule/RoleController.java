package tn.arctic.nexus.controllers.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Role;
import tn.arctic.nexus.services.UsersModule.IRoleService;

@RestController
@RequestMapping("/role")
public class RoleController {
    @Autowired
    private IRoleService roleService;



    @PostMapping("/addRole")
    public Role addUser(@RequestBody Role r) {
        return  roleService.addUserRole(r);
    }
}
