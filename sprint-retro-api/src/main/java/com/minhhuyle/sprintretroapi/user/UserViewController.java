package com.minhhuyle.sprintretroapi.user;

import com.minhhuyle.sprintretroapi.user.model.UserView;
import com.minhhuyle.sprintretroapi.user.service.UserViewService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserViewController {

    private final UserViewService userViewService;

    public UserViewController(final UserViewService userViewService) {
        this.userViewService = userViewService;
    }

    @PostMapping(value = "/user/log-in")
    @ResponseStatus(HttpStatus.OK)
    public UserView logIn(@RequestBody UserView userView) {
        return userViewService.createSimpleUser(userView);
    }

    @PostMapping(value = "/user/sign-up")
    public UserView signUp(@RequestBody UserView userView) {
        return userViewService.createSimpleUser(userView);
    }
}
