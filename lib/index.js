'use strict';

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  name: 'bochen-first-plugin', function CheckGelXIFrameReferencePaths(refPaths) {
    refPaths.forEach(function (path) {
      debugger;
      if (t.isJSXOpeningElement(path.parent)) {
        var sandbox = path.parent.attributes.find(function (attr) {
          return attr.name.name === 'sandbox';
        });
        if (sandbox) {
          debugger;
          console.warn('WARNING:  you have overriden sandbox attribute of @wdpui/gel-x-iframe');
        }
      }
    });
  };

  var visitor = {
    Program: {
      enter: function enter(_ref2) {
        var bindings = _ref2.scope.bindings;

        debugger;
        for (var key in bindings) {
          var binding = bindings[key];
          if (binding.kind === "module" && binding.referenced) {
            var path = binding.path;

            if (t.isImportDefaultSpecifier(path) && t.isImportDeclaration(path.parent)) {
              if (path.parent.source.value === "@wdpui/gel-x-iframe") {
                CheckGelXIFrameReferencePaths(binding.referencePaths);
              }
            } else if (t.isImportSpecifier(path) && t.isImportDeclaration(path.parent)) {
              if (path.parent.source.value === "@wdpui/gel-x") {
                CheckGelXIFrameReferencePaths(binding.referencePaths);
              }
            } else {}
          }
        }
      }
    },

    JSXOpeningElement: function JSXOpeningElement(_ref3) {
      var node = _ref3.node;

      debugger;
      if (t.isJSXIdentifier(node.name, { name: "iframe" })) {
        throw Error('\n\n Error: can\'t use <iframe> directly. use @wdpui/gel-x-frame instead');
      }
    }
  };

  return {
    visitor: visitor
  };
};

module.exports = exports['default'];