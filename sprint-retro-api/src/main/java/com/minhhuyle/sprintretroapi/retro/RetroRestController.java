package com.minhhuyle.sprintretroapi.retro;

import com.minhhuyle.sprintretroapi.retro.model.PostIt;
import com.minhhuyle.sprintretroapi.retro.model.PostItType;
import com.minhhuyle.sprintretroapi.retro.service.PostItService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
public class RetroRestController {
    private final PostItService postItService;

    public RetroRestController(final PostItService postItService) {
        this.postItService = postItService;
    }

    @GetMapping(value = "/post-its")
    public Map<PostItType, List<PostIt>> getPostIts() {
        return postItService.getAllByType();
    }

    @PostMapping(value = "/add-post-it")
    @ResponseStatus(HttpStatus.OK)
    public void addPostIt(@RequestBody PostIt postIt) {
        postItService.add(postIt);
    }

    @PostMapping(value = "/vote")
    @ResponseStatus(HttpStatus.OK)
    public void votePostIt(@RequestBody PostIt postIt) {
        postItService.vote(postIt);
    }
}