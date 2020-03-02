package com.minhhuyle.sprintretroapi;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller(value = "/")
public class MainController {

    @GetMapping(value = "/")
    @ResponseStatus(HttpStatus.OK)
    public String welcome() {
        return "index.html";
    }
}

