package com.minhhuyle.sprintretroapi.admin.dto;

import com.minhhuyle.sprintretroapi.board.model.Theme;
import com.minhhuyle.sprintretroapi.user.model.UserView;

import java.util.List;

public class AdminSelectTheme {
    private UserView user;

    private Theme theme;

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(final Theme theme) {
        this.theme = theme;
    }
}
