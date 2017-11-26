/**
 * The SSDP discovery options.
 */
export interface IOptions {
    /**
     * Function sending GET requests over the network. Default value is based
     * on <a href="https://www.npmjs.com/package/request">Request</a> but a
     * custom implementations can be provided. This can be useful if discovery
     * is required in an Electron application where one wish to benefit from
     * the proxy configuration provided by using Electron's
     * <a href="https://electronjs.org/docs/api/net">net.request</a>.
     * @param url: Fully qualified URL.
     * @returns Promise with response body.
     */
    getRequest?(url: string): Promise<string>;
}
