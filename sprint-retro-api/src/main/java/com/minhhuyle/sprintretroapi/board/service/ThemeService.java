package com.minhhuyle.sprintretroapi.board.service;

import com.minhhuyle.sprintretroapi.board.model.Theme;
import com.minhhuyle.sprintretroapi.board.service.dao.ThemeDao;
import com.minhhuyle.sprintretroapi.socket.service.SocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ThemeService {
    private final ThemeDao themeDao;
    private final SocketService socketService;

    public ThemeService(final ThemeDao themeDao, final SocketService socketService) {
        this.themeDao = themeDao;
        this.socketService = socketService;
    }

    public Theme save(final Theme theme) {
        return themeDao.save(theme);
    }

    public List<Theme> getAllThemes() {
        return (List<Theme>) themeDao.findAll();
    }

    public void selectThemeForRetro(final Theme theme) {
        theme.setSelectedTheme(new Date());
        themeDao.save(theme);
    }

    public List<Theme> save(final List<Theme> themes) {
        return (List<Theme>) themeDao.saveAll(themes);
    }

    public void startWriteBoard(final long themeId) {
        Optional<Theme> optionalTheme = this.themeDao.findById(themeId);

        if(optionalTheme.isEmpty()) {
            throw new IllegalStateException("Cannot start write board");
        }

        Theme theme = optionalTheme.get();
        theme.setWriteTime(new Date());
        themeDao.save(theme);

        socketService.notifySocketWriteBoardEnabled(theme);
    }
}
