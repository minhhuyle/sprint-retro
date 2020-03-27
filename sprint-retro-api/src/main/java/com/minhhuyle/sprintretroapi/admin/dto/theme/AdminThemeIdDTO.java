package com.minhhuyle.sprintretroapi.admin.dto.theme;

import com.minhhuyle.sprintretroapi.admin.dto.AdminDTO;

public class AdminThemeIdDTO extends AdminDTO {
    private long themeId;

    public long getThemeId() {
        return themeId;
    }

    public void setThemeId(final long themeId) {
        this.themeId = themeId;
    }
}
