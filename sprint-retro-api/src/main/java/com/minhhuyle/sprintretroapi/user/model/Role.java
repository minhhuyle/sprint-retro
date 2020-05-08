package com.minhhuyle.sprintretroapi.user.model;

public enum Role {
    ADMIN("ADMIN"),
    USER("USER");

    private String name;

    Role(final String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
