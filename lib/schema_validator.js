// Generated by CoffeeScript 1.3.3
var JSV, SchemaValidator;

JSV = require("JSV").JSV;

SchemaValidator = (function() {

  function SchemaValidator(schema_manager) {
    var schema, _i, _len, _ref;
    this.schema_manager = schema_manager;
    this.jsv = JSV.createEnvironment("json-schema-draft-03");
    _ref = this.schema_manager.schemas;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      schema = _ref[_i];
      this.jsv.createSchema(schema, false, schema.id);
    }
  }

  SchemaValidator.prototype.get_schema = function(id) {
    var schema_url;
    schema_url = "urn:" + id;
    return this.jsv.findSchema(schema_url);
  };

  SchemaValidator.prototype.validate = function(id, data) {
    var schema;
    schema = this.get_schema(id);
    if (schema) {
      return this.jsv.validate(data, schema, function(error) {
        return console.log(error);
      });
    } else {
      throw "unknown schema id: " + id;
    }
  };

  return SchemaValidator;

})();

module.exports = SchemaValidator;