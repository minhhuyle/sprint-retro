package com.minhhuyle.sprintretroapi.retro.model;

public class LinkPost {
    private Long childId;
    private Long parentId;

    public Long getChildId() {
        return childId;
    }

    public void setChildId(final Long childId) {
        this.childId = childId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(final Long parentId) {
        this.parentId = parentId;
    }
}
