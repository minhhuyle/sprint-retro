package com.minhhuyle.sprintretroapi.retro.service;

import com.minhhuyle.sprintretroapi.retro.dto.LinkPost;
import com.minhhuyle.sprintretroapi.retro.model.PostItType;
import com.minhhuyle.sprintretroapi.retro.service.dao.PostItDao;
import com.minhhuyle.sprintretroapi.retro.model.PostIt;
import com.minhhuyle.sprintretroapi.socket.service.SocketService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostItService {
    private final PostItDao postItDao;
    private final SocketService socketService;

    public PostItService(final PostItDao postItDao, final SocketService socketService) {
        this.postItDao = postItDao;
        this.socketService = socketService;
    }

    public void add(final PostIt postIt) {
        if(postIt.getId() != null) {
            throw new IllegalStateException("Cannot save post-it");
        }
        PostIt postItSaved = postItDao.save(postIt);
        socketService.notifyAllSockets(postItSaved);
    }

    private List<PostIt> getAll() {
        return (List<PostIt>) postItDao.findAll();
    }

    private List<PostIt> getAllParent() {
        return (List<PostIt>) postItDao.findAllByParentIsNull();
    }

    public Map<PostItType, List<PostIt>> getAllByType() {
        List<PostIt> postItServiceAll = getAllParent();

        Map<PostItType, List<PostIt>> result = new HashMap<>();
        for (PostItType postItType : PostItType.values()) {
            List<PostIt> postItListByType = postItServiceAll.stream().filter(postIt -> postItType.equals(postIt.getType())).collect(Collectors.toList());
            result.put(postItType, postItListByType);
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
