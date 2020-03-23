const assert = require('assert')
const msg = require('./msg')

it('separator produces n chars in a line', () => {
  let the_char = 'Y'
  line = msg.separator(the_char)
  // 30 chars + \r + \n
  for (var i in line) {
    if (i < 30) {
      assert.equal(line[i], the_char)
    }
    else if (i == 30) {
      assert.equal(line[i], '\r')
    }
    else if (i == 31) {
      assert.equal(line[i], '\n')
    }
  }
})

it('request message is built properly', () => {
  req = {
      url: {
      auth: undefined,
      protocol: 'https',
      port: undefined,
      path: ["one", "single", "path"],
      hash: undefined,
      host: ["api","uk-cert0","baikalplatform","com"]
    },
    headers: {
      members: [
          {"key": "User-Agent", "value": "PostmanRuntime/7.22.0"},
          {"key": "Accept", "value": "*/*"},
          {"key": "Cache-Control", "value": "no-cache"},
          {"key": "Postman-Token", "value": "5f5fda78-60cf-4e0c-b207-a44a7624c8e0"},
      ],
    },
    method: 'POST',
    body: {
      mode: 'raw',
      raw: '{\r\n\t"product_id": "any-perk-id"\r\n}'
    },
  }


  let str = msg.stringifyRequest(req)

  assert.equal(str, "POST /one/single/path HTTP/1.1" + msg.crlf +
    "User-Agent: PostmanRuntime/7.22.0" + msg.crlf +
    "Accept: */*" + msg.crlf +
    "Cache-Control: no-cache" + msg.crlf +
    "Postman-Token: 5f5fda78-60cf-4e0c-b207-a44a7624c8e0" + msg.crlf +
    msg.crlf +
    "{" + msg.crlf +
    "\t\"product_id\": \"any-perk-id\"" + msg.crlf +
    "}" + msg.crlf
  )
})

it('response message is built properly', () => {
  res = {
    id: '911b343a-3c2b-4251-a8d1-e8d9974ae096',
    _details: {
      name: 'Unauthorized',
      detail: 'Similar to 403 Forbidden, but specifically for use when authentication is possible but has failed or not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource.',
      code: 401,
      standardName: 'Unauthorized'
    },
    status: 'Unauthorized',
    code: 401,
    headers: {
      members: [
        {"key": "Content-Length", "value": 54},
        {"key": "Date", "value": "Mon, 23 Mar 2020 20:01:46 GMT"},
        {"key": "Www-Authenticate", "value": "Bearer realm=\"fp\",error=\"invalid_token\",error_description=\"token expired\""},
        {"key": "Content-Type", "value": "text/plain; charset=utf-8"}
      ]
    },
    stream: "Contenido del body",
    responseTime: 64,
    responseSize: 54
  }

  let str = msg.stringifyResponse(res)

  assert.equal(str, "HTTP/1.1 401 Unauthorized" + msg.crlf +
      "Content-Length: 54" + msg.crlf +
      "Date: Mon, 23 Mar 2020 20:01:46 GMT" + msg.crlf +
      "Www-Authenticate: Bearer realm=\"fp\",error=\"invalid_token\",error_description=\"token expired\"" + msg.crlf +
      "Content-Type: text/plain; charset=utf-8" + msg.crlf +
      msg.crlf +
      "Contenido del body" + msg.crlf
  )
})
