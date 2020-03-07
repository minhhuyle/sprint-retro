package com.minhhuyle.sprintretroapi.board;

import com.minhhuyle.sprintretroapi.board.model.Board;
import com.minhhuyle.sprintretroapi.board.service.BoardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BoardRestController {

    private final BoardService boardService;

    public BoardRestController(final BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping(value = "/boards")
    public List<Board> getBoardsInfo() {
        return boardService.getAllBoards();
    }

}
