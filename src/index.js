export default function({ types: t }) {
  name: 'bochen-first-plugin',

  function CheckGelXIFrameReferencePaths(refPaths) {
    refPaths.forEach(path=> {
      debugger;
      if (t.isJSXOpeningElement(path.parent)) {
         const sandbox = path.parent.attributes.find(attr=>attr.name.name === 'sandbox');
         if(sandbox){
           debugger;
           console.warn(`WARNING:  you have overriden sandbox attribute of @wdpui/gel-x-iframe`)
         }
      }
    });
  }

  const visitor = {
    Program: {
      enter({ scope: { bindings } }) {
        debugger;
        for (const key in bindings) {
          const binding = bindings[key];
          if (binding.kind === "module" && binding.referenced) {
            const { path } = binding;
            if (
              t.isImportDefaultSpecifier(path) &&
              t.isImportDeclaration(path.parent)
            ) {
              if (path.parent.source.value === "@wdpui/gel-x-iframe") {
                CheckGelXIFrameReferencePaths(binding.referencePaths);
              }
            } else if (
              t.isImportSpecifier(path) &&
              t.isImportDeclaration(path.parent)
            ) {
              if (path.parent.source.value === "@wdpui/gel-x") {
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
      debugger;
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
