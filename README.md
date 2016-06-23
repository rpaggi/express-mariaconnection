express-myconnection
============

It's a fork of [pwalczyszyn/express-myconnection](https://github.com/pwalczyszyn/express-myconnection)

Connect/Express middleware provides a consistent API for MariaDB connections during request/response life cycle. It uses [mariasql](https://github.com/mscdex/node-mariasql) as a MariaDB driver.

### Usage

Configuration is straightforward and you use it as any other middleware. First param it accepts is a  [mariasql](https://github.com/mscdex/node-mariasql) module, second is a db options hash passed to [mariasql](https://github.com/mscdex/node-mariasql) module when connection or pool are created.

    // app.js

    var mariadb = require('mariasql');
    var connection = require('express-mariaconnection');

    var dbinfo = {
      host: 'localhost',
      user: 'root',
      password : '',
      charset: 'utf8',
      db: 'mydatabase'
    }

    app.use(connection(mariadb,dbinfo));

**express-mariaconnection** extends `request` object with `getConection(callback)` function, this way connection instance can be accessed anywhere in routers during request/response life cycle:

    // myroute.js

    module.exports = function(req, res) {
    	req.getConnection(function(err,connection){
        connection.query('SHOW TABLES;',[],function(err,result){
    			if(err) return res.status(400).json(err);

    			return res.status(200).json(result);
        });
      });
    }
