package com.minhhuyle.sprintretroapi.user.dto;

import com.minhhuyle.sprintretroapi.user.model.Role;
import com.minhhuyle.sprintretroapi.user.model.UserView;

public class UserDTO {
    private Long id;

    private String userName;
    private String password;
    private long totalVotedPostIts;
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

    public long getTotalVotedPostIts() {
        return totalVotedPostIts;
    }

    public void setTotalVotedPostIts(final long totalVotedPostIts) {
        this.totalVotedPostIts = totalVotedPostIts;
    }

    public static UserDTO extractFrom(final UserView userView) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userView.getId());
        userDTO.setUserName(userView.getUserName());
        userDTO.setRole(userView.getRole());
        return userDTO;
    }
}
