## angulartics-chrome-platform-analytics

[![NPM version][npm-image]][npm-url] [![Bower version][bower-image]][bower-url] [![MIT license][license-image]][license-url]

Chrome Platform Analytics plugin for [Angulartics](https://github.com/angulartics/angulartics).

(Chrome Platform Analytics is a Javascript library supporting the use of Google Analytics from Chrome Platform Applications)

Please see [the Chrome Platform Analytics wiki](https://github.com/GoogleChrome/chrome-platform-analytics/wiki) for more information.

## Install

First make sure you've read installation and setup instructions for [Angulartics](https://github.com/angulartics/angulartics#install).

Then you can install this package either with `npm` or with `bower`.

### npm

```shell
npm install angulartics-chrome-platform-analytics
```

Then add `angulartics-chrome-platform-analytics` as a dependency for your app:

```javascript
require('angulartics')

angular.module('myApp', [
  'angulartics',
  require('angulartics-chrome-platform-analytics')
]);
```

> Please note that core Angulartics doesn't export the name yet, but it will once we move it into [the new organization](http://github.com/angulartics).

### bower

```shell
bower install angulartics-chrome-platform-analytics
```

Add the `<script>` to your `index.html`:

```html
<script src="/bower_components/angulartics-chrome-platform-analytics/dist/angulartics-chrome-platform-analytics.min.js"></script>
```

Then add `angulartics-chrome-platform-analytics` as a dependency for your app:

```javascript
angular.module('myApp', [
  'angulartics',
  'angulartics-chrome-platform-analytics'
]);
```

## Changes in the Google Analytics snippet

The snippet code provided by Google Analytics does an automatic pageview hit, but this is already done by Angulartics (unless you disable it) so make sure to delete the tracking line:

```js
      ...
      ga('create', 'UA-XXXXXXXX-X', 'none'); // 'none' while you are working on localhost
      ga('send', 'pageview');  // DELETE THIS LINE!
    </script>
```

Done. Open your app, browse across the different routes and check [the realtime GA dashboard](https://www.google.com/analytics/web/?hl=en#realtime/rt-overview) to see the hits.

## Documentation

Documentation is available on the [Angulartics site](http://luisfarzati.github.io/angulartics).

## Development

```shell
npm run build
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/angulartics-chrome-platform-analytics.svg
[npm-url]: https://npmjs.org/package/angulartics-chrome-platform-analytics
[bower-image]: https://img.shields.io/bower/v/angulartics-chrome-platform-analytics.svg
[bower-url]: http://bower.io/search/?q=angulartics-chrome-platform-analytics
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE
