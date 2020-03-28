package com.minhhuyle.sprintretroapi.theme.service;

import com.minhhuyle.sprintretroapi.theme.model.PostIt;
import com.minhhuyle.sprintretroapi.theme.model.VotedPostItUser;
import com.minhhuyle.sprintretroapi.theme.service.dao.VotedPostItUserDao;
import com.minhhuyle.sprintretroapi.user.model.UserView;
import org.springframework.stereotype.Service;

@Service
public class VotedPostItUserService {
    private final VotedPostItUserDao votedPostItUserDao;

    public VotedPostItUserService(final VotedPostItUserDao votedPostItUserDao) {
        this.votedPostItUserDao = votedPostItUserDao;
    }

    public void saveNewVotedPostItUser(final PostIt postItLoaded, final UserView userLogged) {
        VotedPostItUser votedPostItUser = new VotedPostItUser();
        votedPostItUser.setPostIt(postItLoaded);
        votedPostItUser.setUser(userLogged);
        VotedPostItUser votedLinkSaved = votedPostItUserDao.save(votedPostItUser);
        userLogged.getVotedLink().add(votedLinkSaved);
        postItLoaded.getVotedLink().add(votedLinkSaved);
    }

    public void deleteAll() {
        votedPostItUserDao.deleteAll();
    }
}
