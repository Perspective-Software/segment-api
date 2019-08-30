/**
 *
 * @param {Object} config
 * @param {String} [config.workspace]
 * @param {String} [config.source]
 * @param {String} [config.destination]
 * @param {String} [config.append]
 * @return {string}
 */
function buildPath({
                     workspace,
                     source,
                     destination,
                     append,
                   }) {
  const parts = [];

  if (workspace) {
    parts.push('workspaces', workspace);
  }
  if (source) {
    parts.push('sources', source);
  }
  if (destination) {
    parts.push('destinations', destination);
  }
  if (append) {
    parts.push(append);
  }

  return parts.filter(Boolean).join('/');
}


function createMethod(method) {
  return function(params) {
    let {workspace, source, destination, path} = params;

    if (!path) {
      path = buildPath({
        workspace: workspace || this.WORKSPACE,
        source,
        destination
      });
    }

    return method.call(this, {
      ...params,
      path,
    });
  };
}

module.exports = {
  buildPath,
  createMethod
}
