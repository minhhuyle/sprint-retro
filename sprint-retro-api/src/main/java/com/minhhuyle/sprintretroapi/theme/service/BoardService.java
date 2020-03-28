package com.minhhuyle.sprintretroapi.theme.service;

import com.minhhuyle.sprintretroapi.theme.model.Board;
import com.minhhuyle.sprintretroapi.theme.service.dao.BoardDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    private final BoardDao boardDao;

    public BoardService(final BoardDao boardDao) {
        this.boardDao = boardDao;
    }

    public List<Board> getAllBoards() {
        return (List<Board>) boardDao.findAll();
    }
}
