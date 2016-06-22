express-myconnection
============

It's a fork of [pwalczyszyn/express-myconnection](https://github.com/pwalczyszyn/express-myconnection)

Connect/Express middleware provides a consistent API for MariaDB connections during request/response life cycle. It uses [mariasql](https://github.com/mscdex/node-mariasql) as a MariaDB driver.

### Usage

Configuration is straightforward and you use it as any other middleware. First param it accepts is a  [mariasql](https://github.com/mscdex/node-mariasql) module, second is a db options hash passed to [mariasql](https://github.com/mscdex/node-mariasql) module when connection or pool are created.
    // app.js
    ...
    example
    ...

**express-mariaconnection** extends `request` object with `getConection(callback)` function, this way connection instance can be accessed anywhere in routers during request/response life cycle:

    // myroute.js
    ...
    module.exports = function(req, res, next) {
        ...
        code example
        ...
    }
    ...
