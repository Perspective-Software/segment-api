const _ = require('lodash');
const API_METHODS = require('./request-type');

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
 * @param {String} config.name
 * @return {{method : string, url : string}}
 */
function getWorkspace({name}) {
  return {
    method: API_METHODS.GET,
    url: `/workspaces/${name}`,
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
 * @param {String} config.name
 * @return {{method : string, url : string}}
 */
function getCatalogSource({
                            name,
                          }) {
  return {
    method: API_METHODS.GET,
    url: `/catalog/sources/${name}`,
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
 * @param {String} config.name
 * @return {{method : string, url : string}}
 */
function getCatalogDestination({
                                 name,
                               }) {
  return {
    method: API_METHODS.GET,
    url: `/catalog/destinations/${name}`,
  };
}

/**
 *
 * @param {Object} config
 * @param {String} config.name
 * @param {String} [config.workspaceName]
 * @param {String} [config.catalogName]
 * @return {{method : string, data : {source : {catalog_name : *, name : string}}, url : string}}
 */
function createSource({
                        name,
                        workspaceName = this.WORKSPACE,
                        catalogName = this.CATALOG_SOURCE,
                      }) {
  return {
    method: API_METHODS.POST,
    url: `/workspaces/${workspaceName}/sources`,
    data: {
      'source': {
        'name': `workspaces/${workspaceName}/sources/${name}`,
        'catalog_name': catalogName,
      },
    },
  };
}

/**
 *
 * @param {Object} config
 * @param {String} [config.workspaceName]
 * @param {String} [config.pageSize]
 * @param {String} [config.pageToken]
 * @return {{method : string, data : {page_token : *, page_size : *}, url : string}}
 */
function getSourceList({
                         workspaceName = this.WORKSPACE,
                         pageSize,
                         pageToken,
                       }) {
  return {
    method: API_METHODS.GET,
    url: `/workspaces/${workspaceName}/sources`,
    data: {
      page_size: pageSize,
      page_token: pageToken,
    },
  };
}

/**
 *
 * @param {Object} config
 * @param {String} config.sourceName
 * @param {String} [config.workspaceName]
 * @return {{method : string, url : string}}
 */
function getSource({
                     sourceName,
                     workspaceName = this.WORKSPACE,
                   }) {
  return {
    method: API_METHODS.GET,
    url: `/workspaces/${workspaceName}/sources/${sourceName}`,
  };
}

/**
 *
 * @param {Object} config
 * @param {String} config.sourceName
 * @param {String} [config.workspaceName]
 * @return {{method : string, url : string}}
 */
function deleteSourceList({
                            workspaceName = this.WORKSPACE,
                            sourceName,
                          }) {
  return {
    method: API_METHODS.DELETE,
    url: `/workspaces/${workspaceName}/sources/${sourceName}`,
  };
}

/**
 *
 * @param {Object} config
 * @param {String} config.name
 * @param {String} config.sourceName
 * @param {Object} config.destinationConfig
 * @param {String} [config.workspaceName]
 * @param {Boolean} [config.enabled = true]
 * @return {{method : string, data : {destination : {name : string, config : *, enabled : boolean}}, url : string}}
 */
function createDestination({
                             name,
                             sourceName,
                             destinationConfig,
                             workspaceName = this.WORKSPACE,
                             connectionMode = this.CONNECTION_MODE,
                             enabled = true,
                           }) {
  const path = `workspaces/${workspaceName}/sources/${sourceName}/destinations`;
  const destinationName = `${path}/${name}`;

  return {
    method: API_METHODS.POST,
    url: `/${path}`,
    data: {
      destination: {
        name: destinationName,
        config: destinationConfig.map(({name, value}) => {
          return {
            name: `${destinationName}/config/${name}`,
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
 * @param {String} config.sourceName
 * @param {String} [config.workspaceName]
 * @param {String} [config.pageSize]
 * @param {String} [config.pageToken]
 * @return {{method : string, data : {page_token : *, page_size : *}, url : string}}
 */
function getDestinationList({
                              sourceName,
                              workspaceName = this.WORKSPACE,
                              pageSize,
                              pageToken,
                            }) {
  const path = `workspaces/${workspaceName}/sources/${sourceName}/destinations`;

  return {
    method: API_METHODS.GET,
    url: `/${path}`,
    data: {
      page_size: pageSize,
      page_token: pageToken,
    },
  };
}

/**
 *
 * @param {Object} config
 * @param {String} config.name
 * @param {String} config.sourceName
 * @param {String} [config.workspaceName]
 * @return {{method : string, url : string}}
 */
function getDestination({
                          name,
                          sourceName,
                          workspaceName = this.WORKSPACE,
                        }) {
  const path = `workspaces/${workspaceName}/sources/${sourceName}/destinations`;

  return {
    method: API_METHODS.GET,
    url: `/${path}/${name}`,
  };
}

module.exports = {
  getTokenList,
  getWorkspaceList,
  getWorkspace,
  getCatalogSourceList,
  getCatalogSource,
  getCatalogDestinationList,
  getCatalogDestination,
  createSource,
  getSourceList,
  getSource,
  deleteSourceList,
  createDestination,
  getDestinationList,
  getDestination,
};
