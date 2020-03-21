package com.minhhuyle.sprintretroapi.retro;

import com.minhhuyle.sprintretroapi.board.model.Board;
import com.minhhuyle.sprintretroapi.board.model.Theme;
import com.minhhuyle.sprintretroapi.board.service.ThemeService;
import com.minhhuyle.sprintretroapi.retro.dto.LinkPost;
import com.minhhuyle.sprintretroapi.retro.model.PostIt;
import com.minhhuyle.sprintretroapi.retro.service.PostItService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
public class RetroRestController {
    private final PostItService postItService;
    private final ThemeService themeService;

    public RetroRestController(final PostItService postItService, final ThemeService themeService) {
        this.postItService = postItService;
        this.themeService = themeService;
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
    public void votePostIt(@RequestBody PostIt postIt) {
        postItService.vote(postIt);
    }

    @PostMapping(value = "/link-post")
    @ResponseStatus(HttpStatus.OK)
    public void linkPost(@RequestBody LinkPost linkPost) {
        postItService.linkPost(linkPost);
    }

    @GetMapping(value = "/theme/active")
    public Theme getActivatedTheme() {
        return themeService.getActivatedTheme().orElse(null);
    }
}