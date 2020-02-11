/*
package com.minhhuyle.sprintretroapi.socket;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping(value = "/socket-queue")
@CrossOrigin("*")
public class SocketRestController {
    private static final ObjectMapper mapper = new ObjectMapper();

    private final SimpMessagingTemplate simpMessagingTemplate;

    public SocketRestController(final SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @PostMapping()
    public ResponseEntity useSimpleRest(@RequestBody Map<String, String> message){
        if(message.containsKey("message")){
            //if the toId is present the message will be sent privately else broadcast it to all users
            if(message.containsKey("toId") && message.get("toId")!=null && !message.get("toId").equals("")){
                this.simpMessagingTemplate.convertAndSend("/socket-publisher/"+message.get("toId"),message);
                this.simpMessagingTemplate.convertAndSend("/socket-publisher/"+message.get("fromId"),message);
            }else{
                this.simpMessagingTemplate.convertAndSend("/socket-publisher",message);
            }
            return new ResponseEntity(message, new HttpHeaders(), HttpStatus.OK);
        }
        return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @MessageMapping("/send/message")
    public Map<String, String> useSocketCommunication(String message){

        Map<String, String> messageConverted = null;
        try {
            messageConverted = mapper.readValue(message, Map.class);
        } catch (IOException e) {
            messageConverted = null;
        }
        if(messageConverted!=null){
            if(messageConverted.containsKey("toId") && messageConverted.get("toId")!=null && !messageConverted.get("toId").equals("")){
                this.simpMessagingTemplate.convertAndSend("/socket-publisher/"+messageConverted.get("toId"),messageConverted);
                this.simpMessagingTemplate.convertAndSend("/socket-publisher/"+messageConverted.get("fromId"),message);
            }else{
                this.simpMessagingTemplate.convertAndSend("/socket-publisher",messageConverted);
            }
        }
        return messageConverted;
    }
}
*/
