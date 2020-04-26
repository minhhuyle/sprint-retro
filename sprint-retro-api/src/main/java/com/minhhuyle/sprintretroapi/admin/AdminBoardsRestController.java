package com.minhhuyle.sprintretroapi.admin;

import com.minhhuyle.sprintretroapi.admin.service.AdminViewService;
import com.minhhuyle.sprintretroapi.theme.service.PostItService;
import com.minhhuyle.sprintretroapi.theme.service.VotedPostItUserService;
import com.minhhuyle.sprintretroapi.user.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/boards")
public class AdminBoardsRestController {
    private final AdminViewService adminViewService;
    private final PostItService postItService;
    private final VotedPostItUserService votedPostItUserService;

    public AdminBoardsRestController(final AdminViewService adminViewService, final PostItService postItService, final  VotedPostItUserService votedPostItUserService) {
        this.adminViewService = adminViewService;
        this.postItService = postItService;
        this.votedPostItUserService = votedPostItUserService;
    }

    @PostMapping(value = "/reset-all")
    public ResponseEntity resetAllPostIts(@RequestBody UserDTO user) {
        boolean isOk = adminViewService.authentication(user);
        if(isOk) {
            postItService.resetAll();
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    @PostMapping(value = "/post-its/reset-votes")
    public ResponseEntity resetAllVotes(@RequestBody UserDTO user) {
        boolean isOk = adminViewService.authentication(user);
        if(isOk) {
            votedPostItUserService.deleteAllAndNotifySockets();
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }
}
