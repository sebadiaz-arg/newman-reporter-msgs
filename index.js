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
  newman.on('start', (err, args) => {
    if (reporterOptions.native) {
      msg.crlf = os.EOL
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

    // TODO TRACE
    console.log(args)

    // It is needed to first dump the request before separator to obtain the correct
    // length of the first request line
    req = msg.stringifyRequest(args.request)
    let str = msg.separator("=")
    str += req
    str += msg.separator("-")
    str += msg.stringifyResponse(args.response)
    str += msg.separator("*")

    console.log(str)
  })
}

exports.build