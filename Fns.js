// _each
function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

// _filter + _each
function _filter(list, predi) {
  let new_list = [];
  _each(list, function(val) {
    if (predi(val)) new_list.push(val);
  });
  return new_list;
}
console.log(_filter(users, user => user.age >= 30));

// _map + _each
function _map(list, mapper) {
  let new_list = [];
  _each(list, function(val) {
    new_list.push(mapper(val));
  });
  return new_list;
}
console.log(_map(users, user => user.name));

//  _curry
function _curry(Ftn) {
  return function(a, b) {
    return arguments.length == 2
      ? Ftn(a, b)
      : function(b) {
          return Ftn(a, b);
        };
  };
}

//  _curryr
function _curryr(Ftn) {
  return function(a, b) {
    return arguments.length == 2
      ? Ftn(a, b)
      : function(b) {
          return Ftn(b, a);
        };
  };
}

// _get
function _get(obj, key) {
  return obj == null ? undefined : obj[key];
}

// _rest
// is Ftn, not method
// => data is not changed.
// => The timing of the function is free.
const slice = Array.prototype.slice;
const _rest = (list, num) => slice.call(list, num || 1); // default 1

// _reduce, Array-like is applied !
function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, val => {
    memo = iter(memo, val);
  });
  return memo;
}

// _pipe
// 연속적으로 함수들을 실행해준다.
// 마치 물이 서로 다른 파이프를 지나며 흐름이 바뀌는 것 처럼.
// 함수를 리턴하는 함수 => 고차함수
function _pipe() {
  const fns = arguments;
  return function(arg) {
    return _reduce(
      fns,
      function(arg, fn) {
        return fn(arg);
      },
      arg
    );
  };
}

// _go
// 즉시실행하는 _pipe 함수.
// arguments is Array-like Obj
function _go(arg) {
  const fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
  // apply is Ftn method for applying 'Array' to Ftn
}
