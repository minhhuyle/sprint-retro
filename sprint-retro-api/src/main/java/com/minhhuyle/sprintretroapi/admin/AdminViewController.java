package com.minhhuyle.sprintretroapi.admin;

import com.minhhuyle.sprintretroapi.admin.service.AdminViewService;
import com.minhhuyle.sprintretroapi.user.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Deprecated(forRemoval = true)
@RestController()
public class AdminViewController {

    private final AdminViewService adminViewService;

    public AdminViewController(final AdminViewService adminViewService) {
        this.adminViewService = adminViewService;
    }

    @GetMapping(value = "/admin")
    @ResponseStatus(HttpStatus.OK)
    public void initializePasswordAndShowInConsole() {
        adminViewService.initializePasswordAndShowIt();
    }

    @PostMapping(value = "/admin")
    public ResponseEntity authentication(@RequestBody UserDTO userDTO) {
        if(adminViewService.authentication(userDTO)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }
}
