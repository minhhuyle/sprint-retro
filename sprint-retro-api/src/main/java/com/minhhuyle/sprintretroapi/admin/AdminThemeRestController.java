package com.minhhuyle.sprintretroapi.admin;

import com.minhhuyle.sprintretroapi.admin.dto.theme.AdminThemeDTO;
import com.minhhuyle.sprintretroapi.admin.dto.theme.AdminThemeIdDTO;
import com.minhhuyle.sprintretroapi.admin.service.AdminViewService;
import com.minhhuyle.sprintretroapi.theme.model.Theme;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/admin")
public class AdminThemeRestController {

    private final AdminViewService adminViewService;

    public AdminThemeRestController(final AdminViewService adminViewService) {
        this.adminViewService = adminViewService;
    }

    @PostMapping("/theme")
    public ResponseEntity<Theme> saveTheme(@RequestBody AdminThemeDTO adminTheme) {
        boolean isOk = adminViewService.authentication(adminTheme);
        if(isOk) {
            return new ResponseEntity<>(adminViewService.saveTheme(adminTheme.getTheme()), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/themes")
    public ResponseEntity<List<Theme>> getAllThemes(@RequestBody UserView userView) {
        boolean isOk = adminViewService.authentication(userView);
        if(isOk) {
            return new ResponseEntity<>(adminViewService.getAllThemes(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/theme/select")
    // TODO: 27/04/2020 save and select
    public ResponseEntity selectTheme(@RequestBody AdminThemeIdDTO adminTheme) {
        boolean isOk = adminViewService.authentication(adminTheme);
        if(isOk) {
            adminViewService.selectThemeForRetro(adminTheme.getThemeId());
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/theme/start-write-board")
    public ResponseEntity startWriteBoard(@RequestBody AdminThemeIdDTO adminTheme) {
        boolean isOk = adminViewService.authentication(adminTheme);
        if(isOk) {
            adminViewService.startWriteBoard(adminTheme.getThemeId());
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/theme/stop-write-board")
    public ResponseEntity stopWriteBoard(@RequestBody AdminThemeIdDTO adminTheme) {
        boolean isOk = adminViewService.authentication(adminTheme);
        if(isOk) {
            adminViewService.stopWriteBoard(adminTheme.getThemeId());
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }
}
