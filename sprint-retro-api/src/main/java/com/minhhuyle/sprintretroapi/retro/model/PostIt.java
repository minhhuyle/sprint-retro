package com.minhhuyle.sprintretroapi.retro.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
public class PostIt {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne(cascade={CascadeType.ALL})
    @JoinColumn(name = "parent_id")
    private PostIt parent;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "parent")
    private List<PostIt> linkedPostIts = new ArrayList<>();

    private long vote;

    private String comment;

    private String type;

    private Date creationDate;

    public PostIt() {
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public long getVote() {
        return vote;
    }

    public void voteUp() {
        vote++;
    }

    public void voteDown() {
        vote++;
    }

    public void setVote(final long vote) {
        this.vote = vote;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(final String comment) {
        this.comment = comment;
    }

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public List<PostIt> getLinkedPostIts() {
        return linkedPostIts;
    }

    public void addChildPostIt(PostIt childPostIt) {
        linkedPostIts.add(childPostIt);
    }

    public void setLinkedPostIts(final List<PostIt> linkedPostIts) {
        this.linkedPostIts = linkedPostIts;
    }

    public PostIt getParent() {
        return parent;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(final Date creationDate) {
        this.creationDate = creationDate;
    }

    public void setParent(final PostIt parent) {
        this.parent = parent;
    }
    @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PostIt postIt = (PostIt) o;
        return Objects.equals(id, postIt.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
