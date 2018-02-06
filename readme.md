# *location*

**Get your current location from the OS**, using [a small Swift helper](https://github.com/kiliankoe/location) and [`wifi-triangulate`](https://github.com/watson/wifi-triangulate).

*Linux or Windows user?* Help me support them with this module!

[![build status](https://img.shields.io/travis/derhuerst/location.svg)](https://travis-ci.org/derhuerst/location)
[![dependency status](https://img.shields.io/david/derhuerst/location.svg)](https://david-dm.org/derhuerst/location)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/location.svg)](https://david-dm.org/derhuerst/location#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/location.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)

See also:

- [`browser-location`](https://github.com/derhuerst/browser-location) for Browsers
- [`isomorphic-location`](https://github.com/derhuerst/isomorphic-location) for Browsers & Node


## Installing

```shell
npm install @derhuerst/location
```

Keep in mind that the npm package contains a binary that will be executed. If you don't trust me or think that your users won't trust me, build the binary yourself from [the source code](https://github.com/kiliankoe/location/tree/master/Sources/location).


## Usage

```js
const location = require('@derhuerst/location')

location((err, loc) => {
	if (err) console.error(err)
	else console.log(loc)
})
```

This will give you something similar to the following:

```js
{
	latitude: 52.547172,
	longitude: 13.347745,
	precision: 65, // in meters
	native: true
}
```

## API

```js
location([timeout], cb)
```

`timeout` is in milliseconds, optional and `10 * 1000` by default. `cb(err, loc)` follows the [Node callback convention](https://stackoverflow.com/a/40512067).


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/location/issues).
