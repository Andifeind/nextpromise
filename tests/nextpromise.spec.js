'use strict';

let inspect = require('inspect.js');
let sinon = require('sinon');
inspect.useSinon(sinon);

let NextPromise = require('../index');

describe('NextPromise', function() {
  describe('class', function() {
    it('is a class object', function() {
      inspect(NextPromise).isClass();
    });

    it('has inherited by Promise', function() {
      let next = new NextPromise();
      inspect(next).isInstanceOf(Promise);
    });

    it('is a promise object', function() {
      let next = new NextPromise();
      inspect(next).isPromise();
    });
  });

  describe('resolve', function() {
    it('resolves a promise by the common way', function() {
      // let resolveFn = sinon.stub();
      return new NextPromise((resolve, reject) => {
        resolve('foo');
      }).then((arg) => {
        inspect(arg).isEql('foo');
      });
    });

    it('resolves a promise by a resolve method', function() {
      // let resolveFn = sinon.stub();
      let next = new NextPromise()
      let instance = next.then((arg) => {
        inspect(arg).isEql('foo');
      });

      inspect(instance).isPromise();
      next.resolve('foo');
      return instance;
    });
  });

  describe('rejects', function() {
    it('rejectss a promise by the common way', function() {
      // let resolveFn = sinon.stub();
      return new NextPromise((resolve, reject) => {
        reject('foo');
      }).then((arg) => {
        inspect.fail('Promise had resolved, but it should fail!');
      }).catch((err) => {
        inspect(err).isEql('foo');
      });
    });

    it('rejects a promise by a resolve method', function() {
      // let resolveFn = sinon.stub();
      let next = new NextPromise()
      let instance = next.then((arg) => {
        inspect.fail('Promise had resolved, but it should fail!');
      }).catch((err) => {
        inspect(err).isEql('foo');
      });

      inspect(instance).isPromise();
      next.reject('foo');
      return instance;
    });
  });

  describe('finally', function() {
    it.skip('calls a finally method after a promise had resolved by the common way', function() {
      return new NextPromise((resolve, reject) => {
        resolve('foo');
      }).then((arg) => {
        inspect(arg).isEql('foo');
        return arg;
      }).catch((err) => {
        throw err;
      }).finally((arg, err) => {
        inspect(arg).isEql('foo');
        inspect(err).isUndefined();
      });
    });

    it.only('calls a finally method after a promise had resolved by a resolve method', function() {
      let next = new NextPromise();
      let instance = next.then((arg) => {
        console.log('THEN', arg)
        inspect(arg).isEql('foo');
        return arg;
      }).catch((err) => {
        console.log('ERR', err)
        return 'from err';
        // throw err;
      }).finally((arg, err) => {
        console.log('FIN', arg, err)
        inspect(arg).isEql('foos');
        inspect(err).isUndefined();
      // }).then((arg) => {
      //   console.log('THEN 2', arg);
      //   done();
      //   return 'FFF';
      // }).catch((err) => {
      //   console.log('FATAL', err);
      //   done(err);
      });

      next.resolve('foolo');
    });

    it.skip('rejects a promise by a resolve method', function() {
      // let resolveFn = sinon.stub();
      let next = new NextPromise()
      let instance = next.then((arg) => {
        inspect.fail('Promise had resolved, but it should fail!');
      }).catch((err) => {
        inspect(err).isEql('foo');
      });

      inspect(instance).isPromise();
      next.reject('foo');
      return instance;
    });
  });

});
