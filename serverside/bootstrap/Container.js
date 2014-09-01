
var ngDI 				= require("ng-di");

var container           = ngDI.module("Application", []);

var model               = require('../model/setup/Model');

model.setup();

