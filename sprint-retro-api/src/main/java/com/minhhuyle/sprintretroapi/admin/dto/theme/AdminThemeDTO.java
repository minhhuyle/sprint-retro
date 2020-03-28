package com.minhhuyle.sprintretroapi.admin.dto.theme;

import com.minhhuyle.sprintretroapi.admin.dto.AdminDTO;
import com.minhhuyle.sprintretroapi.theme.model.Theme;

public class AdminThemeDTO extends AdminDTO {
    private Theme theme;

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(final Theme theme) {
        this.theme = theme;
    }
}
