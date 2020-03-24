package com.minhhuyle.sprintretroapi.retro.service.dao;

import com.minhhuyle.sprintretroapi.retro.model.VotedPostItUser;
import org.springframework.data.repository.CrudRepository;

public interface VotedPostItUserDao extends CrudRepository<VotedPostItUser, Long> {
}