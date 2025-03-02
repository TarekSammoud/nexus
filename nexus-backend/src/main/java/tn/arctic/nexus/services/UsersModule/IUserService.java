package tn.arctic.nexus.services.UsersModule;

import tn.arctic.nexus.entities.Notification;
import tn.arctic.nexus.entities.User;

import java.util.List;

public interface IUserService {
    List<User> retrieveAllUser();
    User addUser (User users);
    User updateUser (User user);
    User retrieveUser(long idUser);
    void removeUser(long idUser);
}
