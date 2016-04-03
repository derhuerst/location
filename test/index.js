#!/usr/bin/env node

'use strict'

const path     = require('path')
const assert   = require('assert')

const location = require('../index')

const showError = (err) => {
	console.error(err.stack)
	process.exit(1)
}



location(path.join(__dirname, '..', 'CoreLocationCLI')).catch(showError)
.then((loc) => {

	assert.strictEqual(typeof loc, 'object')
	assert.strictEqual(typeof loc.latitude,  'number')
	assert.ok(-90  <= loc.latitude  <=  90)
	assert.strictEqual(typeof loc.longitude, 'number')
	assert.ok(-180 <= loc.longitude <= 180)
	assert.strictEqual(typeof loc.precision, 'number')
	assert.ok(loc.precision > 0)

})
