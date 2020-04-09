package com.minhhuyle.sprintretroapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;


@SpringBootApplication
public class SprintRetroApiApp extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(SprintRetroApiApp.class, args);
        System.out.println("http://localhost:3000/");
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(SprintRetroApiApp.class);
    }
}