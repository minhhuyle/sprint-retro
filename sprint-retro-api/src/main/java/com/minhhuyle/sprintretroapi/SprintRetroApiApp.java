package com.minhhuyle.sprintretroapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class SprintRetroApiApp {

    public static void main(String[] args) {
        SpringApplication.run(SprintRetroApiApp.class, args);
        System.out.println("http://localhost:3000/");
    }
}