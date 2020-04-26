package com.minhhuyle.sprintretroapi.theme.service;

import com.minhhuyle.sprintretroapi.socket.model.SocketMessageType;
import com.minhhuyle.sprintretroapi.socket.service.SocketService;
import com.minhhuyle.sprintretroapi.theme.model.Theme;
import com.minhhuyle.sprintretroapi.theme.service.dao.ThemeDao;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
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

    // TODO: 13/04/2020 notify
    public Theme save(final Theme theme) {
        theme.getBoards().forEach(board -> {
            if(board.getId() == null || board.getTheme() == null) {
                board.setTheme(theme);
            }
        });
        return themeDao.save(theme);
    }

    public List<Theme> getAllThemes() {
        return (List<Theme>) themeDao.findAll();
    }

    public void selectThemeForRetroAndNotifyClient(final long themeId) {
        Theme theme = themeDao.findById(themeId).orElseThrow(IllegalArgumentException::new);
        findSelectedTheme().ifPresent(selectedTheme -> {
            selectedTheme.setSelectedTheme(false);
            themeDao.save(selectedTheme);
        });

        theme.setSelectedTheme(true);
        Theme savedTheme = themeDao.save(theme);
        socketService.notifySockets(SocketMessageType.REFRESH_THEME, savedTheme);
    }

    public void startWriteBoard(final long themeId) {
        Theme theme = this.themeDao.findById(themeId).orElseThrow(IllegalArgumentException::new);

        //todo some rule have to specified
        theme.setWriteTime(new Date());
        themeDao.save(theme);

        socketService.notifySockets(SocketMessageType.WRITE_BOARD_START, theme);
    }

    public Optional<Theme> findSelectedTheme() {
        return themeDao.findTopBySelectedThemeIsTrue();
    }

    public void stopWriteBoard(final long themeId) {
        Theme theme = this.themeDao.findById(themeId).orElseThrow(IllegalArgumentException::new);

        //todo some rule have to specified
        Instant stopTime = new Date().toInstant().plus(-theme.getLimitTimeToWrite(), ChronoUnit.MINUTES);
        theme.setWriteTime(Date.from(stopTime));
        themeDao.save(theme);

        socketService.notifySockets(SocketMessageType.WRITE_BOARD_STOP, theme);
    }
}
