const assert = require('assert')
const msg = require('./msg')

it('request message should be built properly', () => {
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

it('response messgae should be build properly', () => {
    // TODO COMPLETE
})