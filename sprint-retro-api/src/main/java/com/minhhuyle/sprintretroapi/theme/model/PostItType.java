package com.minhhuyle.sprintretroapi.theme.model;

public enum PostItType {
    GOOD("GOOD"),
    KEEP("KEEP"),
    BAD("BAD");

    private String name;

    PostItType(final String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
