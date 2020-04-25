package com.minhhuyle.sprintretroapi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller(value = "/")
public class MainController {

    @GetMapping
    public String welcome() {
        return "index.html";
    }
}

