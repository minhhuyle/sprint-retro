package com.minhhuyle.sprintretroapi.socket.model;

public enum SocketMessageType {
    REFRESH,
    RESET,
    DATA,
    WRITE_BOARD,

    REFRESH_THEME,
    REFRESH_VOTE,

    WRITE_BOARD_START,
    WRITE_BOARD_STOP
}
