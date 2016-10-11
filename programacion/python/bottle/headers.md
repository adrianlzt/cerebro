def notify():
    logging.info("== HEADERS ==")
    for key, val in request.headers.items():
        logging.info("%s: %s", key, val)
    return "hola!"

