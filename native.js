'use strict'

const path    = require('path')
const process = require('child_process')

const exe = path.join(__dirname, 'CoreLocationCLI')
const args = [
	  '-once', 'YES'
	, '-format', '%latitude||%longitude||%h_accuracy'
]

const native = (timeout, locate, cb) => {
	timeout = timeout || 10000
	locate = locate || exe

	process.execFile(locate, args, {timeout}, (err, out) => {
		if (err) {
			if (err.signal === 'SIGTERM') return cb(new Error('timeout'))
			return cb(err)
		}

		out = out.split('||')
		cb(null, {
			  latitude:  parseFloat(out[0])
			, longitude: parseFloat(out[1])
			, precision: parseFloat(out[2])
			, native:    true
		})
	})
}

module.exports = native
