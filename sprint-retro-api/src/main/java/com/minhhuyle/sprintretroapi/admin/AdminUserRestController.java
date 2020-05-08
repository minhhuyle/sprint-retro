package com.minhhuyle.sprintretroapi.admin;

import com.minhhuyle.sprintretroapi.admin.service.AdminViewService;
import com.minhhuyle.sprintretroapi.user.dto.UserDTO;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
    public UserView signUp(@AuthenticationPrincipal UserDetails authenticatedUser, @RequestBody UserDTO userDTO) {
        boolean isOk = adminViewService.authentication(authenticatedUser.getUsername());
        if(!isOk) {
            throw new IllegalStateException("Not allowed");
        }

        return adminViewService.createSimpleUser(userDTO);
    }


}
