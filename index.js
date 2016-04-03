'use strict'

const path    = require('path')
const process = require('child_process')



const executable = path.join(__dirname, 'CoreLocationCLI')
const args = [
	  '-once', 'YES'
	, '-verbose'
	, '-format', '%latitude||%longitude||%h_accuracy'
]

const location = (exe) => new Promise((resolve, reject) => {
	if (arguments.length < 1 || 'string' !== typeof exe) exe = executable
	process.execFile(exe, args, (err, out) => {
		if (err) return reject(err)
		out = out.split('||')
		resolve({
			  latitude:  parseFloat(out[0])
			, longitude: parseFloat(out[1])
			, precision: parseFloat(out[2])
		})
	})
})



module.exports = location
