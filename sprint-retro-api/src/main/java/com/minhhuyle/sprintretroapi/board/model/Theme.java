package com.minhhuyle.sprintretroapi.board.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Theme {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String name;

    // @OneToMany(fetch = FetchType.EAGER, mappedBy = "theme")
    // private List<Board> boards;

    private int limitTimeToWrite;

    private Date writeTime;

    private Date selectedTheme;

    private int maxPostIt;

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

    public Date getSelectedTheme() {
        return selectedTheme;
    }

    public void setSelectedTheme(final Date selectedTheme) {
        this.selectedTheme = selectedTheme;
    }

    public int getMaxPostIt() {
        return maxPostIt;
    }

    public void setMaxPostIt(final int maxPostIt) {
        this.maxPostIt = maxPostIt;
    }
}
