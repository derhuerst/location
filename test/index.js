#!/usr/bin/env node

'use strict'

const path     = require('path')
const assert   = require('assert')

const location = require('..')

const showError = (err) => {
	console.error(err.stack)
	process.exit(1)
	throw err
}

const successMock = path.join(__dirname, 'success-mock')
const timeoutMock = path.join(__dirname, 'timeout-mock')

const triangulate = (t) => (cb) => {
	setTimeout(() => cb(null, {
		lat:  23.456789,
		lng: 12.345678,
		accuracy: 15
	}), t)
}



location.native(5000, successMock, (err, loc) => {
	if (err) showError(err)

	assert.strictEqual(typeof loc, 'object')
	assert.strictEqual(loc.latitude,  23.456789)
	assert.strictEqual(loc.longitude, 12.345678)
	assert.strictEqual(loc.precision, 10)
	assert.strictEqual(loc.native,    true)
})

location.native(5000, timeoutMock, (err, loc) => {
	assert.ok(err)
	assert.strictEqual(err.message, 'timeout')
})



location.nonNative(5000, triangulate(1000), (err, loc) => {
	if (err) showError(err)

	assert.strictEqual(typeof loc, 'object')
	assert.strictEqual(loc.latitude,  23.456789)
	assert.strictEqual(loc.longitude, 12.345678)
	assert.strictEqual(loc.precision, 15)
})

location.nonNative(5000, triangulate(10000), (err, loc) => {
	assert.ok(err)
	assert.strictEqual(err.message, 'timeout')
})
