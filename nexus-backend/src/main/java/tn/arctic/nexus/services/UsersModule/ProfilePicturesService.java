package tn.arctic.nexus.services.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.ProfilePictures;
import tn.arctic.nexus.repositories.UsersModule.IProfilePicturesRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProfilePicturesService implements IProfilePicturesService {

    @Autowired
    private IProfilePicturesRepository profilePicturesRepository;  // correction du nom de la variable

    @Override
    public List<ProfilePictures> retrieveAllProfilePictures(long userId) {  // correction du paramètre
        return profilePicturesRepository.findAllById(Collections.singleton(userId));  // correction du paramètre
    }

    @Override
    public ProfilePictures addProfilePictures(ProfilePictures profilePicture) {  // correction du paramètre
        return profilePicturesRepository.save(profilePicture);  // correction du paramètre
    }

    @Override
    public ProfilePictures updateProfilePictures(ProfilePictures profilePicture) {  // correction du paramètre
        return profilePicturesRepository.save(profilePicture);  // correction du paramètre
    }

    @Override
    public Optional<ProfilePictures> retrieveProfilePictures(long profilePictureId) {  // correction du paramètre
        return profilePicturesRepository.findById(profilePictureId);  // correction du paramètre
    }

    @Override
    public void removeProfilePictures(long profilePictureId) {  // correction du paramètre
        profilePicturesRepository.deleteById(profilePictureId);  // correction du paramètre
    }
}
