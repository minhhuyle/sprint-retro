package com.minhhuyle.sprintretroapi.admin.service.dao;

import com.minhhuyle.sprintretroapi.admin.model.Board;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardDao extends CrudRepository<Board, Long> {
}
