os = require('os')
msg = require('./msg')

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
  // Hols the profile during the iteration
  var profile = ''

  newman.on('start', (err, args) => {
    if (err) {
      throw new Error('Error starting reporter : ' + err)
    }

    if (reporterOptions.native) {
      msg.crlf = os.EOL
    }

    if (options.folder) {
      let str = "ItemGroup: " + options.folder
      console.log(str)
    }
  })

  newman.on('beforeItem', (err, args) => {
    let str = 'Profile: ' + profile + msg.crlf
    str += 'Test: ' + args.item.name
    console.log(str)
  })

  newman.on('beforeIteration', (err, args) => {
    if (!options.iterationData || options.iterationData.length === 0) {
      throw new Error('Could not find iterationData')
    }
    if (!options.iterationData[0].PhoneNumber) {
      throw new Error('Could not find "PhoneNumber" in input data')
    }
    // store it sorrounded by quotes to prevent troubles with symbols like +
    profile = '"' + options.iterationData[args.cursor.iteration].PhoneNumber + '"'
  })

  newman.on('request', (err, args) => {
    if (err) {
      throw new Error('Error on request: ' + err)
    }
    // Skip requests not having a Test name. They could be secondary requests happening
    // within a test, but are not interesting for tracing
    if (args.item && !args.item.name) return

    // It is needed to first dump the request before separator to obtain the correct
    // length of the first request line
    req = msg.stringifyRequest(args.request)
    let str = msg.end_of_section()
    str += msg.crlf
    str += req
    str += msg.end_of_section()
    str += msg.crlf
    str += msg.stringifyResponse(args.response)
    str += msg.end_of_section()

    console.log(str)
  })

  newman.on('assertion', (err, args) => {
    const key = err ? 'failed' : args.skipped ? 'skipped' : 'executed'

    switch (key) {
      case "failed":
        console.log('Fail: ' + args.assertion + " - " + args.error.name + " - " + args.error.message)
        break
      case "executed":
        console.log('Success: ' + args.assertion)
        break
    }

  })

  newman.on('test', (err, args) => {
    if (err) {
      throw new Error('Error on test: ' + err)
    }
    console.log(msg.end_of_test())
  })

}

exports.build