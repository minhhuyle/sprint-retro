package com.minhhuyle.sprintretroapi.admin.service;

import com.minhhuyle.sprintretroapi.admin.dto.AdminDTO;
import com.minhhuyle.sprintretroapi.admin.model.AdminView;
import com.minhhuyle.sprintretroapi.admin.service.dao.AdminViewDao;
import com.minhhuyle.sprintretroapi.theme.model.Board;
import com.minhhuyle.sprintretroapi.theme.model.Theme;
import com.minhhuyle.sprintretroapi.theme.service.ThemeService;
import com.minhhuyle.sprintretroapi.theme.service.dao.BoardDao;
import com.minhhuyle.sprintretroapi.user.dto.UserDTO;
import com.minhhuyle.sprintretroapi.user.model.Role;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import com.minhhuyle.sprintretroapi.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

// TODO: 12/04/2020 refactor ?
@Service
public class AdminViewService {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdminViewService.class);

    private final AdminViewDao adminViewDao;
    private final BoardDao boardDao;
    private final UserService userService;
    private final ThemeService themeService;

    public AdminViewService(final AdminViewDao adminViewDao, final BoardDao boardDao, final UserService userService, final ThemeService themeService) {
        this.adminViewDao = adminViewDao;
        this.boardDao = boardDao;
        this.userService = userService;
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
        UserView user = userService.logIn(adminDTO.getUser());
        if (user != null) {
            return Role.ADMIN.equals(user.getRole());
        }

        return false;
    }

    public boolean authentication(final String userName) {
        UserView user = userService.getUser(userName);
        if (user != null) {
            return Role.ADMIN.equals(user.getRole());
        }

        return false;
    }

    @Deprecated
    public boolean authentication(final UserView userView) {
        UserView user = userService.logIn(userView);
        if (user != null) {
            return Role.ADMIN.equals(user.getRole());
        }

        return false;
    }

    public boolean authentication(final UserDTO userDTO) {
        UserView user = userService.logIn(userDTO);
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
        themeService.selectThemeForRetroAndNotifyClient(themeId);
    }

    public void startWriteBoard(final long themeId) {
        themeService.startWriteBoard(themeId);
    }

    public Theme saveTheme(final Theme theme) {
        return this.themeService.save(theme);
    }

    public void stopWriteBoard(final long themeId) {
        themeService.stopWriteBoard(themeId);
    }

    public List<UserDTO> getUsers() {
        List<UserView> users = userService.getUsers();

        return users.stream().map(UserDTO::extractFrom).collect(Collectors.toList());
    }

    public UserView createUser(final UserDTO userDTO) {
        // TODO: 08/05/2020 design pattern here
        if(userDTO.getUserName() == null
                || userDTO.getPassword() == null
                || userDTO.getId() != null
                || userDTO.getRole() == null) {
            throw new IllegalStateException("Cannot create user");
        }

        userService.findUser(userDTO.getUserName().toLowerCase())
                .ifPresent(userValue -> {throw new IllegalStateException("Cannot create user");});

        UserView userView = new UserView();
        userView.setUserName(userDTO.getUserName().toLowerCase());
        userView.setRole(userDTO.getRole());
        userView.setPassword(userDTO.getPassword());
        return userService.save(userView);
    }
}
