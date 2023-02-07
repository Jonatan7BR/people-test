"use strict";
exports.__esModule = true;
var express_1 = require("express");
var config_1 = require("./config/config");
var sequelize_1 = require("./config/sequelize");
var routes_1 = require("./routes");
var app = (0, express_1["default"])();
(0, routes_1.routes)(app);
app.listen(config_1.PORT, function () {
    console.log('Server started');
});
sequelize_1.sequelize
    .authenticate()
    .then(function () {
    console.log('Connected to database');
})["catch"](function (error) {
    console.error('Error while connecting to database', error);
});
