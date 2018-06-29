const __gelx_lib_name = "@wdpui/gel-x";
const __gelx_iframe_export_name = "GelXIFrame";
const __gelx_iframe_name = "@wdpui/gel-x-frame";

export default function({ types: t }) {
  function CheckGelXIFrameReferencePaths(refPaths) {
    refPaths.forEach(path => {
      debugger;
      if (t.isJSXOpeningElement(path.parent)) {
        const sandbox = path.parent.attributes.find(
          attr => attr.name.name === "sandbox"
        );
        if (sandbox) {
          debugger;
          console.warn(
            `WARNING:  you have overriden sandbox attribute of @wdpui/gel-x-iframe to ${sandbox.value.value}`
          );
        }
      }
    });
  }

  const visitor = {
    Program: {
      enter(path) {
        console.log("start processing", path.hub.file.opts.filenameRelative);
        const {
          scope: { bindings }
        } = path;
        for (const key in bindings) {
          const binding = bindings[key];
          if (binding.kind === "module" && binding.referenced) {
            const { path } = binding;
            if (
              t.isImportDefaultSpecifier(path) &&
              t.isImportDeclaration(path.parent)
            ) {
              // defualt import case;
              if (path.parent.source.value === __gelx_iframe_name) {
                CheckGelXIFrameReferencePaths(binding.referencePaths);
              }
            } else if (
              t.isImportSpecifier(path) &&
              t.isImportDeclaration(path.parent)
            ) {
              // named import case;
              if (
                path.node.imported.name === __gelx_iframe_export_name &&
                path.parent.source.value === __gelx_lib_name
              ) {
                CheckGelXIFrameReferencePaths(binding.referencePaths);
              }
            } else {
              // unknow?? shouldn't happen
            }
          }
        }
      }
    },

    JSXOpeningElement({ node }) {
      if (t.isJSXIdentifier(node.name, { name: "iframe" })) {
        throw Error(
          `\n\n Error: can't use <iframe> directly. use @wdpui/gel-x-frame instead`
        );
      }
    }
  };

  return {
    visitor
  };
}
