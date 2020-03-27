package com.minhhuyle.sprintretroapi.retro.service;

import com.minhhuyle.sprintretroapi.admin.service.AdminViewService;
import com.minhhuyle.sprintretroapi.board.model.Board;
import com.minhhuyle.sprintretroapi.board.model.Theme;
import com.minhhuyle.sprintretroapi.board.service.ThemeService;
import com.minhhuyle.sprintretroapi.retro.dto.LinkPost;
import com.minhhuyle.sprintretroapi.retro.model.PostIt;
import com.minhhuyle.sprintretroapi.retro.service.dao.PostItDao;
import com.minhhuyle.sprintretroapi.socket.service.SocketService;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import com.minhhuyle.sprintretroapi.user.service.UserViewService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class PostItService {
    private final PostItDao postItDao;
    private final SocketService socketService;
    private final AdminViewService adminViewService;
    private final UserViewService userViewService;
    private final ThemeService themeService;
    private final VotedPostItUserService votedPostItUserService;

    public PostItService(final PostItDao postItDao, final SocketService socketService, final AdminViewService adminViewService, final UserViewService userViewService, final ThemeService themeService, final VotedPostItUserService votedPostItUserService) {
        this.postItDao = postItDao;
        this.socketService = socketService;
        this.adminViewService = adminViewService;
        this.userViewService = userViewService;
        this.themeService = themeService;
        this.votedPostItUserService = votedPostItUserService;
    }

    public void add(final PostIt postIt) {
        if(postIt.getId() != null) {
            throw new IllegalStateException("Cannot save post-it");
        }
        postIt.setCreationDate(new Date());
        PostIt postItSaved = postItDao.save(postIt);
        socketService.notifyAllSockets(postItSaved);
    }

    private List<PostIt> getAll() {
        return (List<PostIt>) postItDao.findAll();
    }

    private List<PostIt> getAllParent() {
        return (List<PostIt>) postItDao.findAllByParentIsNullOrderByCreationDateDesc();
    }

    public Map<String, List<PostIt>> getAllByType() {
        List<PostIt> postIts = getAllParent();

        Map<String, List<PostIt>> result = new HashMap<>();

        List<Board> allConfigBoard = adminViewService.getAllConfigBoard();
        allConfigBoard.forEach(board -> result.put(board.getType(), new ArrayList<>()));

        for (PostIt postIt : postIts) {
            String postItType = postIt.getType();
            result.get(postItType).add(postIt);
        }

        return result;
    }

    @Transactional
    public UserView vote(final UserView userView, final Long postItId) {
        UserView userLogged = userViewService.logIn(userView);
        Optional<PostIt> postItOpt = postItDao.findById(postItId);
        Optional<Theme> activatedThemeOpt = themeService.getActivatedTheme();

        if(postItOpt.isPresent() && activatedThemeOpt.isPresent()) {
            Theme theme = activatedThemeOpt.get();

            PostIt postItLoaded = postItOpt.get();
            votedPostItUserService.saveNewVotedPostItUser(postItLoaded, userLogged);
            socketService.notifyAllSockets(postItLoaded);
        }

        return userLogged;
    }

    public void reset() {
        votedPostItUserService.deleteAll();
        postItDao.deleteAll();
        socketService.notifyAllSocketsToReset();
    }

    @Transactional
    public PostIt linkPost(final LinkPost linkPost) {
        PostIt parentPostIt = postItDao.findById(linkPost.getParentId()).orElseThrow(IllegalArgumentException::new);
        List<PostIt> children = (List<PostIt>) postItDao.findAllById(linkPost.getChildIds());
        for (PostIt child : children) {
            child.setParent(parentPostIt);
            parentPostIt.addChildPostIt(child);
        }
        return postItDao.save(parentPostIt);
    }
}
