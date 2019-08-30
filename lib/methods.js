const _ = require('lodash');
const API_METHODS = require('./request-type');
const {createMethod} = require('./helper');

/**
 *
 * @param config
 * @param [config.username = Default Username]
 * @param [config.password = Default Password]
 * @return {{method : string, auth : {password, username}, url : string}}
 */
function getTokenList({username, password}) {
  const config = {
    method: API_METHODS.GET,
    url: '/access-tokens',
    auth: {},
  };

  if (username) {
    _.set(config, 'auth.username', username);
  }

  if (password) {
    _.set(config, 'auth.password', password);
  }

  return config;

}

function getWorkspaceList() {
  return {
    method: API_METHODS.GET,
    url: '/workspaces',
  };
}

/**
 *
 * @param {Object} config
 * @param {String} config.workspace
 * @param {String} [config.path]
 * @return {{method : string, url : string}}
 */
function getWorkspace({
                        workspace = this.WORKSPACE,
                        path,
                      }) {
  return {
    method: API_METHODS.GET,
    url: path,
  };
}

/**
 *
 * @param {Object} config
 * @param {String} [config.pageSize]
 * @param {String} [config.pageToken]
 * @return {{method : string, data : {page_token : *, page_size : *}, url : string}}
 */
function getCatalogSourceList({
                                pageSize,
                                pageToken,
                              }) {
  return {
    method: API_METHODS.GET,
    url: `/catalog/sources`,
    data: {
      page_size: pageSize,
      page_token: pageToken,
    },

  };
}

/**
 *
 * @param {Object} config
 * @param {String} config.source
 * @return {{method : string, url : string}}
 */
function getCatalogSource({
                            source,
                          }) {
  return {
    method: API_METHODS.GET,
    url: `/catalog/sources/${source}`,
  };
}

/**
 *
 * @param {Object} config
 * @param {String} [config.pageSize]
 * @param {String} [config.pageToken]
 * @return {{method : string, data : {page_token : *, page_size : *}, url : string}}
 */
function getCatalogDestinationList({
                                     pageSize,
                                     pageToken,
                                   }) {
  return {
    method: API_METHODS.GET,
    url: `/catalog/destinations`,
    data: {
      page_size: pageSize,
      page_token: pageToken,
    },

  };
}

/**
 *
 * @param {Object} config
 * @param {String} config.destination
 * @return {{method : string, url : string}}
 */
function getCatalogDestination({
                                 destination,
                               }) {
  return {
    method: API_METHODS.GET,
    url: `/catalog/destinations/${destination}`,
  };
}

/**
 *
 * @param {Object} config
 * @param {String} [config.source]
 * @param {String} [config.path]
 * @param {String} [config.workspace]
 * @param {String} [config.catalogName]
 * @return {{method : string, data : {source : {catalog_name : *, name : string}}, url : string}}
 */
function createSource({
                        source,
                        path,
                        workspace = this.WORKSPACE,
                        catalogName = this.CATALOG_SOURCE,
                      }) {
  return {
    method: API_METHODS.POST,
    url: path.replace(source, ''), // remove last part
    data: {
      source: {
        name: path,
        catalog_name: catalogName,
      },
    },
  };
}

/**
 *
 * @param {Object} config
 * @param {String} [config.path]
 * @param {String} [config.workspace]
 * @param {String} [config.pageSize]
 * @param {String} [config.pageToken]
 * @return {{method : string, data : {page_token : *, page_size : *}, url : string}}
 */
function getSourceList({
                         path,
                         workspace = this.WORKSPACE,
                         pageSize,
                         pageToken,
                       }) {
  return {
    method: API_METHODS.GET,
    url: `${path}/sources`,
    data: {
      page_size: pageSize,
      page_token: pageToken,
    },
  };
}

/**
 *
 * @param {Object} config
 * @param {String} [config.path]
 * @param {String} [config.source]
 * @param {String} [config.workspace]
 * @return {{method : string, url : string}}
 */
function getSource({
                     path,
                     source,
                     workspace = this.WORKSPACE,
                   }) {
  return {
    method: API_METHODS.GET,
    url: path,
  };
}

/**
 *
 * @param {Object} config
 * @param {String} config.sourceName
 * @param {String} [config.workspace]
 * @return {{method : string, url : string}}
 */
function deleteSource({
                        path,
                        source,
                        workspace = this.WORKSPACE,
                      }) {
  return {
    method: API_METHODS.DELETE,
    url: path,
  };
}

