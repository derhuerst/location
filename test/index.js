#!/usr/bin/env node

'use strict'

const path     = require('path')
const assert   = require('assert')

const location = require('../index')

const showError = (err) => {
	console.error(err.stack)
	process.exit(1)
}



location(path.join(__dirname, 'success-mock')).catch(showError)
.then((loc) => {

	// case: access granted, location successfully computed
	assert.strictEqual(typeof loc, 'object')
	assert.strictEqual(loc.latitude,  23.456789)
	assert.strictEqual(loc.longitude, 12.345678)
	assert.strictEqual(loc.precision, 10)

}).catch(showError)

location(path.join(__dirname, 'timeout-mock'))
.catch((err) => {

	// case: access denied/disabled or unable to locate
	assert.strictEqual(err.code, 'ETIMEOUT')

}).catch(showError)
