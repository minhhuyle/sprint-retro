package com.minhhuyle.sprintretroapi.admin.service;

import com.minhhuyle.sprintretroapi.admin.dto.AdminDTO;
import com.minhhuyle.sprintretroapi.admin.model.AdminView;
import com.minhhuyle.sprintretroapi.admin.service.dao.AdminViewDao;
import com.minhhuyle.sprintretroapi.board.model.Board;
import com.minhhuyle.sprintretroapi.board.model.Theme;
import com.minhhuyle.sprintretroapi.board.service.ThemeService;
import com.minhhuyle.sprintretroapi.board.service.dao.BoardDao;
import com.minhhuyle.sprintretroapi.user.model.Role;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import com.minhhuyle.sprintretroapi.user.service.UserViewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AdminViewService {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdminViewService.class);

    private final AdminViewDao adminViewDao;
    private final BoardDao boardDao;
    private final UserViewService userViewService;
    private final ThemeService themeService;

    public AdminViewService(final AdminViewDao adminViewDao, final BoardDao boardDao, final UserViewService userViewService, final ThemeService themeService) {
        this.adminViewDao = adminViewDao;
        this.boardDao = boardDao;
        this.userViewService = userViewService;
        this.themeService = themeService;
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

    public boolean authentication(final AdminDTO adminDTO) {
        UserView user = userViewService.logIn(adminDTO.getUser());
        if (user != null) {
            return Role.ADMIN.equals(user.getRole());
        }

        return false;
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

    public List<Theme> getAllThemes() {
        return themeService.getAllThemes();
    }

    public void selectThemeForRetro(final long themeId) {
        themeService.selectThemeForRetro(themeId);
    }

    public void startWriteBoard(final long themeId) {
        themeService.startWriteBoard(themeId);
    }

    public Theme saveTheme(final Theme theme) {
        return this.themeService.save(theme);
    }
}
