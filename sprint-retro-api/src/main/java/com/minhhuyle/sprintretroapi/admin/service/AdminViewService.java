package com.minhhuyle.sprintretroapi.admin.service;

import com.minhhuyle.sprintretroapi.admin.model.AdminView;
import com.minhhuyle.sprintretroapi.board.model.Board;
import com.minhhuyle.sprintretroapi.admin.service.dao.AdminViewDao;
import com.minhhuyle.sprintretroapi.board.service.dao.BoardDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class AdminViewService {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdminViewService.class);

    private final AdminViewDao adminViewDao;
    private final BoardDao boardDao;

    public AdminViewService(final AdminViewDao adminViewDao, final BoardDao boardDao) {
        this.adminViewDao = adminViewDao;
        this.boardDao = boardDao;
    }

    @Transactional
    public void initializePasswordAndShowIt() {
        Optional<AdminView> lastAdminSessionOpt = getLastAdminSession();
        AdminView lastAdminSession;
        if(lastAdminSessionOpt.isPresent()) {
            lastAdminSession = lastAdminSessionOpt.get();
            if(lastAdminSession.isOld()) {
                lastAdminSession.createNewRandomPassword();
                lastAdminSession.setCreationDate(new Date());
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

    public List<Board> getAllConfigBoard() {
        return (List<Board>) boardDao.findAll();
    }

    public List<Board> saveBoards(final List<Board> boards) {
        return (List<Board>) boardDao.saveAll(boards);
    }

    public void deleteBoard(final long boardId) {
        boardDao.deleteById(boardId);
    }
}
