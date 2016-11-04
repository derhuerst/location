'use strict'

const path    = require('path')
const process = require('child_process')
const triangulate = require('wifi-triangulate')



const exe = path.join(__dirname, 'CoreLocationCLI')
const args = [
	  '-once', 'YES'
	, '-format', '%latitude||%longitude||%h_accuracy'
]

const native = (timeout = 10000, locate = exe) =>
	new Promise((resolve, reject) => {
		process.execFile(locate, args, {timeout}, (err, out) => {

			if (err) {
				if (err.signal === 'SIGTERM') return reject(new Error('timeout'))
				else return reject(err)
			}

			out = out.split('||')
			resolve({
				  latitude:  parseFloat(out[0])
				, longitude: parseFloat(out[1])
				, precision: parseFloat(out[2])
				, native:    true
			})
		})
	})



const nonNative = (timeout = 10000, locate = triangulate) =>
	new Promise((resolve, reject) => {
		let succeeded = false, timer
		locate((err, data) => {
			succeeded = true
			clearTimeout(timer)
			if (err) return reject(err)
			resolve({
				latitude:  data.lat,
				longitude: data.lng,
				precision: data.accuracy,
				native:    false
			})
		})
		timer = setTimeout(() => {
			if (!succeeded) reject(new Error('timeout'))
		}, timeout)
	})



const location = () => native().catch(() => nonNative())

module.exports = Object.assign(location, {native, nonNative})
