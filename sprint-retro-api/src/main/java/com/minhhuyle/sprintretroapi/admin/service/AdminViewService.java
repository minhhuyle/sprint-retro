package com.minhhuyle.sprintretroapi.admin.service;

import com.minhhuyle.sprintretroapi.admin.model.AdminView;
import com.minhhuyle.sprintretroapi.admin.service.dao.AdminViewDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AdminViewService {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdminViewService.class);

    private final AdminViewDao adminViewDao;

    public AdminViewService(final AdminViewDao adminViewDao) {
        this.adminViewDao = adminViewDao;
    }

    @Transactional
    public void initializePasswordAndShowIt() {
        Optional<AdminView> lastAdminSessionOpt = getLastAdminSession();
        AdminView lastAdminSession;
        if(lastAdminSessionOpt.isPresent()) {
            lastAdminSession = lastAdminSessionOpt.get();
            if(lastAdminSession.isOld()) {
                lastAdminSession.createNewRandomPassword();
                adminViewDao.save(lastAdminSession);
            }
        } else {
            lastAdminSession = new AdminView();
            adminViewDao.save(lastAdminSession);
        }

        LOGGER.info(lastAdminSession.getPassword());
    }

    private Optional<AdminView> getLastAdminSession() {
        return ((List<AdminView>) adminViewDao.findAll()).stream().findFirst();
    }

    public boolean authentication(final String password) {
        Optional<AdminView> lastAdminSessionOpt = getLastAdminSession();

        if(lastAdminSessionOpt.isEmpty()) {
            throw new IllegalStateException("Session doesn't have admin session in BDD, it should not allowed");
        }

        AdminView adminView = lastAdminSessionOpt.get();
        return adminView.verifyPassword(password);
    }
}
