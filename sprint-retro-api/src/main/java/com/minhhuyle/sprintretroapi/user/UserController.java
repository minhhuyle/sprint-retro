package com.minhhuyle.sprintretroapi.user;

import com.minhhuyle.sprintretroapi.user.dto.UserDTO;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import com.minhhuyle.sprintretroapi.user.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public UserView getUserInfo(@AuthenticationPrincipal UserDetails authenticatedUser) {
        return userService.getUser(authenticatedUser.getUsername());
    }

    @PostMapping(value = "/log-in")
    public UserView logIn(@RequestBody UserDTO userDTO) {
        return userService.logIn(userDTO);
    }

    @PostMapping(value = "/reset/vote")
    public void resetUserVote(@AuthenticationPrincipal UserDetails authenticatedUser) {
        userService.resetUserVote(authenticatedUser.getUsername());
    }
}
