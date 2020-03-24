package com.minhhuyle.sprintretroapi.retro.model;


import com.minhhuyle.sprintretroapi.user.model.UserView;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class VotedPostItUser {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private PostIt postIt;

    @ManyToOne
    private UserView user;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public PostIt getPostIt() {
        return postIt;
    }

    public void setPostIt(final PostIt postIt) {
        this.postIt = postIt;
    }

    public UserView getUser() {
        return user;
    }

    public void setUser(final UserView user) {
        this.user = user;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VotedPostItUser that = (VotedPostItUser) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
