package com.minhhuyle.sprintretroapi.admin;

import com.minhhuyle.sprintretroapi.admin.dto.AdminAuthentication;
import com.minhhuyle.sprintretroapi.admin.dto.AdminDeleteBoard;
import com.minhhuyle.sprintretroapi.admin.dto.AdminSaveBoard;
import com.minhhuyle.sprintretroapi.admin.model.Board;
import com.minhhuyle.sprintretroapi.admin.service.AdminViewService;
import com.minhhuyle.sprintretroapi.retro.service.PostItService;
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
    public ResponseEntity<List<Board>> authentication(@RequestBody AdminAuthentication adminAuthentication) {
        boolean isOk = adminViewService.authentication(adminAuthentication.getPassword());
        if(isOk) {
            return new ResponseEntity(adminViewService.getAllConfigBoard(), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/admin/save-boards")
    public ResponseEntity<List<Board>> saveBoard(@RequestBody AdminSaveBoard adminSaveBoard) {
        boolean isOk = adminViewService.authentication(adminSaveBoard.getPassword());
        if(isOk) {
            return new ResponseEntity(adminViewService.saveBoards(adminSaveBoard.getBoards()), HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/admin/delete-board")
    @ResponseStatus(HttpStatus.OK)
    public void deleteBoard(@RequestBody AdminDeleteBoard adminDeleteBoard) {
        boolean isOk = adminViewService.authentication(adminDeleteBoard.getPassword());
        if(isOk) {
            adminViewService.deleteBoard(adminDeleteBoard.getBoardId());
        }
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
