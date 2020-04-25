package com.minhhuyle.sprintretroapi.config.security;

import com.minhhuyle.sprintretroapi.user.model.UserView;
import com.minhhuyle.sprintretroapi.user.service.dao.UserViewDao;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserViewDao userViewDao;

    public UserDetailsServiceImpl(final UserViewDao userViewDao) {
        this.userViewDao = userViewDao;
    }

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        UserView userView = userViewDao.findByUserName(username).orElseThrow(() -> {
            throw new UsernameNotFoundException(username);
        });

        // TODO: 22/04/2020 add encoder
        return  User.withDefaultPasswordEncoder().username(userView.getUserName()).password(userView.getPassword()).roles().build();
    }
}
