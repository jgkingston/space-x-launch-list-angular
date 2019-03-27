import { Params } from './params';

export class Utils {
  static getQueryString = (params: Params) => Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&')
}