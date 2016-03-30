# *location*

Get your current location from the OS. It uses [`CoreLocationCLI`](https://github.com/fulldecent/corelocationcli).

[![npm version](https://img.shields.io/npm/v/location.svg)](https://www.npmjs.com/package/location)
[![dependency status](https://img.shields.io/david/derhuerst/location.svg)](https://david-dm.org/derhuerst/location)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/location.svg)](https://david-dm.org/derhuerst/location#info=devDependencies)

*location* [is ISC-licensed](license.md).


## Installing

```shell
npm install location
```


## Usage

```js
const location = require('location')
location().then(console.log)
```

This will give you something similar to the following:

```js
{
	  latitude:  52.547172
	, longitude: 13.347745
	, precision: 65  // in meters
}
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/location/issues).
