package com.minhhuyle.sprintretroapi;

import com.minhhuyle.sprintretroapi.retro.service.PostItService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller(value = "/")
public class MainController {

    private final PostItService postItService;

    public MainController(final PostItService postItService) {
        this.postItService = postItService;
    }

    @GetMapping(value = "/")
    @ResponseStatus(HttpStatus.OK)
    public String welcome() {
        return "index.html";
    }

    @GetMapping(value = "/reset")
    @ResponseStatus(HttpStatus.OK)
    public void resetRetro() {
        postItService.reset();
    }
}

