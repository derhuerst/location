'use strict'

const path    = require('path')
const process = require('child_process')
const triangulate = require('wifi-triangulate')

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

const nonNative = (timeout, locate, cb) => {
	timeout = timeout || 10000
	locate = locate || triangulate

	let succeeded = false, timer
	locate((err, data) => {
		if (succeeded) return
		succeeded = true
		clearTimeout(timer)

		if (err) return cb(err)
		cb(null, {
			latitude:  data.lat,
			longitude: data.lng,
			precision: data.accuracy,
			native:    false
		})
	})
	timer = setTimeout(() => {
		if (succeeded) return
		succeeded = true
		cb(new Error('timeout'))
	}, timeout)
}

const location = (timeout, cb) => {
	if ('function' === typeof timeout) {
		cb = timeout
		timeout = 10000
	}

	native(timeout, null, (err, loc) => {
		if (!err) return cb(null, loc)
		nonNative(timeout, null, cb)
	})
}

module.exports = Object.assign(location, {native, nonNative})
