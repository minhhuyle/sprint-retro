package com.minhhuyle.sprintretroapi.socket.model;

import com.minhhuyle.sprintretroapi.retro.model.PostIt;
import com.minhhuyle.sprintretroapi.retro.model.PostItType;

public class SocketMessage {
    private SocketMessageType type;
    private Object data;

    private SocketMessage() {
    }

    private SocketMessage(final SocketMessageType type, final Object data) {
        this.type = type;
        this.data = data;
    }

    public SocketMessageType getType() {
        return type;
    }

    public void setType(final SocketMessageType type) {
        this.type = type;
    }

    public Object getData() {
        return data;
    }

    public void setData(final Object data) {
        this.data = data;
    }

    public static SocketMessage createDataMessage(PostIt postIt) {
        return new SocketMessage(SocketMessageType.DATA, postIt);
    }

    public static SocketMessage createRefreshMessage(String postItType) {
        return new SocketMessage(SocketMessageType.REFRESH, postItType);
    }

    public static SocketMessage createResetMessage() {
        SocketMessage socketMessage = new SocketMessage();
        socketMessage.setType(SocketMessageType.RESET);
        return socketMessage;
    }
}
