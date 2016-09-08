#!/usr/bin/env node

'use strict'

const path     = require('path')
const assert   = require('assert')

const location = require('../index')

const showError = (err) => {
	console.error(err.stack)
	process.exit(1)
	throw err
}



location.native(path.join(__dirname, 'success-mock')).catch(showError)
.then((loc) => {

	// case: access granted, location successfully computed
	assert.strictEqual(typeof loc, 'object')
	assert.strictEqual(loc.latitude,  23.456789)
	assert.strictEqual(loc.longitude, 12.345678)
	assert.strictEqual(loc.precision, 10)
	assert.strictEqual(loc.native,    true)

}).catch(showError)

location.native(path.join(__dirname, 'timeout-mock'))
.catch((err) => {

	// case: access denied/disabled or unable to locate
	assert.strictEqual(err.code, 'ETIMEOUT')

}).catch(showError)



const resolveMock = () => new Promise((yay, nay) =>
	setTimeout(() => yay({
		latitude:  23.456789,
		longitude: 12.345678,
		precision: 15,
		native:    false
	}), 2000))

location.nonNative(resolveMock).catch(showError)
.then((loc) => {

	// case: access granted, location successfully computed
	assert.strictEqual(typeof loc, 'object')
	assert.strictEqual(loc.latitude,  23.456789)
	assert.strictEqual(loc.longitude, 12.345678)
	assert.strictEqual(loc.precision, 10)

}).catch(showError)

const rejectMock = () => new Promise((yay, nay) =>
	setTimeout(() => nay(new Error('timeout')), 2000))

location.nonNative(rejectMock)
.catch((err) => {

	// case: access denied/disabled or unable to locate
	assert.strictEqual(err.message, 'timeout')

}).catch(showError)
