package com.minhhuyle.sprintretroapi.retro.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class PostIt {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private long vote;

    private String comment;

    private PostItType type;

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

    public PostItType getType() {
        return type;
    }

    public void setType(final PostItType type) {
        this.type = type;
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
