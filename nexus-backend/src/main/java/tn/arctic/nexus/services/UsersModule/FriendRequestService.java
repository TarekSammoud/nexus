package tn.arctic.nexus.services.UsersModule;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.entities.StatusFriendRequest;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IFriendRequestRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FriendRequestService implements IFriendRequestService{

    @Autowired
    private IFriendRequestRepository friendRequestRepository;

    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<FriendRequest> retrieveAllFriendRequest() {
        return friendRequestRepository.findAll();
    }

    @Override
    public FriendRequest envoyerFriendRequest(FriendRequest friendRequest) {
        // Récupérer les vrais objets User depuis la BDD à partir des IDs
        Long senderId = friendRequest.getSender().getId();
        Long recipientId = friendRequest.getRecipient().getId();


        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found with id: " + senderId));

        User recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new RuntimeException("Recipient not found with id: " + recipientId));

        // Mettre à jour les relations avec les objets complets
        friendRequest.setSender(sender);
        friendRequest.setRecipient(recipient);
        friendRequest.setStatus(StatusFriendRequest.PENDING);


        return friendRequestRepository.save(friendRequest);
    }

    @Override
    public FriendRequest updateFriendRequest(FriendRequest fr) {
        return friendRequestRepository.save(fr);
    }

    @Override
    public FriendRequest retrieveFriendRequest(long idFriendRequest) {
        return friendRequestRepository.findById(idFriendRequest).get();
    }

    @Override
    public void removeFriendRequest(long idFriendRequest) {
        friendRequestRepository.deleteById(idFriendRequest);
    }

    @Override
    public List<User> findAvailablePlayersForFriendRequest(Long id) {
        return userRepository.findAvailablePlayersForFriendRequest(id);
    }



    @Transactional
    public List<FriendRequest> getReceivedFriendRequests(Long userId) {
        // Récupérer toutes les demandes d'amis où l'utilisateur est le destinataire et que le statut est PENDING
        return friendRequestRepository.findByRecipientIdAndStatus(userId, StatusFriendRequest.PENDING);
    }
    @Override
    public FriendRequest acceptRequest(Long requestId) {
        FriendRequest friendRequest = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("FriendRequest not found"));

        friendRequest.setStatus(StatusFriendRequest.ACCEPTED);



        // Sauvegarder la mise à jour du FriendRequest
        friendRequestRepository.save(friendRequest);

        return friendRequest;  // Retourner la demande d'ami mise à jour
    }


    @Override
    public boolean rejectRequest(Long requestId) {
        return friendRequestRepository.findById(requestId).map(request -> {
            request.setStatus(StatusFriendRequest.REJECTED);
            friendRequestRepository.save(request);
            return true;
        }).orElse(false);
    }

// ML
    @Override
    public List<User> recommendFriends(Long userId) {
        List<Long> myFriends = friendRequestRepository.findAcceptedFriendIds(userId);
        Set<Long> suggestedIds = new HashSet<>();

        for (Long friendId : myFriends) {
            List<Long> friendsOfFriend = friendRequestRepository.findAcceptedFriendIds(friendId);
            for (Long foafId : friendsOfFriend) {
                if (!foafId.equals(userId) && !myFriends.contains(foafId)) {
                    suggestedIds.add(foafId);
                }
            }
        }

        return userRepository.findAllById(suggestedIds);
    }

    public Map<User, Long> getRecommendedUsersWithMutualCount(Long userId) {
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 1. Amis actuels (requêtes acceptées)
        List<FriendRequest> currentFriendRequests = friendRequestRepository.findAcceptedFriends(userId, StatusFriendRequest.ACCEPTED);

        // Convertir en liste d'amis (User)
        Set<User> currentFriends = currentFriendRequests.stream()
                .map(fr -> fr.getSender().getId().equals(userId) ? fr.getRecipient() : fr.getSender())
                .collect(Collectors.toSet());

        // 2. Tous les utilisateurs
        List<User> allUsers = userRepository.findAll();

        Map<User, Long> recommendations = new HashMap<>();

        for (User potential : allUsers) {
            if (potential.getId().equals(userId)) continue;  // Ne pas recommander soi-même
            if (currentFriends.contains(potential)) continue;  // Ne pas recommander ses propres amis

            // Obtenir les amis du potentiel
            List<FriendRequest> potentialFriendRequests = friendRequestRepository.findAcceptedFriends(potential.getId(), StatusFriendRequest.ACCEPTED);
            Set<User> potentialFriends = potentialFriendRequests.stream()
                    .map(fr -> fr.getSender().getId().equals(potential.getId()) ? fr.getRecipient() : fr.getSender())
                    .collect(Collectors.toSet());

            // Comptabiliser les amis en commun
            long mutualCount = currentFriends.stream()
                    .filter(potentialFriends::contains)
                    .count();

            if (mutualCount > 0) {
                recommendations.put(potential, mutualCount);
            }
        }

        // Recommandation par fallback si aucune correspondance
        if (recommendations.isEmpty()) {
            List<User> suggestedUsers = userRepository.findTopUsersByActivity();  // À implémenter
            for (User user : suggestedUsers) {
                if (!user.getId().equals(userId)) {  // Toujours éviter soi-même
                    recommendations.put(user, 0L);
                }
            }
        }

        return recommendations.entrySet().stream()
                .sorted(Map.Entry.<User, Long>comparingByValue().reversed())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }


    @Override
    public void removeFriendship(Long userId1, Long userId2) {
        // Trouver les deux demandes d'amis acceptées entre ces deux utilisateurs
        FriendRequest request1 = friendRequestRepository.findBySenderIdAndRecipientIdAndStatus(userId1, userId2, StatusFriendRequest.ACCEPTED);
        FriendRequest request2 = friendRequestRepository.findBySenderIdAndRecipientIdAndStatus(userId2, userId1, StatusFriendRequest.ACCEPTED);

        if (request1 != null) {
            friendRequestRepository.delete(request1);
        }

        if (request2 != null) {
            friendRequestRepository.delete(request2);
        }
    }



}
