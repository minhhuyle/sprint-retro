package com.minhhuyle.sprintretroapi.admin.dto;

import com.minhhuyle.sprintretroapi.user.model.UserView;

public class AdminStartWriteBoardTheme {
    private UserView user;

    private long themeId;

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }

    public long getThemeId() {
        return themeId;
    }

    public void setThemeId(final long themeId) {
        this.themeId = themeId;
    }
}
