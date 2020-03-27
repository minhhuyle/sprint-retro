package com.minhhuyle.sprintretroapi.admin.dto;

import com.minhhuyle.sprintretroapi.user.model.UserView;

public class AdminDTO {
    private UserView user;

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }
}
