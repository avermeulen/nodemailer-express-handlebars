'use strict';

var path = require('path'),
    handlebars = require('express-handlebars');

var TemplateGenerator = function(opts) {
    // what is opts.viewEngine...?
    var viewEngine = opts.viewEngine || {};
    if (!viewEngine.renderView) {
        // ensure that we can  pass external helpers to Handlebars
        viewEngine = handlebars.create(opts || {});
    }
    this.viewEngine = viewEngine;
    this.viewPath = opts.viewPath;
    this.extName = opts.extName || '.handlebars';
};

TemplateGenerator.prototype.render = function render(mail, cb) {
    if (mail.data.html) return cb();

    var templatePath = path.join(this.viewPath, mail.data.template + this.extName);

    this.viewEngine.renderView(templatePath, mail.data.context, function(err, body) {
        if (err) return cb(err);

        mail.data.html = body;
        cb();
    });
};

module.exports = TemplateGenerator;