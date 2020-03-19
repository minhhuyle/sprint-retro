package com.minhhuyle.sprintretroapi.admin.service;

import com.minhhuyle.sprintretroapi.admin.model.AdminView;
import com.minhhuyle.sprintretroapi.board.model.Board;
import com.minhhuyle.sprintretroapi.admin.service.dao.AdminViewDao;
import com.minhhuyle.sprintretroapi.board.service.dao.BoardDao;
import com.minhhuyle.sprintretroapi.user.model.Role;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import com.minhhuyle.sprintretroapi.user.service.UserViewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class AdminViewService {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdminViewService.class);

    private final AdminViewDao adminViewDao;
    private final BoardDao boardDao;
    private final UserViewService userViewService;

    public AdminViewService(final AdminViewDao adminViewDao, final BoardDao boardDao, final UserViewService userViewService) {
        this.adminViewDao = adminViewDao;
        this.boardDao = boardDao;
        this.userViewService = userViewService;
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

    public boolean authentication(final UserView userView) {
        UserView user = userViewService.logIn(userView);
        if (user != null) {
            return Role.ADMIN.equals(user.getRole());
        }

        return false;
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
