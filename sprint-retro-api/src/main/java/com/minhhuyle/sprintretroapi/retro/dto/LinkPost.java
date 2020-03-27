package com.minhhuyle.sprintretroapi.retro.dto;

import java.util.List;

public class LinkPost {
    private List<Long> childIds;
    private Long parentId;

    public List<Long> getChildIds() {
        return childIds;
    }

    public void setChildIds(final List<Long> childIds) {
        this.childIds = childIds;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(final Long parentId) {
        this.parentId = parentId;
    }
}
