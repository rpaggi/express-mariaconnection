var _mariadb,
    _dbConfig,
    _connection; // This is used as a singleton in a single connection strategy

/**
 * Handling connection disconnects, as defined here: https://github.com/felixge/node-mysql
 */
// function handleDisconnect() {
//     _connection = new _mariadb(_dbConfig)
//
//     _connection.connect(function (err) {
//         if (err) {
//             console.log('error when connecting to db:', err);
//             setTimeout(handleDisconnect, 2000);
//         }
//     });
//
//     _connection.on('error', function (err) {
//         console.log('db error', err);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             handleDisconnect();
//         } else {
//             throw err;
//         }
//     });
// }

/**
 * Returns middleware that will handle mysql db connections
 *
 * @param {Object} mariadb - mariadb module
 * @param {Object} dbConfig - object with mysql db options
 * @return {Function}
 * @api public
 */
module.exports = function (mariadb, dbConfig) {

    if (null == mariadb) throw new Error('Missing mariadb module param!');
    if (null == dbConfig) throw new Error('Missing dbConfig module param!');

    // Setting _mariadb module ref
    _mariadb = mariadb;

    // Setting _dbConfig ref
    _dbConfig = dbConfig;

    return function (req, res, next) {
        var requestConnection;

        // getConnection creates new connection
        req.getConnection = function (callback) {
            // Returning cached connection, caching is on request level
            if (requestConnection) return callback(null, requestConnection);
            // Creating new connection
            var connection = new _mariadb
            connection.connect(dbConfig, function(){
              if(connection.connected){
                requestConnection = connection;
                callback(null, requestConnection);
              }
            });
            connection.on('error', function(err){
              return callback(err);
            })
        }

        var end = res.end;
        res.end = function (data, encoding) {

            // Ending request connection if available
            if (requestConnection) requestConnection.end();

            res.end = end;
            res.end(data, encoding);
        }

        next();
    }
}
