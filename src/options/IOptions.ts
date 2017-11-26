/**
 * The SSDP discovery options.
 */
export interface IOptions {
    /**
     * Send GET request and await its response.
     *
     * The interface responsible for sending HTTP requests on the network.
     * Default value is based on
     * <a href="https://www.npmjs.com/package/request">Request</a> but custom
     * implementations can be provided. This can be useful if discovery is
     * required in an Electron application and one wish to benefit from the
     * proxy configuration provided by using Electron's
     * <a href="https://electronjs.org/docs/api/net">net.request</a>.
     * @param url: Fully qualified URI.
     * @returns Promise with response body.
     */
    getRequest?(url: string): Promise<string>;
}
