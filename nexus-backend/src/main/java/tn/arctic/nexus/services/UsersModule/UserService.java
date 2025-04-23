package tn.arctic.nexus.services.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;



    @Override
    public User authenticateUser(String email, String password) {
        // Recherche de l'utilisateur par email
        User user = userRepository.findByEmail(email);

        // Vérification si l'utilisateur existe
        if (user != null) {
            // Vérification du mot de passe en clair (pas de cryptage ici)
            if (password.equals(user.getPassword())) {
                return user;  // L'utilisateur est authentifié
            }
        }
        return null;  // Si l'authentification échoue
    }


    @Override
    public List<User> retrieveAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User retrieveUser(long idUser) {
        return userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + idUser));
    }


    @Override
    public void removeUser(long idUser) {
        userRepository.deleteById(idUser);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public List<User> getSupportAgents() {
        return userRepository.findAllSupportAgents();
    }

}
