var fs = require('fs');

var Tpl = function () { };

Tpl.prototype.process = function (tpl, vars) {
    for (var attr in vars)
      if (vars.hasOwnProperty(attr))
        tpl = this.replaceAll(tpl, "[" + attr + "]", vars[attr]);
    return tpl;
};

Tpl.prototype.build = function (template, vars, callback) {
    $this = this;
    this.resolveTemplate(template, function (err,body) {
      callback(err,$this.process(body,vars));
    });
};

Tpl.prototype.resolveTemplate = function(template,callback){
    $this = this;
    if(template === undefined){
      console.log("Template not found or not defined");
      return callback("Template not found or not defined", null);
    }

    console.info("Looking for " + template );
    fs.readFile("views/mailing/" + template, {encoding: "UTF-8"}, function (err, body) {
      if (err) return callback(err);

      return callback(null, body);
    });
};

Tpl.prototype.escapeRegExp = function (string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

Tpl.prototype.replaceAll = function (string, find, replace) {
  return string.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
};

exports.Tpl = new Tpl();
