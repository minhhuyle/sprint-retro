package com.minhhuyle.sprintretroapi.retro.dto;

import com.minhhuyle.sprintretroapi.user.model.UserView;

public class VoteForm {
    private UserView user;
    private Long postItId;

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }

    public Long getPostItId() {
        return postItId;
    }

    public void setPostItId(final Long postItId) {
        this.postItId = postItId;
    }
}
