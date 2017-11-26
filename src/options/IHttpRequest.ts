/**
 * Interface responsible for performing HTTP requests on the network.
 */
export interface IHttpRequest {
    /**
     * Send GET request and await its response.
     * @param url: Fully qualified URI.
     * @returns Promise with response body.
     */
    get(url: string): Promise<string>;
}
