package com.minhhuyle.sprintretroapi.admin.dto;

import com.minhhuyle.sprintretroapi.board.model.Board;

import java.util.List;

public class AdminSaveBoard {
    private String password;

    private List<Board> boards;

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public List<Board> getBoards() {
        return boards;
    }

    public void setBoards(final List<Board> boards) {
        this.boards = boards;
    }
}
