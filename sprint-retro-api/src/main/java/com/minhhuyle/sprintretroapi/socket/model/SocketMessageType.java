package com.minhhuyle.sprintretroapi.socket.model;

public enum SocketMessageType {
    REFRESH,
    RESET,
    DATA,

    REFRESH_THEME,
    REFRESH_VOTE,
    RESET_VOTES,

    WRITE_BOARD_START,
    WRITE_BOARD_STOP
}
