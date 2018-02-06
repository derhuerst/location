'use strict'

const path    = require('path')
const process = require('child_process')

const exe = path.join(__dirname, 'CoreLocationCLI')
const args = ['-json']

const native = (timeout, locate, cb) => {
	timeout = timeout || 10000
	locate = locate || exe

	process.execFile(locate, args, {timeout}, (err, out) => {
		if (err) {
			if (err.signal === 'SIGTERM') return cb(new Error('timeout'))
			return cb(err)
		}

		try {
			out = JSON.parse(out)
		} catch (err) {
			return cb(err)
		}
		// macOS provides more details:
		// - out.altitude
		// - out.direction
		// - out.speed
		// - out.v_accuracy
		// - out.address
		cb(null, {
			latitude: out.latitude,
			longitude: out.longitude,
			precision: out.h_accuracy,
			native: true
		})
	})
}

module.exports = native
