package com.minhhuyle.sprintretroapi.theme;

import com.minhhuyle.sprintretroapi.theme.model.Theme;
import com.minhhuyle.sprintretroapi.theme.service.ThemeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/theme")
public class ThemeRestController {
    private final ThemeService themeService;

    public ThemeRestController(final ThemeService themeService) {
        this.themeService = themeService;
    }

    @GetMapping(value = "/active")
    public Theme getActivatedTheme() {
        return themeService.findSelectedTheme().orElse(null);
    }
}
