package com.minhhuyle.sprintretroapi.admin;

import com.minhhuyle.sprintretroapi.admin.service.AdminViewService;
import com.minhhuyle.sprintretroapi.user.dto.UserDTO;
import com.minhhuyle.sprintretroapi.user.model.Role;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping("/admin")
public class AdminUserRestController {

    private final AdminViewService adminViewService;

    public AdminUserRestController(final AdminViewService adminViewService) {
        this.adminViewService = adminViewService;
    }

    @GetMapping("/users")
    public List<UserDTO> saveTheme(@AuthenticationPrincipal UserDetails authenticatedUser) {
        boolean isOk = adminViewService.authentication(authenticatedUser.getUsername());
        if(!isOk) {
            throw new IllegalStateException("Not allowed");
        }

        return adminViewService.getUsers();
    }

    @PostMapping(value = "/user")
    public UserDTO createUser(@AuthenticationPrincipal UserDetails authenticatedUser, @RequestBody UserDTO userDTO) {
        boolean isOk = adminViewService.authentication(authenticatedUser.getUsername());
        if(!isOk) {
            throw new IllegalStateException("Not allowed");
        }

        return UserDTO.extractFrom(adminViewService.createUser(userDTO));
    }

    @PutMapping(value = "/user")
    public UserDTO updateUser(@AuthenticationPrincipal UserDetails authenticatedUser, @RequestBody UserDTO userDTO) {
        boolean isOk = adminViewService.authentication(authenticatedUser.getUsername());
        if(!isOk) {
            throw new IllegalStateException("Not allowed");
        }

        UserView userUpdated = adminViewService.updateUser(userDTO);
        return UserDTO.extractFrom(userUpdated);
    }

    @GetMapping(value = "/user/roles")
    public List<Role> getRoles(@AuthenticationPrincipal UserDetails authenticatedUser) {
        boolean isOk = adminViewService.authentication(authenticatedUser.getUsername());
        if(!isOk) {
            throw new IllegalStateException("Not allowed");
        }

        return Arrays.asList(Role.values());
    }
}
