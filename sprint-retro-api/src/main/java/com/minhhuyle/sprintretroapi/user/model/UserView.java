package com.minhhuyle.sprintretroapi.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.minhhuyle.sprintretroapi.theme.model.VotedPostItUser;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class UserView {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    private Set<VotedPostItUser> votedLink = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(final String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(final Role role) {
        this.role = role;
    }

    public Set<VotedPostItUser> getVotedLink() {
        return votedLink;
    }

    public void setVotedLink(final Set<VotedPostItUser> votedLink) {
        this.votedLink = votedLink;
    }

    public long getTotalVotedPostIts() {
        return votedLink.size();
    }
}
