package com.minhhuyle.sprintretroapi.config.security;

class SecurityConstant {
    // TODO: 21/04/2020 modify
    static final String SECRET = "SecretKeyToGenJWTs";
    static final long EXPIRATION_TIME = 864_000_000; // 10 days
    static final String TOKEN_PREFIX = "Bearer ";
    static final String HEADER_STRING = "Authorization";
    static final String LOGIN_IN_PATH = "/user/log-in";
}
