package com.minhhuyle.sprintretroapi.user.service;

import com.minhhuyle.sprintretroapi.theme.service.VotedPostItUserService;
import com.minhhuyle.sprintretroapi.user.dto.UserDTO;
import com.minhhuyle.sprintretroapi.user.model.Role;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import com.minhhuyle.sprintretroapi.user.service.dao.UserViewDao;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserViewDao userViewDao;
    private final VotedPostItUserService votedPostItUserService;

    public UserService(final UserViewDao userViewDao, final VotedPostItUserService votedPostItUserService) {
        this.userViewDao = userViewDao;
        this.votedPostItUserService = votedPostItUserService;
    }

    public UserView getUser(final String userName) {
        return userViewDao.findByUserName(userName).orElseThrow(() -> new IllegalStateException("State not allowed something is wrong"));
    }

    public Optional<UserView> findUser(final String userName) {
        return userViewDao.findByUserName(userName);
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

    public void resetUserVote(final String userName) {
        UserView user = userViewDao.findByUserName(userName).orElseThrow(() -> new IllegalStateException("State not allowed something is wrong"));
        votedPostItUserService.deleteAllAndNotifySockets(new ArrayList<>(user.getVotedLink()));
    }

    private UserView getByUserName(final UserDTO userDTO) {
        return userViewDao.findByUserName(userDTO.getUserName().toLowerCase())
                .orElseThrow(() -> {throw new IllegalStateException("User not found");});
    }

    public List<UserView> getUsers() {
        return (List<UserView>) userViewDao.findAll();
    }

    public UserView save(final UserView userView) {
        return userViewDao.save(userView);
    }
}
