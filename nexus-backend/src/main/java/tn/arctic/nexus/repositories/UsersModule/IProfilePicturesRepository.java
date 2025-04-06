package tn.arctic.nexus.repositories.UsersModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.ProfilePictures;
import tn.arctic.nexus.entities.Role;

public interface IProfilePicturesRepository extends JpaRepository<ProfilePictures,Long> {
    ProfilePictures findByUserId(Long userId);

}
