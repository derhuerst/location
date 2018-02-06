'use strict'

const triangulate = require('wifi-triangulate')

const native = require('./native')

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
