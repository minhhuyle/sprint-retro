package com.minhhuyle.sprintretroapi.board.service.dao;

import com.minhhuyle.sprintretroapi.board.model.Board;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardDao extends CrudRepository<Board, Long> {
}
