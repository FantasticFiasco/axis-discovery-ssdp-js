export interface IRequestHandler {
    get(url: string): Promise<string>;
}
