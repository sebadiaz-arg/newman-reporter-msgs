const REP_TIMES = 30

var crlf = '\r\n';
var n;

function expand(ch) {
  if (!n || n < REP_TIMES) {
    n = REP_TIMES
  }
  return ch.repeat(n)
}

function line(what) {
  if (!what) {
    return crlf
  }
  return what + crlf
}

function separator(ch) {
  return line(expand(ch))
}

function stringifyRequest(req) {
  let req_method = req.method

  let req_host = req.url.host.join(".")
  if (req.url.port) {
    req_host = req_host + ":" + req.url.port
  }

  let req_path = req.url.path.join("/")

  let req_first_line = req_method + " /" + req_path + " HTTP/1.1"

  // Used to wrap the line with the proper number of cosmetic chars
  n = req_first_line.length

  let req_headers = req.headers.members
  let req_body = ""
  if (req.body) {
    req_body = req.body.raw
  }

  let str = line(req_first_line)
  req_headers.forEach(h => {
    str += line(h.key + ": " + h.value)
  });

  if (req_body) {
    str += line()
    str += line(req_body)
  }

  return str
}

function stringifyResponse(req_method, res, n) {
  let res_first_line = "HTTP/1.1 " + res.code + " " + res.status
  let res_headers = res.headers.members
  let res_body = res.stream
  if (req_method === 'POST' || req_method === 'PUT' || req_method === 'PATCH') {
    let rawBody = res.stream;
    res_body = rawBody.toString();
  }

  let str = line(res_first_line)
  res_headers.forEach(h => {
    str += line(h.key + ": " + h.value)
  });

  if (res_body) {
    str += line()
    str += line(res_body)
  }

  return str
}

exports.separator = separator
exports.stringifyRequest = stringifyRequest
exports.stringifyResponse = stringifyResponse
exports.crlf = crlf