export interface IHttpRequest {
    get(url: string): Promise<string>;
}
