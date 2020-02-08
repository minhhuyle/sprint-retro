package com.minhhuyle.sprintretroapi.retro.service.dao;

import com.minhhuyle.sprintretroapi.retro.model.PostIt;
import org.springframework.data.repository.CrudRepository;

public interface PostItDao extends CrudRepository<PostIt, Long> {

}