package com.minhhuyle.sprintretroapi.admin;

import com.minhhuyle.sprintretroapi.admin.dto.AdminAuthentication;
import com.minhhuyle.sprintretroapi.admin.service.AdminViewService;
import com.minhhuyle.sprintretroapi.retro.service.PostItService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
public class AdminViewController {

    private final AdminViewService adminViewService;
    private final PostItService postItService;

    public AdminViewController(final AdminViewService adminViewService, final PostItService postItService) {
        this.adminViewService = adminViewService;
        this.postItService = postItService;
    }

    @GetMapping(value = "/admin")
    @ResponseStatus(HttpStatus.OK)
    public void initializePasswordAndShowInConsole() {
        adminViewService.initializePasswordAndShowIt();
    }

    @PostMapping(value = "/admin")
    public ResponseEntity authentication(@RequestBody AdminAuthentication adminAuthentication) {
        boolean isOk = adminViewService.authentication(adminAuthentication.getPassword());
        if(isOk) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/admin/reset")
    public ResponseEntity reset(@RequestBody AdminAuthentication adminAuthentication) {
        boolean isOk = adminViewService.authentication(adminAuthentication.getPassword());
        if(isOk) {
            postItService.reset();
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }
}
