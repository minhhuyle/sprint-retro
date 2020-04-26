package com.minhhuyle.sprintretroapi.theme.service.dao;

import com.minhhuyle.sprintretroapi.theme.model.Theme;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ThemeDao extends CrudRepository<Theme, Long> {
    Optional<Theme> findTopBySelectedThemeIsTrue();
}
