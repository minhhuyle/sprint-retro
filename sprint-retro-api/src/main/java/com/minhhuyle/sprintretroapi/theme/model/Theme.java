package com.minhhuyle.sprintretroapi.theme.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Theme {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "theme", cascade = CascadeType.ALL)
    private List<Board> boards = new ArrayList<>();

    private int limitTimeToWrite;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date writeTime;

    private boolean selectedTheme;

    private int maxPostIt;

    private int maxVote;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public int getLimitTimeToWrite() {
        return limitTimeToWrite;
    }

    public void setLimitTimeToWrite(final int limitTimeToWrite) {
        this.limitTimeToWrite = limitTimeToWrite;
    }

    public Date getWriteTime() {
        return writeTime;
    }

    public void setWriteTime(final Date writeTime) {
        this.writeTime = writeTime;
    }

    public boolean isSelectedTheme() {
        return selectedTheme;
    }

    public void setSelectedTheme(final boolean selectedTheme) {
        this.selectedTheme = selectedTheme;
    }

    public int getMaxPostIt() {
        return maxPostIt;
    }

    public void setMaxPostIt(final int maxPostIt) {
        this.maxPostIt = maxPostIt;
    }

    public int getMaxVote() {
        return maxVote;
    }

    public void setMaxVote(final int maxVote) {
        this.maxVote = maxVote;
    }

    public List<Board> getBoards() {
        return boards;
    }

    public void setBoards(final List<Board> boards) {
        this.boards = boards;
    }
}
