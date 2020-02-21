const axios = require('axios');
const _ = require('lodash');
const methodMap = require('./methods');
const API_METHODS = require('./request-type');

const BASE_URL = 'https://platform.segmentapis.com/v1beta';

/**
 * @class SegmentApi
 */
class SegmentApi {
  /**
   *
   * @param config
   * @param config.WORKSPACE
   * @param [config.BASE_URL]
   * @param [config.TOKEN]
   * @param [config.CATALOG_SOURCE]
   * @param [config.CONNECTION_MODE]
   * @param [config.transformApiConfig]
   */
  constructor(config) {
    this.__axios = axios.create({
      baseURL: config.BASE_URL || BASE_URL,
    });

    this.WORKSPACE = config.WORKSPACE;
    this.CATALOG_SOURCE = config.CATALOG_SOURCE || 'catalog/sources/javascript';
    this.CONNECTION_MODE = config.CONNECTION_MODE || 'CLOUD';
    this.TOKEN = config.TOKEN;
    this.transformApiConfig = config.transformApiConfig || this.transformConfig;

    this.applyMethods(methodMap);
  };

  /**
   * @private
   * @param methodMap
   */
  applyMethods(methodMap) {
    Object.keys(methodMap)
        .forEach((methodName) => {
          this[methodName] = (...rest) => {
            if (!rest.length) {
              rest = [{}];
            }
            const config = methodMap[methodName].call(this, ...rest);

            return this.callAPI(config);
          };
        });
  }

  /**
   * @private
   * @param config
   * @return {AxiosPromise<any>}
   */
  async axios(config) {
    return this.__axios(this.transformApiConfig(config));
  }

  /**
   * @private
   * @param {Object} params
   * @param params.method
   * @param params.url
   * @param params.data
   * @param params.headers
   * @param params.rest
   * @return {Promise<AxiosResponse<any>>}
   */
  async callAPI({method, url, data, headers = {}, ...rest}) {
    const requestHeaders = _.clone(headers);
    if (url.indexOf('access-tokens') === -1 && !!this.TOKEN &&
        !requestHeaders.Authorization) {
      requestHeaders.Authorization = `Bearer ${this.TOKEN}`;
    }

    let requestData = {data};
    if (method === API_METHODS.GET) {
      requestData = {params: data};
    }

    const config = {
      ...rest,
      ...requestData,
      method,
      headers: requestHeaders,
      url,
    };

    try {
      const response = await this.axios(config);

      return response;
    } catch (err) {
      this.handleError(err);
    }
  }

  /**
   * @private
   * @param err
   */
  handleError(err) {
    const responseErrorMessage = _.get(err, 'response.data.error');
    if (!responseErrorMessage) {
      throw err;
    }

    const error = new Error(responseErrorMessage);
    error.errorCode = _.get(err, 'response.data.code');
    error.statusCode = _.get(err, 'response.status');
    error.headers = _.get(err, 'response.headers');

    throw error;
  }

  /**
   * @private
   * @param config
   * @return {*}
   */
  transformConfig(config) {
    return config;
  }

}

module.exports = SegmentApi;
