frontend http-in
  bind *:80
  option http-buffer-request
  acl redirect_pingpong req.body -m reg [insert your regular expression here]
  use_backend pingpong_backend if redirect_pingpong

  default_backend web_bk
