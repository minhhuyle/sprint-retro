package com.minhhuyle.sprintretroapi.admin.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

@Entity
public class AdminView {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String password;

    private Date creationDate;

    public AdminView() {
        creationDate = new Date();
        createNewRandomPassword();
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(final Date creationDate) {
        this.creationDate = creationDate;
    }

    public boolean isOld() {
        return (LocalDate.now().isAfter(creationDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()));
    }

    public void createNewRandomPassword() {
        this.password = UUID.randomUUID().toString();
    }

    public boolean verifyPassword(final String password) {
        return this.password.equals(password);
    }
}
