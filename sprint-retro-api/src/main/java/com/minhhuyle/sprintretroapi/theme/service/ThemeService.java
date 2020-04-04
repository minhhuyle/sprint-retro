package com.minhhuyle.sprintretroapi.theme.service;

import com.minhhuyle.sprintretroapi.socket.model.SocketMessageType;
import com.minhhuyle.sprintretroapi.theme.model.Theme;
import com.minhhuyle.sprintretroapi.theme.service.dao.ThemeDao;
import com.minhhuyle.sprintretroapi.socket.service.SocketService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        Theme theme = themeDao.findById(themeId).orElseThrow(() -> new IllegalStateException("Cannot Select Theme"));
        theme.setSelectedTheme(new Date());
        Theme savedTheme = themeDao.save(theme);
        socketService.notifySockets(SocketMessageType.REFRESH_THEME, savedTheme);
        socketService.notifySocketWriteBoardEnabled(savedTheme);
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

    public Optional<Theme> getActivatedTheme() {
        return themeDao.findTopBySelectedThemeIsNotNullOrderBySelectedThemeDesc();
    }
}
