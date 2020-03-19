package com.minhhuyle.sprintretroapi.admin.dto;

import com.minhhuyle.sprintretroapi.board.model.Board;
import com.minhhuyle.sprintretroapi.user.model.UserView;

import java.util.List;

public class AdminSaveBoard {
    private UserView user;

    private List<Board> boards;

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }

    public List<Board> getBoards() {
        return boards;
    }

    public void setBoards(final List<Board> boards) {
        this.boards = boards;
    }
}
