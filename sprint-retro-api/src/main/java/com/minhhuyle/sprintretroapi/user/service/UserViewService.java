package com.minhhuyle.sprintretroapi.user.service;

import com.minhhuyle.sprintretroapi.user.dto.UserDTO;
import com.minhhuyle.sprintretroapi.user.model.Role;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import com.minhhuyle.sprintretroapi.user.service.dao.UserViewDao;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserViewService {

    private final UserViewDao userViewDao;

    public UserViewService(final UserViewDao userViewDao) {
        this.userViewDao = userViewDao;
    }

    public UserView createSimpleUser(final UserView userView) {
        if(userView.getUserName() == null || userView.getPassword() == null || userView.getId() != null) {
            throw new IllegalStateException("Cannot create user");
        }

        Optional<UserView> user = userViewDao.findByUserName(userView.getUserName().toLowerCase());
        if(user.isPresent()) {
            throw new IllegalStateException("Cannot create user");
        }

        userView.setUserName(userView.getUserName().toLowerCase());
        userView.setRole(Role.USER);
        return userViewDao.save(userView);
    }

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
        UserView userLogged = userViewDao.findByUserName(userDTO.getUserName().toLowerCase())
                .orElseThrow(() ->  new IllegalStateException("Cannot log in"));

        if(!userLogged.getPassword().equals(userDTO.getPassword())) {
            throw new IllegalStateException("Cannot log in");
        }

        return userLogged;
    }

}
