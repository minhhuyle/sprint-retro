package com.minhhuyle.sprintretroapi.theme.service.dao;

import com.minhhuyle.sprintretroapi.theme.model.VotedPostItUser;
import org.springframework.data.repository.CrudRepository;

public interface VotedPostItUserDao extends CrudRepository<VotedPostItUser, Long> {
}