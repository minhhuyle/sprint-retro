package com.minhhuyle.sprintretroapi.retro.service;

import com.minhhuyle.sprintretroapi.retro.model.PostItType;
import com.minhhuyle.sprintretroapi.retro.service.dao.PostItDao;
import com.minhhuyle.sprintretroapi.retro.model.PostIt;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostItService {
    private final PostItDao postItDao;

    public PostItService(final PostItDao postItDao) {
        this.postItDao = postItDao;
    }

    public void add(final PostIt postIt) {
        if(postIt.getId() != null) {
            throw new IllegalStateException("Cannot save post-it");
        }
        postItDao.save(postIt);
    }

    public List<PostIt> getAll() {
        return (List<PostIt>) postItDao.findAll();
    }

    public Map<PostItType, List<PostIt>> getAllByType() {
        List<PostIt> postItServiceAll = getAll();

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
            this.postItDao.save(postItLoaded);
        }
    }

    public void reset() {
        postItDao.deleteAll();
    }
}
