package com.minhhuyle.sprintretroapi.user;

import com.minhhuyle.sprintretroapi.user.dto.UserDTO;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import com.minhhuyle.sprintretroapi.user.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserView getUserInfo(@RequestBody UserDTO userDTO) {
        return userService.getUser(userDTO);
    }

    @PostMapping(value = "/log-in")
    public UserView logIn(@RequestBody UserDTO userDTO) {
        return userService.logIn(userDTO);
    }

    @PostMapping(value = "/sign-up")
    public UserView signUp(@RequestBody UserView userView) {
        return userService.createSimpleUser(userView);
    }

    @PostMapping(value = "/reset/vote")
    public void resetUserVote(@RequestBody UserDTO userDTO) {
        userService.resetUserVote(userDTO.getId());
    }
}
