import { IHttpRequest } from './IHttpRequest';

/**
 * The SSDP discovery options.
 */
export interface IOptions {
    /**
     * Interface responsible for performing HTTP requests on the network.
     * Default value is based on
     * <a href="https://www.npmjs.com/package/request">Request</a> but custom
     * implementations can be provided. This can be useful if discovery is
     * performed in an Electron application and one wish to benefit from the
     * proxy configuration provided by using Electron's
     * <a href="https://electronjs.org/docs/api/net">net.request</a>.
     */
    httpRequest?: IHttpRequest;
}
