const REP_TIMES = 30
const END_OF_SECTION_MARK = "-"
const END_OF_TEST_MARK = "="

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
  return expand(ch)
}

function end_of_section() {
  return separator(END_OF_SECTION_MARK)
}

function end_of_test() {
  return separator(END_OF_TEST_MARK)
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

function stringifyResponse(res) {
  let res_first_line = "HTTP/1.1 " + res.code + " " + res.status
  let res_headers = res.headers.members
  
  let res_body = res.stream
  if (res_body) {
    res_body = res_body.toString()
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
exports.end_of_section = end_of_section
exports.end_of_test = end_of_test
exports.stringifyRequest = stringifyRequest
exports.stringifyResponse = stringifyResponse
exports.crlf = crlf