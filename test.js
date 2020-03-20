const assert = require('assert')
const msg = require('./msg')

it('request message should be built properly', () => {
    req = {
        method: "GET",
        url: {
            host: ["my", "host"],
            port: 443,
            path: ["one", "single", "path"]
        },
        headers:{
            members: [
                {"key": "header1", "value": "value1"},
                {"key": "header2", "value": "value2"},
            ]
        },
        body: { raw: undefined}
    }
  
    let str = msg.stringifyRequest(req)

    assert.equal(str.length > 0, true)
    assert.equal(str, "GET /one/single/path HTTP/1.1" + msg.crlf + "header1: value1" + msg.crlf + "header2: value2" + msg.crlf)
})

it('response messgae should be build properly', () => {
    // TODO COMPLETE
})