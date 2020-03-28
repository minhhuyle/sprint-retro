package com.minhhuyle.sprintretroapi.theme.service.dao;

import com.minhhuyle.sprintretroapi.theme.model.PostIt;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostItDao extends CrudRepository<PostIt, Long> {
    List<PostIt> findAllByParentIsNullOrderByCreationDateDesc();
}