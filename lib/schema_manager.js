// Generated by CoffeeScript 1.3.3
var SchemaManager,
  __slice = [].slice;

SchemaManager = (function() {

  SchemaManager.normalize = function(schema, namespace) {
    var definition, name, prop_def, prop_name, _ref, _ref1, _ref2, _results;
    namespace || (namespace = schema.id);
    if (schema.$ref && schema.$ref.indexOf("#") === 0) {
      schema.$ref = "" + namespace + schema.$ref;
    }
    _ref = schema.properties;
    _results = [];
    for (name in _ref) {
      definition = _ref[name];
      if (definition.id) {
        if (definition.id.indexOf("#") === 0) {
          definition.id = "" + namespace + definition.id;
        }
      } else {
        definition.id = "" + namespace + "#" + name;
      }
      if (definition["extends"]) {
        if (definition["extends"].$ref && definition["extends"].$ref.indexOf("#") === 0) {
          definition["extends"].$ref = "" + namespace + definition["extends"].$ref;
        }
      }
      if (definition.type === "array" && definition.items.$ref.indexOf("#") === 0) {
        definition.items.$ref = "" + namespace + definition.items.$ref;
      }
      if (definition.type === "object" && ((_ref1 = definition.additionalProperties) != null ? (_ref2 = _ref1.$ref) != null ? _ref2.indexOf("#") : void 0 : void 0) === 0) {
        definition.additionalProperties.$ref = "" + namespace + definition.additionalProperties.$ref;
      }
      if (definition.$ref && definition.$ref.indexOf("#") === 0) {
        definition.$ref = "" + namespace + definition.$ref;
      }
      _results.push((function() {
        var _ref3, _results1;
        _ref3 = definition.properties;
        _results1 = [];
        for (prop_name in _ref3) {
          prop_def = _ref3[prop_name];
          _results1.push(this.normalize(prop_def, namespace));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  SchemaManager.is_primitive = function(type) {
    var name, _i, _len, _ref;
    _ref = ["string", "number", "boolean"];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      if (type === name) {
        return true;
      }
    }
    return false;
  };

  function SchemaManager() {
    var schema, schemas, _i, _len, _ref;
    schemas = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this.schemas = schemas;
    this.names = {};
    this.ids = {};
    this.media_types = {};
    _ref = this.schemas;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      schema = _ref[_i];
      this.register_schema(schema);
    }
  }

  SchemaManager.prototype.register_schema = function(schema) {
    var definition, name, _ref, _results;
    _ref = schema.properties;
    _results = [];
    for (name in _ref) {
      definition = _ref[name];
      this.inherit_properties(definition);
      this.names[name] = definition;
      if (definition.id) {
        this.ids[definition.id] = definition;
      }
      if (definition.mediaType) {
        _results.push(this.media_types[definition.mediaType] = definition);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  SchemaManager.prototype.inherit_properties = function(schema) {
    var key, merged, parent, parent_id, value, _ref, _ref1;
    if (schema["extends"]) {
      parent_id = schema["extends"].$ref;
      parent = this.ids[parent_id];
      if (parent) {
        merged = {
          properties: {}
        };
        _ref = parent.properties;
        for (key in _ref) {
          value = _ref[key];
          merged.properties[key] = value;
        }
        _ref1 = schema.properties;
        for (key in _ref1) {
          value = _ref1[key];
          merged.properties[key] = value;
        }
        return schema.properties = merged.properties;
      } else {
        throw "Could not find parent schema: " + parent_id;
      }
    }
  };

  SchemaManager.prototype.document = function() {
    return this.document_markdown();
  };

  SchemaManager.prototype.document_markdown = function() {
    var name, out, schema, _ref;
    out = [];
    out.push("# Schemas");
    _ref = this.names;
    for (name in _ref) {
      schema = _ref[name];
      out.push(this.schema_doc(name, schema));
    }
    return out.join("\n\n");
  };

  SchemaManager.prototype.schema_doc = function(name, schema) {
    var lines;
    lines = [];
    lines.push("<a id=\"" + (schema.id.replace("#", "/")) + "\"></a>\n## " + name + " ");
    lines.push("```json\n" + (JSON.stringify(schema, null, 2)) + "\n```");
    return lines.join("\n\n");
  };

  return SchemaManager;

})();

module.exports = SchemaManager;