/**
 *
 * @param {Object} config
 * @param {String} config.destination
 * @param {String} config.source
 * @param {Object} config.destinationConfig
 * @param {String} [config.path]
 * @param {String} [config.workspace]
 * @param {Boolean} [config.enabled = true]
 * @return {{method : string, data : {destination : {name : string, config : *, enabled : boolean}}, url : string}}
 */
function createDestination({
                             destination,
                             source,
                             destinationConfig,
                             path,
                             workspace = this.WORKSPACE,
                             connectionMode = this.CONNECTION_MODE,
                             enabled = true,
                           }) {
  return {
    method: API_METHODS.POST,
    url: path.replace(destination, ''),
    data: {
      destination: {
        name: path,
        config: destinationConfig.map(({name, value}) => {
          let configName = name;
          if (name.indexOf(path) === -1) {
            configName = `${path}/config/${name}`;
          }

          return {
            name: configName,
            value,
          };
        }),
        connection_mode: connectionMode,
        enabled,
      },
    },
  };
}

/**
 *
 * @param {Object} config
 * @param {String} config.source
 * @param {String} [config.path]
 * @param {String} [config.workspace]
 * @param {String} [config.pageSize]
 * @param {String} [config.pageToken]
 * @return {{method : string, data : {page_token : *, page_size : *}, url : string}}
 */
function getDestinationList({
                              source,
                              path,
                              workspace = this.WORKSPACE,
                              pageSize,
                              pageToken,
                            }) {
  return {
    method: API_METHODS.GET,
    url: `${path}/destinations`,
    data: {
      page_size: pageSize,
      page_token: pageToken,
    },
  };
}

/**
 *
 * @param {Object} config
 * @param {String} [config.destination]
 * @param {String} [config.source]
 * @param {String} [config.path]
 * @param {String} [config.workspace]
 * @return {{method : string, url : string}}
 */
function getDestination({
                          path,
                          destination,
                          source,
                          workspace = this.WORKSPACE,
                        }) {
  return {
    method: API_METHODS.GET,
    url: path,
  };
}

/**
 *
 * @param {Object} config
 * @param {String} config.destination
 * @param {String} config.source
 * @param {Object} config.destinationConfig
 * @param {String} [config.path]
 * @param {String} [config.workspace]
 * @param {Boolean} [config.enabled = true]
 * @return {{method : string, data : {destination : {name : string, config : *, enabled : boolean}}, url : string}}
 */
function updateDestination({
                             destination,
                             source,
                             path,
                             workspace = this.WORKSPACE,
                             destinationConfig = [],
                             enabled,
                           }) {
  const updatePaths = [];

  if (enabled !== undefined) {
    updatePaths.push('destination.enabled');
  }

  if (destinationConfig.length > 0) {
    updatePaths.push('destination.config');
  }

  return {
    method: API_METHODS.PATCH,
    url: path,
    data: {
      destination: {
        config: destinationConfig.map(({name, value}) => {
          let configName = name;
          if (name.indexOf(path) === -1) {
            configName = `${path}/config/${name}`;
          }
          return {
            name: configName,
            value,
          };
        }),
        enabled,
      },
      update_mask: {
        paths: updatePaths,
      },
    },
  };
}

/**
 *
 * @param {Object} config
 * @param {String} [config.path]
 * @param {String} [config.source]
 * @param {String} [config.destination]
 * @param {String} [config.workspace]
 * @return {{method : string, url : string}}
 */
function deleteDestination({
                             path,
                             source,
                             destination,
                             workspace = this.WORKSPACE,
                           }) {
  return {
    method: API_METHODS.DELETE,
    url: path,
  };
}


module.exports = {
  getTokenList: createMethod(getTokenList),
  getWorkspaceList: createMethod(getWorkspaceList),
  getWorkspace: createMethod(getWorkspace),
  getCatalogSourceList: createMethod(getCatalogSourceList),
  getCatalogSource: createMethod(getCatalogSource),
  getCatalogDestinationList: createMethod(getCatalogDestinationList),
  getCatalogDestination: createMethod(getCatalogDestination),
  createSource: createMethod(createSource),
  getSourceList: createMethod(getSourceList),
  getSource: createMethod(getSource),
  deleteSource: createMethod(deleteSource),
  createDestination: createMethod(createDestination),
  getDestinationList: createMethod(getDestinationList),
  getDestination: createMethod(getDestination),
  updateDestination: createMethod(updateDestination),
  deleteDestination: createMethod(deleteDestination),
};
