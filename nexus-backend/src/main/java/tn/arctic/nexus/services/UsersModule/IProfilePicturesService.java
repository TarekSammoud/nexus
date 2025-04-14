package tn.arctic.nexus.services.UsersModule;

import tn.arctic.nexus.entities.ProfilePictures;

import java.util.List;
import java.util.Optional;

public interface IProfilePicturesService {
    List<ProfilePictures> retrieveAllProfilePictures(long iduser);
    ProfilePictures addProfilePictures (ProfilePictures ProfilePicturess);
    ProfilePictures updateProfilePictures (ProfilePictures nf);
    Optional<ProfilePictures> retrieveProfilePictures(long idProfilePictures);
    void removeProfilePictures(long idProfilePictures);

}
