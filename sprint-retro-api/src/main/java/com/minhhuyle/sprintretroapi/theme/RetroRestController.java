package com.minhhuyle.sprintretroapi.theme;

import com.minhhuyle.sprintretroapi.socket.service.SocketService;
import com.minhhuyle.sprintretroapi.theme.dto.LinkPost;
import com.minhhuyle.sprintretroapi.theme.dto.VoteForm;
import com.minhhuyle.sprintretroapi.theme.model.PostIt;
import com.minhhuyle.sprintretroapi.theme.service.PostItService;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
public class RetroRestController {
    private final PostItService postItService;
    private final SocketService socketService;

    public RetroRestController(final PostItService postItService, final SocketService socketService) {
        this.postItService = postItService;
        this.socketService = socketService;
    }

    @GetMapping(value = "/post-its")
    public Map<String, List<PostIt>> getPostIts() {
        return postItService.getAllByType();
    }

    @PostMapping(value = "/add-post-it")
    @ResponseStatus(HttpStatus.OK)
    public void addPostIt(@RequestBody PostIt postIt) {
        postItService.add(postIt);
    }

    @PostMapping(value = "/vote")
    @ResponseStatus(HttpStatus.OK)
    public UserView votePostIt(@RequestBody VoteForm voteForm) {
        return postItService.vote(voteForm.getUser(), voteForm.getPostItId());
    }

    @PostMapping(value = "/link-post")
    @ResponseStatus(HttpStatus.OK)
    public void linkPost(@RequestBody LinkPost linkPost) {
        PostIt postIt = postItService.linkPost(linkPost);
        socketService.notifyAllSocketsToRefresh(postIt.getType());
    }
}