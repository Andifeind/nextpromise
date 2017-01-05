'use strict';

class NextPromise extends Promise {
  constructor(fn) {
    let _resolve;
    let _reject;
    let _finally;
    console.log('CONST')

    super((resolve, reject) => {
      console.log('INIT')
      _resolve = (arg) => {
        console.log('CALL _resolve', arg);
        resolve(arg);
        if (typeof _finally === 'function') {
          console.log('CALL _resolve finaly', arg);
          _finally(arg);
          _finally = null;
        }
      };

      _reject = (arg) => {
        console.log('CALL _reject', arg);
        if (typeof _finally === 'function') {
          console.log('CALL _reject finaly', arg);
          _finally(null, arg);
          _finally = null;
        }
        reject(arg);
      };

      if (fn) {
        fn(_resolve, _reject);
      }
    });

    this._resolve = _resolve;
    this._reject = _reject;
    this._setFinally = (fn) => { // do it in that way, because this._finally had jinxed side effects
      _finally = fn;
    };
    let self = this;
  }

  resolve(arg) {
    this._resolve(arg);
  }

  reject(arg) {
    this._reject(arg);
  }

  finally(fn) {
    this._setFinally(fn);
    return this;
  }
}

module.exports = NextPromise;
