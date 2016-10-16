/**
 * Class responsible for logging messages.
 */
export class Log {
    /**
     * Logs specified message.
     */
    static write(message?: any, ...optionalParams: any[]) {
        if (optionalParams.length === 0) {
            console.log(message);
        } else {
            console.log(message, optionalParams);
        }
    }
}
