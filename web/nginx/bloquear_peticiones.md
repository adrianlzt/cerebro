# Block WordPress Pingback DDoS attacks
if ($http_user_agent ~* "WordPress") {
    return 403;
}
