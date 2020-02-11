package com.minhhuyle.sprintretroapi.socket.service;

import com.minhhuyle.sprintretroapi.retro.model.PostIt;
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
        this.simpMessagingTemplate.convertAndSend(SOCKET_DESTINATION, postIt);
    }
}
