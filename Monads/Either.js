module.exports = (function () {

    function Either(value) {
        const _val = value;

        return {
            get value() {
                return _val;
            }
        }
    }

    Either.left = (a) => Left(a);
    Either.right = (a) => Right(a);
    Either.fromNullable = (val) => val !== null && val !== undefined ? Either.right(val) : Either.left(val);
    Either.of = (a) => Either.right(a);

    return Either;

    function Left(value) {
        const _val = value;

        const left = {
            get value() {
                return _val; //throw new TypeError("Cannot get value of Either.Left(a).");
            },
            get isRight() {
                return false;
            },
            map() {
                return left;
            },
            filter() {
                return left;
            },
            chain() {
                return left;
            },
            orElse(f) {
                return f(_val);
            },
            getOrElse(other) {
                return other;
            },
            getOrElseThrow(err) {
                throw new Error(err);
            },
            toString() {
                return `Either.Left(${_val})`;
            }
        }

        return left;
    }

    function Right(value) {
        const _val = value;

        const right = {
            get value() {
                return _val;
            },
            get isRight() {
                return true;
            },
            map(f) {
                return Either.of(f(_val));
            },
            filter(f) {
                return Either.fromNullable(f(_val) ? _val : null);
            },
            chain(f) {
                return f(_val);
            },
            orElse() {
                return right;
            },
            getOrElse() {
                return _val;
            },
            getOrElseThrow() {
                return _val;
            },
            toString() {
                return `Either.Right(${_val})`;
            }
        }

        return right;
    }
})();