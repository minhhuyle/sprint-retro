package com.minhhuyle.sprintretroapi.admin.dto;

import com.minhhuyle.sprintretroapi.board.model.Theme;
import com.minhhuyle.sprintretroapi.user.model.UserView;

import java.util.List;

public class AdminSaveTheme {
    private UserView user;

    private List<Theme> themes;

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }

    public List<Theme> getThemes() {
        return themes;
    }

    public void setThemes(final List<Theme> themes) {
        this.themes = themes;
    }
}
