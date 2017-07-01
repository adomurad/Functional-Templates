class Either {

    constructor(value) {
        this._val = value;
    }

    static left(a) {
        return new Left(a);
    }
    static right(a) {
        return new Right(a);
    };
    static fromNullable(val) {
        return val !== null && val !== undefined ? Either.right(val) : Either.left(val);
    }
    static of(a) {
        return Either.right(a);
    }
}

class Left {
    get value() {
        return this._val;//throw new TypeError("Cannot get value of Either.Left(a).");
    }
    get isRight() {
        return false;
    }
    get isLeft() {
        return true;
    }
    map(f) {
        return this;
    }
    filter(f) {
        return this;
    }
    chain(f) {
        return this;
    }
    orElse(f) {
        return f(this._val);
    }
    getOrElse(other) {
        return other;
    }
    getOrElseThrow(err) {
        throw new Error(err);
    }
    toString() {
        return `Either.Left(${this._val})`;
    }
}

class Right {
    get value() {
        return this._val;
    }
    get isRight() {
        return true;
    }
    get isLeft() {
        return false;
    }
    map(f) {
        return Either.of(f(this._val));
    }
    filter(f) {
        return Either.fromNullable(f(this._val) ? this._val : null);
    }
    chain(f) {
        return f(this._val);
    }
    orElse(f) {
        return this;
    }
    getOrElse(other) {
        return this._val;
    }
    getOrElseThrow(err) {
        return this._val;
    }
    toString() {
        return `Either.Right(${this._val})`;
    }
}

module.exports = Either;