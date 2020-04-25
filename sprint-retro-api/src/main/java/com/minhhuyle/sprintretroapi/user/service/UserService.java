package com.minhhuyle.sprintretroapi.user.service;

import com.minhhuyle.sprintretroapi.theme.service.VotedPostItUserService;
import com.minhhuyle.sprintretroapi.user.dto.UserDTO;
import com.minhhuyle.sprintretroapi.user.model.Role;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import com.minhhuyle.sprintretroapi.user.service.dao.UserViewDao;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService {

    private final UserViewDao userViewDao;
    private final VotedPostItUserService votedPostItUserService;

    public UserService(final UserViewDao userViewDao, final VotedPostItUserService votedPostItUserService) {
        this.userViewDao = userViewDao;
        this.votedPostItUserService = votedPostItUserService;
    }

    public UserView createSimpleUser(final UserView userView) {
        if(userView.getUserName() == null || userView.getPassword() == null || userView.getId() != null) {
            throw new IllegalStateException("Cannot create user");
        }

        userViewDao.findByUserName(userView.getUserName().toLowerCase())
                .ifPresent(userValue -> {throw new IllegalStateException("Cannot create user");});

        userView.setUserName(userView.getUserName().toLowerCase());
        userView.setRole(Role.USER);
        return userViewDao.save(userView);
    }

    public UserView getUser(final UserDTO userDTO) {
        UserView user = getByUserName(userDTO);

        if(!user.getPassword().equals(userDTO.getPassword())) {
            throw new IllegalStateException("Cannot log in");
        }

        return user;
    }

    @Deprecated
    public UserView logIn(final UserView userView) {
        Optional<UserView> userOpt = userViewDao.findByUserName(userView.getUserName().toLowerCase());
        if(userOpt.isEmpty()) {
            throw new IllegalStateException("Cannot log in");
        }

        UserView user = userOpt.get();
        if(!user.getPassword().equals(userView.getPassword())) {
            throw new IllegalStateException("Cannot log in");
        }

        return user;
    }

    public UserView logIn(final UserDTO userDTO) {
        UserView userLogged = getByUserName(userDTO);

        if(!userLogged.getPassword().equals(userDTO.getPassword())) {
            throw new IllegalStateException("Cannot log in");
        }
        return userLogged;
    }

    public void resetUserVote(final Long id) {
        UserView user = userViewDao.findById(id).orElseThrow(() -> new IllegalStateException("State not allowed something is wrong"));
        votedPostItUserService.deleteAllAndNotifySockets(new ArrayList<>(user.getVotedLink()));
    }

    private UserView getByUserName(final UserDTO userDTO) {
        return userViewDao.findByUserName(userDTO.getUserName().toLowerCase())
                .orElseThrow(() -> {throw new IllegalStateException("User not found");});
    }
}
