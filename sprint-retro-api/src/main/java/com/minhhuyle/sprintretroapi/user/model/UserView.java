package com.minhhuyle.sprintretroapi.user.model;

import javax.persistence.*;

@Entity
public class UserView {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String userName;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

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
}
