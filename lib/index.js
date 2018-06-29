"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  function CheckGelXIFrameReferencePaths(refPaths) {
    refPaths.forEach(function (path) {
      debugger;
      if (t.isJSXOpeningElement(path.parent)) {
        var sandbox = path.parent.attributes.find(function (attr) {
          return attr.name.name === "sandbox";
        });
        if (sandbox) {
          debugger;
          console.warn("WARNING:  you have overriden sandbox attribute of @wdpui/gel-x-iframe");
        }
      }
    });
  }

  var visitor = {
    Program: {
      enter: function enter(path) {
        console.log("start processing", path.hub.file.opts.filenameRelative);
        var bindings = path.scope.bindings;

        for (var key in bindings) {
          var binding = bindings[key];
          if (binding.kind === "module" && binding.referenced) {
            var _path = binding.path;

            if (t.isImportDefaultSpecifier(_path) && t.isImportDeclaration(_path.parent)) {
              if (_path.parent.source.value === "@wdpui/gel-x-iframe") {
                CheckGelXIFrameReferencePaths(binding.referencePaths);
              }
            } else if (t.isImportSpecifier(_path) && t.isImportDeclaration(_path.parent)) {
              if (_path.parent.source.value === "@wdpui/gel-x") {
                CheckGelXIFrameReferencePaths(binding.referencePaths);
              }
            } else {
              // unknow?? shouldn't happen
            }
          }
        }
      }
    },

    JSXOpeningElement: function JSXOpeningElement(_ref2) {
      var node = _ref2.node;

      if (t.isJSXIdentifier(node.name, { name: "iframe" })) {
        throw Error("\n\n Error: can't use <iframe> directly. use @wdpui/gel-x-frame instead");
      }
    }
  };

  return {
    visitor: visitor
  };
};