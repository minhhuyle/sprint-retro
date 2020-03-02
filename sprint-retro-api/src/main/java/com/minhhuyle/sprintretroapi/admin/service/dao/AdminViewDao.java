package com.minhhuyle.sprintretroapi.admin.service.dao;

import com.minhhuyle.sprintretroapi.admin.model.AdminView;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminViewDao extends CrudRepository<AdminView, Long> {
}
