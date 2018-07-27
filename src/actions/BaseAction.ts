export default class BaseAction<T, P> {
    type: T;
    payload?: P;

    constructor(t: T) {
        this.type = t;
    }
}