package com.minhhuyle.sprintretroapi.admin;

import com.minhhuyle.sprintretroapi.admin.dto.*;
import com.minhhuyle.sprintretroapi.board.model.Board;
import com.minhhuyle.sprintretroapi.admin.service.AdminViewService;
import com.minhhuyle.sprintretroapi.board.model.Theme;
import com.minhhuyle.sprintretroapi.retro.service.PostItService;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<Board>> authentication(@RequestBody UserView userView) {
        boolean isOk = adminViewService.authentication(userView);
        if(isOk) {
            return new ResponseEntity(adminViewService.getAllConfigBoard(), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/admin/save-boards")
    public ResponseEntity<List<Board>> saveBoard(@RequestBody AdminSaveBoard adminSaveBoard) {
        boolean isOk = adminViewService.authentication(adminSaveBoard.getUser());
        if(isOk) {
            return new ResponseEntity(adminViewService.saveBoards(adminSaveBoard.getBoards()), HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/admin/delete-board")
    @ResponseStatus(HttpStatus.OK)
    public void deleteBoard(@RequestBody AdminDeleteBoard adminDeleteBoard) {
        boolean isOk = adminViewService.authentication(adminDeleteBoard.getUser());
        if(isOk) {
            adminViewService.deleteBoard(adminDeleteBoard.getBoardId());
        }
    }

    @PostMapping(value = "/admin/reset")
    public ResponseEntity reset(@RequestBody UserView userView) {
        boolean isOk = adminViewService.authentication(userView);
        if(isOk) {
            postItService.reset();
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }


    @PostMapping(value = "/admin/save-themes")
    public ResponseEntity<List<Theme>> saveTheme(@RequestBody AdminSaveTheme adminSaveTheme) {
        boolean isOk = adminViewService.authentication(adminSaveTheme.getUser());
        if(isOk) {
            return new ResponseEntity(adminViewService.saveThemes(adminSaveTheme.getThemes()), HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/admin/theme/start-write-board")
    public ResponseEntity<List<Board>> startWriteBoard(@RequestBody AdminStartWriteBoardTheme adminStartWriteBoardTheme) {
        boolean isOk = adminViewService.authentication(adminStartWriteBoardTheme.getUser());
        if(isOk) {
            adminViewService.startWriteBoard(adminStartWriteBoardTheme.getThemeId());
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/admin/theme/select")
    public ResponseEntity selectTheme(@RequestBody AdminStartWriteBoardTheme adminStartWriteBoardTheme) {
        boolean isOk = adminViewService.authentication(adminStartWriteBoardTheme.getUser());
        if(isOk) {
            adminViewService.selectThemeForRetro(adminStartWriteBoardTheme.getThemeId());
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/admin/themes")
    public ResponseEntity<List<Board>> getThemes(@RequestBody UserView userView) {
        boolean isOk = adminViewService.authentication(userView);
        if(isOk) {
            return new ResponseEntity(adminViewService.getAllThemes(), HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

}
