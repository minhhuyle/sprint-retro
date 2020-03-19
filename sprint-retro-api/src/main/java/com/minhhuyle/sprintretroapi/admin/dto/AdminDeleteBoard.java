package com.minhhuyle.sprintretroapi.admin.dto;

import com.minhhuyle.sprintretroapi.user.model.UserView;

public class AdminDeleteBoard {
    private UserView user;

    private long boardId;

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }

    public long getBoardId() {
        return boardId;
    }

    public void setBoardId(final long boardId) {
        this.boardId = boardId;
    }
}
