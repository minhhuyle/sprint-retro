package com.minhhuyle.sprintretroapi.retro.service;

import com.minhhuyle.sprintretroapi.admin.service.AdminViewService;
import com.minhhuyle.sprintretroapi.board.model.Board;
import com.minhhuyle.sprintretroapi.retro.dto.LinkPost;
import com.minhhuyle.sprintretroapi.retro.model.PostIt;
import com.minhhuyle.sprintretroapi.retro.service.dao.PostItDao;
import com.minhhuyle.sprintretroapi.socket.service.SocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class PostItService {
    private final PostItDao postItDao;
    private final SocketService socketService;
    private final AdminViewService adminViewService;

    public PostItService(final PostItDao postItDao, final SocketService socketService, final AdminViewService adminViewService) {
        this.postItDao = postItDao;
        this.socketService = socketService;
        this.adminViewService = adminViewService;
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

    public void vote(final PostIt postIt) {
        Optional<PostIt> postItOpt = postItDao.findById(postIt.getId());
        if(postItOpt.isPresent()) {
            PostIt postItLoaded = postItOpt.get();
            if(postIt.getVote() > 0) {
                postItLoaded.voteUp();
            } else {
                postItLoaded.voteDown();
            }
            PostIt postItSaved = this.postItDao.save(postItLoaded);
            socketService.notifyAllSockets(postItSaved);
        }
    }

    public void reset() {
        postItDao.deleteAll();
        socketService.notifyAllSocketsToReset();
    }

    @Transactional
    public void linkPost(final LinkPost linkPost) {
        PostIt childPostIt = postItDao.findById(linkPost.getChildId()).orElseThrow(IllegalArgumentException::new);
        PostIt parentPostIt = postItDao.findById(linkPost.getParentId()).orElseThrow(IllegalArgumentException::new);
        childPostIt.setParent(parentPostIt);
        parentPostIt.addChildPostIt(childPostIt);
        postItDao.save(parentPostIt);
        socketService.notifyAllSocketsToRefresh(parentPostIt.getType());
    }
}
