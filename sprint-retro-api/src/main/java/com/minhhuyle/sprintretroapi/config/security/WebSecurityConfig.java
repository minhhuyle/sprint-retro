package com.minhhuyle.sprintretroapi.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static com.minhhuyle.sprintretroapi.config.security.SecurityConstant.LOGIN_IN_PATH;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private static final String[] STATIC_RESOURCES_PATHS = new String[]{"/", "/*.js", "/*.ico", "/*.css", "/*.txt", "/*.eot", "/*.svg", "/*.woff*", "/*.ttf"};
    private static final String[] USER_LOG_PATHS = new String[]{LOGIN_IN_PATH};

    private UserDetailsServiceImpl userDetailsService;
    //private BCryptPasswordEncoder bCryptPasswordEncoder;

    public WebSecurityConfig(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
        // this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> {
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.applyPermitDefaultValues().addAllowedMethod("*");
            return corsConfiguration;
        }).and().csrf().disable().authorizeRequests()
                .antMatchers(USER_LOG_PATHS).permitAll()
                .antMatchers("/socket/**").permitAll()
                .antMatchers(STATIC_RESOURCES_PATHS).permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager()))
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), userDetailsService))
                // this disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }

}