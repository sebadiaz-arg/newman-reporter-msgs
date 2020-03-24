os = require('os')

const CRLF = '\r\n';
const REP_TIMES = 30


function line(what) {
  if (!what) {
    return CRLF
  }
  return what + CRLF
}

function expand(ch, n) {
  if (!n || n < REP_TIMES) {
    n = REP_TIMES
  }
  return ch.repeat(n)
}

/**
 * Reporter that outputs logs to stdout.
 *
 * @param {Object} newman - The collection run object, with event hooks for reporting run details.
 * @param {Object} reporterOptions - The set of options received by this reporter by cli argument
 * @param {Object} options - A set of collection run options.
 * @param {boolean} reporterOptions.native - Optional flag to use native crlf
 * @returns {*}
 */
module.exports = function newmanMsgsReporter(newman, reporterOptions, options) {
  newman.on('start', (err, args) => {
    if (reporterOptions.native) {
      CRLF = os.EOL
    }

    if (options.folder) {
      let str = "ItemGroup: " + options.folder
      console.log(str)
    }
  })

  newman.on('beforeItem', (err, args) => {
    let str = "Test: " + args.item.name
    console.log(str)
  })

  newman.on('beforeIteration', (err, args) => {
    if (options.iterationData.length === 0) return
    let str = "Profile: " + options.iterationData[0].PhoneNumber
    console.log(str)
  })

  newman.on('request', (err, args) => {
    if (err) return

    let req_method = args.request.method

    let req_host = args.request.url.host.join(".")
    if (args.request.url.port) {
      req_host = req_host + ":" + args.request.url.port
    }

    let req_path = args.request.url.path.join("/")

    let req_first_line = req_method + " /" + req_path + " HTTP/1.1"

    // Used to wrap the line with the proper number of cosmetic chars
    let n = req_first_line.length

    let req_headers = args.request.headers.members
    let req_body = ""
    if (args.request.body) {
      req_body = args.request.body.raw
    }

    let res_first_line = "HTTP/1.1 " + args.response.code + " " + args.response.status
    let res_headers = args.response.headers.members
    let res_body = args.response.stream;
    if (req_method === 'POST' || req_method === 'PUT' || req_method === 'PATCH') {
      let rawBody = args.response.stream;
      res_body = rawBody.toString();
    }

    let str = line(expand("=", n))
    str += line(req_first_line)
    req_headers.forEach(h => {
      str += line(h.key + ": " + h.value)
    });

    if (req_body) {
      str += line()
      str += line(req_body)
    }

    str += line(expand("-", n))
    str += line(res_first_line)
    res_headers.forEach(h => {
      str += line(h.key + ": " + h.value)
    });

    if (res_body) {
      str += line()
      str += line(res_body)
    }

    str += line(expand("*", n))
    console.log(str)
  })
}
