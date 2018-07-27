export default class KeyResponse<T> {
    key: string;
    response: T;

    constructor(k: string, t: T) {
        this.key = k;
        this.response = t;
    }
}