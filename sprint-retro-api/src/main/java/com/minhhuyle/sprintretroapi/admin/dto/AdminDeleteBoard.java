package com.minhhuyle.sprintretroapi.admin.dto;

import com.minhhuyle.sprintretroapi.admin.model.Board;

import java.util.List;

public class AdminDeleteBoard {
    private String password;

    private long boardId;

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public long getBoardId() {
        return boardId;
    }

    public void setBoardId(final long boardId) {
        this.boardId = boardId;
    }
}
