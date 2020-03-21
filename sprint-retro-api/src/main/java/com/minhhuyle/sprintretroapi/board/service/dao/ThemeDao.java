package com.minhhuyle.sprintretroapi.board.service.dao;

import com.minhhuyle.sprintretroapi.board.model.Theme;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThemeDao extends CrudRepository<Theme, Long> {
}
