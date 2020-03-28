package com.minhhuyle.sprintretroapi.theme.service.dao;

import com.minhhuyle.sprintretroapi.theme.model.Board;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardDao extends CrudRepository<Board, Long> {
}
