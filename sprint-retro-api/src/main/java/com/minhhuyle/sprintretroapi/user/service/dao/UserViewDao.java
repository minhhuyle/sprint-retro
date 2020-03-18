package com.minhhuyle.sprintretroapi.user.service.dao;

import com.minhhuyle.sprintretroapi.user.model.UserView;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserViewDao extends CrudRepository<UserView, Long> {
    Optional<UserView> findByUserName(final String userName);
}
