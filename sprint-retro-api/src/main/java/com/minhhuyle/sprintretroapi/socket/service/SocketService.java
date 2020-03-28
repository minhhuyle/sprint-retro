package com.minhhuyle.sprintretroapi.socket.service;

import com.minhhuyle.sprintretroapi.theme.model.Theme;
import com.minhhuyle.sprintretroapi.theme.model.PostIt;
import com.minhhuyle.sprintretroapi.socket.model.SocketMessage;
import com.minhhuyle.sprintretroapi.socket.model.SocketMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import static com.minhhuyle.sprintretroapi.config.WebSocketConfig.SOCKET_DESTINATION;

@Service
public class SocketService {
    private final SimpMessagingTemplate simpMessagingTemplate;

    public SocketService(final SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    public void notifyAllSockets(PostIt postIt){
        this.simpMessagingTemplate.convertAndSend(SOCKET_DESTINATION, SocketMessage.createDataMessage(postIt));
    }

    public void notifyAllSocketsToRefresh(String postItType) {
        this.simpMessagingTemplate.convertAndSend(SOCKET_DESTINATION, SocketMessage.createRefreshMessage(postItType));
    }

    public void notifyAllSocketsToReset() {
        this.simpMessagingTemplate.convertAndSend(SOCKET_DESTINATION, SocketMessage.createResetMessage());
    }

    public void notifySocketWriteBoardEnabled(Theme theme) {
        this.simpMessagingTemplate.convertAndSend(SOCKET_DESTINATION, SocketMessage.createSimpleMessage(SocketMessageType.WRITE_BOARD, theme));
    }
}
