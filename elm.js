(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 * Copyright (c) 2013 John Mayer
 * Copyright (c) 2018 Andrey Kuzmin
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Vector2

var _MJS_v2 = F2(function(x, y) {
    return new Float64Array([x, y]);
});

var _MJS_v2getX = function(a) {
    return a[0];
};

var _MJS_v2getY = function(a) {
    return a[1];
};

var _MJS_v2setX = F2(function(x, a) {
    return new Float64Array([x, a[1]]);
});

var _MJS_v2setY = F2(function(y, a) {
    return new Float64Array([a[0], y]);
});

var _MJS_v2toRecord = function(a) {
    return { x: a[0], y: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.x, r.y]);
};

var _MJS_v2add = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    return r;
});

var _MJS_v2sub = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    return r;
});

var _MJS_v2negate = function(a) {
    var r = new Float64Array(2);
    r[0] = -a[0];
    r[1] = -a[1];
    return r;
};

var _MJS_v2direction = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    var im = 1.0 / _MJS_v2lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    return r;
});

function _MJS_v2lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}
var _MJS_v2length = _MJS_v2lengthLocal;

var _MJS_v2lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1];
};

var _MJS_v2distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
});

var _MJS_v2distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return dx * dx + dy * dy;
});

var _MJS_v2normalize = function(a) {
    var r = new Float64Array(2);
    var im = 1.0 / _MJS_v2lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    return r;
};

var _MJS_v2scale = F2(function(k, a) {
    var r = new Float64Array(2);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    return r;
});

var _MJS_v2dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
});

// Vector3

var _MJS_v3temp1Local = new Float64Array(3);
var _MJS_v3temp2Local = new Float64Array(3);
var _MJS_v3temp3Local = new Float64Array(3);

var _MJS_v3 = F3(function(x, y, z) {
    return new Float64Array([x, y, z]);
});

var _MJS_v3getX = function(a) {
    return a[0];
};

var _MJS_v3getY = function(a) {
    return a[1];
};

var _MJS_v3getZ = function(a) {
    return a[2];
};

var _MJS_v3setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2]]);
});

var _MJS_v3setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2]]);
});

var _MJS_v3setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z]);
});

var _MJS_v3toRecord = function(a) {
    return { x: a[0], y: a[1], z: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.x, r.y, r.z]);
};

var _MJS_v3add = F2(function(a, b) {
    var r = new Float64Array(3);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    return r;
});

function _MJS_v3subLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    return r;
}
var _MJS_v3sub = F2(_MJS_v3subLocal);

var _MJS_v3negate = function(a) {
    var r = new Float64Array(3);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    return r;
};

function _MJS_v3directionLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    return _MJS_v3normalizeLocal(_MJS_v3subLocal(a, b, r), r);
}
var _MJS_v3direction = F2(_MJS_v3directionLocal);

function _MJS_v3lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
var _MJS_v3length = _MJS_v3lengthLocal;

var _MJS_v3lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
};

var _MJS_v3distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
});

var _MJS_v3distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
});

function _MJS_v3normalizeLocal(a, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    var im = 1.0 / _MJS_v3lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    return r;
}
var _MJS_v3normalize = _MJS_v3normalizeLocal;

var _MJS_v3scale = F2(function(k, a) {
    return new Float64Array([a[0] * k, a[1] * k, a[2] * k]);
});

var _MJS_v3dotLocal = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
var _MJS_v3dot = F2(_MJS_v3dotLocal);

function _MJS_v3crossLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[1] * b[2] - a[2] * b[1];
    r[1] = a[2] * b[0] - a[0] * b[2];
    r[2] = a[0] * b[1] - a[1] * b[0];
    return r;
}
var _MJS_v3cross = F2(_MJS_v3crossLocal);

var _MJS_v3mul4x4 = F2(function(m, v) {
    var w;
    var tmp = _MJS_v3temp1Local;
    var r = new Float64Array(3);

    tmp[0] = m[3];
    tmp[1] = m[7];
    tmp[2] = m[11];
    w = _MJS_v3dotLocal(v, tmp) + m[15];
    tmp[0] = m[0];
    tmp[1] = m[4];
    tmp[2] = m[8];
    r[0] = (_MJS_v3dotLocal(v, tmp) + m[12]) / w;
    tmp[0] = m[1];
    tmp[1] = m[5];
    tmp[2] = m[9];
    r[1] = (_MJS_v3dotLocal(v, tmp) + m[13]) / w;
    tmp[0] = m[2];
    tmp[1] = m[6];
    tmp[2] = m[10];
    r[2] = (_MJS_v3dotLocal(v, tmp) + m[14]) / w;
    return r;
});

// Vector4

var _MJS_v4 = F4(function(x, y, z, w) {
    return new Float64Array([x, y, z, w]);
});

var _MJS_v4getX = function(a) {
    return a[0];
};

var _MJS_v4getY = function(a) {
    return a[1];
};

var _MJS_v4getZ = function(a) {
    return a[2];
};

var _MJS_v4getW = function(a) {
    return a[3];
};

var _MJS_v4setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2], a[3]]);
});

var _MJS_v4setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2], a[3]]);
});

var _MJS_v4setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z, a[3]]);
});

var _MJS_v4setW = F2(function(w, a) {
    return new Float64Array([a[0], a[1], a[2], w]);
});

var _MJS_v4toRecord = function(a) {
    return { x: a[0], y: a[1], z: a[2], w: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.x, r.y, r.z, r.w]);
};

var _MJS_v4add = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    r[3] = a[3] + b[3];
    return r;
});

var _MJS_v4sub = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    return r;
});

var _MJS_v4negate = function(a) {
    var r = new Float64Array(4);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    r[3] = -a[3];
    return r;
};

var _MJS_v4direction = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    var im = 1.0 / _MJS_v4lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    r[2] = r[2] * im;
    r[3] = r[3] * im;
    return r;
});

function _MJS_v4lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
}
var _MJS_v4length = _MJS_v4lengthLocal;

var _MJS_v4lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
};

var _MJS_v4distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
});

var _MJS_v4distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return dx * dx + dy * dy + dz * dz + dw * dw;
});

var _MJS_v4normalize = function(a) {
    var r = new Float64Array(4);
    var im = 1.0 / _MJS_v4lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    r[3] = a[3] * im;
    return r;
};

var _MJS_v4scale = F2(function(k, a) {
    var r = new Float64Array(4);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    r[3] = a[3] * k;
    return r;
});

var _MJS_v4dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
});

// Matrix4

var _MJS_m4x4temp1Local = new Float64Array(16);
var _MJS_m4x4temp2Local = new Float64Array(16);

var _MJS_m4x4identity = new Float64Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var _MJS_m4x4fromRecord = function(r) {
    var m = new Float64Array(16);
    m[0] = r.m11;
    m[1] = r.m21;
    m[2] = r.m31;
    m[3] = r.m41;
    m[4] = r.m12;
    m[5] = r.m22;
    m[6] = r.m32;
    m[7] = r.m42;
    m[8] = r.m13;
    m[9] = r.m23;
    m[10] = r.m33;
    m[11] = r.m43;
    m[12] = r.m14;
    m[13] = r.m24;
    m[14] = r.m34;
    m[15] = r.m44;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        m11: m[0], m21: m[1], m31: m[2], m41: m[3],
        m12: m[4], m22: m[5], m32: m[6], m42: m[7],
        m13: m[8], m23: m[9], m33: m[10], m43: m[11],
        m14: m[12], m24: m[13], m34: m[14], m44: m[15]
    };
};

var _MJS_m4x4inverse = function(m) {
    var r = new Float64Array(16);

    r[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] +
        m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
    r[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] -
        m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
    r[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] +
        m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
    r[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] -
        m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
    r[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] -
        m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
    r[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] +
        m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
    r[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] -
        m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
    r[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] +
        m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
    r[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] +
        m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
    r[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] -
        m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
    r[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] +
        m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
    r[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] -
        m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
    r[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] -
        m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
    r[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] +
        m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
    r[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] -
        m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
    r[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] +
        m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

    var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];

    if (det === 0) {
        return $elm$core$Maybe$Nothing;
    }

    det = 1.0 / det;

    for (var i = 0; i < 16; i = i + 1) {
        r[i] = r[i] * det;
    }

    return $elm$core$Maybe$Just(r);
};

var _MJS_m4x4inverseOrthonormal = function(m) {
    var r = _MJS_m4x4transposeLocal(m);
    var t = [m[12], m[13], m[14]];
    r[3] = r[7] = r[11] = 0;
    r[12] = -_MJS_v3dotLocal([r[0], r[4], r[8]], t);
    r[13] = -_MJS_v3dotLocal([r[1], r[5], r[9]], t);
    r[14] = -_MJS_v3dotLocal([r[2], r[6], r[10]], t);
    return r;
};

function _MJS_m4x4makeFrustumLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 * znear / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 * znear / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = (right + left) / (right - left);
    r[9] = (top + bottom) / (top - bottom);
    r[10] = -(zfar + znear) / (zfar - znear);
    r[11] = -1;
    r[12] = 0;
    r[13] = 0;
    r[14] = -2 * zfar * znear / (zfar - znear);
    r[15] = 0;

    return r;
}
var _MJS_m4x4makeFrustum = F6(_MJS_m4x4makeFrustumLocal);

var _MJS_m4x4makePerspective = F4(function(fovy, aspect, znear, zfar) {
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return _MJS_m4x4makeFrustumLocal(xmin, xmax, ymin, ymax, znear, zfar);
});

function _MJS_m4x4makeOrthoLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = -2 / (zfar - znear);
    r[11] = 0;
    r[12] = -(right + left) / (right - left);
    r[13] = -(top + bottom) / (top - bottom);
    r[14] = -(zfar + znear) / (zfar - znear);
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeOrtho = F6(_MJS_m4x4makeOrthoLocal);

var _MJS_m4x4makeOrtho2D = F4(function(left, right, bottom, top) {
    return _MJS_m4x4makeOrthoLocal(left, right, bottom, top, -1, 1);
});

function _MJS_m4x4mulLocal(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a41 = a[3];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a42 = a[7];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a43 = a[11];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];
    var a44 = a[15];
    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b41 = b[3];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b42 = b[7];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b43 = b[11];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];
    var b44 = b[15];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return r;
}
var _MJS_m4x4mul = F2(_MJS_m4x4mulLocal);

var _MJS_m4x4mulAffine = F2(function(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];

    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31;
    r[3] = 0;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32;
    r[7] = 0;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33;
    r[11] = 0;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    r[15] = 1;

    return r;
});

var _MJS_m4x4makeRotate = F2(function(angle, axis) {
    var r = new Float64Array(16);
    axis = _MJS_v3normalizeLocal(axis, _MJS_v3temp1Local);
    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);

    r[0] = x * x * c1 + c;
    r[1] = y * x * c1 + z * s;
    r[2] = z * x * c1 - y * s;
    r[3] = 0;
    r[4] = x * y * c1 - z * s;
    r[5] = y * y * c1 + c;
    r[6] = y * z * c1 + x * s;
    r[7] = 0;
    r[8] = x * z * c1 + y * s;
    r[9] = y * z * c1 - x * s;
    r[10] = z * z * c1 + c;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});

var _MJS_m4x4rotate = F3(function(angle, axis, m) {
    var r = new Float64Array(16);
    var im = 1.0 / _MJS_v3lengthLocal(axis);
    var x = axis[0] * im;
    var y = axis[1] * im;
    var z = axis[2] * im;
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);
    var xs = x * s;
    var ys = y * s;
    var zs = z * s;
    var xyc1 = x * y * c1;
    var xzc1 = x * z * c1;
    var yzc1 = y * z * c1;
    var t11 = x * x * c1 + c;
    var t21 = xyc1 + zs;
    var t31 = xzc1 - ys;
    var t12 = xyc1 - zs;
    var t22 = y * y * c1 + c;
    var t32 = yzc1 + xs;
    var t13 = xzc1 + ys;
    var t23 = yzc1 - xs;
    var t33 = z * z * c1 + c;
    var m11 = m[0], m21 = m[1], m31 = m[2], m41 = m[3];
    var m12 = m[4], m22 = m[5], m32 = m[6], m42 = m[7];
    var m13 = m[8], m23 = m[9], m33 = m[10], m43 = m[11];
    var m14 = m[12], m24 = m[13], m34 = m[14], m44 = m[15];

    r[0] = m11 * t11 + m12 * t21 + m13 * t31;
    r[1] = m21 * t11 + m22 * t21 + m23 * t31;
    r[2] = m31 * t11 + m32 * t21 + m33 * t31;
    r[3] = m41 * t11 + m42 * t21 + m43 * t31;
    r[4] = m11 * t12 + m12 * t22 + m13 * t32;
    r[5] = m21 * t12 + m22 * t22 + m23 * t32;
    r[6] = m31 * t12 + m32 * t22 + m33 * t32;
    r[7] = m41 * t12 + m42 * t22 + m43 * t32;
    r[8] = m11 * t13 + m12 * t23 + m13 * t33;
    r[9] = m21 * t13 + m22 * t23 + m23 * t33;
    r[10] = m31 * t13 + m32 * t23 + m33 * t33;
    r[11] = m41 * t13 + m42 * t23 + m43 * t33;
    r[12] = m14,
    r[13] = m24;
    r[14] = m34;
    r[15] = m44;

    return r;
});

function _MJS_m4x4makeScale3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = x;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = y;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = z;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeScale3 = F3(_MJS_m4x4makeScale3Local);

var _MJS_m4x4makeScale = function(v) {
    return _MJS_m4x4makeScale3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4scale3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

var _MJS_m4x4scale = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

function _MJS_m4x4makeTranslate3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = 1;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 1;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = 1;
    r[11] = 0;
    r[12] = x;
    r[13] = y;
    r[14] = z;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeTranslate3 = F3(_MJS_m4x4makeTranslate3Local);

var _MJS_m4x4makeTranslate = function(v) {
    return _MJS_m4x4makeTranslate3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4translate3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4translate = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4makeLookAt = F3(function(eye, center, up) {
    var z = _MJS_v3directionLocal(eye, center, _MJS_v3temp1Local);
    var x = _MJS_v3normalizeLocal(_MJS_v3crossLocal(up, z, _MJS_v3temp2Local), _MJS_v3temp2Local);
    var y = _MJS_v3normalizeLocal(_MJS_v3crossLocal(z, x, _MJS_v3temp3Local), _MJS_v3temp3Local);
    var tm1 = _MJS_m4x4temp1Local;
    var tm2 = _MJS_m4x4temp2Local;

    tm1[0] = x[0];
    tm1[1] = y[0];
    tm1[2] = z[0];
    tm1[3] = 0;
    tm1[4] = x[1];
    tm1[5] = y[1];
    tm1[6] = z[1];
    tm1[7] = 0;
    tm1[8] = x[2];
    tm1[9] = y[2];
    tm1[10] = z[2];
    tm1[11] = 0;
    tm1[12] = 0;
    tm1[13] = 0;
    tm1[14] = 0;
    tm1[15] = 1;

    tm2[0] = 1; tm2[1] = 0; tm2[2] = 0; tm2[3] = 0;
    tm2[4] = 0; tm2[5] = 1; tm2[6] = 0; tm2[7] = 0;
    tm2[8] = 0; tm2[9] = 0; tm2[10] = 1; tm2[11] = 0;
    tm2[12] = -eye[0]; tm2[13] = -eye[1]; tm2[14] = -eye[2]; tm2[15] = 1;

    return _MJS_m4x4mulLocal(tm1, tm2);
});


function _MJS_m4x4transposeLocal(m) {
    var r = new Float64Array(16);

    r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
    r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
    r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
    r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

    return r;
}
var _MJS_m4x4transpose = _MJS_m4x4transposeLocal;

var _MJS_m4x4makeBasis = F3(function(vx, vy, vz) {
    var r = new Float64Array(16);

    r[0] = vx[0];
    r[1] = vx[1];
    r[2] = vx[2];
    r[3] = 0;
    r[4] = vy[0];
    r[5] = vy[1];
    r[6] = vy[2];
    r[7] = 0;
    r[8] = vz[0];
    r[9] = vz[1];
    r[10] = vz[2];
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});


function _WebGL_log(/* msg */) {
  // console.log(msg);
}

var _WebGL_guid = 0;

function _WebGL_listEach(fn, list) {
  for (; list.b; list = list.b) {
    fn(list.a);
  }
}

function _WebGL_listLength(list) {
  var length = 0;
  for (; list.b; list = list.b) {
    length++;
  }
  return length;
}

var _WebGL_rAF = typeof requestAnimationFrame !== 'undefined' ?
  requestAnimationFrame :
  function (cb) { setTimeout(cb, 1000 / 60); };

// eslint-disable-next-line no-unused-vars
var _WebGL_entity = F5(function (settings, vert, frag, mesh, uniforms) {
  return {
    $: 0,
    a: settings,
    b: vert,
    c: frag,
    d: mesh,
    e: uniforms
  };
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableBlend = F2(function (gl, setting) {
  gl.enable(gl.BLEND);
  // a   b   c   d   e   f   g h i j
  // eq1 f11 f12 eq2 f21 f22 r g b a
  gl.blendEquationSeparate(setting.a, setting.d);
  gl.blendFuncSeparate(setting.b, setting.c, setting.e, setting.f);
  gl.blendColor(setting.g, setting.h, setting.i, setting.j);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepthTest = F2(function (gl, setting) {
  gl.enable(gl.DEPTH_TEST);
  // a    b    c    d
  // func mask near far
  gl.depthFunc(setting.a);
  gl.depthMask(setting.b);
  gl.depthRange(setting.c, setting.d);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencilTest = F2(function (gl, setting) {
  gl.enable(gl.STENCIL_TEST);
  // a   b    c         d     e     f      g      h     i     j      k
  // ref mask writeMask test1 fail1 zfail1 zpass1 test2 fail2 zfail2 zpass2
  gl.stencilFuncSeparate(gl.FRONT, setting.d, setting.a, setting.b);
  gl.stencilOpSeparate(gl.FRONT, setting.e, setting.f, setting.g);
  gl.stencilMaskSeparate(gl.FRONT, setting.c);
  gl.stencilFuncSeparate(gl.BACK, setting.h, setting.a, setting.b);
  gl.stencilOpSeparate(gl.BACK, setting.i, setting.j, setting.k);
  gl.stencilMaskSeparate(gl.BACK, setting.c);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableScissor = F2(function (gl, setting) {
  gl.enable(gl.SCISSOR_TEST);
  gl.scissor(setting.a, setting.b, setting.c, setting.d);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableColorMask = F2(function (gl, setting) {
  gl.colorMask(setting.a, setting.b, setting.c, setting.d);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableCullFace = F2(function (gl, setting) {
  gl.enable(gl.CULL_FACE);
  gl.cullFace(setting.a);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePolygonOffset = F2(function (gl, setting) {
  gl.enable(gl.POLYGON_OFFSET_FILL);
  gl.polygonOffset(setting.a, setting.b);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleCoverage = F2(function (gl, setting) {
  gl.enable(gl.SAMPLE_COVERAGE);
  gl.sampleCoverage(setting.a, setting.b);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleAlphaToCoverage = F2(function (gl, setting) {
  gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_disableBlend = function (cache) {
  cache.gl.disable(cache.gl.BLEND);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableDepthTest = function (cache) {
  cache.gl.disable(cache.gl.DEPTH_TEST);
  cache.gl.depthMask(true);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableStencilTest = function (cache) {
  cache.gl.disable(cache.gl.STENCIL_TEST);
  cache.gl.stencilMask(cache.STENCIL_WRITEMASK);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableScissor = function (cache) {
  cache.gl.disable(cache.gl.SCISSOR_TEST);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableColorMask = function (cache) {
  cache.gl.colorMask(true, true, true, true);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableCullFace = function (cache) {
  cache.gl.disable(cache.gl.CULL_FACE);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disablePolygonOffset = function (cache) {
  cache.gl.disable(cache.gl.POLYGON_OFFSET_FILL);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableSampleCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_COVERAGE);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableSampleAlphaToCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_ALPHA_TO_COVERAGE);
};

function _WebGL_doCompile(gl, src, type) {

  var shader = gl.createShader(type);
  _WebGL_log('Created shader');

  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader);
  }

  return shader;

}

function _WebGL_doLink(gl, vshader, fshader) {

  var program = gl.createProgram();
  _WebGL_log('Created program');

  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw gl.getProgramInfoLog(program);
  }

  return program;

}

function _WebGL_getAttributeInfo(gl, type) {
  switch (type) {
    case gl.FLOAT:
      return { size: 1, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC2:
      return { size: 2, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC3:
      return { size: 3, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC4:
      return { size: 4, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_MAT4:
      return { size: 4, arraySize: 4, type: Float32Array, baseType: gl.FLOAT };
    case gl.INT:
      return { size: 1, arraySize: 1, type: Int32Array, baseType: gl.INT };
  }
}

/**
 *  Form the buffer for a given attribute.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {WebGLActiveInfo} attribute the attribute to bind to.
 *         We use its name to grab the record by name and also to know
 *         how many elements we need to grab.
 *  @param {Mesh} mesh The mesh coming in from Elm.
 *  @param {Object} attributes The mapping between the attribute names and Elm fields
 *  @return {WebGLBuffer}
 */
function _WebGL_doBindAttribute(gl, attribute, mesh, attributes) {
  // The length of the number of vertices that
  // complete one 'thing' based on the drawing mode.
  // ie, 2 for Lines, 3 for Triangles, etc.
  var elemSize = mesh.a.elemSize;

  var idxKeys = [];
  for (var i = 0; i < elemSize; i++) {
    idxKeys.push(String.fromCharCode(97 + i));
  }

  function dataFill(data, cnt, fillOffset, elem, key) {
    var i;
    if (elemSize === 1) {
      for (i = 0; i < cnt; i++) {
        data[fillOffset++] = cnt === 1 ? elem[key] : elem[key][i];
      }
    } else {
      idxKeys.forEach(function (idx) {
        for (i = 0; i < cnt; i++) {
          data[fillOffset++] = cnt === 1 ? elem[idx][key] : elem[idx][key][i];
        }
      });
    }
  }

  var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);

  if (attributeInfo === undefined) {
    throw new Error('No info available for: ' + attribute.type);
  }

  var dataIdx = 0;
  var dataOffset = attributeInfo.size * attributeInfo.arraySize * elemSize;
  var array = new attributeInfo.type(_WebGL_listLength(mesh.b) * dataOffset);

  _WebGL_listEach(function (elem) {
    dataFill(array, attributeInfo.size * attributeInfo.arraySize, dataIdx, elem, attributes[attribute.name] || attribute.name);
    dataIdx += dataOffset;
  }, mesh.b);

  var buffer = gl.createBuffer();
  _WebGL_log('Created attribute buffer ' + attribute.name);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
  return buffer;
}

/**
 *  This sets up the binding caching buffers.
 *
 *  We don't actually bind any buffers now except for the indices buffer.
 *  The problem with filling the buffers here is that it is possible to
 *  have a buffer shared between two webgl shaders;
 *  which could have different active attributes. If we bind it here against
 *  a particular program, we might not bind them all. That final bind is now
 *  done right before drawing.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {Mesh} mesh a mesh object from Elm
 *  @return {Object} buffer - an object with the following properties
 *  @return {Number} buffer.numIndices
 *  @return {WebGLBuffer|null} buffer.indexBuffer - optional index buffer
 *  @return {Object} buffer.buffers - will be used to buffer attributes
 */
function _WebGL_doBindSetup(gl, mesh) {
  if (mesh.a.indexSize > 0) {
    _WebGL_log('Created index buffer');
    var indexBuffer = gl.createBuffer();
    var indices = _WebGL_makeIndexedBuffer(mesh.c, mesh.a.indexSize);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return {
      numIndices: indices.length,
      indexBuffer: indexBuffer,
      buffers: {}
    };
  } else {
    return {
      numIndices: mesh.a.elemSize * _WebGL_listLength(mesh.b),
      indexBuffer: null,
      buffers: {}
    };
  }
}

/**
 *  Create an indices array and fill it from indices
 *  based on the size of the index
 *
 *  @param {List} indicesList the list of indices
 *  @param {Number} indexSize the size of the index
 *  @return {Uint16Array} indices
 */
function _WebGL_makeIndexedBuffer(indicesList, indexSize) {
  var indices = new Uint16Array(_WebGL_listLength(indicesList) * indexSize);
  var fillOffset = 0;
  var i;
  _WebGL_listEach(function (elem) {
    if (indexSize === 1) {
      indices[fillOffset++] = elem;
    } else {
      for (i = 0; i < indexSize; i++) {
        indices[fillOffset++] = elem[String.fromCharCode(97 + i)];
      }
    }
  }, indicesList);
  return indices;
}

function _WebGL_getProgID(vertID, fragID) {
  return vertID + '#' + fragID;
}

var _WebGL_drawGL = F2(function (model, domNode) {

  var gl = model.f.gl;

  if (!gl) {
    return domNode;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
  _WebGL_log('Drawing');

  function drawEntity(entity) {
    if (!entity.d.b.b) {
      return; // Empty list
    }

    var progid;
    var program;
    if (entity.b.id && entity.c.id) {
      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      program = model.f.programs[progid];
    }

    if (!program) {

      var vshader;
      if (entity.b.id) {
        vshader = model.f.shaders[entity.b.id];
      } else {
        entity.b.id = _WebGL_guid++;
      }

      if (!vshader) {
        vshader = _WebGL_doCompile(gl, entity.b.src, gl.VERTEX_SHADER);
        model.f.shaders[entity.b.id] = vshader;
      }

      var fshader;
      if (entity.c.id) {
        fshader = model.f.shaders[entity.c.id];
      } else {
        entity.c.id = _WebGL_guid++;
      }

      if (!fshader) {
        fshader = _WebGL_doCompile(gl, entity.c.src, gl.FRAGMENT_SHADER);
        model.f.shaders[entity.c.id] = fshader;
      }

      var glProgram = _WebGL_doLink(gl, vshader, fshader);

      program = {
        glProgram: glProgram,
        attributes: Object.assign({}, entity.b.attributes, entity.c.attributes),
        uniformSetters: _WebGL_createUniformSetters(
          gl,
          model,
          glProgram,
          Object.assign({}, entity.b.uniforms, entity.c.uniforms)
        )
      };

      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      model.f.programs[progid] = program;

    }

    gl.useProgram(program.glProgram);

    _WebGL_setUniforms(program.uniformSetters, entity.e);

    var buffer = model.f.buffers.get(entity.d);

    if (!buffer) {
      buffer = _WebGL_doBindSetup(gl, entity.d);
      model.f.buffers.set(entity.d, buffer);
    }

    var numAttributes = gl.getProgramParameter(program.glProgram, gl.ACTIVE_ATTRIBUTES);

    for (var i = 0; i < numAttributes; i++) {
      var attribute = gl.getActiveAttrib(program.glProgram, i);

      var attribLocation = gl.getAttribLocation(program.glProgram, attribute.name);
      gl.enableVertexAttribArray(attribLocation);

      if (buffer.buffers[attribute.name] === undefined) {
        buffer.buffers[attribute.name] = _WebGL_doBindAttribute(gl, attribute, entity.d, program.attributes);
      }
      var attributeBuffer = buffer.buffers[attribute.name];
      var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);

      gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer);

      if (attributeInfo.arraySize === 1) {
        gl.vertexAttribPointer(attribLocation, attributeInfo.size, attributeInfo.baseType, false, 0, 0);
      } else {
        // Point to four vec4 in case of mat4
        var offset = attributeInfo.size * 4; // float32 takes 4 bytes
        var stride = offset * attributeInfo.arraySize;
        for (var m = 0; m < attributeInfo.arraySize; m++) {
          gl.enableVertexAttribArray(attribLocation + m);
          gl.vertexAttribPointer(attribLocation + m, attributeInfo.size, attributeInfo.baseType, false, stride, offset * m);
        }
      }
    }
    _WebGL_listEach($elm_explorations$webgl$WebGL$Internal$enableSetting(gl), entity.a);

    if (buffer.indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indexBuffer);
      gl.drawElements(entity.d.a.mode, buffer.numIndices, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(entity.d.a.mode, 0, buffer.numIndices);
    }

    _WebGL_listEach($elm_explorations$webgl$WebGL$Internal$disableSetting(model.f), entity.a);

  }

  _WebGL_listEach(drawEntity, model.g);
  return domNode;
});

function _WebGL_createUniformSetters(gl, model, program, uniformsMap) {
  var textureCounter = 0;
  function createUniformSetter(program, uniform) {
    var uniformLocation = gl.getUniformLocation(program, uniform.name);
    switch (uniform.type) {
      case gl.INT:
        return function (value) {
          gl.uniform1i(uniformLocation, value);
        };
      case gl.FLOAT:
        return function (value) {
          gl.uniform1f(uniformLocation, value);
        };
      case gl.FLOAT_VEC2:
        return function (value) {
          gl.uniform2fv(uniformLocation, new Float32Array(value));
        };
      case gl.FLOAT_VEC3:
        return function (value) {
          gl.uniform3fv(uniformLocation, new Float32Array(value));
        };
      case gl.FLOAT_VEC4:
        return function (value) {
          gl.uniform4fv(uniformLocation, new Float32Array(value));
        };
      case gl.FLOAT_MAT4:
        return function (value) {
          gl.uniformMatrix4fv(uniformLocation, false, new Float32Array(value));
        };
      case gl.SAMPLER_2D:
        var currentTexture = textureCounter++;
        return function (texture) {
          gl.activeTexture(gl.TEXTURE0 + currentTexture);
          var tex = model.f.textures.get(texture);
          if (!tex) {
            _WebGL_log('Created texture');
            tex = texture.createTexture(gl);
            model.f.textures.set(texture, tex);
          }
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.uniform1i(uniformLocation, currentTexture);
        };
      case gl.BOOL:
        return function (value) {
          gl.uniform1i(uniformLocation, value);
        };
      default:
        _WebGL_log('Unsupported uniform type: ' + uniform.type);
        return function () { };
    }
  }

  var uniformSetters = {};
  var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (var i = 0; i < numUniforms; i++) {
    var uniform = gl.getActiveUniform(program, i);
    uniformSetters[uniformsMap[uniform.name] || uniform.name] = createUniformSetter(program, uniform);
  }

  return uniformSetters;
}

function _WebGL_setUniforms(setters, values) {
  Object.keys(values).forEach(function (name) {
    var setter = setters[name];
    if (setter) {
      setter(values[name]);
    }
  });
}

// VIRTUAL-DOM WIDGET

// eslint-disable-next-line no-unused-vars
var _WebGL_toHtml = F3(function (options, factList, entities) {
  return _VirtualDom_custom(
    factList,
    {
      g: entities,
      f: {},
      h: options
    },
    _WebGL_render,
    _WebGL_diff
  );
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAlpha = F2(function (options, option) {
  options.contextAttributes.alpha = true;
  options.contextAttributes.premultipliedAlpha = option.a;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepth = F2(function (options, option) {
  options.contextAttributes.depth = true;
  options.sceneSettings.push(function (gl) {
    gl.clearDepth(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencil = F2(function (options, option) {
  options.contextAttributes.stencil = true;
  options.sceneSettings.push(function (gl) {
    gl.clearStencil(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAntialias = F2(function (options, option) {
  options.contextAttributes.antialias = true;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableClearColor = F2(function (options, option) {
  options.sceneSettings.push(function (gl) {
    gl.clearColor(option.a, option.b, option.c, option.d);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePreserveDrawingBuffer = F2(function (options, option) {
  options.contextAttributes.preserveDrawingBuffer = true;
});

/**
 *  Creates canvas and schedules initial _WebGL_drawGL
 *  @param {Object} model
 *  @param {Object} model.f that may contain the following properties:
           gl, shaders, programs, buffers, textures
 *  @param {List<Option>} model.h list of options coming from Elm
 *  @param {List<Entity>} model.g list of entities coming from Elm
 *  @return {HTMLElement} <canvas> if WebGL is supported, otherwise a <div>
 */
function _WebGL_render(model) {
  var options = {
    contextAttributes: {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    },
    sceneSettings: []
  };

  _WebGL_listEach(function (option) {
    return A2($elm_explorations$webgl$WebGL$Internal$enableOption, options, option);
  }, model.h);

  _WebGL_log('Render canvas');
  var canvas = _VirtualDom_doc.createElement('canvas');
  var gl = canvas.getContext && (
    canvas.getContext('webgl', options.contextAttributes) ||
    canvas.getContext('experimental-webgl', options.contextAttributes)
  );

  if (gl && typeof WeakMap !== 'undefined') {
    options.sceneSettings.forEach(function (sceneSetting) {
      sceneSetting(gl);
    });

    model.f.gl = gl;
    model.f.shaders = [];
    model.f.programs = {};
    model.f.buffers = new WeakMap();
    model.f.textures = new WeakMap();
    // Memorize the initial stencil write mask, because
    // browsers may have different number of stencil bits
    model.f.STENCIL_WRITEMASK = gl.getParameter(gl.STENCIL_WRITEMASK);

    // Render for the first time.
    // This has to be done in animation frame,
    // because the canvas is not in the DOM yet
    _WebGL_rAF(function () {
      return A2(_WebGL_drawGL, model, canvas);
    });

  } else {
    canvas = _VirtualDom_doc.createElement('div');
    canvas.innerHTML = '<a href="https://get.webgl.org/">Enable WebGL</a> to see this content!';
  }

  return canvas;
}

function _WebGL_diff(oldModel, newModel) {
  newModel.f = oldModel.f;
  return _WebGL_drawGL(newModel);
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Types$Block = F5(
	function (_this, center, color, event, dirBefore) {
		return {center: center, color: color, dirBefore: dirBefore, event: event, _this: _this};
	});
var $author$project$Types$GroundSize = F2(
	function (l, w) {
		return {l: l, w: w};
	});
var $author$project$Types$Normal = {$: 'Normal'};
var $author$project$Types$PreGame = F2(
	function (a, b) {
		return {$: 'PreGame', a: a, b: b};
	});
var $author$project$Types$R = {$: 'R'};
var $author$project$Types$ScreenSize = F2(
	function (width, height) {
		return {height: height, width: width};
	});
var $author$project$Types$Up = {$: 'Up'};
var $ianmackenzie$elm_units$Quantity$Quantity = function (a) {
	return {$: 'Quantity', a: a};
};
var $ianmackenzie$elm_units$Length$meters = function (numMeters) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numMeters);
};
var $author$project$Types$blockLen = $ianmackenzie$elm_units$Length$meters(2);
var $ianmackenzie$elm_geometry$Geometry$Types$Block3d = function (a) {
	return {$: 'Block3d', a: a};
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $ianmackenzie$elm_units$Quantity$abs = function (_v0) {
	var value = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(
		$elm$core$Basics$abs(value));
};
var $elm$core$Basics$ge = _Utils_ge;
var $ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo = F2(
	function (_v0, _v1) {
		var y = _v0.a;
		var x = _v1.a;
		return _Utils_cmp(x, y) > -1;
	});
var $ianmackenzie$elm_units$Quantity$midpoint = F2(
	function (_v0, _v1) {
		var x = _v0.a;
		var y = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(x + (0.5 * (y - x)));
	});
var $ianmackenzie$elm_units$Quantity$minus = F2(
	function (_v0, _v1) {
		var y = _v0.a;
		var x = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(x - y);
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Direction3d = function (a) {
	return {$: 'Direction3d', a: a};
};
var $ianmackenzie$elm_geometry$Direction3d$unsafe = function (givenComponents) {
	return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(givenComponents);
};
var $ianmackenzie$elm_geometry$Direction3d$negativeX = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{x: -1, y: 0, z: 0});
var $ianmackenzie$elm_geometry$Direction3d$negativeY = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{x: 0, y: -1, z: 0});
var $ianmackenzie$elm_geometry$Direction3d$negativeZ = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{x: 0, y: 0, z: -1});
var $ianmackenzie$elm_geometry$Direction3d$positiveX = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{x: 1, y: 0, z: 0});
var $ianmackenzie$elm_geometry$Direction3d$positiveY = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{x: 0, y: 1, z: 0});
var $ianmackenzie$elm_geometry$Direction3d$positiveZ = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{x: 0, y: 0, z: 1});
var $ianmackenzie$elm_geometry$Geometry$Types$Frame3d = function (a) {
	return {$: 'Frame3d', a: a};
};
var $ianmackenzie$elm_geometry$Frame3d$unsafe = function (properties) {
	return $ianmackenzie$elm_geometry$Geometry$Types$Frame3d(properties);
};
var $ianmackenzie$elm_geometry$Geometry$Types$Point3d = function (a) {
	return {$: 'Point3d', a: a};
};
var $ianmackenzie$elm_geometry$Point3d$xyz = F3(
	function (_v0, _v1, _v2) {
		var x = _v0.a;
		var y = _v1.a;
		var z = _v2.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
			{x: x, y: y, z: z});
	});
var $ianmackenzie$elm_geometry$Block3d$axisAligned = F6(
	function (x1, y1, z1, x2, y2, z2) {
		var computedZDirection = A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, z1, z2) ? $ianmackenzie$elm_geometry$Direction3d$positiveZ : $ianmackenzie$elm_geometry$Direction3d$negativeZ;
		var computedYDirection = A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, y1, y2) ? $ianmackenzie$elm_geometry$Direction3d$positiveY : $ianmackenzie$elm_geometry$Direction3d$negativeY;
		var computedXDirection = A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, x1, x2) ? $ianmackenzie$elm_geometry$Direction3d$positiveX : $ianmackenzie$elm_geometry$Direction3d$negativeX;
		var computedDimensions = _Utils_Tuple3(
			$ianmackenzie$elm_units$Quantity$abs(
				A2($ianmackenzie$elm_units$Quantity$minus, x1, x2)),
			$ianmackenzie$elm_units$Quantity$abs(
				A2($ianmackenzie$elm_units$Quantity$minus, y1, y2)),
			$ianmackenzie$elm_units$Quantity$abs(
				A2($ianmackenzie$elm_units$Quantity$minus, z1, z2)));
		var computedCenterPoint = A3(
			$ianmackenzie$elm_geometry$Point3d$xyz,
			A2($ianmackenzie$elm_units$Quantity$midpoint, x1, x2),
			A2($ianmackenzie$elm_units$Quantity$midpoint, y1, y2),
			A2($ianmackenzie$elm_units$Quantity$midpoint, z1, z2));
		var computedAxes = $ianmackenzie$elm_geometry$Frame3d$unsafe(
			{originPoint: computedCenterPoint, xDirection: computedXDirection, yDirection: computedYDirection, zDirection: computedZDirection});
		return $ianmackenzie$elm_geometry$Geometry$Types$Block3d(
			{axes: computedAxes, dimensions: computedDimensions});
	});
var $ianmackenzie$elm_geometry$Point3d$xCoordinate = function (_v0) {
	var p = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(p.x);
};
var $ianmackenzie$elm_geometry$Point3d$yCoordinate = function (_v0) {
	var p = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(p.y);
};
var $ianmackenzie$elm_geometry$Point3d$zCoordinate = function (_v0) {
	var p = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(p.z);
};
var $ianmackenzie$elm_geometry$Block3d$from = F2(
	function (p1, p2) {
		return A6(
			$ianmackenzie$elm_geometry$Block3d$axisAligned,
			$ianmackenzie$elm_geometry$Point3d$xCoordinate(p1),
			$ianmackenzie$elm_geometry$Point3d$yCoordinate(p1),
			$ianmackenzie$elm_geometry$Point3d$zCoordinate(p1),
			$ianmackenzie$elm_geometry$Point3d$xCoordinate(p2),
			$ianmackenzie$elm_geometry$Point3d$yCoordinate(p2),
			$ianmackenzie$elm_geometry$Point3d$zCoordinate(p2));
	});
var $ianmackenzie$elm_units$Quantity$half = function (_v0) {
	var value = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(0.5 * value);
};
var $ianmackenzie$elm_geometry$Geometry$Types$Vector3d = function (a) {
	return {$: 'Vector3d', a: a};
};
var $ianmackenzie$elm_geometry$Vector3d$reverse = function (_v0) {
	var v = _v0.a;
	return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
		{x: -v.x, y: -v.y, z: -v.z});
};
var $ianmackenzie$elm_geometry$Point3d$translateBy = F2(
	function (_v0, _v1) {
		var v = _v0.a;
		var p = _v1.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
			{x: p.x + v.x, y: p.y + v.y, z: p.z + v.z});
	});
var $ianmackenzie$elm_geometry$Vector3d$xyz = F3(
	function (_v0, _v1, _v2) {
		var x = _v0.a;
		var y = _v1.a;
		var z = _v2.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: x, y: y, z: z});
	});
var $author$project$Types$buildBlock = function (center) {
	var comp = $ianmackenzie$elm_units$Quantity$half($author$project$Types$blockLen);
	var vec = A3($ianmackenzie$elm_geometry$Vector3d$xyz, comp, comp, comp);
	var v1 = A2($ianmackenzie$elm_geometry$Point3d$translateBy, vec, center);
	var v2 = A2(
		$ianmackenzie$elm_geometry$Point3d$translateBy,
		$ianmackenzie$elm_geometry$Vector3d$reverse(vec),
		center);
	return A2($ianmackenzie$elm_geometry$Block3d$from, v1, v2);
};
var $author$project$Types$buildColorBlock = F4(
	function (center, color, event, dir) {
		var _this = $author$project$Types$buildBlock(center);
		return A5($author$project$Types$Block, _this, center, color, event, dir);
	});
var $avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 'RgbaSpace', a: a, b: b, c: c, d: d};
	});
var $avh4$elm_color$Color$lightGray = A4($avh4$elm_color$Color$RgbaSpace, 238 / 255, 238 / 255, 236 / 255, 1.0);
var $ianmackenzie$elm_geometry$Point3d$meters = F3(
	function (x, y, z) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
			{x: x, y: y, z: z});
	});
var $author$project$Model$actives = function () {
	var p1 = A3($ianmackenzie$elm_geometry$Point3d$meters, 5, -19, 1);
	var blocks = A2(
		$elm$core$List$map,
		function (center) {
			return A4($author$project$Types$buildColorBlock, center, $avh4$elm_color$Color$lightGray, $elm$core$Maybe$Nothing, $author$project$Types$Up);
		},
		_List_Nil);
	return blocks;
}();
var $avh4$elm_color$Color$lightYellow = A4($avh4$elm_color$Color$RgbaSpace, 255 / 255, 233 / 255, 79 / 255, 1.0);
var $elm$core$Basics$round = _Basics_round;
var $author$project$Types$buildWall = function (groundSize) {
	var width = groundSize.w;
	var length = groundSize.l;
	var centers = _Utils_ap(
		A2(
			$elm$core$List$map,
			function (point) {
				return A3($ianmackenzie$elm_geometry$Point3d$meters, (2 * point) - 1, (2 * length) + 1, 1);
			},
			A2(
				$elm$core$List$range,
				$elm$core$Basics$round(-width),
				$elm$core$Basics$round(width + 1))),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				function (point) {
					return A3($ianmackenzie$elm_geometry$Point3d$meters, (2 * point) - 1, ((-2) * length) - 1, 1);
				},
				A2(
					$elm$core$List$range,
					$elm$core$Basics$round(-width),
					$elm$core$Basics$round(width + 1))),
			_Utils_ap(
				A2(
					$elm$core$List$map,
					function (point) {
						return A3($ianmackenzie$elm_geometry$Point3d$meters, (2 * width) + 1, (2 * point) + 1, 1);
					},
					A2(
						$elm$core$List$range,
						$elm$core$Basics$round(-length),
						$elm$core$Basics$round(length - 1))),
				A2(
					$elm$core$List$map,
					function (point) {
						return A3($ianmackenzie$elm_geometry$Point3d$meters, ((-2) * width) - 1, (2 * point) + 1, 1);
					},
					A2(
						$elm$core$List$range,
						$elm$core$Basics$round(-length),
						$elm$core$Basics$round(length - 1))))));
	return A2(
		$elm$core$List$map,
		function (center) {
			return A4($author$project$Types$buildColorBlock, center, $avh4$elm_color$Color$lightYellow, $elm$core$Maybe$Nothing, $author$project$Types$R);
		},
		centers);
};
var $elm$core$Basics$pi = _Basics_pi;
var $ianmackenzie$elm_units$Angle$radians = function (numRadians) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numRadians);
};
var $ianmackenzie$elm_units$Angle$degrees = function (numDegrees) {
	return $ianmackenzie$elm_units$Angle$radians($elm$core$Basics$pi * (numDegrees / 180));
};
var $author$project$Types$Noop = {$: 'Noop'};
var $author$project$Model$initText = {
	content: '',
	event: {duration: 0, init: 0, name: $author$project$Types$Noop},
	left: 0,
	opacity: 1,
	size: 0,
	top: 0
};
var $ianmackenzie$elm_geometry$Vector3d$meters = F3(
	function (x, y, z) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: x, y: y, z: z});
	});
var $author$project$Model$nactives = function () {
	var blocks = _List_Nil;
	return blocks;
}();
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity = function (a) {
	return {$: 'Entity', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Group = function (a) {
	return {$: 'Group', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$collectNodes = F2(
	function (drawables, accumulated) {
		collectNodes:
		while (true) {
			if (!drawables.b) {
				return accumulated;
			} else {
				var node = drawables.a.a;
				var rest = drawables.b;
				var $temp$drawables = rest,
					$temp$accumulated = A2($elm$core$List$cons, node, accumulated);
				drawables = $temp$drawables;
				accumulated = $temp$accumulated;
				continue collectNodes;
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$group = function (drawables) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
		$ianmackenzie$elm_3d_scene$Scene3d$Types$Group(
			A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$collectNodes, drawables, _List_Nil)));
};
var $ianmackenzie$elm_3d_scene$Scene3d$group = function (entities) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Entity$group(entities);
};
var $ianmackenzie$elm_geometry$Geometry$Types$Sphere3d = function (a) {
	return {$: 'Sphere3d', a: a};
};
var $ianmackenzie$elm_geometry$Sphere3d$withRadius = F2(
	function (givenRadius, givenCenterPoint) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Sphere3d(
			{
				centerPoint: givenCenterPoint,
				radius: $ianmackenzie$elm_units$Quantity$abs(givenRadius)
			});
	});
var $ianmackenzie$elm_geometry$Sphere3d$atPoint = F2(
	function (givenCenterPoint, givenRadius) {
		return A2($ianmackenzie$elm_geometry$Sphere3d$withRadius, givenRadius, givenCenterPoint);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Constant = function (a) {
	return {$: 'Constant', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$UnlitMaterial = F2(
	function (a, b) {
		return {$: 'UnlitMaterial', a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$UseMeshUvs = {$: 'UseMeshUvs'};
var $avh4$elm_color$Color$toRgba = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	return {alpha: a, blue: b, green: g, red: r};
};
var $elm_explorations$linear_algebra$Math$Vector3$vec3 = _MJS_v3;
var $ianmackenzie$elm_3d_scene$Scene3d$Material$toVec3 = function (givenColor) {
	var _v0 = $avh4$elm_color$Color$toRgba(givenColor);
	var red = _v0.red;
	var green = _v0.green;
	var blue = _v0.blue;
	return A3($elm_explorations$linear_algebra$Math$Vector3$vec3, red, green, blue);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Material$color = function (givenColor) {
	return A2(
		$ianmackenzie$elm_3d_scene$Scene3d$Types$UnlitMaterial,
		$ianmackenzie$elm_3d_scene$Scene3d$Types$UseMeshUvs,
		$ianmackenzie$elm_3d_scene$Scene3d$Types$Constant(
			$ianmackenzie$elm_3d_scene$Scene3d$Material$toVec3(givenColor)));
};
var $ianmackenzie$elm_geometry$Cylinder3d$axis = function (_v0) {
	var cylinder = _v0.a;
	return cylinder.axis;
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$Basics$cos = _Basics_cos;
var $ianmackenzie$elm_units$Angle$cos = function (_v0) {
	var angle = _v0.a;
	return $elm$core$Basics$cos(angle);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$CullBackFaces = {$: 'CullBackFaces'};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Facets = F4(
	function (a, b, c, d) {
		return {$: 'Facets', a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Indexed = F4(
	function (a, b, c, d) {
		return {$: 'Indexed', a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithNormals = F4(
	function (a, b, c, d) {
		return {$: 'MeshWithNormals', a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithNormalsAndUvs = F4(
	function (a, b, c, d) {
		return {$: 'MeshWithNormalsAndUvs', a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithTangents = F4(
	function (a, b, c, d) {
		return {$: 'MeshWithTangents', a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithUvs = F4(
	function (a, b, c, d) {
		return {$: 'MeshWithUvs', a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Triangles = F4(
	function (a, b, c, d) {
		return {$: 'Triangles', a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$cullBackFaces = function (mesh) {
	switch (mesh.$) {
		case 'EmptyMesh':
			return mesh;
		case 'Triangles':
			var boundingBox = mesh.a;
			var meshTriangles = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$Triangles, boundingBox, meshTriangles, webGLMesh, $ianmackenzie$elm_3d_scene$Scene3d$Types$CullBackFaces);
		case 'Facets':
			var boundingBox = mesh.a;
			var meshTriangles = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$Facets, boundingBox, meshTriangles, webGLMesh, $ianmackenzie$elm_3d_scene$Scene3d$Types$CullBackFaces);
		case 'Indexed':
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$Indexed, boundingBox, triangularMesh, webGLMesh, $ianmackenzie$elm_3d_scene$Scene3d$Types$CullBackFaces);
		case 'MeshWithNormals':
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithNormals, boundingBox, triangularMesh, webGLMesh, $ianmackenzie$elm_3d_scene$Scene3d$Types$CullBackFaces);
		case 'MeshWithUvs':
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithUvs, boundingBox, triangularMesh, webGLMesh, $ianmackenzie$elm_3d_scene$Scene3d$Types$CullBackFaces);
		case 'MeshWithNormalsAndUvs':
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithNormalsAndUvs, boundingBox, triangularMesh, webGLMesh, $ianmackenzie$elm_3d_scene$Scene3d$Types$CullBackFaces);
		case 'MeshWithTangents':
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			var webGLMesh = mesh.c;
			return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithTangents, boundingBox, triangularMesh, webGLMesh, $ianmackenzie$elm_3d_scene$Scene3d$Types$CullBackFaces);
		case 'LineSegments':
			return mesh;
		case 'Polyline':
			return mesh;
		default:
			return mesh;
	}
};
var $ianmackenzie$elm_units$Quantity$divideBy = F2(
	function (divisor, _v0) {
		var value = _v0.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(value / divisor);
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Direction2d = function (a) {
	return {$: 'Direction2d', a: a};
};
var $elm$core$Basics$sin = _Basics_sin;
var $ianmackenzie$elm_geometry$Direction2d$fromAngle = function (_v0) {
	var angle = _v0.a;
	return $ianmackenzie$elm_geometry$Geometry$Types$Direction2d(
		{
			x: $elm$core$Basics$cos(angle),
			y: $elm$core$Basics$sin(angle)
		});
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyMesh = {$: 'EmptyMesh'};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces = {$: 'KeepBackFaces'};
var $elm_explorations$linear_algebra$Math$Vector3$fromRecord = _MJS_v3fromRecord;
var $ianmackenzie$elm_geometry$Point3d$unwrap = function (_v0) {
	var pointCoordinates = _v0.a;
	return pointCoordinates;
};
var $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3 = function (point) {
	return $elm_explorations$linear_algebra$Math$Vector3$fromRecord(
		$ianmackenzie$elm_geometry$Point3d$unwrap(point));
};
var $ianmackenzie$elm_geometry$Vector3d$unwrap = function (_v0) {
	var givenComponents = _v0.a;
	return givenComponents;
};
var $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3 = function (vector) {
	return $elm_explorations$linear_algebra$Math$Vector3$fromRecord(
		$ianmackenzie$elm_geometry$Vector3d$unwrap(vector));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$collectSmooth = F2(
	function (_v0, accumulated) {
		var position = _v0.position;
		var normal = _v0.normal;
		return A2(
			$elm$core$List$cons,
			{
				normal: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(normal),
				position: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(position)
			},
			accumulated);
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$faceIndices = function (_v0) {
	var mesh = _v0.a;
	return mesh.faceIndices;
};
var $elm_explorations$webgl$WebGL$MeshIndexed3 = F3(
	function (a, b, c) {
		return {$: 'MeshIndexed3', a: a, b: b, c: c};
	});
var $elm_explorations$webgl$WebGL$indexedTriangles = $elm_explorations$webgl$WebGL$MeshIndexed3(
	{elemSize: 1, indexSize: 3, mode: 4});
var $elm_explorations$linear_algebra$Math$Vector3$getX = _MJS_v3getX;
var $elm_explorations$linear_algebra$Math$Vector3$getY = _MJS_v3getY;
var $elm_explorations$linear_algebra$Math$Vector3$getZ = _MJS_v3getZ;
var $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d = function (a) {
	return {$: 'BoundingBox3d', a: a};
};
var $ianmackenzie$elm_units$Quantity$lessThanOrEqualTo = F2(
	function (_v0, _v1) {
		var y = _v0.a;
		var x = _v1.a;
		return _Utils_cmp(x, y) < 1;
	});
var $ianmackenzie$elm_units$Quantity$max = F2(
	function (_v0, _v1) {
		var x = _v0.a;
		var y = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(
			A2($elm$core$Basics$max, x, y));
	});
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $ianmackenzie$elm_units$Quantity$min = F2(
	function (_v0, _v1) {
		var x = _v0.a;
		var y = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(
			A2($elm$core$Basics$min, x, y));
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$fromExtrema = function (given) {
	return (A2($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, given.maxX, given.minX) && (A2($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, given.maxY, given.minY) && A2($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, given.maxZ, given.minZ))) ? $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d(given) : $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d(
		{
			maxX: A2($ianmackenzie$elm_units$Quantity$max, given.minX, given.maxX),
			maxY: A2($ianmackenzie$elm_units$Quantity$max, given.minY, given.maxY),
			maxZ: A2($ianmackenzie$elm_units$Quantity$max, given.minZ, given.maxZ),
			minX: A2($ianmackenzie$elm_units$Quantity$min, given.minX, given.maxX),
			minY: A2($ianmackenzie$elm_units$Quantity$min, given.minY, given.maxY),
			minZ: A2($ianmackenzie$elm_units$Quantity$min, given.minZ, given.maxZ)
		});
};
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$vertexBoundsHelp = F7(
	function (minX, maxX, minY, maxY, minZ, maxZ, remaining) {
		vertexBoundsHelp:
		while (true) {
			if (remaining.b) {
				var next = remaining.a;
				var rest = remaining.b;
				var z = $elm_explorations$linear_algebra$Math$Vector3$getZ(next.position);
				var y = $elm_explorations$linear_algebra$Math$Vector3$getY(next.position);
				var x = $elm_explorations$linear_algebra$Math$Vector3$getX(next.position);
				var $temp$minX = A2($elm$core$Basics$min, minX, x),
					$temp$maxX = A2($elm$core$Basics$max, maxX, x),
					$temp$minY = A2($elm$core$Basics$min, minY, y),
					$temp$maxY = A2($elm$core$Basics$max, maxY, y),
					$temp$minZ = A2($elm$core$Basics$min, minZ, z),
					$temp$maxZ = A2($elm$core$Basics$max, maxZ, z),
					$temp$remaining = rest;
				minX = $temp$minX;
				maxX = $temp$maxX;
				minY = $temp$minY;
				maxY = $temp$maxY;
				minZ = $temp$minZ;
				maxZ = $temp$maxZ;
				remaining = $temp$remaining;
				continue vertexBoundsHelp;
			} else {
				return $ianmackenzie$elm_geometry$BoundingBox3d$fromExtrema(
					{
						maxX: $ianmackenzie$elm_units$Quantity$Quantity(maxX),
						maxY: $ianmackenzie$elm_units$Quantity$Quantity(maxY),
						maxZ: $ianmackenzie$elm_units$Quantity$Quantity(maxZ),
						minX: $ianmackenzie$elm_units$Quantity$Quantity(minX),
						minY: $ianmackenzie$elm_units$Quantity$Quantity(minY),
						minZ: $ianmackenzie$elm_units$Quantity$Quantity(minZ)
					});
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$vertexBounds = F2(
	function (first, rest) {
		var z = $elm_explorations$linear_algebra$Math$Vector3$getZ(first.position);
		var y = $elm_explorations$linear_algebra$Math$Vector3$getY(first.position);
		var x = $elm_explorations$linear_algebra$Math$Vector3$getX(first.position);
		return A7($ianmackenzie$elm_3d_scene$Scene3d$Mesh$vertexBoundsHelp, x, x, y, y, z, z, rest);
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$vertices = function (_v0) {
	var mesh = _v0.a;
	return mesh.vertices;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$indexedFaces = function (givenMesh) {
	var collectedVertices = A3(
		$elm$core$Array$foldr,
		$ianmackenzie$elm_3d_scene$Scene3d$Mesh$collectSmooth,
		_List_Nil,
		$ianmackenzie$elm_triangular_mesh$TriangularMesh$vertices(givenMesh));
	if (!collectedVertices.b) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyMesh;
	} else {
		var first = collectedVertices.a;
		var rest = collectedVertices.b;
		var webGLMesh = A2(
			$elm_explorations$webgl$WebGL$indexedTriangles,
			collectedVertices,
			$ianmackenzie$elm_triangular_mesh$TriangularMesh$faceIndices(givenMesh));
		var bounds = A2($ianmackenzie$elm_3d_scene$Scene3d$Mesh$vertexBounds, first, rest);
		return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithNormals, bounds, givenMesh, webGLMesh, $ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces);
	}
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $ianmackenzie$elm_units$Quantity$multiplyBy = F2(
	function (scale, _v0) {
		var value = _v0.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(scale * value);
	});
var $ianmackenzie$elm_geometry$Direction3d$on = F2(
	function (_v0, _v1) {
		var sketchPlane = _v0.a;
		var d = _v1.a;
		var _v2 = sketchPlane.yDirection;
		var j = _v2.a;
		var _v3 = sketchPlane.xDirection;
		var i = _v3.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
			{x: (d.x * i.x) + (d.y * j.x), y: (d.x * i.y) + (d.y * j.y), z: (d.x * i.z) + (d.y * j.z)});
	});
var $ianmackenzie$elm_units$Angle$sin = function (_v0) {
	var angle = _v0.a;
	return $elm$core$Basics$sin(angle);
};
var $ianmackenzie$elm_geometry$Direction3d$toVector = function (_v0) {
	var directionComponents = _v0.a;
	return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(directionComponents);
};
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$TriangularMesh = function (a) {
	return {$: 'TriangularMesh', a: a};
};
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$triangles = function (faceVertices_) {
	return $ianmackenzie$elm_triangular_mesh$TriangularMesh$TriangularMesh(
		{
			faceIndices: A2(
				$elm$core$List$map,
				function (i) {
					return _Utils_Tuple3(3 * i, (3 * i) + 1, (3 * i) + 2);
				},
				A2(
					$elm$core$List$range,
					0,
					$elm$core$List$length(faceVertices_) - 1)),
			vertices: $elm$core$Array$fromList(
				$elm$core$List$concat(
					A2(
						$elm$core$List$map,
						function (_v0) {
							var v1 = _v0.a;
							var v2 = _v0.b;
							var v3 = _v0.c;
							return _List_fromArray(
								[v1, v2, v3]);
						},
						faceVertices_)))
		});
};
var $ianmackenzie$elm_units$Angle$turns = function (numTurns) {
	return $ianmackenzie$elm_units$Angle$radians((2 * $elm$core$Basics$pi) * numTurns);
};
var $ianmackenzie$elm_geometry$Point3d$origin = $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
	{x: 0, y: 0, z: 0});
var $ianmackenzie$elm_geometry$Geometry$Types$SketchPlane3d = function (a) {
	return {$: 'SketchPlane3d', a: a};
};
var $ianmackenzie$elm_geometry$SketchPlane3d$unsafe = $ianmackenzie$elm_geometry$Geometry$Types$SketchPlane3d;
var $ianmackenzie$elm_geometry$Direction3d$x = $ianmackenzie$elm_geometry$Direction3d$positiveX;
var $ianmackenzie$elm_geometry$Direction3d$y = $ianmackenzie$elm_geometry$Direction3d$positiveY;
var $ianmackenzie$elm_geometry$SketchPlane3d$xy = $ianmackenzie$elm_geometry$SketchPlane3d$unsafe(
	{originPoint: $ianmackenzie$elm_geometry$Point3d$origin, xDirection: $ianmackenzie$elm_geometry$Direction3d$x, yDirection: $ianmackenzie$elm_geometry$Direction3d$y});
var $ianmackenzie$elm_units$Quantity$zero = $ianmackenzie$elm_units$Quantity$Quantity(0);
var $ianmackenzie$elm_3d_scene$Scene3d$Primitives$cylinder = function () {
	var subdivisions = 72;
	var wedgeAngle = A2(
		$ianmackenzie$elm_units$Quantity$divideBy,
		subdivisions,
		$ianmackenzie$elm_units$Angle$turns(1));
	var radius = $ianmackenzie$elm_units$Length$meters(1);
	var positiveZVector = $ianmackenzie$elm_geometry$Direction3d$toVector($ianmackenzie$elm_geometry$Direction3d$positiveZ);
	var negativeZVector = $ianmackenzie$elm_geometry$Direction3d$toVector($ianmackenzie$elm_geometry$Direction3d$negativeZ);
	var height = $ianmackenzie$elm_units$Length$meters(1);
	var topZ = A2($ianmackenzie$elm_units$Quantity$multiplyBy, 0.5, height);
	var topCenter = A3($ianmackenzie$elm_geometry$Point3d$xyz, $ianmackenzie$elm_units$Quantity$zero, $ianmackenzie$elm_units$Quantity$zero, topZ);
	var bottomZ = A2($ianmackenzie$elm_units$Quantity$multiplyBy, -0.5, height);
	var bottomCenter = A3($ianmackenzie$elm_geometry$Point3d$xyz, $ianmackenzie$elm_units$Quantity$zero, $ianmackenzie$elm_units$Quantity$zero, bottomZ);
	var wedge = function (startIndex) {
		var startAngle = A2($ianmackenzie$elm_units$Quantity$multiplyBy, startIndex, wedgeAngle);
		var startNormal = $ianmackenzie$elm_geometry$Direction3d$toVector(
			A2(
				$ianmackenzie$elm_geometry$Direction3d$on,
				$ianmackenzie$elm_geometry$SketchPlane3d$xy,
				$ianmackenzie$elm_geometry$Direction2d$fromAngle(startAngle)));
		var startX = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			$ianmackenzie$elm_units$Angle$cos(startAngle),
			radius);
		var startY = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			$ianmackenzie$elm_units$Angle$sin(startAngle),
			radius);
		var p2 = A3($ianmackenzie$elm_geometry$Point3d$xyz, startX, startY, topZ);
		var p0 = A3($ianmackenzie$elm_geometry$Point3d$xyz, startX, startY, bottomZ);
		var endIndex = A2($elm$core$Basics$modBy, subdivisions, startIndex + 1);
		var endAngle = A2($ianmackenzie$elm_units$Quantity$multiplyBy, endIndex, wedgeAngle);
		var endNormal = $ianmackenzie$elm_geometry$Direction3d$toVector(
			A2(
				$ianmackenzie$elm_geometry$Direction3d$on,
				$ianmackenzie$elm_geometry$SketchPlane3d$xy,
				$ianmackenzie$elm_geometry$Direction2d$fromAngle(endAngle)));
		var endX = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			$ianmackenzie$elm_units$Angle$cos(endAngle),
			radius);
		var endY = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			$ianmackenzie$elm_units$Angle$sin(endAngle),
			radius);
		var p1 = A3($ianmackenzie$elm_geometry$Point3d$xyz, endX, endY, bottomZ);
		var p3 = A3($ianmackenzie$elm_geometry$Point3d$xyz, endX, endY, topZ);
		return _List_fromArray(
			[
				_Utils_Tuple3(
				{normal: negativeZVector, position: bottomCenter},
				{normal: negativeZVector, position: p1},
				{normal: negativeZVector, position: p0}),
				_Utils_Tuple3(
				{normal: startNormal, position: p0},
				{normal: endNormal, position: p1},
				{normal: endNormal, position: p3}),
				_Utils_Tuple3(
				{normal: startNormal, position: p0},
				{normal: endNormal, position: p3},
				{normal: startNormal, position: p2}),
				_Utils_Tuple3(
				{normal: positiveZVector, position: topCenter},
				{normal: positiveZVector, position: p2},
				{normal: positiveZVector, position: p3})
			]);
	};
	var wedges = A2(
		$elm$core$List$map,
		wedge,
		A2($elm$core$List$range, 0, subdivisions - 1));
	var triangularMesh = $ianmackenzie$elm_triangular_mesh$TriangularMesh$triangles(
		$elm$core$List$concat(wedges));
	return $ianmackenzie$elm_3d_scene$Scene3d$Mesh$cullBackFaces(
		$ianmackenzie$elm_3d_scene$Scene3d$Mesh$indexedFaces(triangularMesh));
}();
var $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyShadow = {$: 'EmptyShadow'};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Shadow = F3(
	function (a, b, c) {
		return {$: 'Shadow', a: a, b: b, c: c};
	});
var $ianmackenzie$elm_geometry$Vector3d$cross = F2(
	function (_v0, _v1) {
		var v2 = _v0.a;
		var v1 = _v1.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: (v1.y * v2.z) - (v1.z * v2.y), y: (v1.z * v2.x) - (v1.x * v2.z), z: (v1.x * v2.y) - (v1.y * v2.x)});
	});
var $ianmackenzie$elm_geometry$Vector3d$from = F2(
	function (_v0, _v1) {
		var p1 = _v0.a;
		var p2 = _v1.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: p2.x - p1.x, y: p2.y - p1.y, z: p2.z - p1.z});
	});
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $ianmackenzie$elm_geometry$Vector3d$zero = $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
	{x: 0, y: 0, z: 0});
var $ianmackenzie$elm_geometry$Vector3d$normalize = function (_v0) {
	var v = _v0.a;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.x),
		A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(v.y),
			$elm$core$Basics$abs(v.z)));
	if (!largestComponent) {
		return $ianmackenzie$elm_geometry$Vector3d$zero;
	} else {
		var scaledZ = v.z / largestComponent;
		var scaledY = v.y / largestComponent;
		var scaledX = v.x / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: scaledX / scaledLength, y: scaledY / scaledLength, z: scaledZ / scaledLength});
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$triangleNormal = F3(
	function (p1, p2, p3) {
		var v2 = A2($ianmackenzie$elm_geometry$Vector3d$from, p2, p3);
		var v1 = A2($ianmackenzie$elm_geometry$Vector3d$from, p1, p2);
		return $ianmackenzie$elm_geometry$Vector3d$normalize(
			A2($ianmackenzie$elm_geometry$Vector3d$cross, v2, v1));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$collectShadowVertices = F3(
	function (getPosition, _v0, accumulated) {
		var mv1 = _v0.a;
		var mv2 = _v0.b;
		var mv3 = _v0.c;
		var p3 = getPosition(mv3);
		var p2 = getPosition(mv2);
		var p1 = getPosition(mv1);
		var faceNormal = $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(
			A3($ianmackenzie$elm_3d_scene$Scene3d$Mesh$triangleNormal, p1, p2, p3));
		var sv1 = {
			normal: faceNormal,
			position: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p1)
		};
		var sv2 = {
			normal: faceNormal,
			position: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p2)
		};
		var sv3 = {
			normal: faceNormal,
			position: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p3)
		};
		return A2(
			$elm$core$List$cons,
			sv1,
			A2(
				$elm$core$List$cons,
				sv2,
				A2($elm$core$List$cons, sv3, accumulated)));
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		if (ma.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				if (mc.$ === 'Nothing') {
					return $elm$core$Maybe$Nothing;
				} else {
					var c = mc.a;
					return $elm$core$Maybe$Just(
						A3(func, a, b, c));
				}
			}
		}
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$vertex = F2(
	function (index, mesh) {
		return A2(
			$elm$core$Array$get,
			index,
			$ianmackenzie$elm_triangular_mesh$TriangularMesh$vertices(mesh));
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$faceVertices = function (mesh) {
	var toFace = function (_v0) {
		var i = _v0.a;
		var j = _v0.b;
		var k = _v0.c;
		return A4(
			$elm$core$Maybe$map3,
			F3(
				function (firstVertex, secondVertex, thirdVertex) {
					return _Utils_Tuple3(firstVertex, secondVertex, thirdVertex);
				}),
			A2($ianmackenzie$elm_triangular_mesh$TriangularMesh$vertex, i, mesh),
			A2($ianmackenzie$elm_triangular_mesh$TriangularMesh$vertex, j, mesh),
			A2($ianmackenzie$elm_triangular_mesh$TriangularMesh$vertex, k, mesh));
	};
	return A2(
		$elm$core$List$filterMap,
		toFace,
		$ianmackenzie$elm_triangular_mesh$TriangularMesh$faceIndices(mesh));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$indexed = F2(
	function (vertices_, faceIndices_) {
		var numVertices = $elm$core$Array$length(vertices_);
		var validIndices = function (_v0) {
			var i = _v0.a;
			var j = _v0.b;
			var k = _v0.c;
			return ((i >= 0) && (_Utils_cmp(i, numVertices) < 0)) && (((j >= 0) && (_Utils_cmp(j, numVertices) < 0)) && ((k >= 0) && (_Utils_cmp(k, numVertices) < 0)));
		};
		return A2($elm$core$List$all, validIndices, faceIndices_) ? $ianmackenzie$elm_triangular_mesh$TriangularMesh$TriangularMesh(
			{faceIndices: faceIndices_, vertices: vertices_}) : $ianmackenzie$elm_triangular_mesh$TriangularMesh$TriangularMesh(
			{
				faceIndices: A2($elm$core$List$filter, validIndices, faceIndices_),
				vertices: vertices_
			});
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $ianmackenzie$elm_geometry$Point3d$toMeters = function (_v0) {
	var pointCoordinates = _v0.a;
	return pointCoordinates;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$edgeKey = F2(
	function (firstPoint, secondPoint) {
		var p2 = $ianmackenzie$elm_geometry$Point3d$toMeters(secondPoint);
		var p1 = $ianmackenzie$elm_geometry$Point3d$toMeters(firstPoint);
		return _Utils_Tuple2(
			_Utils_Tuple3(p1.x, p1.y, p1.z),
			_Utils_Tuple3(p2.x, p2.y, p2.z));
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$zeroVec3 = A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 0, 0);
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$joinEdge = F6(
	function (p1, p2, start, end, neighborDict, _v0) {
		var shadowFaceIndices = _v0.a;
		var extraShadowVertices = _v0.b;
		var nextShadowVertexIndex = _v0.c;
		var _v1 = A2(
			$elm$core$Dict$get,
			A2($ianmackenzie$elm_3d_scene$Scene3d$Mesh$edgeKey, p1, p2),
			neighborDict);
		if (_v1.$ === 'Just') {
			var opposite = _v1.a;
			return _Utils_Tuple3(
				A2(
					$elm$core$List$cons,
					_Utils_Tuple3(start, opposite, end),
					shadowFaceIndices),
				extraShadowVertices,
				nextShadowVertexIndex);
		} else {
			var v2 = {
				normal: $ianmackenzie$elm_3d_scene$Scene3d$Mesh$zeroVec3,
				position: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p2)
			};
			var v1 = {
				normal: $ianmackenzie$elm_3d_scene$Scene3d$Mesh$zeroVec3,
				position: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p1)
			};
			var b = nextShadowVertexIndex + 1;
			var a = nextShadowVertexIndex;
			return _Utils_Tuple3(
				A2(
					$elm$core$List$cons,
					_Utils_Tuple3(start, a, b),
					A2(
						$elm$core$List$cons,
						_Utils_Tuple3(start, b, end),
						shadowFaceIndices)),
				A2(
					$elm$core$List$cons,
					v2,
					A2($elm$core$List$cons, v1, extraShadowVertices)),
				nextShadowVertexIndex + 2);
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$joinEdges = F5(
	function (getPosition, neighborDict, meshFaceVertices, nextShadowVertexIndex, state) {
		joinEdges:
		while (true) {
			if (meshFaceVertices.b) {
				var _v1 = meshFaceVertices.a;
				var mv1 = _v1.a;
				var mv2 = _v1.b;
				var mv3 = _v1.c;
				var remainingMeshFaceVertices = meshFaceVertices.b;
				var p3 = getPosition(mv3);
				var p2 = getPosition(mv2);
				var p1 = getPosition(mv1);
				var c = nextShadowVertexIndex + 2;
				var b = nextShadowVertexIndex + 1;
				var a = nextShadowVertexIndex;
				var $temp$getPosition = getPosition,
					$temp$neighborDict = neighborDict,
					$temp$meshFaceVertices = remainingMeshFaceVertices,
					$temp$nextShadowVertexIndex = nextShadowVertexIndex + 3,
					$temp$state = A6(
					$ianmackenzie$elm_3d_scene$Scene3d$Mesh$joinEdge,
					p3,
					p1,
					c,
					a,
					neighborDict,
					A6(
						$ianmackenzie$elm_3d_scene$Scene3d$Mesh$joinEdge,
						p2,
						p3,
						b,
						c,
						neighborDict,
						A6($ianmackenzie$elm_3d_scene$Scene3d$Mesh$joinEdge, p1, p2, a, b, neighborDict, state)));
				getPosition = $temp$getPosition;
				neighborDict = $temp$neighborDict;
				meshFaceVertices = $temp$meshFaceVertices;
				nextShadowVertexIndex = $temp$nextShadowVertexIndex;
				state = $temp$state;
				continue joinEdges;
			} else {
				var _v2 = state;
				var shadowFaceIndices = _v2.a;
				var extraShadowVertices = _v2.b;
				return _Utils_Tuple2(
					shadowFaceIndices,
					$elm$core$List$reverse(extraShadowVertices));
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$visitFaces = F5(
	function (getPosition, meshFaceVertices, nextShadowVertexIndex, shadowFaceIndices, neighborDict) {
		visitFaces:
		while (true) {
			if (meshFaceVertices.b) {
				var _v1 = meshFaceVertices.a;
				var mv1 = _v1.a;
				var mv2 = _v1.b;
				var mv3 = _v1.c;
				var remainingMeshFaceVertices = meshFaceVertices.b;
				var p3 = getPosition(mv3);
				var p2 = getPosition(mv2);
				var p1 = getPosition(mv1);
				var c = nextShadowVertexIndex + 2;
				var b = nextShadowVertexIndex + 1;
				var a = nextShadowVertexIndex;
				var updatedNeighborDict = A3(
					$elm$core$Dict$insert,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Mesh$edgeKey, p1, p3),
					c,
					A3(
						$elm$core$Dict$insert,
						A2($ianmackenzie$elm_3d_scene$Scene3d$Mesh$edgeKey, p3, p2),
						b,
						A3(
							$elm$core$Dict$insert,
							A2($ianmackenzie$elm_3d_scene$Scene3d$Mesh$edgeKey, p2, p1),
							a,
							neighborDict)));
				var updatedShadowFaceIndices = A2(
					$elm$core$List$cons,
					_Utils_Tuple3(a, b, c),
					shadowFaceIndices);
				var $temp$getPosition = getPosition,
					$temp$meshFaceVertices = remainingMeshFaceVertices,
					$temp$nextShadowVertexIndex = nextShadowVertexIndex + 3,
					$temp$shadowFaceIndices = updatedShadowFaceIndices,
					$temp$neighborDict = updatedNeighborDict;
				getPosition = $temp$getPosition;
				meshFaceVertices = $temp$meshFaceVertices;
				nextShadowVertexIndex = $temp$nextShadowVertexIndex;
				shadowFaceIndices = $temp$shadowFaceIndices;
				neighborDict = $temp$neighborDict;
				continue visitFaces;
			} else {
				return _Utils_Tuple3(shadowFaceIndices, neighborDict, nextShadowVertexIndex);
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl = F3(
	function (meshBounds, getPosition, triangularMesh) {
		var meshFaceVertices = $ianmackenzie$elm_triangular_mesh$TriangularMesh$faceVertices(triangularMesh);
		var initialShadowVertices = A3(
			$elm$core$List$foldr,
			$ianmackenzie$elm_3d_scene$Scene3d$Mesh$collectShadowVertices(getPosition),
			_List_Nil,
			meshFaceVertices);
		var _v0 = A5($ianmackenzie$elm_3d_scene$Scene3d$Mesh$visitFaces, getPosition, meshFaceVertices, 0, _List_Nil, $elm$core$Dict$empty);
		var initialShadowFaceIndices = _v0.a;
		var neighborDict = _v0.b;
		var nextShadowVertexIndex = _v0.c;
		var _v1 = A5(
			$ianmackenzie$elm_3d_scene$Scene3d$Mesh$joinEdges,
			getPosition,
			neighborDict,
			meshFaceVertices,
			0,
			_Utils_Tuple3(initialShadowFaceIndices, _List_Nil, nextShadowVertexIndex));
		var allShadowFaceIndices = _v1.a;
		var extraShadowVertices = _v1.b;
		var allShadowVertices = $elm$core$List$isEmpty(extraShadowVertices) ? initialShadowVertices : _Utils_ap(initialShadowVertices, extraShadowVertices);
		return A3(
			$ianmackenzie$elm_3d_scene$Scene3d$Types$Shadow,
			meshBounds,
			A2(
				$ianmackenzie$elm_triangular_mesh$TriangularMesh$indexed,
				$elm$core$Array$fromList(allShadowVertices),
				allShadowFaceIndices),
			A2($elm_explorations$webgl$WebGL$indexedTriangles, allShadowVertices, allShadowFaceIndices));
	});
var $ianmackenzie$elm_geometry$Triangle3d$vertices = function (_v0) {
	var triangleVertices = _v0.a;
	return triangleVertices;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadow = function (mesh) {
	switch (mesh.$) {
		case 'EmptyMesh':
			return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyShadow;
		case 'Triangles':
			var boundingBox = mesh.a;
			var meshTriangles = mesh.b;
			var vertexTriples = A2($elm$core$List$map, $ianmackenzie$elm_geometry$Triangle3d$vertices, meshTriangles);
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl,
				boundingBox,
				$elm$core$Basics$identity,
				$ianmackenzie$elm_triangular_mesh$TriangularMesh$triangles(vertexTriples));
		case 'Facets':
			var boundingBox = mesh.a;
			var meshTriangles = mesh.b;
			var vertexTriples = A2($elm$core$List$map, $ianmackenzie$elm_geometry$Triangle3d$vertices, meshTriangles);
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl,
				boundingBox,
				$elm$core$Basics$identity,
				$ianmackenzie$elm_triangular_mesh$TriangularMesh$triangles(vertexTriples));
		case 'Indexed':
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			return A3($ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl, boundingBox, $elm$core$Basics$identity, triangularMesh);
		case 'MeshWithNormals':
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl,
				boundingBox,
				function ($) {
					return $.position;
				},
				triangularMesh);
		case 'MeshWithUvs':
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl,
				boundingBox,
				function ($) {
					return $.position;
				},
				triangularMesh);
		case 'MeshWithNormalsAndUvs':
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl,
				boundingBox,
				function ($) {
					return $.position;
				},
				triangularMesh);
		case 'MeshWithTangents':
			var boundingBox = mesh.a;
			var triangularMesh = mesh.b;
			return A3(
				$ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadowImpl,
				boundingBox,
				function ($) {
					return $.position;
				},
				triangularMesh);
		case 'LineSegments':
			return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyShadow;
		case 'Polyline':
			return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyShadow;
		default:
			return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyShadow;
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Primitives$cylinderShadow = $ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadow($ianmackenzie$elm_3d_scene$Scene3d$Primitives$cylinder);
var $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyNode = {$: 'EmptyNode'};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty = $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity($ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyNode);
var $ianmackenzie$elm_geometry$Axis3d$direction = function (_v0) {
	var axis = _v0.a;
	return axis.direction;
};
var $ianmackenzie$elm_geometry$Axis3d$originPoint = function (_v0) {
	var axis = _v0.a;
	return axis.originPoint;
};
var $ianmackenzie$elm_geometry$Direction3d$perpendicularTo = function (_v0) {
	var d = _v0.a;
	var absZ = $elm$core$Basics$abs(d.z);
	var absY = $elm$core$Basics$abs(d.y);
	var absX = $elm$core$Basics$abs(d.x);
	if (_Utils_cmp(absX, absY) < 1) {
		if (_Utils_cmp(absX, absZ) < 1) {
			var scale = $elm$core$Basics$sqrt((d.z * d.z) + (d.y * d.y));
			return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
				{x: 0, y: (-d.z) / scale, z: d.y / scale});
		} else {
			var scale = $elm$core$Basics$sqrt((d.y * d.y) + (d.x * d.x));
			return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
				{x: (-d.y) / scale, y: d.x / scale, z: 0});
		}
	} else {
		if (_Utils_cmp(absY, absZ) < 1) {
			var scale = $elm$core$Basics$sqrt((d.z * d.z) + (d.x * d.x));
			return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
				{x: d.z / scale, y: 0, z: (-d.x) / scale});
		} else {
			var scale = $elm$core$Basics$sqrt((d.x * d.x) + (d.y * d.y));
			return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
				{x: (-d.y) / scale, y: d.x / scale, z: 0});
		}
	}
};
var $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis = function (direction) {
	var xDirection = $ianmackenzie$elm_geometry$Direction3d$perpendicularTo(direction);
	var _v0 = xDirection;
	var dX = _v0.a;
	var _v1 = direction;
	var d = _v1.a;
	var yDirection = $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
		{x: (d.y * dX.z) - (d.z * dX.y), y: (d.z * dX.x) - (d.x * dX.z), z: (d.x * dX.y) - (d.y * dX.x)});
	return _Utils_Tuple2(xDirection, yDirection);
};
var $ianmackenzie$elm_geometry$Frame3d$fromZAxis = function (givenZAxis) {
	var givenZDirection = $ianmackenzie$elm_geometry$Axis3d$direction(givenZAxis);
	var _v0 = $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis(givenZDirection);
	var computedXDirection = _v0.a;
	var computedYDirection = _v0.b;
	return $ianmackenzie$elm_geometry$Frame3d$unsafe(
		{
			originPoint: $ianmackenzie$elm_geometry$Axis3d$originPoint(givenZAxis),
			xDirection: computedXDirection,
			yDirection: computedYDirection,
			zDirection: givenZDirection
		});
};
var $ianmackenzie$elm_geometry$Cylinder3d$length = function (_v0) {
	var cylinder = _v0.a;
	return cylinder.length;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode = F2(
	function (a, b) {
		return {$: 'MeshNode', a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$colorTextureFragment = {
	src: '\n        precision mediump float;\n        \n        uniform mediump sampler2D colorTexture;\n        \n        varying mediump vec2 interpolatedUv;\n        \n        void main () {\n            gl_FragColor = texture2D(colorTexture, interpolatedUv);\n        }\n    ',
	attributes: {},
	uniforms: {colorTexture: 'colorTexture'}
};
var $elm_explorations$webgl$WebGL$Internal$disableSetting = F2(
	function (cache, setting) {
		switch (setting.$) {
			case 'Blend':
				return _WebGL_disableBlend(cache);
			case 'DepthTest':
				return _WebGL_disableDepthTest(cache);
			case 'StencilTest':
				return _WebGL_disableStencilTest(cache);
			case 'Scissor':
				return _WebGL_disableScissor(cache);
			case 'ColorMask':
				return _WebGL_disableColorMask(cache);
			case 'CullFace':
				return _WebGL_disableCullFace(cache);
			case 'PolygonOffset':
				return _WebGL_disablePolygonOffset(cache);
			case 'SampleCoverage':
				return _WebGL_disableSampleCoverage(cache);
			default:
				return _WebGL_disableSampleAlphaToCoverage(cache);
		}
	});
var $elm_explorations$webgl$WebGL$Internal$enableOption = F2(
	function (ctx, option) {
		switch (option.$) {
			case 'Alpha':
				return A2(_WebGL_enableAlpha, ctx, option);
			case 'Depth':
				return A2(_WebGL_enableDepth, ctx, option);
			case 'Stencil':
				return A2(_WebGL_enableStencil, ctx, option);
			case 'Antialias':
				return A2(_WebGL_enableAntialias, ctx, option);
			case 'ClearColor':
				return A2(_WebGL_enableClearColor, ctx, option);
			default:
				return A2(_WebGL_enablePreserveDrawingBuffer, ctx, option);
		}
	});
var $elm_explorations$webgl$WebGL$Internal$enableSetting = F2(
	function (gl, setting) {
		switch (setting.$) {
			case 'Blend':
				return A2(_WebGL_enableBlend, gl, setting);
			case 'DepthTest':
				return A2(_WebGL_enableDepthTest, gl, setting);
			case 'StencilTest':
				return A2(_WebGL_enableStencilTest, gl, setting);
			case 'Scissor':
				return A2(_WebGL_enableScissor, gl, setting);
			case 'ColorMask':
				return A2(_WebGL_enableColorMask, gl, setting);
			case 'CullFace':
				return A2(_WebGL_enableCullFace, gl, setting);
			case 'PolygonOffset':
				return A2(_WebGL_enablePolygonOffset, gl, setting);
			case 'SampleCoverage':
				return A2(_WebGL_enableSampleCoverage, gl, setting);
			default:
				return A2(_WebGL_enableSampleAlphaToCoverage, gl, setting);
		}
	});
var $elm_explorations$webgl$WebGL$entityWith = _WebGL_entity;
var $elm_explorations$webgl$WebGL$Settings$FaceMode = function (a) {
	return {$: 'FaceMode', a: a};
};
var $elm_explorations$webgl$WebGL$Settings$back = $elm_explorations$webgl$WebGL$Settings$FaceMode(1029);
var $elm_explorations$webgl$WebGL$Internal$CullFace = function (a) {
	return {$: 'CullFace', a: a};
};
var $elm_explorations$webgl$WebGL$Settings$cullFace = function (_v0) {
	var faceMode = _v0.a;
	return $elm_explorations$webgl$WebGL$Internal$CullFace(faceMode);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullBackFaceSetting = $elm_explorations$webgl$WebGL$Settings$cullFace($elm_explorations$webgl$WebGL$Settings$back);
var $elm_explorations$webgl$WebGL$Settings$front = $elm_explorations$webgl$WebGL$Settings$FaceMode(1028);
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullFrontFaceSetting = $elm_explorations$webgl$WebGL$Settings$cullFace($elm_explorations$webgl$WebGL$Settings$front);
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings = F3(
	function (isRightHanded, backFaceSetting, settings) {
		if (backFaceSetting.$ === 'CullBackFaces') {
			return isRightHanded ? A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullBackFaceSetting, settings) : A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullFrontFaceSetting, settings);
		} else {
			return settings;
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$unlitVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        attribute mediump vec2 uv;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        \n        varying mediump vec2 interpolatedUv;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        void main() {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            interpolatedUv = uv;\n        }\n    ',
	attributes: {position: 'position', uv: 'uv'},
	uniforms: {modelMatrix: 'modelMatrix', modelScale: 'modelScale', projectionMatrix: 'projectionMatrix', sceneProperties: 'sceneProperties', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$colorTextureMesh = F4(
	function (data, bounds, webGLMesh, backFaceSetting) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$unlitVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$colorTextureFragment,
							webGLMesh,
							{colorTexture: data, modelMatrix: modelMatrix, modelScale: modelScale, projectionMatrix: projectionMatrix, sceneProperties: sceneProperties, viewMatrix: viewMatrix});
					})));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$constantFragment = {
	src: '\n        precision lowp float;\n        \n        uniform lowp vec3 constantColor;\n        \n        void main () {\n            gl_FragColor = vec4(constantColor, 1.0);\n        }\n    ',
	attributes: {},
	uniforms: {constantColor: 'constantColor'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$plainVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        void main () {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n        }\n    ',
	attributes: {position: 'position'},
	uniforms: {modelMatrix: 'modelMatrix', modelScale: 'modelScale', projectionMatrix: 'projectionMatrix', sceneProperties: 'sceneProperties', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh = F4(
	function (color, bounds, webGLMesh, backFaceSetting) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$plainVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$constantFragment,
							webGLMesh,
							{constantColor: color, modelMatrix: modelMatrix, modelScale: modelScale, projectionMatrix: projectionMatrix, sceneProperties: sceneProperties, viewMatrix: viewMatrix});
					})));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$PointNode = F2(
	function (a, b) {
		return {$: 'PointNode', a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$constantPointFragment = {
	src: '\n        precision lowp float;\n        \n        uniform lowp vec3 constantColor;\n        uniform lowp float pointRadius;\n        uniform highp mat4 sceneProperties;\n        \n        float pointAlpha(float pointRadius, vec2 pointCoord) {\n            float pointSize = 2.0 * pointRadius;\n            float x = (pointSize + 2.0) * (pointCoord.s - 0.5);\n            float y = (pointSize + 2.0) * (pointCoord.t - 0.5);\n            float r = sqrt(x * x + y * y);\n            float innerRadius = pointRadius;\n            float outerRadius = pointRadius + 1.0;\n            if (r > outerRadius) {\n                return 0.0;\n            } else if (r > innerRadius) {\n                return outerRadius - r;\n            } else {\n                return 1.0;\n            }\n        }\n        \n        void main () {\n            float supersampling = sceneProperties[3][0];\n            float alpha = pointAlpha(pointRadius * supersampling, gl_PointCoord);\n            gl_FragColor = vec4(constantColor, alpha);\n        }\n    ',
	attributes: {},
	uniforms: {constantColor: 'constantColor', pointRadius: 'pointRadius', sceneProperties: 'sceneProperties'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$pointVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform lowp float pointRadius;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        void main () {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            float supersampling = sceneProperties[3][0];\n            gl_PointSize = 2.0 * pointRadius * supersampling + 2.0;\n        }\n    ',
	attributes: {position: 'position'},
	uniforms: {modelMatrix: 'modelMatrix', modelScale: 'modelScale', pointRadius: 'pointRadius', projectionMatrix: 'projectionMatrix', sceneProperties: 'sceneProperties', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$constantPointMesh = F4(
	function (color, radius, bounds, webGLMesh) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$PointNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							settings,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$pointVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$constantPointFragment,
							webGLMesh,
							{constantColor: color, modelMatrix: modelMatrix, modelScale: modelScale, pointRadius: radius, projectionMatrix: projectionMatrix, sceneProperties: sceneProperties, viewMatrix: viewMatrix});
					})));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissiveFragment = {
	src: '\n        precision mediump float;\n        \n        uniform mediump vec3 emissiveColor;\n        uniform highp mat4 sceneProperties;\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec3 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            float unitR = linearColor.r / referenceWhite.r;\n            float unitG = linearColor.g / referenceWhite.g;\n            float unitB = linearColor.b / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            return vec4(toneMapped, 1.0);\n        }\n        \n        void main () {\n            gl_FragColor = toSrgb(emissiveColor, sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {emissiveColor: 'emissiveColor', sceneProperties: 'sceneProperties'}
};
var $ianmackenzie$elm_units$Luminance$inNits = function (_v0) {
	var numNits = _v0.a;
	return numNits;
};
var $elm_explorations$linear_algebra$Math$Vector3$scale = _MJS_v3scale;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh = F5(
	function (color, backlight, bounds, webGLMesh, backFaceSetting) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$plainVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissiveFragment,
							webGLMesh,
							{
								emissiveColor: A2(
									$elm_explorations$linear_algebra$Math$Vector3$scale,
									$ianmackenzie$elm_units$Luminance$inNits(backlight),
									color),
								modelMatrix: modelMatrix,
								modelScale: modelScale,
								projectionMatrix: projectionMatrix,
								sceneProperties: sceneProperties,
								viewMatrix: viewMatrix
							});
					})));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissivePointFragment = {
	src: '\n        precision mediump float;\n        \n        uniform mediump vec3 emissiveColor;\n        uniform lowp float pointRadius;\n        uniform highp mat4 sceneProperties;\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec3 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            float unitR = linearColor.r / referenceWhite.r;\n            float unitG = linearColor.g / referenceWhite.g;\n            float unitB = linearColor.b / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            return vec4(toneMapped, 1.0);\n        }\n        \n        float pointAlpha(float pointRadius, vec2 pointCoord) {\n            float pointSize = 2.0 * pointRadius;\n            float x = (pointSize + 2.0) * (pointCoord.s - 0.5);\n            float y = (pointSize + 2.0) * (pointCoord.t - 0.5);\n            float r = sqrt(x * x + y * y);\n            float innerRadius = pointRadius;\n            float outerRadius = pointRadius + 1.0;\n            if (r > outerRadius) {\n                return 0.0;\n            } else if (r > innerRadius) {\n                return outerRadius - r;\n            } else {\n                return 1.0;\n            }\n        }\n        \n        void main () {\n            vec4 color = toSrgb(emissiveColor, sceneProperties);\n            float supersampling = sceneProperties[3][0];\n            float alpha = pointAlpha(pointRadius * supersampling, gl_PointCoord);\n            gl_FragColor = vec4(color.rgb, alpha);\n        }\n    ',
	attributes: {},
	uniforms: {emissiveColor: 'emissiveColor', pointRadius: 'pointRadius', sceneProperties: 'sceneProperties'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$emissivePointMesh = F5(
	function (color, backlight, radius, bounds, webGLMesh) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$PointNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							settings,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$pointVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissivePointFragment,
							webGLMesh,
							{
								emissiveColor: A2(
									$elm_explorations$linear_algebra$Math$Vector3$scale,
									$ianmackenzie$elm_units$Luminance$inNits(backlight),
									color),
								modelMatrix: modelMatrix,
								modelScale: modelScale,
								pointRadius: radius,
								projectionMatrix: projectionMatrix,
								sceneProperties: sceneProperties,
								viewMatrix: viewMatrix
							});
					})));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianFragment = {
	src: '\n        precision highp float;\n        \n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 lights12;\n        uniform highp mat4 lights34;\n        uniform highp mat4 lights56;\n        uniform highp mat4 lights78;\n        uniform lowp vec4 enabledLights;\n        uniform lowp vec3 materialColor;\n        uniform highp mat4 viewMatrix;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        \n        const lowp float kPerspectiveProjection = 0.0;\n        const lowp float kOrthographicProjection = 1.0;\n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        const highp float kPi = 3.14159265359;\n        const lowp float kDisabledLight = 0.0;\n        const lowp float kSoftLighting = 3.0;\n        \n        float getNormalSign() {\n            return 2.0 * float(gl_FrontFacing) - 1.0;\n        }\n        \n        vec3 getDirectionToCamera(vec3 surfacePosition, mat4 sceneProperties) {\n            float projectionType = sceneProperties[1].w;\n            if (projectionType == kPerspectiveProjection) {\n                vec3 cameraPoint = sceneProperties[1].xyz;\n                return normalize(cameraPoint - surfacePosition);\n            } else if (projectionType == kOrthographicProjection) {\n                return sceneProperties[1].xyz;\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        void getDirectionToLightAndNormalIlluminance(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            out vec3 directionToLight,\n            out vec3 normalIlluminance\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                directionToLight = xyz_type.xyz;\n                normalIlluminance = rgb_parameter.rgb;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                vec3 displacement = lightPosition - surfacePosition;\n                float distance = length(displacement);\n                directionToLight = displacement / distance;\n                normalIlluminance = rgb_parameter.rgb / (4.0 * kPi * distance * distance);\n            }\n        }\n        \n        float positiveDotProduct(vec3 v1, vec3 v2) {\n            return clamp(dot(v1, v2), 0.0, 1.0);\n        }\n        \n        vec3 softLightingLuminance(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localLightDirection\n        ) {\n            float sinElevation = dot(localLightDirection, localUpDirection);\n            float t = (sinElevation + 1.0) / 2.0;\n            return aboveLuminance * t + belowLuminance * (1.0 - t);\n        }\n        \n        vec3 lambertianLight(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 materialColor,\n            vec4 xyz_type,\n            vec4 rgb_parameter\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDisabledLight) {\n                return vec3(0.0, 0.0, 0.0);\n            } else if (lightType == kSoftLighting) {\n                vec3 upDirection = xyz_type.xyz;\n                vec3 aboveLuminance = rgb_parameter.rgb;\n                vec3 belowLuminance = rgb_parameter.a * aboveLuminance;\n                vec3 luminance = softLightingLuminance(aboveLuminance, belowLuminance, upDirection, surfaceNormal);\n                return luminance * materialColor;\n            }\n        \n            vec3 directionToLight = vec3(0.0, 0.0, 0.0);\n            vec3 normalIlluminance = vec3(0.0, 0.0, 0.0);\n            getDirectionToLightAndNormalIlluminance(\n                xyz_type,\n                rgb_parameter,\n                surfacePosition,\n                directionToLight,\n                normalIlluminance\n            );\n        \n            float dotNL = positiveDotProduct(directionToLight, surfaceNormal);\n            return (normalIlluminance * dotNL) * (materialColor / kPi);\n        }\n        \n        vec3 lambertianLighting(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 materialColor,\n            mat4 lights12,\n            mat4 lights34,\n            mat4 lights56,\n            mat4 lights78,\n            vec4 enabledLights\n        ) {\n            vec3 litColor1 = enabledLights[0] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, lights12[0], lights12[1]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor2 = enabledLights[1] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, lights12[2], lights12[3]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor3 = enabledLights[2] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, lights34[0], lights34[1]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor4 = enabledLights[3] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, lights34[2], lights34[3]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor5 = lambertianLight(surfacePosition, surfaceNormal, materialColor, lights56[0], lights56[1]);\n            vec3 litColor6 = lambertianLight(surfacePosition, surfaceNormal, materialColor, lights56[2], lights56[3]);\n            vec3 litColor7 = lambertianLight(surfacePosition, surfaceNormal, materialColor, lights78[0], lights78[1]);\n            vec3 litColor8 = lambertianLight(surfacePosition, surfaceNormal, materialColor, lights78[2], lights78[3]);\n            return litColor1 + litColor2 + litColor3 + litColor4 + litColor5 + litColor6 + litColor7 + litColor8;\n        }\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec3 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            float unitR = linearColor.r / referenceWhite.r;\n            float unitG = linearColor.g / referenceWhite.g;\n            float unitB = linearColor.b / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            return vec4(toneMapped, 1.0);\n        }\n        \n        void main() {\n            vec3 normalDirection = normalize(interpolatedNormal) * getNormalSign();\n            vec3 directionToCamera = getDirectionToCamera(interpolatedPosition, sceneProperties);\n        \n            vec3 linearColor = lambertianLighting(\n                interpolatedPosition,\n                normalDirection,\n                materialColor,\n                lights12,\n                lights34,\n                lights56,\n                lights78,\n                enabledLights\n            );\n        \n            gl_FragColor = toSrgb(linearColor, sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {enabledLights: 'enabledLights', lights12: 'lights12', lights34: 'lights34', lights56: 'lights56', lights78: 'lights78', materialColor: 'materialColor', sceneProperties: 'sceneProperties', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$uniformVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        attribute highp vec3 normal;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        void main () {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            interpolatedPosition = worldPosition.xyz;\n            interpolatedNormal = getWorldNormal(normal, modelScale, modelMatrix);\n        }\n    ',
	attributes: {normal: 'normal', position: 'position'},
	uniforms: {modelMatrix: 'modelMatrix', modelScale: 'modelScale', projectionMatrix: 'projectionMatrix', sceneProperties: 'sceneProperties', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$lambertianMesh = F4(
	function (color, bounds, webGLMesh, backFaceSetting) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v0, settings) {
						var lights = _v0.a;
						var enabledLights = _v0.b;
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$uniformVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianFragment,
							webGLMesh,
							{enabledLights: enabledLights, lights12: lights.lights12, lights34: lights.lights34, lights56: lights.lights56, lights78: lights.lights78, materialColor: color, modelMatrix: modelMatrix, modelScale: modelScale, projectionMatrix: projectionMatrix, sceneProperties: sceneProperties, viewMatrix: viewMatrix});
					})));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianTextureFragment = {
	src: '\n        precision highp float;\n        \n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 lights12;\n        uniform highp mat4 lights34;\n        uniform highp mat4 lights56;\n        uniform highp mat4 lights78;\n        uniform lowp vec4 enabledLights;\n        uniform mediump sampler2D materialColorTexture;\n        uniform mediump sampler2D normalMapTexture;\n        uniform lowp float useNormalMap;\n        uniform highp mat4 viewMatrix;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        varying mediump vec2 interpolatedUv;\n        varying highp vec3 interpolatedTangent;\n        \n        const lowp float kPerspectiveProjection = 0.0;\n        const lowp float kOrthographicProjection = 1.0;\n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        const highp float kPi = 3.14159265359;\n        const lowp float kDisabledLight = 0.0;\n        const lowp float kSoftLighting = 3.0;\n        \n        vec3 getLocalNormal(sampler2D normalMap, float useNormalMap, vec2 uv) {\n            vec3 rgb = useNormalMap * texture2D(normalMap, uv).rgb + (1.0 - useNormalMap) * vec3(0.5, 0.5, 1.0);\n            float x = 2.0 * (rgb.r - 0.5);\n            float y = 2.0 * (rgb.g - 0.5);\n            float z = 2.0 * (rgb.b - 0.5);\n            return normalize(vec3(-x, -y, z));\n        }\n        \n        float getNormalSign() {\n            return 2.0 * float(gl_FrontFacing) - 1.0;\n        }\n        \n        vec3 getMappedNormal(vec3 normal, vec3 tangent, float normalSign, vec3 localNormal) {\n            vec3 bitangent = cross(normal, tangent) * normalSign;\n            return normalize(localNormal.x * tangent + localNormal.y * bitangent + localNormal.z * normal);\n        }\n        \n        vec3 getDirectionToCamera(vec3 surfacePosition, mat4 sceneProperties) {\n            float projectionType = sceneProperties[1].w;\n            if (projectionType == kPerspectiveProjection) {\n                vec3 cameraPoint = sceneProperties[1].xyz;\n                return normalize(cameraPoint - surfacePosition);\n            } else if (projectionType == kOrthographicProjection) {\n                return sceneProperties[1].xyz;\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        void getDirectionToLightAndNormalIlluminance(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            out vec3 directionToLight,\n            out vec3 normalIlluminance\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                directionToLight = xyz_type.xyz;\n                normalIlluminance = rgb_parameter.rgb;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                vec3 displacement = lightPosition - surfacePosition;\n                float distance = length(displacement);\n                directionToLight = displacement / distance;\n                normalIlluminance = rgb_parameter.rgb / (4.0 * kPi * distance * distance);\n            }\n        }\n        \n        float positiveDotProduct(vec3 v1, vec3 v2) {\n            return clamp(dot(v1, v2), 0.0, 1.0);\n        }\n        \n        vec3 softLightingLuminance(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localLightDirection\n        ) {\n            float sinElevation = dot(localLightDirection, localUpDirection);\n            float t = (sinElevation + 1.0) / 2.0;\n            return aboveLuminance * t + belowLuminance * (1.0 - t);\n        }\n        \n        vec3 lambertianLight(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 materialColor,\n            vec4 xyz_type,\n            vec4 rgb_parameter\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDisabledLight) {\n                return vec3(0.0, 0.0, 0.0);\n            } else if (lightType == kSoftLighting) {\n                vec3 upDirection = xyz_type.xyz;\n                vec3 aboveLuminance = rgb_parameter.rgb;\n                vec3 belowLuminance = rgb_parameter.a * aboveLuminance;\n                vec3 luminance = softLightingLuminance(aboveLuminance, belowLuminance, upDirection, surfaceNormal);\n                return luminance * materialColor;\n            }\n        \n            vec3 directionToLight = vec3(0.0, 0.0, 0.0);\n            vec3 normalIlluminance = vec3(0.0, 0.0, 0.0);\n            getDirectionToLightAndNormalIlluminance(\n                xyz_type,\n                rgb_parameter,\n                surfacePosition,\n                directionToLight,\n                normalIlluminance\n            );\n        \n            float dotNL = positiveDotProduct(directionToLight, surfaceNormal);\n            return (normalIlluminance * dotNL) * (materialColor / kPi);\n        }\n        \n        vec3 lambertianLighting(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 materialColor,\n            mat4 lights12,\n            mat4 lights34,\n            mat4 lights56,\n            mat4 lights78,\n            vec4 enabledLights\n        ) {\n            vec3 litColor1 = enabledLights[0] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, lights12[0], lights12[1]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor2 = enabledLights[1] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, lights12[2], lights12[3]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor3 = enabledLights[2] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, lights34[0], lights34[1]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor4 = enabledLights[3] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, lights34[2], lights34[3]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor5 = lambertianLight(surfacePosition, surfaceNormal, materialColor, lights56[0], lights56[1]);\n            vec3 litColor6 = lambertianLight(surfacePosition, surfaceNormal, materialColor, lights56[2], lights56[3]);\n            vec3 litColor7 = lambertianLight(surfacePosition, surfaceNormal, materialColor, lights78[0], lights78[1]);\n            vec3 litColor8 = lambertianLight(surfacePosition, surfaceNormal, materialColor, lights78[2], lights78[3]);\n            return litColor1 + litColor2 + litColor3 + litColor4 + litColor5 + litColor6 + litColor7 + litColor8;\n        }\n        \n        float inverseGamma(float u) {\n            if (u <= 0.04045) {\n                return clamp(u / 12.92, 0.0, 1.0);\n            } else {\n                return clamp(pow((u + 0.055) / 1.055, 2.4), 0.0, 1.0);\n            }\n        }\n        \n        vec3 fromSrgb(vec3 srgbColor) {\n            return vec3(\n                inverseGamma(srgbColor.r),\n                inverseGamma(srgbColor.g),\n                inverseGamma(srgbColor.b)\n            );\n        }\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec3 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            float unitR = linearColor.r / referenceWhite.r;\n            float unitG = linearColor.g / referenceWhite.g;\n            float unitB = linearColor.b / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            return vec4(toneMapped, 1.0);\n        }\n        \n        void main() {\n            vec3 localNormal = getLocalNormal(normalMapTexture, useNormalMap, interpolatedUv);\n            float normalSign = getNormalSign();\n            vec3 originalNormal = normalize(interpolatedNormal) * normalSign;\n            vec3 normalDirection = getMappedNormal(originalNormal, interpolatedTangent, normalSign, localNormal);\n            vec3 directionToCamera = getDirectionToCamera(interpolatedPosition, sceneProperties);\n            vec3 materialColor = fromSrgb(texture2D(materialColorTexture, interpolatedUv).rgb);\n        \n            vec3 linearColor = lambertianLighting(\n                interpolatedPosition,\n                normalDirection,\n                materialColor,\n                lights12,\n                lights34,\n                lights56,\n                lights78,\n                enabledLights\n            );\n        \n            gl_FragColor = toSrgb(linearColor, sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {enabledLights: 'enabledLights', lights12: 'lights12', lights34: 'lights34', lights56: 'lights56', lights78: 'lights78', materialColorTexture: 'materialColorTexture', normalMapTexture: 'normalMapTexture', sceneProperties: 'sceneProperties', useNormalMap: 'useNormalMap', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$normalMappedVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        attribute highp vec3 normal;\n        attribute mediump vec2 uv;\n        attribute highp vec3 tangent;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        varying mediump vec2 interpolatedUv;\n        varying highp vec3 interpolatedTangent;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        vec3 getWorldTangent(vec3 modelTangent, vec4 modelScale, mat4 modelMatrix) {\n            return (modelMatrix * vec4(safeNormalize(modelScale.xyz * modelTangent), 0.0)).xyz;\n        }\n        \n        void main () {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            interpolatedPosition = worldPosition.xyz;\n            interpolatedNormal = getWorldNormal(normal, modelScale, modelMatrix);\n            interpolatedUv = uv;\n            interpolatedTangent = getWorldTangent(tangent, modelScale, modelMatrix);\n        }\n    ',
	attributes: {normal: 'normal', position: 'position', tangent: 'tangent', uv: 'uv'},
	uniforms: {modelMatrix: 'modelMatrix', modelScale: 'modelScale', projectionMatrix: 'projectionMatrix', sceneProperties: 'sceneProperties', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMappedLambertianMesh = F6(
	function (materialColorData, normalMapData, useNormalMap, bounds, webGLMesh, backFaceSetting) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v0, settings) {
						var lights = _v0.a;
						var enabledLights = _v0.b;
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$normalMappedVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianTextureFragment,
							webGLMesh,
							{enabledLights: enabledLights, lights12: lights.lights12, lights34: lights.lights34, lights56: lights.lights56, lights78: lights.lights78, materialColorTexture: materialColorData, modelMatrix: modelMatrix, modelScale: modelScale, normalMapTexture: normalMapData, projectionMatrix: projectionMatrix, sceneProperties: sceneProperties, useNormalMap: useNormalMap, viewMatrix: viewMatrix});
					})));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalTexturesFragment = {
	src: '\n        precision highp float;\n        \n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 lights12;\n        uniform highp mat4 lights34;\n        uniform highp mat4 lights56;\n        uniform highp mat4 lights78;\n        uniform lowp vec4 enabledLights;\n        uniform mediump sampler2D baseColorTexture;\n        uniform lowp vec4 constantBaseColor;\n        uniform mediump sampler2D roughnessTexture;\n        uniform lowp vec2 constantRoughness;\n        uniform mediump sampler2D metallicTexture;\n        uniform lowp vec2 constantMetallic;\n        uniform mediump sampler2D normalMapTexture;\n        uniform lowp float useNormalMap;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        varying mediump vec2 interpolatedUv;\n        varying highp vec3 interpolatedTangent;\n        \n        const lowp float kPerspectiveProjection = 0.0;\n        const lowp float kOrthographicProjection = 1.0;\n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        const highp float kPi = 3.14159265359;\n        const mediump float kMediumpFloatMax = 65504.0;\n        const lowp float kDisabledLight = 0.0;\n        const lowp float kSoftLighting = 3.0;\n        \n        float getFloatValue(sampler2D texture, vec2 uv, vec2 constantValue) {\n            if (constantValue.y == 1.0) {\n                return constantValue.x;\n            } else {\n                vec4 textureColor = texture2D(texture, uv);\n                return dot(textureColor, vec4(0.2126, 0.7152, 0.0722, 0.0));\n            }\n        }\n        \n        vec3 getLocalNormal(sampler2D normalMap, float useNormalMap, vec2 uv) {\n            vec3 rgb = useNormalMap * texture2D(normalMap, uv).rgb + (1.0 - useNormalMap) * vec3(0.5, 0.5, 1.0);\n            float x = 2.0 * (rgb.r - 0.5);\n            float y = 2.0 * (rgb.g - 0.5);\n            float z = 2.0 * (rgb.b - 0.5);\n            return normalize(vec3(-x, -y, z));\n        }\n        \n        float getNormalSign() {\n            return 2.0 * float(gl_FrontFacing) - 1.0;\n        }\n        \n        vec3 getMappedNormal(vec3 normal, vec3 tangent, float normalSign, vec3 localNormal) {\n            vec3 bitangent = cross(normal, tangent) * normalSign;\n            return normalize(localNormal.x * tangent + localNormal.y * bitangent + localNormal.z * normal);\n        }\n        \n        vec3 getDirectionToCamera(vec3 surfacePosition, mat4 sceneProperties) {\n            float projectionType = sceneProperties[1].w;\n            if (projectionType == kPerspectiveProjection) {\n                vec3 cameraPoint = sceneProperties[1].xyz;\n                return normalize(cameraPoint - surfacePosition);\n            } else if (projectionType == kOrthographicProjection) {\n                return sceneProperties[1].xyz;\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        void getDirectionToLightAndNormalIlluminance(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            out vec3 directionToLight,\n            out vec3 normalIlluminance\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                directionToLight = xyz_type.xyz;\n                normalIlluminance = rgb_parameter.rgb;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                vec3 displacement = lightPosition - surfacePosition;\n                float distance = length(displacement);\n                directionToLight = displacement / distance;\n                normalIlluminance = rgb_parameter.rgb / (4.0 * kPi * distance * distance);\n            }\n        }\n        \n        float positiveDotProduct(vec3 v1, vec3 v2) {\n            return clamp(dot(v1, v2), 0.0, 1.0);\n        }\n        \n        // Adapted from https://google.github.io/filament/Filament.md.html#materialsystem/specularbrdf/normaldistributionfunction(speculard)\n        float specularD(float alpha, float dotNH, vec3 normalDirection, vec3 halfDirection) {\n            vec3 crossNH = cross(normalDirection, halfDirection);\n            float a = dotNH * alpha;\n            float k = alpha / (dot(crossNH, crossNH) + a * a);\n            float d = k * k * (1.0 / kPi);\n            return min(d, kMediumpFloatMax);\n        }\n        \n        float safeQuotient(float numerator, float denominator) {\n            if (denominator == 0.0) {\n                return 0.0;\n            } else {\n                return numerator / denominator;\n            }\n        }\n        \n        float g1(float dotNV, float alphaSquared) {\n            return safeQuotient(2.0 * dotNV, dotNV + sqrt(alphaSquared + (1.0 - alphaSquared) * dotNV * dotNV));\n        }\n        \n        float specularG(float dotNL, float dotNV, float alphaSquared) {\n            return g1(dotNV, alphaSquared) * g1(dotNL, alphaSquared);\n        }\n        \n        vec3 fresnelColor(vec3 specularBaseColor, float dotVH) {\n            vec3 one = vec3(1.0, 1.0, 1.0);\n            float scale = exp2((-5.55473 * dotVH - 6.98316) * dotVH);\n            return specularBaseColor + (one - specularBaseColor) * scale;\n        }\n        \n        vec3 brdf(vec3 normalDirection, vec3 directionToCamera, vec3 directionToLight, float alpha, float dotNV, float dotNL, vec3 specularBaseColor, vec3 normalIlluminance) {\n            vec3 halfDirection = normalize(directionToCamera + directionToLight);\n            float dotVH = positiveDotProduct(directionToCamera, halfDirection);\n            float dotNH = positiveDotProduct(normalDirection, halfDirection);\n            float dotNHSquared = dotNH * dotNH;\n        \n            float d = specularD(alpha, dotNH, normalDirection, halfDirection);\n            float g = specularG(dotNL, dotNV, alpha * alpha);\n            vec3 f = fresnelColor(specularBaseColor, dotVH);\n            return safeQuotient(d * g, 4.0 * dotNL * dotNV) * f;\n        }\n        \n        vec3 sampleFacetNormal(vec3 vH, vec3 vT1, vec3 vT2, float s, float alpha) {\n            float t2 = (1.0 - s);\n            vec3 vNh = t2 * vT2 + sqrt(max(0.0, 1.0 - t2 * t2)) * vH;\n            return normalize(vec3(alpha * vNh.x, alpha * vNh.y, max(0.0, vNh.z)));\n        }\n        \n        vec3 softLightingLuminance(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localLightDirection\n        ) {\n            float sinElevation = dot(localLightDirection, localUpDirection);\n            float t = (sinElevation + 1.0) / 2.0;\n            return aboveLuminance * t + belowLuminance * (1.0 - t);\n        }\n        \n        vec3 softLightingSpecularSample(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localViewDirection,\n            vec3 localLightDirection,\n            vec3 localHalfDirection,\n            float alphaSquared,\n            vec3 specularBaseColor\n        ) {\n            vec3 luminance = softLightingLuminance(aboveLuminance, belowLuminance, localUpDirection, localLightDirection);\n            float dotVH = positiveDotProduct(localViewDirection, localHalfDirection);\n            float dotNL = localLightDirection.z;\n            return luminance * (fresnelColor(specularBaseColor, dotVH) * g1(dotNL, alphaSquared));\n        }\n        \n        vec3 softLighting(\n            vec3 normalDirection,\n            vec3 diffuseBaseColor,\n            vec3 specularBaseColor,\n            float alpha,\n            vec3 directionToCamera,\n            vec3 viewY,\n            vec4 xyz_type,\n            vec4 rgb_parameter\n        ) {\n            float alphaSquared = alpha * alpha;\n            vec3 upDirection = xyz_type.xyz;\n            vec3 luminanceAbove = rgb_parameter.rgb;\n            vec3 luminanceBelow = rgb_parameter.a * luminanceAbove;\n            vec3 crossProduct = cross(normalDirection, directionToCamera);\n            float crossMagnitude = length(crossProduct);\n            vec3 xDirection = vec3(0.0, 0.0, 0.0);\n            vec3 yDirection = vec3(0.0, 0.0, 0.0);\n            if (crossMagnitude > 1.0e-6) {\n                yDirection = (1.0 / crossMagnitude) * crossProduct;\n                xDirection = cross(yDirection, normalDirection);\n            } else {\n                vec3 viewY = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n                xDirection = normalize(cross(viewY, normalDirection));\n                yDirection = cross(normalDirection, xDirection);\n            }\n            float localViewX = dot(directionToCamera, xDirection);\n            float localViewZ = dot(directionToCamera, normalDirection);\n            vec3 localViewDirection = vec3(localViewX, 0, localViewZ);\n            float localUpX = dot(upDirection, xDirection);\n            float localUpY = dot(upDirection, yDirection);\n            float localUpZ = dot(upDirection, normalDirection);\n            vec3 localUpDirection = vec3(localUpX, localUpY, localUpZ);\n        \n            vec3 vH = normalize(vec3(alpha * localViewX, 0.0, localViewZ));\n            vec3 vT1 = vec3(0.0, 1.0, 0.0);\n            vec3 vT2 = cross(vH, vT1);\n            float s = 0.5 * (1.0 + vH.z);\n            \n            vec3 localHalfDirection = sampleFacetNormal(vH, vT1, vT2, s, alpha);\n            vec3 localLightDirection = vec3(0.0, 0.0, 0.0);\n            \n            localLightDirection = -reflect(localViewDirection, localHalfDirection);\n            vec3 specular = softLightingSpecularSample(luminanceAbove, luminanceBelow, localUpDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n            \n            localLightDirection = vec3(0.000000, 0.000000, 1.000000);\n            vec3 diffuse = softLightingLuminance(luminanceAbove, luminanceBelow, localUpDirection, localLightDirection) * localLightDirection.z;\n            \n            return specular + diffuse * diffuseBaseColor;\n        }\n        \n        vec3 physicalLight(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            vec3 normalDirection,\n            vec3 directionToCamera,\n            vec3 viewY,\n            float dotNV,\n            vec3 diffuseBaseColor,\n            vec3 specularBaseColor,\n            float alpha\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDisabledLight) {\n                return vec3(0.0, 0.0, 0.0);\n            } else if (lightType == kSoftLighting) {\n                return softLighting(normalDirection, diffuseBaseColor, specularBaseColor, alpha, directionToCamera, viewY, xyz_type, rgb_parameter);\n            }\n        \n            vec3 directionToLight = vec3(0.0, 0.0, 0.0);\n            vec3 normalIlluminance = vec3(0.0, 0.0, 0.0);\n            getDirectionToLightAndNormalIlluminance(xyz_type, rgb_parameter, surfacePosition, directionToLight, normalIlluminance);\n        \n            float dotNL = positiveDotProduct(normalDirection, directionToLight);\n            vec3 specularColor = brdf(normalDirection, directionToCamera, directionToLight, alpha, dotNV, dotNL, specularBaseColor, normalIlluminance);\n            return (normalIlluminance * dotNL) * ((diffuseBaseColor / kPi) + specularColor);\n        }\n        \n        vec3 physicalLighting(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 baseColor,\n            vec3 directionToCamera,\n            mat4 viewMatrix,\n            float roughness,\n            float metallic,\n            mat4 lights12,\n            mat4 lights34,\n            mat4 lights56,\n            mat4 lights78,\n            vec4 enabledLights\n        ) {\n            float dotNV = positiveDotProduct(surfaceNormal, directionToCamera);\n            float alpha = roughness * roughness;\n            float nonmetallic = 1.0 - metallic;\n            vec3 diffuseBaseColor = nonmetallic * 0.96 * baseColor;\n            vec3 specularBaseColor = nonmetallic * 0.04 * vec3(1.0, 1.0, 1.0) + metallic * baseColor;\n            vec3 viewY = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n        \n            vec3 litColor1 = enabledLights[0] == 1.0 ? physicalLight(lights12[0], lights12[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor2 = enabledLights[1] == 1.0 ? physicalLight(lights12[2], lights12[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor3 = enabledLights[2] == 1.0 ? physicalLight(lights34[0], lights34[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor4 = enabledLights[3] == 1.0 ? physicalLight(lights34[2], lights34[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor5 = physicalLight(lights56[0], lights56[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha);\n            vec3 litColor6 = physicalLight(lights56[2], lights56[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha);\n            vec3 litColor7 = physicalLight(lights78[0], lights78[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha);\n            vec3 litColor8 = physicalLight(lights78[2], lights78[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha);\n            return litColor1 + litColor2 + litColor3 + litColor4 + litColor5 + litColor6 + litColor7 + litColor8;\n        }\n        \n        float inverseGamma(float u) {\n            if (u <= 0.04045) {\n                return clamp(u / 12.92, 0.0, 1.0);\n            } else {\n                return clamp(pow((u + 0.055) / 1.055, 2.4), 0.0, 1.0);\n            }\n        }\n        \n        vec3 fromSrgb(vec3 srgbColor) {\n            return vec3(\n                inverseGamma(srgbColor.r),\n                inverseGamma(srgbColor.g),\n                inverseGamma(srgbColor.b)\n            );\n        }\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec3 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            float unitR = linearColor.r / referenceWhite.r;\n            float unitG = linearColor.g / referenceWhite.g;\n            float unitB = linearColor.b / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            return vec4(toneMapped, 1.0);\n        }\n        \n        void main() {\n            vec3 baseColor = fromSrgb(texture2D(baseColorTexture, interpolatedUv).rgb) * (1.0 - constantBaseColor.w) + constantBaseColor.rgb * constantBaseColor.w;\n            float roughness = getFloatValue(roughnessTexture, interpolatedUv, constantRoughness);\n            float metallic = getFloatValue(metallicTexture, interpolatedUv, constantMetallic);\n        \n            vec3 localNormal = getLocalNormal(normalMapTexture, useNormalMap, interpolatedUv);\n            float normalSign = getNormalSign();\n            vec3 originalNormal = normalize(interpolatedNormal) * normalSign;\n            vec3 normalDirection = getMappedNormal(originalNormal, interpolatedTangent, normalSign, localNormal);\n            vec3 directionToCamera = getDirectionToCamera(interpolatedPosition, sceneProperties);\n        \n            vec3 linearColor = physicalLighting(\n                interpolatedPosition,\n                normalDirection,\n                baseColor,\n                directionToCamera,\n                viewMatrix,\n                roughness,\n                metallic,\n                lights12,\n                lights34,\n                lights56,\n                lights78,\n                enabledLights\n            );\n        \n            gl_FragColor = toSrgb(linearColor, sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {baseColorTexture: 'baseColorTexture', constantBaseColor: 'constantBaseColor', constantMetallic: 'constantMetallic', constantRoughness: 'constantRoughness', enabledLights: 'enabledLights', lights12: 'lights12', lights34: 'lights34', lights56: 'lights56', lights78: 'lights78', metallicTexture: 'metallicTexture', normalMapTexture: 'normalMapTexture', roughnessTexture: 'roughnessTexture', sceneProperties: 'sceneProperties', useNormalMap: 'useNormalMap', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMappedPhysicalMesh = function (baseColorData) {
	return function (constantBaseColor) {
		return function (roughnessData) {
			return function (constantRoughness) {
				return function (metallicData) {
					return function (constantMetallic) {
						return function (normalMapData) {
							return function (useNormalMap) {
								return function (bounds) {
									return function (webGLMesh) {
										return function (backFaceSetting) {
											return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
												A2(
													$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
													bounds,
													F8(
														function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v0, settings) {
															var lights = _v0.a;
															var enabledLights = _v0.b;
															return A5(
																$elm_explorations$webgl$WebGL$entityWith,
																A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
																$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$normalMappedVertex,
																$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalTexturesFragment,
																webGLMesh,
																{baseColorTexture: baseColorData, constantBaseColor: constantBaseColor, constantMetallic: constantMetallic, constantRoughness: constantRoughness, enabledLights: enabledLights, lights12: lights.lights12, lights34: lights.lights34, lights56: lights.lights56, lights78: lights.lights78, metallicTexture: metallicData, modelMatrix: modelMatrix, modelScale: modelScale, normalMapTexture: normalMapData, projectionMatrix: projectionMatrix, roughnessTexture: roughnessData, sceneProperties: sceneProperties, useNormalMap: useNormalMap, viewMatrix: viewMatrix});
														})));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalFragment = {
	src: '\n        precision highp float;\n        \n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 lights12;\n        uniform highp mat4 lights34;\n        uniform highp mat4 lights56;\n        uniform highp mat4 lights78;\n        uniform lowp vec4 enabledLights;\n        uniform lowp vec3 baseColor;\n        uniform lowp float roughness;\n        uniform lowp float metallic;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        \n        const lowp float kPerspectiveProjection = 0.0;\n        const lowp float kOrthographicProjection = 1.0;\n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        const highp float kPi = 3.14159265359;\n        const mediump float kMediumpFloatMax = 65504.0;\n        const lowp float kDisabledLight = 0.0;\n        const lowp float kSoftLighting = 3.0;\n        \n        float getNormalSign() {\n            return 2.0 * float(gl_FrontFacing) - 1.0;\n        }\n        \n        vec3 getDirectionToCamera(vec3 surfacePosition, mat4 sceneProperties) {\n            float projectionType = sceneProperties[1].w;\n            if (projectionType == kPerspectiveProjection) {\n                vec3 cameraPoint = sceneProperties[1].xyz;\n                return normalize(cameraPoint - surfacePosition);\n            } else if (projectionType == kOrthographicProjection) {\n                return sceneProperties[1].xyz;\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        void getDirectionToLightAndNormalIlluminance(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            out vec3 directionToLight,\n            out vec3 normalIlluminance\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                directionToLight = xyz_type.xyz;\n                normalIlluminance = rgb_parameter.rgb;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                vec3 displacement = lightPosition - surfacePosition;\n                float distance = length(displacement);\n                directionToLight = displacement / distance;\n                normalIlluminance = rgb_parameter.rgb / (4.0 * kPi * distance * distance);\n            }\n        }\n        \n        float positiveDotProduct(vec3 v1, vec3 v2) {\n            return clamp(dot(v1, v2), 0.0, 1.0);\n        }\n        \n        // Adapted from https://google.github.io/filament/Filament.md.html#materialsystem/specularbrdf/normaldistributionfunction(speculard)\n        float specularD(float alpha, float dotNH, vec3 normalDirection, vec3 halfDirection) {\n            vec3 crossNH = cross(normalDirection, halfDirection);\n            float a = dotNH * alpha;\n            float k = alpha / (dot(crossNH, crossNH) + a * a);\n            float d = k * k * (1.0 / kPi);\n            return min(d, kMediumpFloatMax);\n        }\n        \n        float safeQuotient(float numerator, float denominator) {\n            if (denominator == 0.0) {\n                return 0.0;\n            } else {\n                return numerator / denominator;\n            }\n        }\n        \n        float g1(float dotNV, float alphaSquared) {\n            return safeQuotient(2.0 * dotNV, dotNV + sqrt(alphaSquared + (1.0 - alphaSquared) * dotNV * dotNV));\n        }\n        \n        float specularG(float dotNL, float dotNV, float alphaSquared) {\n            return g1(dotNV, alphaSquared) * g1(dotNL, alphaSquared);\n        }\n        \n        vec3 fresnelColor(vec3 specularBaseColor, float dotVH) {\n            vec3 one = vec3(1.0, 1.0, 1.0);\n            float scale = exp2((-5.55473 * dotVH - 6.98316) * dotVH);\n            return specularBaseColor + (one - specularBaseColor) * scale;\n        }\n        \n        vec3 brdf(vec3 normalDirection, vec3 directionToCamera, vec3 directionToLight, float alpha, float dotNV, float dotNL, vec3 specularBaseColor, vec3 normalIlluminance) {\n            vec3 halfDirection = normalize(directionToCamera + directionToLight);\n            float dotVH = positiveDotProduct(directionToCamera, halfDirection);\n            float dotNH = positiveDotProduct(normalDirection, halfDirection);\n            float dotNHSquared = dotNH * dotNH;\n        \n            float d = specularD(alpha, dotNH, normalDirection, halfDirection);\n            float g = specularG(dotNL, dotNV, alpha * alpha);\n            vec3 f = fresnelColor(specularBaseColor, dotVH);\n            return safeQuotient(d * g, 4.0 * dotNL * dotNV) * f;\n        }\n        \n        vec3 sampleFacetNormal(vec3 vH, vec3 vT1, vec3 vT2, float s, float alpha) {\n            float t2 = (1.0 - s);\n            vec3 vNh = t2 * vT2 + sqrt(max(0.0, 1.0 - t2 * t2)) * vH;\n            return normalize(vec3(alpha * vNh.x, alpha * vNh.y, max(0.0, vNh.z)));\n        }\n        \n        vec3 softLightingLuminance(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localLightDirection\n        ) {\n            float sinElevation = dot(localLightDirection, localUpDirection);\n            float t = (sinElevation + 1.0) / 2.0;\n            return aboveLuminance * t + belowLuminance * (1.0 - t);\n        }\n        \n        vec3 softLightingSpecularSample(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localViewDirection,\n            vec3 localLightDirection,\n            vec3 localHalfDirection,\n            float alphaSquared,\n            vec3 specularBaseColor\n        ) {\n            vec3 luminance = softLightingLuminance(aboveLuminance, belowLuminance, localUpDirection, localLightDirection);\n            float dotVH = positiveDotProduct(localViewDirection, localHalfDirection);\n            float dotNL = localLightDirection.z;\n            return luminance * (fresnelColor(specularBaseColor, dotVH) * g1(dotNL, alphaSquared));\n        }\n        \n        vec3 softLighting(\n            vec3 normalDirection,\n            vec3 diffuseBaseColor,\n            vec3 specularBaseColor,\n            float alpha,\n            vec3 directionToCamera,\n            vec3 viewY,\n            vec4 xyz_type,\n            vec4 rgb_parameter\n        ) {\n            float alphaSquared = alpha * alpha;\n            vec3 upDirection = xyz_type.xyz;\n            vec3 luminanceAbove = rgb_parameter.rgb;\n            vec3 luminanceBelow = rgb_parameter.a * luminanceAbove;\n            vec3 crossProduct = cross(normalDirection, directionToCamera);\n            float crossMagnitude = length(crossProduct);\n            vec3 xDirection = vec3(0.0, 0.0, 0.0);\n            vec3 yDirection = vec3(0.0, 0.0, 0.0);\n            if (crossMagnitude > 1.0e-6) {\n                yDirection = (1.0 / crossMagnitude) * crossProduct;\n                xDirection = cross(yDirection, normalDirection);\n            } else {\n                vec3 viewY = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n                xDirection = normalize(cross(viewY, normalDirection));\n                yDirection = cross(normalDirection, xDirection);\n            }\n            float localViewX = dot(directionToCamera, xDirection);\n            float localViewZ = dot(directionToCamera, normalDirection);\n            vec3 localViewDirection = vec3(localViewX, 0, localViewZ);\n            float localUpX = dot(upDirection, xDirection);\n            float localUpY = dot(upDirection, yDirection);\n            float localUpZ = dot(upDirection, normalDirection);\n            vec3 localUpDirection = vec3(localUpX, localUpY, localUpZ);\n        \n            vec3 vH = normalize(vec3(alpha * localViewX, 0.0, localViewZ));\n            vec3 vT1 = vec3(0.0, 1.0, 0.0);\n            vec3 vT2 = cross(vH, vT1);\n            float s = 0.5 * (1.0 + vH.z);\n            \n            vec3 localHalfDirection = sampleFacetNormal(vH, vT1, vT2, s, alpha);\n            vec3 localLightDirection = vec3(0.0, 0.0, 0.0);\n            \n            localLightDirection = -reflect(localViewDirection, localHalfDirection);\n            vec3 specular = softLightingSpecularSample(luminanceAbove, luminanceBelow, localUpDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n            \n            localLightDirection = vec3(0.000000, 0.000000, 1.000000);\n            vec3 diffuse = softLightingLuminance(luminanceAbove, luminanceBelow, localUpDirection, localLightDirection) * localLightDirection.z;\n            \n            return specular + diffuse * diffuseBaseColor;\n        }\n        \n        vec3 physicalLight(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            vec3 normalDirection,\n            vec3 directionToCamera,\n            vec3 viewY,\n            float dotNV,\n            vec3 diffuseBaseColor,\n            vec3 specularBaseColor,\n            float alpha\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDisabledLight) {\n                return vec3(0.0, 0.0, 0.0);\n            } else if (lightType == kSoftLighting) {\n                return softLighting(normalDirection, diffuseBaseColor, specularBaseColor, alpha, directionToCamera, viewY, xyz_type, rgb_parameter);\n            }\n        \n            vec3 directionToLight = vec3(0.0, 0.0, 0.0);\n            vec3 normalIlluminance = vec3(0.0, 0.0, 0.0);\n            getDirectionToLightAndNormalIlluminance(xyz_type, rgb_parameter, surfacePosition, directionToLight, normalIlluminance);\n        \n            float dotNL = positiveDotProduct(normalDirection, directionToLight);\n            vec3 specularColor = brdf(normalDirection, directionToCamera, directionToLight, alpha, dotNV, dotNL, specularBaseColor, normalIlluminance);\n            return (normalIlluminance * dotNL) * ((diffuseBaseColor / kPi) + specularColor);\n        }\n        \n        vec3 physicalLighting(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 baseColor,\n            vec3 directionToCamera,\n            mat4 viewMatrix,\n            float roughness,\n            float metallic,\n            mat4 lights12,\n            mat4 lights34,\n            mat4 lights56,\n            mat4 lights78,\n            vec4 enabledLights\n        ) {\n            float dotNV = positiveDotProduct(surfaceNormal, directionToCamera);\n            float alpha = roughness * roughness;\n            float nonmetallic = 1.0 - metallic;\n            vec3 diffuseBaseColor = nonmetallic * 0.96 * baseColor;\n            vec3 specularBaseColor = nonmetallic * 0.04 * vec3(1.0, 1.0, 1.0) + metallic * baseColor;\n            vec3 viewY = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n        \n            vec3 litColor1 = enabledLights[0] == 1.0 ? physicalLight(lights12[0], lights12[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor2 = enabledLights[1] == 1.0 ? physicalLight(lights12[2], lights12[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor3 = enabledLights[2] == 1.0 ? physicalLight(lights34[0], lights34[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor4 = enabledLights[3] == 1.0 ? physicalLight(lights34[2], lights34[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor5 = physicalLight(lights56[0], lights56[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha);\n            vec3 litColor6 = physicalLight(lights56[2], lights56[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha);\n            vec3 litColor7 = physicalLight(lights78[0], lights78[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha);\n            vec3 litColor8 = physicalLight(lights78[2], lights78[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha);\n            return litColor1 + litColor2 + litColor3 + litColor4 + litColor5 + litColor6 + litColor7 + litColor8;\n        }\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec3 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            float unitR = linearColor.r / referenceWhite.r;\n            float unitG = linearColor.g / referenceWhite.g;\n            float unitB = linearColor.b / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            return vec4(toneMapped, 1.0);\n        }\n        \n        void main() {\n            vec3 normalDirection = normalize(interpolatedNormal) * getNormalSign();\n            vec3 directionToCamera = getDirectionToCamera(interpolatedPosition, sceneProperties);\n        \n            vec3 linearColor = physicalLighting(\n                interpolatedPosition,\n                normalDirection,\n                baseColor,\n                directionToCamera,\n                viewMatrix,\n                roughness,\n                metallic,\n                lights12,\n                lights34,\n                lights56,\n                lights78,\n                enabledLights\n            );\n        \n            gl_FragColor = toSrgb(linearColor, sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {baseColor: 'baseColor', enabledLights: 'enabledLights', lights12: 'lights12', lights34: 'lights34', lights56: 'lights56', lights78: 'lights78', metallic: 'metallic', roughness: 'roughness', sceneProperties: 'sceneProperties', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$physicalMesh = F6(
	function (color, roughness, metallic, bounds, webGLMesh, backFaceSetting) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v0, settings) {
						var lights = _v0.a;
						var enabledLights = _v0.b;
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$uniformVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalFragment,
							webGLMesh,
							{baseColor: color, enabledLights: enabledLights, lights12: lights.lights12, lights34: lights.lights34, lights56: lights.lights56, lights78: lights.lights78, metallic: metallic, modelMatrix: modelMatrix, modelScale: modelScale, projectionMatrix: projectionMatrix, roughness: roughness, sceneProperties: sceneProperties, viewMatrix: viewMatrix});
					})));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$ConstantLambertianMaterial = function (a) {
	return {$: 'ConstantLambertianMaterial', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedLambertianMaterial = F2(
	function (a, b) {
		return {$: 'TexturedLambertianMaterial', a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple = F2(
	function (fallbackData, channel) {
		if (channel.$ === 'Constant') {
			var _v1 = channel.a;
			return _Utils_Tuple2(fallbackData, 0.0);
		} else {
			var data = channel.a.data;
			return _Utils_Tuple2(data, 1.0);
		}
	});
var $elm_explorations$linear_algebra$Math$Vector4$vec4 = _MJS_v4;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$enabledVec3 = function (vector) {
	return A4(
		$elm_explorations$linear_algebra$Math$Vector4$vec4,
		$elm_explorations$linear_algebra$Math$Vector3$getX(vector),
		$elm_explorations$linear_algebra$Math$Vector3$getY(vector),
		$elm_explorations$linear_algebra$Math$Vector3$getZ(vector),
		1);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4 = A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0, 0, 0, 0);
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$vec3Tuple = F2(
	function (fallbackData, texture) {
		if (texture.$ === 'Constant') {
			var baseColor = texture.a.a;
			return _Utils_Tuple2(
				fallbackData,
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$enabledVec3(baseColor));
		} else {
			var data = texture.a.data;
			return _Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4);
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$resolveLambertian = F2(
	function (materialColorTexture, normalMapTexture) {
		var _v0 = _Utils_Tuple2(materialColorTexture, normalMapTexture);
		if (_v0.a.$ === 'Constant') {
			if (_v0.b.$ === 'Constant') {
				var materialColor = _v0.a.a;
				var _v1 = _v0.b.a;
				return $ianmackenzie$elm_3d_scene$Scene3d$Entity$ConstantLambertianMaterial(materialColor);
			} else {
				var data = _v0.b.a.data;
				return A2(
					$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedLambertianMaterial,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$vec3Tuple, data, materialColorTexture),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
			}
		} else {
			var data = _v0.a.a.data;
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedLambertianMaterial,
				_Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$ConstantPbrMaterial = F3(
	function (a, b, c) {
		return {$: 'ConstantPbrMaterial', a: a, b: b, c: c};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial = F4(
	function (a, b, c, d) {
		return {$: 'TexturedPbrMaterial', a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$Tuple4 = F4(
	function (a, b, c, d) {
		return {$: 'Tuple4', a: a, b: b, c: c, d: d};
	});
var $elm_explorations$linear_algebra$Math$Vector2$vec2 = _MJS_v2;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$enabledFloat = function (value) {
	return A2($elm_explorations$linear_algebra$Math$Vector2$vec2, value, 1);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2 = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0);
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple = F2(
	function (fallbackData, texture) {
		if (texture.$ === 'Constant') {
			var value = texture.a;
			return _Utils_Tuple2(
				fallbackData,
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$enabledFloat(value));
		} else {
			var data = texture.a.data;
			return _Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2);
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$resolvePbr = F4(
	function (baseColorTexture, roughnessTexture, metallicTexture, normalMapTexture) {
		var _v0 = A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$Tuple4, baseColorTexture, roughnessTexture, metallicTexture, normalMapTexture);
		if (_v0.a.$ === 'Constant') {
			if (_v0.b.$ === 'Constant') {
				if (_v0.c.$ === 'Constant') {
					if (_v0.d.$ === 'Constant') {
						var baseColor = _v0.a.a;
						var roughness = _v0.b.a;
						var metallic = _v0.c.a;
						var _v1 = _v0.d.a;
						return A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$ConstantPbrMaterial, baseColor, roughness, metallic);
					} else {
						var data = _v0.d.a.data;
						return A4(
							$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
							A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$vec3Tuple, data, baseColorTexture),
							A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, roughnessTexture),
							A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, metallicTexture),
							_Utils_Tuple2(data, 1.0));
					}
				} else {
					var data = _v0.c.a.data;
					return A4(
						$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$vec3Tuple, data, baseColorTexture),
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, roughnessTexture),
						_Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2),
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
				}
			} else {
				var data = _v0.b.a.data;
				return A4(
					$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$vec3Tuple, data, baseColorTexture),
					_Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, metallicTexture),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
			}
		} else {
			var data = _v0.a.a.data;
			return A4(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
				_Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, roughnessTexture),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, metallicTexture),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissiveTextureFragment = {
	src: '\n        precision mediump float;\n        \n        uniform mediump sampler2D colorTexture;\n        uniform mediump float backlight;\n        uniform highp mat4 sceneProperties;\n        \n        varying mediump vec2 interpolatedUv;\n        \n        float inverseGamma(float u) {\n            if (u <= 0.04045) {\n                return clamp(u / 12.92, 0.0, 1.0);\n            } else {\n                return clamp(pow((u + 0.055) / 1.055, 2.4), 0.0, 1.0);\n            }\n        }\n        \n        vec3 fromSrgb(vec3 srgbColor) {\n            return vec3(\n                inverseGamma(srgbColor.r),\n                inverseGamma(srgbColor.g),\n                inverseGamma(srgbColor.b)\n            );\n        }\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec3 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            float unitR = linearColor.r / referenceWhite.r;\n            float unitG = linearColor.g / referenceWhite.g;\n            float unitB = linearColor.b / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            return vec4(toneMapped, 1.0);\n        }\n        \n        void main () {\n            vec3 emissiveColor = fromSrgb(texture2D(colorTexture, interpolatedUv).rgb) * backlight;\n            gl_FragColor = toSrgb(emissiveColor, sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {backlight: 'backlight', colorTexture: 'colorTexture', sceneProperties: 'sceneProperties'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedEmissiveMesh = F5(
	function (colorData, backlight, bounds, webGLMesh, backFaceSetting) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$unlitVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissiveTextureFragment,
							webGLMesh,
							{
								backlight: $ianmackenzie$elm_units$Luminance$inNits(backlight),
								colorTexture: colorData,
								modelMatrix: modelMatrix,
								modelScale: modelScale,
								projectionMatrix: projectionMatrix,
								sceneProperties: sceneProperties,
								viewMatrix: viewMatrix
							});
					})));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        attribute highp vec3 normal;\n        attribute mediump vec2 uv;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        varying mediump vec2 interpolatedUv;\n        varying highp vec3 interpolatedTangent;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        void main () {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            interpolatedPosition = worldPosition.xyz;\n            interpolatedNormal = getWorldNormal(normal, modelScale, modelMatrix);\n            interpolatedUv = uv;\n            interpolatedTangent = vec3(0.0, 0.0, 0.0);\n        }\n    ',
	attributes: {normal: 'normal', position: 'position', uv: 'uv'},
	uniforms: {modelMatrix: 'modelMatrix', modelScale: 'modelScale', projectionMatrix: 'projectionMatrix', sceneProperties: 'sceneProperties', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedLambertianMesh = F4(
	function (materialColorData, bounds, webGLMesh, backFaceSetting) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v0, settings) {
						var lights = _v0.a;
						var enabledLights = _v0.b;
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianTextureFragment,
							webGLMesh,
							{enabledLights: enabledLights, lights12: lights.lights12, lights34: lights.lights34, lights56: lights.lights56, lights78: lights.lights78, materialColorTexture: materialColorData, modelMatrix: modelMatrix, modelScale: modelScale, normalMapTexture: materialColorData, projectionMatrix: projectionMatrix, sceneProperties: sceneProperties, useNormalMap: 0.0, viewMatrix: viewMatrix});
					})));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedPhysicalMesh = F9(
	function (baseColorData, constantBaseColor, roughnessData, constantRoughness, metallicData, constantMetallic, bounds, webGLMesh, backFaceSetting) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
				bounds,
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v0, settings) {
						var lights = _v0.a;
						var enabledLights = _v0.b;
						return A5(
							$elm_explorations$webgl$WebGL$entityWith,
							A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, backFaceSetting, settings),
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$texturedVertex,
							$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalTexturesFragment,
							webGLMesh,
							{baseColorTexture: baseColorData, constantBaseColor: constantBaseColor, constantMetallic: constantMetallic, constantRoughness: constantRoughness, enabledLights: enabledLights, lights12: lights.lights12, lights34: lights.lights34, lights56: lights.lights56, lights78: lights.lights78, metallicTexture: metallicData, modelMatrix: modelMatrix, modelScale: modelScale, normalMapTexture: baseColorData, projectionMatrix: projectionMatrix, roughnessTexture: roughnessData, sceneProperties: sceneProperties, useNormalMap: 0.0, viewMatrix: viewMatrix});
					})));
	});
var $ianmackenzie$elm_units$Quantity$interpolateFrom = F3(
	function (_v0, _v1, parameter) {
		var start = _v0.a;
		var end = _v1.a;
		return (parameter <= 0.5) ? $ianmackenzie$elm_units$Quantity$Quantity(start + (parameter * (end - start))) : $ianmackenzie$elm_units$Quantity$Quantity(end + ((1 - parameter) * (start - end)));
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$midX = function (_v0) {
	var boundingBox = _v0.a;
	return A3($ianmackenzie$elm_units$Quantity$interpolateFrom, boundingBox.minX, boundingBox.maxX, 0.5);
};
var $ianmackenzie$elm_geometry$BoundingBox3d$midY = function (_v0) {
	var boundingBox = _v0.a;
	return A3($ianmackenzie$elm_units$Quantity$interpolateFrom, boundingBox.minY, boundingBox.maxY, 0.5);
};
var $ianmackenzie$elm_geometry$BoundingBox3d$midZ = function (_v0) {
	var boundingBox = _v0.a;
	return A3($ianmackenzie$elm_units$Quantity$interpolateFrom, boundingBox.minZ, boundingBox.maxZ, 0.5);
};
var $ianmackenzie$elm_geometry$BoundingBox3d$centerPoint = function (boundingBox) {
	return A3(
		$ianmackenzie$elm_geometry$Point3d$xyz,
		$ianmackenzie$elm_geometry$BoundingBox3d$midX(boundingBox),
		$ianmackenzie$elm_geometry$BoundingBox3d$midY(boundingBox),
		$ianmackenzie$elm_geometry$BoundingBox3d$midZ(boundingBox));
};
var $ianmackenzie$elm_geometry$BoundingBox3d$maxX = function (_v0) {
	var boundingBox = _v0.a;
	return boundingBox.maxX;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$maxY = function (_v0) {
	var boundingBox = _v0.a;
	return boundingBox.maxY;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$maxZ = function (_v0) {
	var boundingBox = _v0.a;
	return boundingBox.maxZ;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$minX = function (_v0) {
	var boundingBox = _v0.a;
	return boundingBox.minX;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$minY = function (_v0) {
	var boundingBox = _v0.a;
	return boundingBox.minY;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$minZ = function (_v0) {
	var boundingBox = _v0.a;
	return boundingBox.minZ;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$dimensions = function (boundingBox) {
	return _Utils_Tuple3(
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox3d$minX(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox3d$maxX(boundingBox)),
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox3d$minY(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox3d$maxY(boundingBox)),
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox3d$minZ(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox3d$maxZ(boundingBox)));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds = function (boundingBox) {
	var _v0 = $ianmackenzie$elm_geometry$BoundingBox3d$dimensions(boundingBox);
	var xDimension = _v0.a.a;
	var yDimension = _v0.b.a;
	var zDimension = _v0.c.a;
	return {
		centerPoint: $ianmackenzie$elm_geometry$Point3d$unwrap(
			$ianmackenzie$elm_geometry$BoundingBox3d$centerPoint(boundingBox)),
		halfX: xDimension / 2,
		halfY: yDimension / 2,
		halfZ: zDimension / 2
	};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$mesh = F2(
	function (givenMaterial, givenMesh) {
		switch (givenMaterial.$) {
			case 'UnlitMaterial':
				if (givenMaterial.b.$ === 'Constant') {
					var color = givenMaterial.b.a;
					switch (givenMesh.$) {
						case 'EmptyMesh':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Triangles':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'Facets':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'Indexed':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithNormals':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithUvs':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithNormalsAndUvs':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithTangents':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'LineSegments':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								$ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces);
						case 'Polyline':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantMesh,
								color,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								$ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces);
						default:
							var boundingBox = givenMesh.a;
							var radius = givenMesh.b;
							var webGLMesh = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$constantPointMesh,
								color,
								radius,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh);
					}
				} else {
					var _v2 = givenMaterial.a;
					var data = givenMaterial.b.a.data;
					switch (givenMesh.$) {
						case 'EmptyMesh':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Triangles':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Facets':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Indexed':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithNormals':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithUvs':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$colorTextureMesh,
								data,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithNormalsAndUvs':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$colorTextureMesh,
								data,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithTangents':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$colorTextureMesh,
								data,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'LineSegments':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Polyline':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						default:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
					}
				}
			case 'EmissiveMaterial':
				if (givenMaterial.b.$ === 'Constant') {
					var emissiveColor = givenMaterial.b.a.a;
					var backlight = givenMaterial.c;
					switch (givenMesh.$) {
						case 'EmptyMesh':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Triangles':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'Facets':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'Indexed':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithNormals':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithUvs':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithNormalsAndUvs':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithTangents':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'LineSegments':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								$ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces);
						case 'Polyline':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissiveMesh,
								emissiveColor,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								$ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces);
						default:
							var boundingBox = givenMesh.a;
							var radius = givenMesh.b;
							var webGLMesh = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$emissivePointMesh,
								emissiveColor,
								backlight,
								radius,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh);
					}
				} else {
					var _v5 = givenMaterial.a;
					var data = givenMaterial.b.a.data;
					var backlight = givenMaterial.c;
					switch (givenMesh.$) {
						case 'EmptyMesh':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Triangles':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Facets':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Indexed':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithNormals':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithUvs':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedEmissiveMesh,
								data,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithNormalsAndUvs':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedEmissiveMesh,
								data,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithTangents':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A5(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedEmissiveMesh,
								data,
								backlight,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'LineSegments':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Polyline':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						default:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
					}
				}
			case 'LambertianMaterial':
				var _v7 = givenMaterial.a;
				var materialColorTexture = givenMaterial.b;
				var normalMapTexture = givenMaterial.c;
				var _v8 = A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$resolveLambertian, materialColorTexture, normalMapTexture);
				if (_v8.$ === 'ConstantLambertianMaterial') {
					var materialColor = _v8.a.a;
					switch (givenMesh.$) {
						case 'EmptyMesh':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Triangles':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Facets':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var cullBackFaces = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$lambertianMesh,
								materialColor,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								cullBackFaces);
						case 'Indexed':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithNormals':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var cullBackFaces = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$lambertianMesh,
								materialColor,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								cullBackFaces);
						case 'MeshWithUvs':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithNormalsAndUvs':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var cullBackFaces = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$lambertianMesh,
								materialColor,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								cullBackFaces);
						case 'MeshWithTangents':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var cullBackFaces = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$lambertianMesh,
								materialColor,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								cullBackFaces);
						case 'LineSegments':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Polyline':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						default:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
					}
				} else {
					var _v10 = _v8.a;
					var materialColorData = _v10.a;
					var constantMaterialColor = _v10.b;
					var _v11 = _v8.b;
					var normalMapData = _v11.a;
					var useNormalMap = _v11.b;
					switch (givenMesh.$) {
						case 'EmptyMesh':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Triangles':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Facets':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Indexed':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithNormals':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithUvs':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithNormalsAndUvs':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var cullBackFaces = givenMesh.d;
							return A4(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedLambertianMesh,
								materialColorData,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								cullBackFaces);
						case 'MeshWithTangents':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var cullBackFaces = givenMesh.d;
							return A6(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMappedLambertianMesh,
								materialColorData,
								normalMapData,
								useNormalMap,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								cullBackFaces);
						case 'LineSegments':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Polyline':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						default:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
					}
				}
			default:
				var _v13 = givenMaterial.a;
				var baseColorTexture = givenMaterial.b;
				var roughnessTexture = givenMaterial.c;
				var metallicTexture = givenMaterial.d;
				var normalMapTexture = givenMaterial.e;
				var _v14 = A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$resolvePbr, baseColorTexture, roughnessTexture, metallicTexture, normalMapTexture);
				if (_v14.$ === 'ConstantPbrMaterial') {
					var baseColor = _v14.a.a;
					var roughness = _v14.b;
					var metallic = _v14.c;
					switch (givenMesh.$) {
						case 'EmptyMesh':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Triangles':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Facets':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A6(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$physicalMesh,
								baseColor,
								roughness,
								metallic,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'Indexed':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithNormals':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A6(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$physicalMesh,
								baseColor,
								roughness,
								metallic,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithUvs':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithNormalsAndUvs':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A6(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$physicalMesh,
								baseColor,
								roughness,
								metallic,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithTangents':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A6(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$physicalMesh,
								baseColor,
								roughness,
								metallic,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'LineSegments':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Polyline':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						default:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
					}
				} else {
					var _v16 = _v14.a;
					var baseColorData = _v16.a;
					var constantBaseColor = _v16.b;
					var _v17 = _v14.b;
					var roughnessData = _v17.a;
					var constantRoughness = _v17.b;
					var _v18 = _v14.c;
					var metallicData = _v18.a;
					var constantMetallic = _v18.b;
					var _v19 = _v14.d;
					var normalMapData = _v19.a;
					var useNormalMap = _v19.b;
					switch (givenMesh.$) {
						case 'EmptyMesh':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Triangles':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Facets':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Indexed':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithNormals':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithUvs':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'MeshWithNormalsAndUvs':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return A9(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$texturedPhysicalMesh,
								baseColorData,
								constantBaseColor,
								roughnessData,
								constantRoughness,
								metallicData,
								constantMetallic,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox),
								webGLMesh,
								backFaceSetting);
						case 'MeshWithTangents':
							var boundingBox = givenMesh.a;
							var webGLMesh = givenMesh.c;
							var backFaceSetting = givenMesh.d;
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMappedPhysicalMesh(baseColorData)(constantBaseColor)(roughnessData)(constantRoughness)(metallicData)(constantMetallic)(normalMapData)(useNormalMap)(
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox))(webGLMesh)(backFaceSetting);
						case 'LineSegments':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						case 'Polyline':
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
						default:
							return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
					}
				}
		}
	});
var $ianmackenzie$elm_geometry$Direction3d$xComponent = function (_v0) {
	var d = _v0.a;
	return d.x;
};
var $ianmackenzie$elm_geometry$Direction3d$yComponent = function (_v0) {
	var d = _v0.a;
	return d.y;
};
var $ianmackenzie$elm_geometry$Direction3d$zComponent = function (_v0) {
	var d = _v0.a;
	return d.z;
};
var $ianmackenzie$elm_geometry$Frame3d$isRightHanded = function (_v0) {
	var frame = _v0.a;
	var i = $ianmackenzie$elm_geometry$Direction3d$zComponent(frame.zDirection);
	var h = $ianmackenzie$elm_geometry$Direction3d$yComponent(frame.zDirection);
	var g = $ianmackenzie$elm_geometry$Direction3d$xComponent(frame.zDirection);
	var f = $ianmackenzie$elm_geometry$Direction3d$zComponent(frame.yDirection);
	var e = $ianmackenzie$elm_geometry$Direction3d$yComponent(frame.yDirection);
	var d = $ianmackenzie$elm_geometry$Direction3d$xComponent(frame.yDirection);
	var c = $ianmackenzie$elm_geometry$Direction3d$zComponent(frame.xDirection);
	var b = $ianmackenzie$elm_geometry$Direction3d$yComponent(frame.xDirection);
	var a = $ianmackenzie$elm_geometry$Direction3d$xComponent(frame.xDirection);
	return (((((((a * e) * i) + ((b * f) * g)) + ((c * d) * h)) - ((c * e) * g)) - ((b * d) * i)) - ((a * f) * h)) > 0;
};
var $ianmackenzie$elm_geometry$Frame3d$originPoint = function (_v0) {
	var properties = _v0.a;
	return properties.originPoint;
};
var $ianmackenzie$elm_geometry$Direction3d$unwrap = function (_v0) {
	var coordinates = _v0.a;
	return coordinates;
};
var $ianmackenzie$elm_geometry$Frame3d$xDirection = function (_v0) {
	var properties = _v0.a;
	return properties.xDirection;
};
var $ianmackenzie$elm_geometry$Frame3d$yDirection = function (_v0) {
	var properties = _v0.a;
	return properties.yDirection;
};
var $ianmackenzie$elm_geometry$Frame3d$zDirection = function (_v0) {
	var properties = _v0.a;
	return properties.zDirection;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$placeIn = function (frame) {
	var p0 = $ianmackenzie$elm_geometry$Point3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$originPoint(frame));
	var k = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$zDirection(frame));
	var j = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$yDirection(frame));
	var i = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$xDirection(frame));
	return {
		isRightHanded: $ianmackenzie$elm_geometry$Frame3d$isRightHanded(frame),
		ix: i.x,
		iy: i.y,
		iz: i.z,
		jx: j.x,
		jy: j.y,
		jz: j.z,
		kx: k.x,
		ky: k.y,
		kz: k.z,
		px: p0.x,
		py: p0.y,
		pz: p0.z,
		scale: 1
	};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed = F2(
	function (a, b) {
		return {$: 'Transformed', a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$compose = F2(
	function (t1, t2) {
		return {
			isRightHanded: _Utils_eq(t1.isRightHanded, t2.isRightHanded),
			ix: ((t1.ix * t2.ix) + (t1.iy * t2.jx)) + (t1.iz * t2.kx),
			iy: ((t1.ix * t2.iy) + (t1.iy * t2.jy)) + (t1.iz * t2.ky),
			iz: ((t1.ix * t2.iz) + (t1.iy * t2.jz)) + (t1.iz * t2.kz),
			jx: ((t1.jx * t2.ix) + (t1.jy * t2.jx)) + (t1.jz * t2.kx),
			jy: ((t1.jx * t2.iy) + (t1.jy * t2.jy)) + (t1.jz * t2.ky),
			jz: ((t1.jx * t2.iz) + (t1.jy * t2.jz)) + (t1.jz * t2.kz),
			kx: ((t1.kx * t2.ix) + (t1.ky * t2.jx)) + (t1.kz * t2.kx),
			ky: ((t1.kx * t2.iy) + (t1.ky * t2.jy)) + (t1.kz * t2.ky),
			kz: ((t1.kx * t2.iz) + (t1.ky * t2.jz)) + (t1.kz * t2.kz),
			px: t2.px + ((((t1.px * t2.ix) + (t1.py * t2.jx)) + (t1.pz * t2.kx)) * t2.scale),
			py: t2.py + ((((t1.px * t2.iy) + (t1.py * t2.jy)) + (t1.pz * t2.ky)) * t2.scale),
			pz: t2.pz + ((((t1.px * t2.iz) + (t1.py * t2.jz)) + (t1.pz * t2.kz)) * t2.scale),
			scale: t1.scale * t2.scale
		};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy = F2(
	function (transformation, _v0) {
		var node = _v0.a;
		switch (node.$) {
			case 'EmptyNode':
				return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
			case 'Transformed':
				var existingTransformation = node.a;
				var underlyingNode = node.b;
				var compositeTransformation = A2($ianmackenzie$elm_3d_scene$Scene3d$Transformation$compose, existingTransformation, transformation);
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
					A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, compositeTransformation, underlyingNode));
			case 'MeshNode':
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
					A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node));
			case 'PointNode':
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
					A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node));
			case 'ShadowNode':
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
					A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node));
			default:
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
					A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node));
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$placeIn = F2(
	function (frame, givenDrawable) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy,
			$ianmackenzie$elm_3d_scene$Scene3d$Transformation$placeIn(frame),
			givenDrawable);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$ShadowNode = function (a) {
	return {$: 'ShadowNode', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleBounds = F2(
	function (_v0, bounds) {
		var scaleX = _v0.a;
		var scaleY = _v0.b;
		var scaleZ = _v0.c;
		var originalCenterPoint = bounds.centerPoint;
		return {
			centerPoint: {x: scaleX * originalCenterPoint.x, y: scaleY * originalCenterPoint.y, z: scaleZ * originalCenterPoint.z},
			halfX: scaleX * bounds.halfX,
			halfY: scaleY * bounds.halfY,
			halfZ: scaleZ * bounds.halfZ
		};
	});
var $elm_explorations$linear_algebra$Math$Vector4$fromRecord = _MJS_v4fromRecord;
var $elm_explorations$linear_algebra$Math$Vector4$toRecord = _MJS_v4toRecord;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleDrawFunction = function (_v0) {
	return function (originalDrawFunction) {
		return function (sceneProperties) {
			return function (modelScale) {
				return function (modelMatrix) {
					return function (isRightHanded) {
						return function (viewMatrix) {
							return function (projectionMatrix) {
								return function (lights) {
									return function (settings) {
										var scaleX = _v0.a;
										var scaleY = _v0.b;
										var scaleZ = _v0.c;
										var _v1 = $elm_explorations$linear_algebra$Math$Vector4$toRecord(modelScale);
										var x = _v1.x;
										var y = _v1.y;
										var z = _v1.z;
										var w = _v1.w;
										var updatedModelScale = $elm_explorations$linear_algebra$Math$Vector4$fromRecord(
											{w: w, x: x * scaleX, y: y * scaleY, z: z * scaleZ});
										return A8(originalDrawFunction, sceneProperties, updatedModelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings);
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleNode = F2(
	function (scalingFactors, node) {
		switch (node.$) {
			case 'EmptyNode':
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyNode;
			case 'Transformed':
				var transformation = node.a;
				var underlyingNode = node.b;
				return A2(
					$ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed,
					transformation,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleNode, scalingFactors, underlyingNode));
			case 'MeshNode':
				var bounds = node.a;
				var drawFunction = node.b;
				return A2(
					$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleBounds, scalingFactors, bounds),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleDrawFunction, scalingFactors, drawFunction));
			case 'PointNode':
				return node;
			case 'ShadowNode':
				var drawFunction = node.a;
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$ShadowNode(
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleDrawFunction, scalingFactors, drawFunction));
			default:
				var childNodes = node.a;
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Group(
					A2(
						$elm$core$List$map,
						$ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleNode(scalingFactors),
						childNodes));
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$preScale = F2(
	function (scalingFactors, _v0) {
		var node = _v0.a;
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$preScaleNode, scalingFactors, node));
	});
var $ianmackenzie$elm_geometry$Cylinder3d$radius = function (_v0) {
	var cylinder = _v0.a;
	return cylinder.radius;
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$shadowFragment = {
	src: '\n        precision lowp float;\n        \n        void main () {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    ',
	attributes: {},
	uniforms: {}
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$Test = function (a) {
	return {$: 'Test', a: a};
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$always = $elm_explorations$webgl$WebGL$Settings$StencilTest$Test(519);
var $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation = function (a) {
	return {$: 'Operation', a: a};
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$decrement = $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation(7683);
var $elm_explorations$webgl$WebGL$Settings$StencilTest$increment = $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation(7682);
var $elm_explorations$webgl$WebGL$Settings$StencilTest$keep = $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation(7680);
var $elm_explorations$webgl$WebGL$Internal$StencilTest = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {$: 'StencilTest', a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j, k: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate = F3(
	function (_v0, options1, options2) {
		var ref = _v0.ref;
		var mask = _v0.mask;
		var writeMask = _v0.writeMask;
		var expandTest = F2(
			function (_v2, fn) {
				var expandedTest = _v2.a;
				return fn(expandedTest);
			});
		var expandOp = F2(
			function (_v1, fn) {
				var op = _v1.a;
				return fn(op);
			});
		var expand = function (options) {
			return A2(
				$elm$core$Basics$composeR,
				expandTest(options.test),
				A2(
					$elm$core$Basics$composeR,
					expandOp(options.fail),
					A2(
						$elm$core$Basics$composeR,
						expandOp(options.zfail),
						expandOp(options.zpass))));
		};
		return A2(
			expand,
			options2,
			A2(
				expand,
				options1,
				A3($elm_explorations$webgl$WebGL$Internal$StencilTest, ref, mask, writeMask)));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$leftHandedStencilTest = A3(
	$elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
	{mask: 0, ref: 0, writeMask: 15},
	{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$decrement},
	{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$increment});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$rightHandedStencilTest = A3(
	$elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
	{mask: 0, ref: 0, writeMask: 15},
	{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$increment},
	{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$decrement});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$shadowSettings = F2(
	function (isRightHanded, settings) {
		return isRightHanded ? A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$rightHandedStencilTest, settings) : A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$leftHandedStencilTest, settings);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$shadowVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec3 position;\n        attribute highp vec3 normal;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 shadowLight;\n        \n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        vec3 getDirectionToLight(vec3 surfacePosition, vec4 xyz_type, vec4 rgb_parameter) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                return xyz_type.xyz;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                return normalize(lightPosition - surfacePosition);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 shadowVertexPosition(vec3 position, vec3 normal, mat4 shadowLight, vec4 modelScale, mat4 modelMatrix, mat4 viewMatrix, mat4 projectionMatrix, mat4 sceneProperties) {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            vec3 worldNormal = getWorldNormal(normal, vec4(modelScale.xyz, 1.0), modelMatrix);\n            vec4 xyz_type = shadowLight[0];\n            vec4 rgb_parameter = shadowLight[1];\n            vec3 directionToLight = getDirectionToLight(worldPosition.xyz, xyz_type, rgb_parameter);\n            vec3 offset = vec3(0.0, 0.0, 0.0);\n            float sceneDiameter = sceneProperties[3][1];\n            if (dot(directionToLight, worldNormal) <= 0.0) {\n                offset = -sceneDiameter * directionToLight;\n            } else {\n                offset = -0.001 * sceneDiameter * directionToLight;\n            }\n            vec4 offsetPosition = worldPosition + vec4(offset, 0.0);\n            return projectionMatrix * (viewMatrix * offsetPosition);\n        }\n        \n        void main () {\n            gl_Position = shadowVertexPosition(\n                position,\n                normal,\n                shadowLight,\n                modelScale,\n                modelMatrix,\n                viewMatrix,\n                projectionMatrix,\n                sceneProperties\n            );\n        }\n    ',
	attributes: {normal: 'normal', position: 'position'},
	uniforms: {modelMatrix: 'modelMatrix', modelScale: 'modelScale', projectionMatrix: 'projectionMatrix', sceneProperties: 'sceneProperties', shadowLight: 'shadowLight', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$shadowDrawFunction = function (givenShadow) {
	if (givenShadow.$ === 'EmptyShadow') {
		return $elm$core$Maybe$Nothing;
	} else {
		var webGLMesh = givenShadow.c;
		return $elm$core$Maybe$Just(
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, shadowLight, settings) {
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$shadowSettings, isRightHanded, settings),
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$shadowVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$shadowFragment,
						webGLMesh,
						{modelMatrix: modelMatrix, modelScale: modelScale, projectionMatrix: projectionMatrix, sceneProperties: sceneProperties, shadowLight: shadowLight, viewMatrix: viewMatrix});
				}));
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$shadow = function (givenShadow) {
	var _v0 = $ianmackenzie$elm_3d_scene$Scene3d$Entity$shadowDrawFunction(givenShadow);
	if (_v0.$ === 'Just') {
		var drawFunction = _v0.a;
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
			$ianmackenzie$elm_3d_scene$Scene3d$Types$ShadowNode(drawFunction));
	} else {
		return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$cylinder = F4(
	function (renderObject, renderShadow, givenMaterial, givenCylinder) {
		var centerFrame = $ianmackenzie$elm_geometry$Frame3d$fromZAxis(
			$ianmackenzie$elm_geometry$Cylinder3d$axis(givenCylinder));
		var baseEntity = A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$mesh, givenMaterial, $ianmackenzie$elm_3d_scene$Scene3d$Primitives$cylinder);
		var untransformedEntity = function () {
			var _v2 = _Utils_Tuple2(renderObject, renderShadow);
			if (_v2.a) {
				if (_v2.b) {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$group(
						_List_fromArray(
							[
								baseEntity,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$shadow($ianmackenzie$elm_3d_scene$Scene3d$Primitives$cylinderShadow)
							]));
				} else {
					return baseEntity;
				}
			} else {
				if (_v2.b) {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$shadow($ianmackenzie$elm_3d_scene$Scene3d$Primitives$cylinderShadow);
				} else {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
				}
			}
		}();
		var _v0 = $ianmackenzie$elm_geometry$Cylinder3d$radius(givenCylinder);
		var radius = _v0.a;
		var _v1 = $ianmackenzie$elm_geometry$Cylinder3d$length(givenCylinder);
		var length = _v1.a;
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$placeIn,
			centerFrame,
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$preScale,
				_Utils_Tuple3(radius, radius, length),
				untransformedEntity));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$cylinderWithShadow = F2(
	function (givenMaterial, givenCylinder) {
		return A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$cylinder, true, true, givenMaterial, givenCylinder);
	});
var $avh4$elm_color$Color$scaleFrom255 = function (c) {
	return c / 255;
};
var $avh4$elm_color$Color$rgb255 = F3(
	function (r, g, b) {
		return A4(
			$avh4$elm_color$Color$RgbaSpace,
			$avh4$elm_color$Color$scaleFrom255(r),
			$avh4$elm_color$Color$scaleFrom255(g),
			$avh4$elm_color$Color$scaleFrom255(b),
			1.0);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$rotateAround = F2(
	function (axis, _v0) {
		var angle = _v0.a;
		var p0 = $ianmackenzie$elm_geometry$Point3d$unwrap(
			$ianmackenzie$elm_geometry$Axis3d$originPoint(axis));
		var halfAngle = 0.5 * angle;
		var qw = $elm$core$Basics$cos(halfAngle);
		var sinHalfAngle = $elm$core$Basics$sin(halfAngle);
		var a = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Axis3d$direction(axis));
		var qx = a.x * sinHalfAngle;
		var wx = qw * qx;
		var xx = qx * qx;
		var qy = a.y * sinHalfAngle;
		var wy = qw * qy;
		var xy = qx * qy;
		var yy = qy * qy;
		var a22 = 1 - (2 * (xx + yy));
		var qz = a.z * sinHalfAngle;
		var wz = qw * qz;
		var a01 = 2 * (xy - wz);
		var a10 = 2 * (xy + wz);
		var xz = qx * qz;
		var a02 = 2 * (xz + wy);
		var a20 = 2 * (xz - wy);
		var yz = qy * qz;
		var a12 = 2 * (yz - wx);
		var a21 = 2 * (yz + wx);
		var zz = qz * qz;
		var a00 = 1 - (2 * (yy + zz));
		var a11 = 1 - (2 * (xx + zz));
		return {isRightHanded: true, ix: a00, iy: a10, iz: a20, jx: a01, jy: a11, jz: a21, kx: a02, ky: a12, kz: a22, px: ((p0.x - (a00 * p0.x)) - (a01 * p0.y)) - (a02 * p0.z), py: ((p0.y - (a10 * p0.x)) - (a11 * p0.y)) - (a12 * p0.z), pz: ((p0.z - (a20 * p0.x)) - (a21 * p0.y)) - (a22 * p0.z), scale: 1};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$rotateAround = F3(
	function (axis, angle, givenDrawable) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy,
			A2($ianmackenzie$elm_3d_scene$Scene3d$Transformation$rotateAround, axis, angle),
			givenDrawable);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$rotateAround = F3(
	function (axis, angle, entity) {
		return A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$rotateAround, axis, angle, entity);
	});
var $ianmackenzie$elm_geometry$Sphere3d$centerPoint = function (_v0) {
	var properties = _v0.a;
	return properties.centerPoint;
};
var $ianmackenzie$elm_geometry$Sphere3d$radius = function (_v0) {
	var properties = _v0.a;
	return properties.radius;
};
var $ianmackenzie$elm_units$Quantity$plus = F2(
	function (_v0, _v1) {
		var y = _v0.a;
		var x = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(x + y);
	});
var $ianmackenzie$elm_units$Quantity$ratio = F2(
	function (_v0, _v1) {
		var x = _v0.a;
		var y = _v1.a;
		return x / y;
	});
var $ianmackenzie$elm_1d_parameter$Parameter1d$range = F5(
	function (startIndex, index, divisor, _function, accumulated) {
		range:
		while (true) {
			var newValue = _function(index / divisor);
			var newAccumulated = A2($elm$core$List$cons, newValue, accumulated);
			if (_Utils_eq(index, startIndex)) {
				return newAccumulated;
			} else {
				var $temp$startIndex = startIndex,
					$temp$index = index - 1,
					$temp$divisor = divisor,
					$temp$function = _function,
					$temp$accumulated = newAccumulated;
				startIndex = $temp$startIndex;
				index = $temp$index;
				divisor = $temp$divisor;
				_function = $temp$function;
				accumulated = $temp$accumulated;
				continue range;
			}
		}
	});
var $ianmackenzie$elm_1d_parameter$Parameter1d$steps = F2(
	function (n, _function) {
		return (n < 1) ? _List_Nil : A5($ianmackenzie$elm_1d_parameter$Parameter1d$range, 0, n, n, _function, _List_Nil);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$collectSmoothTextured = F2(
	function (_v0, accumulated) {
		var position = _v0.position;
		var normal = _v0.normal;
		var uv = _v0.uv;
		var _v1 = uv;
		var u = _v1.a;
		var v = _v1.b;
		return A2(
			$elm$core$List$cons,
			{
				normal: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(normal),
				position: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(position),
				uv: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, u, v)
			},
			accumulated);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$texturedFaces = function (givenMesh) {
	var collectedVertices = A3(
		$elm$core$Array$foldr,
		$ianmackenzie$elm_3d_scene$Scene3d$Mesh$collectSmoothTextured,
		_List_Nil,
		$ianmackenzie$elm_triangular_mesh$TriangularMesh$vertices(givenMesh));
	if (!collectedVertices.b) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyMesh;
	} else {
		var first = collectedVertices.a;
		var rest = collectedVertices.b;
		var webGLMesh = A2(
			$elm_explorations$webgl$WebGL$indexedTriangles,
			collectedVertices,
			$ianmackenzie$elm_triangular_mesh$TriangularMesh$faceIndices(givenMesh));
		var bounds = A2($ianmackenzie$elm_3d_scene$Scene3d$Mesh$vertexBounds, first, rest);
		return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$MeshWithNormalsAndUvs, bounds, givenMesh, webGLMesh, $ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces);
	}
};
var $ianmackenzie$elm_geometry$Direction3d$xyZ = F2(
	function (_v0, _v1) {
		var theta = _v0.a;
		var phi = _v1.a;
		var cosPhi = $elm$core$Basics$cos(phi);
		return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
			{
				x: cosPhi * $elm$core$Basics$cos(theta),
				y: cosPhi * $elm$core$Basics$sin(theta),
				z: $elm$core$Basics$sin(phi)
			});
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Primitives$sphere = function () {
	var radius = $ianmackenzie$elm_units$Length$meters(1);
	var n = 72;
	var thetaStartIndices = A2($elm$core$List$range, 0, n - 1);
	var thetaValues = A2(
		$ianmackenzie$elm_1d_parameter$Parameter1d$steps,
		n,
		A2(
			$ianmackenzie$elm_units$Quantity$interpolateFrom,
			$ianmackenzie$elm_units$Quantity$zero,
			$ianmackenzie$elm_units$Angle$turns(1)));
	var m = $elm$core$Basics$ceiling(n / 2);
	var phiStartIndices = A2($elm$core$List$range, 0, m - 1);
	var phiValues = A2(
		$ianmackenzie$elm_1d_parameter$Parameter1d$steps,
		m,
		A2(
			$ianmackenzie$elm_units$Quantity$interpolateFrom,
			$ianmackenzie$elm_units$Angle$degrees(90),
			$ianmackenzie$elm_units$Angle$degrees(-90)));
	var vertices = $elm$core$Array$fromList(
		$elm$core$List$concat(
			A2(
				$elm$core$List$map,
				function (theta) {
					return A2(
						$elm$core$List$map,
						function (phi) {
							return {
								normal: $ianmackenzie$elm_geometry$Direction3d$toVector(
									A2($ianmackenzie$elm_geometry$Direction3d$xyZ, theta, phi)),
								position: A3(
									$ianmackenzie$elm_geometry$Point3d$xyz,
									A2(
										$ianmackenzie$elm_units$Quantity$multiplyBy,
										$ianmackenzie$elm_units$Angle$cos(phi) * $ianmackenzie$elm_units$Angle$cos(theta),
										radius),
									A2(
										$ianmackenzie$elm_units$Quantity$multiplyBy,
										$ianmackenzie$elm_units$Angle$cos(phi) * $ianmackenzie$elm_units$Angle$sin(theta),
										radius),
									A2(
										$ianmackenzie$elm_units$Quantity$multiplyBy,
										$ianmackenzie$elm_units$Angle$sin(phi),
										radius)),
								uv: _Utils_Tuple2(
									A2(
										$ianmackenzie$elm_units$Quantity$ratio,
										theta,
										$ianmackenzie$elm_units$Angle$turns(1)),
									A2(
										$ianmackenzie$elm_units$Quantity$ratio,
										A2(
											$ianmackenzie$elm_units$Quantity$plus,
											$ianmackenzie$elm_units$Angle$degrees(90),
											phi),
										$ianmackenzie$elm_units$Angle$degrees(180)))
							};
						},
						phiValues);
				},
				thetaValues)));
	var linearIndex = F2(
		function (i, j) {
			return (i * (m + 1)) + j;
		});
	var faces = $elm$core$List$concat(
		A2(
			$elm$core$List$map,
			function (i) {
				return $elm$core$List$concat(
					A2(
						$elm$core$List$map,
						function (j) {
							var topRightIndex = A2(linearIndex, i + 1, j);
							var topLeftIndex = A2(linearIndex, i, j);
							var bottomRightIndex = A2(linearIndex, i + 1, j + 1);
							var bottomLeftIndex = A2(linearIndex, i, j + 1);
							return _List_fromArray(
								[
									_Utils_Tuple3(bottomLeftIndex, bottomRightIndex, topRightIndex),
									_Utils_Tuple3(bottomLeftIndex, topRightIndex, topLeftIndex)
								]);
						},
						phiStartIndices));
			},
			thetaStartIndices));
	return $ianmackenzie$elm_3d_scene$Scene3d$Mesh$cullBackFaces(
		$ianmackenzie$elm_3d_scene$Scene3d$Mesh$texturedFaces(
			A2($ianmackenzie$elm_triangular_mesh$TriangularMesh$indexed, vertices, faces)));
}();
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$numStrips = 72;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$numOutlineVertices = 2 * $ianmackenzie$elm_3d_scene$Scene3d$Entity$numStrips;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$buildSphereShadowIndices = F2(
	function (stripIndex, accumulated) {
		buildSphereShadowIndices:
		while (true) {
			var f = $ianmackenzie$elm_3d_scene$Scene3d$Entity$numOutlineVertices + 1;
			var e = A2($elm$core$Basics$modBy, $ianmackenzie$elm_3d_scene$Scene3d$Entity$numOutlineVertices, (2 * stripIndex) + 3);
			var d = A2($elm$core$Basics$modBy, $ianmackenzie$elm_3d_scene$Scene3d$Entity$numOutlineVertices, (2 * stripIndex) + 2);
			var c = (2 * stripIndex) + 1;
			var b = 2 * stripIndex;
			var a = $ianmackenzie$elm_3d_scene$Scene3d$Entity$numOutlineVertices;
			var updated = A2(
				$elm$core$List$cons,
				_Utils_Tuple3(a, b, d),
				A2(
					$elm$core$List$cons,
					_Utils_Tuple3(b, e, d),
					A2(
						$elm$core$List$cons,
						_Utils_Tuple3(b, c, e),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple3(c, f, e),
							accumulated))));
			if (!stripIndex) {
				return updated;
			} else {
				var $temp$stripIndex = stripIndex - 1,
					$temp$accumulated = updated;
				stripIndex = $temp$stripIndex;
				accumulated = $temp$accumulated;
				continue buildSphereShadowIndices;
			}
		}
	});
var $ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom = F3(
	function (start, end, parameter) {
		return (parameter <= 0.5) ? (start + (parameter * (end - start))) : (end + ((1 - parameter) * (start - end)));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$buildSphereShadowVertices = F2(
	function (stripIndex, accumulated) {
		buildSphereShadowVertices:
		while (true) {
			var angle = A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, 0, 2 * $elm$core$Basics$pi, stripIndex / $ianmackenzie$elm_3d_scene$Scene3d$Entity$numStrips);
			var left = {angle: angle, offsetScale: 0, radiusScale: 1};
			var right = {angle: angle, offsetScale: 1, radiusScale: 1};
			var updated = A2(
				$elm$core$List$cons,
				left,
				A2($elm$core$List$cons, right, accumulated));
			if (!stripIndex) {
				return updated;
			} else {
				var $temp$stripIndex = stripIndex - 1,
					$temp$accumulated = updated;
				stripIndex = $temp$stripIndex;
				accumulated = $temp$accumulated;
				continue buildSphereShadowVertices;
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$sphereShadowMesh = function () {
	var sphereShadowVertices = A2(
		$ianmackenzie$elm_3d_scene$Scene3d$Entity$buildSphereShadowVertices,
		$ianmackenzie$elm_3d_scene$Scene3d$Entity$numStrips - 1,
		_List_fromArray(
			[
				{angle: 0, offsetScale: 0, radiusScale: 0},
				{angle: 0, offsetScale: 1, radiusScale: 0}
			]));
	var sphereShadowIndices = A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$buildSphereShadowIndices, $ianmackenzie$elm_3d_scene$Scene3d$Entity$numStrips - 1, _List_Nil);
	return A2($elm_explorations$webgl$WebGL$indexedTriangles, sphereShadowVertices, sphereShadowIndices);
}();
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$sphereShadowVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp float angle;\n        attribute highp float offsetScale;\n        attribute highp float radiusScale;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 shadowLight;\n        \n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        const lowp float kPerspectiveProjection = 0.0;\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 getDirectionToLight(vec3 surfacePosition, vec4 xyz_type, vec4 rgb_parameter) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                return xyz_type.xyz;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                return normalize(lightPosition - surfacePosition);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec3 perpendicularTo(vec3 d) {\n            float absX = abs(d.x);\n            float absY = abs(d.y);\n            float absZ = abs(d.z);\n            if (absX <= absY) {\n                if (absX <= absZ) {\n                    float scale = 1.0 / length(d.zy);\n                    return vec3(0.0, -d.z * scale, d.y * scale);\n                } else {\n                    float scale = 1.0 / length(d.xy);\n                    return vec3(-d.y * scale, d.x * scale, 0.0);\n                }\n            } else {\n                if (absY <= absZ) {\n                    float scale = 1.0 / length(d.xz);\n                    return vec3(d.z * scale, 0.0, -d.x * scale);\n                } else {\n                    float scale = 1.0 / length(d.xy);\n                    return vec3(-d.y * scale, d.x * scale, 0.0);\n                }\n            }\n        }\n        \n        void main () {\n            vec4 worldCenter = getWorldPosition(vec3(0.0, 0.0, 0.0), modelScale, modelMatrix);\n            vec4 xyz_type = shadowLight[0];\n            vec4 rgb_parameter = shadowLight[1];\n            vec3 zDirection = getDirectionToLight(worldCenter.xyz, xyz_type, rgb_parameter);\n            vec3 xDirection = perpendicularTo(zDirection);\n            vec3 yDirection = cross(zDirection, xDirection);\n            float r = modelScale.x;\n            float adjustedRadius = r;\n            float zOffset = 0.0;\n            if (xyz_type.w == kPointLight) {\n                float distanceToLight = length(xyz_type.xyz - worldCenter.xyz);\n                float rSquared = r * r;\n                zOffset = rSquared / distanceToLight;\n                float zSquared = zOffset * zOffset;\n                adjustedRadius = sqrt(rSquared - zSquared) * radiusScale;\n            }\n            vec3 worldPosition =\n                worldCenter.xyz\n                    + zDirection * zOffset\n                    + xDirection * adjustedRadius * cos(angle)\n                    + yDirection * adjustedRadius * sin(angle);\n            vec3 directionToLight = getDirectionToLight(worldPosition, xyz_type, rgb_parameter);\n            float sceneDiameter = sceneProperties[3][1];\n            vec3 offset = -sceneDiameter * offsetScale * directionToLight;\n            vec4 offsetPosition = vec4(worldPosition + offset, 1.0);\n            gl_Position = projectionMatrix * (viewMatrix * offsetPosition);\n        }\n    ',
	attributes: {angle: 'angle', offsetScale: 'offsetScale', radiusScale: 'radiusScale'},
	uniforms: {modelMatrix: 'modelMatrix', modelScale: 'modelScale', projectionMatrix: 'projectionMatrix', sceneProperties: 'sceneProperties', shadowLight: 'shadowLight', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$sphereShadow = function (givenSphere) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
		$ianmackenzie$elm_3d_scene$Scene3d$Types$ShadowNode(
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, shadowLight, settings) {
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$shadowSettings, true, settings),
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$sphereShadowVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$shadowFragment,
						$ianmackenzie$elm_3d_scene$Scene3d$Entity$sphereShadowMesh,
						{
							constantColor: A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 0, 1),
							modelMatrix: modelMatrix,
							modelScale: modelScale,
							projectionMatrix: projectionMatrix,
							sceneProperties: sceneProperties,
							shadowLight: shadowLight,
							viewMatrix: viewMatrix
						});
				})));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$translateBy = function (displacement) {
	var v = $ianmackenzie$elm_geometry$Vector3d$unwrap(displacement);
	return {isRightHanded: true, ix: 1, iy: 0, iz: 0, jx: 0, jy: 1, jz: 0, kx: 0, ky: 0, kz: 1, px: v.x, py: v.y, pz: v.z, scale: 1};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$translateBy = F2(
	function (displacement, givenDrawable) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy,
			$ianmackenzie$elm_3d_scene$Scene3d$Transformation$translateBy(displacement),
			givenDrawable);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$sphere = F4(
	function (renderObject, renderShadow, givenMaterial, givenSphere) {
		var baseEntity = A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$mesh, givenMaterial, $ianmackenzie$elm_3d_scene$Scene3d$Primitives$sphere);
		var untransformedEntity = function () {
			var _v1 = _Utils_Tuple2(renderObject, renderShadow);
			if (_v1.a) {
				if (_v1.b) {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$group(
						_List_fromArray(
							[
								baseEntity,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$sphereShadow(givenSphere)
							]));
				} else {
					return baseEntity;
				}
			} else {
				if (_v1.b) {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$sphereShadow(givenSphere);
				} else {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
				}
			}
		}();
		var _v0 = $ianmackenzie$elm_geometry$Sphere3d$radius(givenSphere);
		var r = _v0.a;
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$translateBy,
			A2(
				$ianmackenzie$elm_geometry$Vector3d$from,
				$ianmackenzie$elm_geometry$Point3d$origin,
				$ianmackenzie$elm_geometry$Sphere3d$centerPoint(givenSphere)),
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$preScale,
				_Utils_Tuple3(r, r, r),
				untransformedEntity));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$sphereWithShadow = F2(
	function (givenMaterial, givenSphere) {
		return A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$sphere, true, true, givenMaterial, givenSphere);
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Cylinder3d = function (a) {
	return {$: 'Cylinder3d', a: a};
};
var $ianmackenzie$elm_geometry$Geometry$Types$Axis3d = function (a) {
	return {$: 'Axis3d', a: a};
};
var $ianmackenzie$elm_geometry$Axis3d$through = F2(
	function (givenPoint, givenDirection) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Axis3d(
			{direction: givenDirection, originPoint: givenPoint});
	});
var $ianmackenzie$elm_geometry$Point3d$translateIn = F3(
	function (_v0, _v1, _v2) {
		var d = _v0.a;
		var distance = _v1.a;
		var p = _v2.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
			{x: p.x + (distance * d.x), y: p.y + (distance * d.y), z: p.z + (distance * d.z)});
	});
var $ianmackenzie$elm_geometry$Cylinder3d$startingAt = F3(
	function (givenStartPoint, givenDirection, _arguments) {
		var computedLength = $ianmackenzie$elm_units$Quantity$abs(_arguments.length);
		var computedCenterPoint = A3(
			$ianmackenzie$elm_geometry$Point3d$translateIn,
			givenDirection,
			$ianmackenzie$elm_units$Quantity$half(computedLength),
			givenStartPoint);
		return $ianmackenzie$elm_geometry$Geometry$Types$Cylinder3d(
			{
				axis: A2($ianmackenzie$elm_geometry$Axis3d$through, computedCenterPoint, givenDirection),
				length: computedLength,
				radius: $ianmackenzie$elm_units$Quantity$abs(_arguments.radius)
			});
	});
var $ianmackenzie$elm_3d_scene$Scene3d$translateBy = F2(
	function (displacement, entity) {
		return A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$translateBy, displacement, entity);
	});
var $avh4$elm_color$Color$white = A4($avh4$elm_color$Color$RgbaSpace, 255 / 255, 255 / 255, 255 / 255, 1.0);
var $ianmackenzie$elm_geometry$Direction3d$z = $ianmackenzie$elm_geometry$Direction3d$positiveZ;
var $ianmackenzie$elm_geometry$Axis3d$z = A2($ianmackenzie$elm_geometry$Axis3d$through, $ianmackenzie$elm_geometry$Point3d$origin, $ianmackenzie$elm_geometry$Direction3d$z);
var $author$project$Types$lamp = F2(
	function (anchor, angle) {
		var rod2 = A2(
			$ianmackenzie$elm_3d_scene$Scene3d$cylinderWithShadow,
			$ianmackenzie$elm_3d_scene$Scene3d$Material$color(
				A3($avh4$elm_color$Color$rgb255, 15, 15, 15)),
			A3(
				$ianmackenzie$elm_geometry$Cylinder3d$startingAt,
				A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 5.85),
				$ianmackenzie$elm_geometry$Direction3d$positiveX,
				{
					length: $ianmackenzie$elm_units$Length$meters(1),
					radius: $ianmackenzie$elm_units$Length$meters(0.15)
				}));
		var rod1 = A2(
			$ianmackenzie$elm_3d_scene$Scene3d$cylinderWithShadow,
			$ianmackenzie$elm_3d_scene$Scene3d$Material$color(
				A3($avh4$elm_color$Color$rgb255, 15, 15, 15)),
			A3(
				$ianmackenzie$elm_geometry$Cylinder3d$startingAt,
				$ianmackenzie$elm_geometry$Point3d$origin,
				$ianmackenzie$elm_geometry$Direction3d$positiveZ,
				{
					length: $ianmackenzie$elm_units$Length$meters(6),
					radius: $ianmackenzie$elm_units$Length$meters(0.15)
				}));
		var dr = A2($ianmackenzie$elm_geometry$Vector3d$from, $ianmackenzie$elm_geometry$Point3d$origin, anchor);
		var bulb = A2(
			$ianmackenzie$elm_3d_scene$Scene3d$sphereWithShadow,
			$ianmackenzie$elm_3d_scene$Scene3d$Material$color($avh4$elm_color$Color$white),
			A2(
				$ianmackenzie$elm_geometry$Sphere3d$atPoint,
				A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 0, 5.4),
				$ianmackenzie$elm_units$Length$meters(0.25)));
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$translateBy,
			dr,
			A3(
				$ianmackenzie$elm_3d_scene$Scene3d$rotateAround,
				$ianmackenzie$elm_geometry$Axis3d$z,
				$ianmackenzie$elm_units$Angle$degrees(angle),
				$ianmackenzie$elm_3d_scene$Scene3d$group(
					_List_fromArray(
						[rod1, rod2, bulb]))));
	});
var $author$project$Text3d$len = 1;
var $ianmackenzie$elm_geometry$Vector3d$withLength = F2(
	function (_v0, _v1) {
		var a = _v0.a;
		var d = _v1.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: a * d.x, y: a * d.y, z: a * d.z});
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$translateIn = F3(
	function (direction, distance, drawable) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$translateBy,
			A2($ianmackenzie$elm_geometry$Vector3d$withLength, distance, direction),
			drawable);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$translateIn = F3(
	function (direction, distance, entity) {
		return A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$translateIn, direction, distance, entity);
	});
var $author$project$Types$move = F4(
	function (dx, dy, dz, entity) {
		return A3(
			$ianmackenzie$elm_3d_scene$Scene3d$translateIn,
			$ianmackenzie$elm_geometry$Direction3d$positiveZ,
			$ianmackenzie$elm_units$Length$meters(dz),
			A3(
				$ianmackenzie$elm_3d_scene$Scene3d$translateIn,
				$ianmackenzie$elm_geometry$Direction3d$positiveY,
				$ianmackenzie$elm_units$Length$meters(dy),
				A3(
					$ianmackenzie$elm_3d_scene$Scene3d$translateIn,
					$ianmackenzie$elm_geometry$Direction3d$positiveX,
					$ianmackenzie$elm_units$Length$meters(dx),
					entity)));
	});
var $ianmackenzie$elm_geometry$Frame3d$copy = function (_v0) {
	var properties = _v0.a;
	return $ianmackenzie$elm_geometry$Geometry$Types$Frame3d(properties);
};
var $ianmackenzie$elm_geometry$Block3d$axes = function (_v0) {
	var block = _v0.a;
	return $ianmackenzie$elm_geometry$Frame3d$copy(block.axes);
};
var $ianmackenzie$elm_geometry$BoundingBox3d$extrema = function (_v0) {
	var boundingBoxExtrema = _v0.a;
	return boundingBoxExtrema;
};
var $ianmackenzie$elm_geometry$BoundingBox3d$aggregateOfHelp = F8(
	function (currentMinX, currentMaxX, currentMinY, currentMaxY, currentMinZ, currentMaxZ, getBoundingBox, items) {
		aggregateOfHelp:
		while (true) {
			if (items.b) {
				var next = items.a;
				var rest = items.b;
				var b = $ianmackenzie$elm_geometry$BoundingBox3d$extrema(
					getBoundingBox(next));
				var $temp$currentMinX = A2($ianmackenzie$elm_units$Quantity$min, b.minX, currentMinX),
					$temp$currentMaxX = A2($ianmackenzie$elm_units$Quantity$max, b.maxX, currentMaxX),
					$temp$currentMinY = A2($ianmackenzie$elm_units$Quantity$min, b.minY, currentMinY),
					$temp$currentMaxY = A2($ianmackenzie$elm_units$Quantity$max, b.maxY, currentMaxY),
					$temp$currentMinZ = A2($ianmackenzie$elm_units$Quantity$min, b.minZ, currentMinZ),
					$temp$currentMaxZ = A2($ianmackenzie$elm_units$Quantity$max, b.maxZ, currentMaxZ),
					$temp$getBoundingBox = getBoundingBox,
					$temp$items = rest;
				currentMinX = $temp$currentMinX;
				currentMaxX = $temp$currentMaxX;
				currentMinY = $temp$currentMinY;
				currentMaxY = $temp$currentMaxY;
				currentMinZ = $temp$currentMinZ;
				currentMaxZ = $temp$currentMaxZ;
				getBoundingBox = $temp$getBoundingBox;
				items = $temp$items;
				continue aggregateOfHelp;
			} else {
				return $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d(
					{maxX: currentMaxX, maxY: currentMaxY, maxZ: currentMaxZ, minX: currentMinX, minY: currentMinY, minZ: currentMinZ});
			}
		}
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$aggregateOf = F3(
	function (getBoundingBox, first, rest) {
		var b1 = $ianmackenzie$elm_geometry$BoundingBox3d$extrema(
			getBoundingBox(first));
		return A8($ianmackenzie$elm_geometry$BoundingBox3d$aggregateOfHelp, b1.minX, b1.maxX, b1.minY, b1.maxY, b1.minZ, b1.maxZ, getBoundingBox, rest);
	});
var $ianmackenzie$elm_geometry$Triangle3d$boundingBox = function (triangle) {
	var _v0 = $ianmackenzie$elm_geometry$Triangle3d$vertices(triangle);
	var p1 = _v0.a;
	var p2 = _v0.b;
	var p3 = _v0.c;
	var x1 = $ianmackenzie$elm_geometry$Point3d$xCoordinate(p1);
	var y1 = $ianmackenzie$elm_geometry$Point3d$yCoordinate(p1);
	var z1 = $ianmackenzie$elm_geometry$Point3d$zCoordinate(p1);
	var x2 = $ianmackenzie$elm_geometry$Point3d$xCoordinate(p2);
	var y2 = $ianmackenzie$elm_geometry$Point3d$yCoordinate(p2);
	var z2 = $ianmackenzie$elm_geometry$Point3d$zCoordinate(p2);
	var x3 = $ianmackenzie$elm_geometry$Point3d$xCoordinate(p3);
	var y3 = $ianmackenzie$elm_geometry$Point3d$yCoordinate(p3);
	var z3 = $ianmackenzie$elm_geometry$Point3d$zCoordinate(p3);
	return $ianmackenzie$elm_geometry$BoundingBox3d$fromExtrema(
		{
			maxX: A2(
				$ianmackenzie$elm_units$Quantity$max,
				x1,
				A2($ianmackenzie$elm_units$Quantity$max, x2, x3)),
			maxY: A2(
				$ianmackenzie$elm_units$Quantity$max,
				y1,
				A2($ianmackenzie$elm_units$Quantity$max, y2, y3)),
			maxZ: A2(
				$ianmackenzie$elm_units$Quantity$max,
				z1,
				A2($ianmackenzie$elm_units$Quantity$max, z2, z3)),
			minX: A2(
				$ianmackenzie$elm_units$Quantity$min,
				x1,
				A2($ianmackenzie$elm_units$Quantity$min, x2, x3)),
			minY: A2(
				$ianmackenzie$elm_units$Quantity$min,
				y1,
				A2($ianmackenzie$elm_units$Quantity$min, y2, y3)),
			minZ: A2(
				$ianmackenzie$elm_units$Quantity$min,
				z1,
				A2($ianmackenzie$elm_units$Quantity$min, z2, z3))
		});
};
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$facetAttributes = function (triangle) {
	var _v0 = $ianmackenzie$elm_geometry$Triangle3d$vertices(triangle);
	var p1 = _v0.a;
	var p2 = _v0.b;
	var p3 = _v0.c;
	var normal = $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(
		A3($ianmackenzie$elm_3d_scene$Scene3d$Mesh$triangleNormal, p1, p2, p3));
	return _Utils_Tuple3(
		{
			normal: normal,
			position: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p1)
		},
		{
			normal: normal,
			position: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p2)
		},
		{
			normal: normal,
			position: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p3)
		});
};
var $elm_explorations$webgl$WebGL$Mesh3 = F2(
	function (a, b) {
		return {$: 'Mesh3', a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$triangles = $elm_explorations$webgl$WebGL$Mesh3(
	{elemSize: 3, indexSize: 0, mode: 4});
var $ianmackenzie$elm_3d_scene$Scene3d$Mesh$facets = function (givenTriangles) {
	if (!givenTriangles.b) {
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyMesh;
	} else {
		var first = givenTriangles.a;
		var rest = givenTriangles.b;
		var webGLMesh = $elm_explorations$webgl$WebGL$triangles(
			A2($elm$core$List$map, $ianmackenzie$elm_3d_scene$Scene3d$Mesh$facetAttributes, givenTriangles));
		var bounds = A3($ianmackenzie$elm_geometry$BoundingBox3d$aggregateOf, $ianmackenzie$elm_geometry$Triangle3d$boundingBox, first, rest);
		return A4($ianmackenzie$elm_3d_scene$Scene3d$Types$Facets, bounds, givenTriangles, webGLMesh, $ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces);
	}
};
var $ianmackenzie$elm_geometry$Geometry$Types$Triangle3d = function (a) {
	return {$: 'Triangle3d', a: a};
};
var $ianmackenzie$elm_geometry$Triangle3d$from = F3(
	function (p1, p2, p3) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Triangle3d(
			_Utils_Tuple3(p1, p2, p3));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Primitives$block = function () {
	var z = $ianmackenzie$elm_units$Length$meters(1);
	var y = $ianmackenzie$elm_units$Length$meters(1);
	var x = $ianmackenzie$elm_units$Length$meters(1);
	var minZ = A2($ianmackenzie$elm_units$Quantity$multiplyBy, -0.5, z);
	var minY = A2($ianmackenzie$elm_units$Quantity$multiplyBy, -0.5, y);
	var minX = A2($ianmackenzie$elm_units$Quantity$multiplyBy, -0.5, x);
	var p0 = A3($ianmackenzie$elm_geometry$Point3d$xyz, minX, minY, minZ);
	var maxZ = A2($ianmackenzie$elm_units$Quantity$multiplyBy, 0.5, z);
	var p4 = A3($ianmackenzie$elm_geometry$Point3d$xyz, minX, minY, maxZ);
	var maxY = A2($ianmackenzie$elm_units$Quantity$multiplyBy, 0.5, y);
	var p3 = A3($ianmackenzie$elm_geometry$Point3d$xyz, minX, maxY, minZ);
	var p7 = A3($ianmackenzie$elm_geometry$Point3d$xyz, minX, maxY, maxZ);
	var maxX = A2($ianmackenzie$elm_units$Quantity$multiplyBy, 0.5, x);
	var p1 = A3($ianmackenzie$elm_geometry$Point3d$xyz, maxX, minY, minZ);
	var p2 = A3($ianmackenzie$elm_geometry$Point3d$xyz, maxX, maxY, minZ);
	var p5 = A3($ianmackenzie$elm_geometry$Point3d$xyz, maxX, minY, maxZ);
	var p6 = A3($ianmackenzie$elm_geometry$Point3d$xyz, maxX, maxY, maxZ);
	return $ianmackenzie$elm_3d_scene$Scene3d$Mesh$cullBackFaces(
		$ianmackenzie$elm_3d_scene$Scene3d$Mesh$facets(
			_List_fromArray(
				[
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p0, p2, p1),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p0, p3, p2),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p4, p5, p6),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p4, p6, p7),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p1, p2, p6),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p1, p6, p5),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p0, p7, p3),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p0, p4, p7),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p0, p1, p5),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p0, p5, p4),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p3, p6, p2),
					A3($ianmackenzie$elm_geometry$Triangle3d$from, p3, p7, p6)
				])));
}();
var $ianmackenzie$elm_3d_scene$Scene3d$Primitives$blockShadow = $ianmackenzie$elm_3d_scene$Scene3d$Mesh$shadow($ianmackenzie$elm_3d_scene$Scene3d$Primitives$block);
var $ianmackenzie$elm_geometry$Block3d$dimensions = function (_v0) {
	var block = _v0.a;
	return block.dimensions;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$block = F4(
	function (renderObject, renderShadow, givenMaterial, givenBlock) {
		var baseEntity = A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$mesh, givenMaterial, $ianmackenzie$elm_3d_scene$Scene3d$Primitives$block);
		var untransformedEntity = function () {
			var _v1 = _Utils_Tuple2(renderObject, renderShadow);
			if (_v1.a) {
				if (_v1.b) {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$group(
						_List_fromArray(
							[
								baseEntity,
								$ianmackenzie$elm_3d_scene$Scene3d$Entity$shadow($ianmackenzie$elm_3d_scene$Scene3d$Primitives$blockShadow)
							]));
				} else {
					return baseEntity;
				}
			} else {
				if (_v1.b) {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$shadow($ianmackenzie$elm_3d_scene$Scene3d$Primitives$blockShadow);
				} else {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
				}
			}
		}();
		var _v0 = $ianmackenzie$elm_geometry$Block3d$dimensions(givenBlock);
		var scaleX = _v0.a.a;
		var scaleY = _v0.b.a;
		var scaleZ = _v0.c.a;
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$placeIn,
			$ianmackenzie$elm_geometry$Block3d$axes(givenBlock),
			A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$preScale,
				_Utils_Tuple3(scaleX, scaleY, scaleZ),
				untransformedEntity));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$block = F2(
	function (givenMaterial, givenBlock) {
		return A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$block, true, false, givenMaterial, givenBlock);
	});
var $author$project$Text3d$build = F5(
	function (x_, y_, l_, w_, h_) {
		var p2 = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, (x_ + w_) * l_, (y_ + h_) * l_);
		var p1 = A3($ianmackenzie$elm_geometry$Point3d$meters, 0, x_ * l_, y_ * l_);
		var block = A2($ianmackenzie$elm_geometry$Block3d$from, p1, p2);
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$block,
			$ianmackenzie$elm_3d_scene$Scene3d$Material$color($avh4$elm_color$Color$white),
			block);
	});
var $author$project$Text3d$bd = F2(
	function (x_, y_) {
		return A5($author$project$Text3d$build, x_ - 1, y_ - 1, $author$project$Text3d$len, 1, 1);
	});
var $author$project$Text3d$bdh = F3(
	function (x_, y_, l_) {
		return A5($author$project$Text3d$build, x_ - 1, y_ - 1, $author$project$Text3d$len, l_, 1);
	});
var $author$project$Text3d$bdv = F3(
	function (x_, y_, l_) {
		return A5($author$project$Text3d$build, x_ - 1, y_ - 1, $author$project$Text3d$len, 1, l_);
	});
var $author$project$Text3d$a = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 1, 6),
			A2($author$project$Text3d$bd, 2, 7),
			A2($author$project$Text3d$bd, 3, 7),
			A2($author$project$Text3d$bd, 4, 7),
			A3($author$project$Text3d$bdv, 5, 1, 6),
			A3($author$project$Text3d$bdh, 2, 4, 3)
		]));
var $author$project$Text3d$b = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 1, 7),
			A3($author$project$Text3d$bdh, 2, 7, 3),
			A2($author$project$Text3d$bd, 5, 6),
			A2($author$project$Text3d$bd, 5, 5),
			A2($author$project$Text3d$bd, 5, 3),
			A2($author$project$Text3d$bd, 5, 2),
			A3($author$project$Text3d$bdh, 2, 4, 3),
			A3($author$project$Text3d$bdh, 2, 1, 3)
		]));
var $author$project$Text3d$c = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 2, 5),
			A3($author$project$Text3d$bdh, 2, 7, 3),
			A2($author$project$Text3d$bd, 5, 6),
			A2($author$project$Text3d$bd, 5, 2),
			A3($author$project$Text3d$bdh, 2, 1, 3)
		]));
var $author$project$Text3d$cm = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 2, 2),
			A2($author$project$Text3d$bd, 3, 1)
		]));
var $author$project$Text3d$d = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 1, 7),
			A3($author$project$Text3d$bdh, 2, 7, 3),
			A3($author$project$Text3d$bdv, 5, 4, 3),
			A3($author$project$Text3d$bdv, 5, 2, 2),
			A3($author$project$Text3d$bdh, 2, 1, 3)
		]));
var $author$project$Text3d$e = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 1, 7),
			A3($author$project$Text3d$bdh, 2, 7, 4),
			A2($author$project$Text3d$bd, 5, 1),
			A3($author$project$Text3d$bdh, 2, 4, 3),
			A3($author$project$Text3d$bdh, 2, 1, 3)
		]));
var $author$project$Text3d$f = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 1, 7),
			A3($author$project$Text3d$bdh, 2, 7, 3),
			A2($author$project$Text3d$bd, 5, 7),
			A3($author$project$Text3d$bdh, 2, 4, 3)
		]));
var $author$project$Text3d$g = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 2, 5),
			A3($author$project$Text3d$bdh, 2, 7, 3),
			A2($author$project$Text3d$bd, 5, 6),
			A2($author$project$Text3d$bd, 5, 2),
			A3($author$project$Text3d$bdh, 2, 1, 3),
			A3($author$project$Text3d$bdh, 3, 3, 3)
		]));
var $author$project$Text3d$h = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 1, 7),
			A3($author$project$Text3d$bdv, 5, 1, 7),
			A3($author$project$Text3d$bdh, 2, 4, 3)
		]));
var $author$project$Text3d$i = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 3, 2, 5),
			A3($author$project$Text3d$bdh, 1, 7, 5),
			A3($author$project$Text3d$bdh, 1, 1, 5)
		]));
var $author$project$Text3d$j = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 2, 2),
			A3($author$project$Text3d$bdh, 3, 7, 3),
			A3($author$project$Text3d$bdv, 5, 2, 5),
			A3($author$project$Text3d$bdh, 2, 1, 3)
		]));
var $author$project$Text3d$k = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 1, 7),
			A2($author$project$Text3d$bd, 5, 7),
			A2($author$project$Text3d$bd, 5, 1),
			A2($author$project$Text3d$bd, 4, 6),
			A2($author$project$Text3d$bd, 4, 2),
			A2($author$project$Text3d$bd, 3, 3),
			A2($author$project$Text3d$bd, 3, 5),
			A2($author$project$Text3d$bd, 2, 4)
		]));
var $author$project$Text3d$l = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 1, 7),
			A3($author$project$Text3d$bdh, 2, 1, 4)
		]));
var $author$project$Text3d$m = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 1, 7),
			A3($author$project$Text3d$bdv, 5, 1, 7),
			A2($author$project$Text3d$bd, 2, 5),
			A3($author$project$Text3d$bdv, 3, 3, 2),
			A2($author$project$Text3d$bd, 4, 5)
		]));
var $author$project$Text3d$n = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 1, 7),
			A3($author$project$Text3d$bdv, 5, 1, 7),
			A2($author$project$Text3d$bd, 2, 5),
			A2($author$project$Text3d$bd, 3, 4),
			A2($author$project$Text3d$bd, 4, 3)
		]));
var $author$project$Text3d$n0 = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 1, 2),
			A2($author$project$Text3d$bd, 1, 3),
			A2($author$project$Text3d$bd, 1, 4),
			A2($author$project$Text3d$bd, 1, 5),
			A2($author$project$Text3d$bd, 1, 6),
			A2($author$project$Text3d$bd, 2, 7),
			A2($author$project$Text3d$bd, 3, 7),
			A2($author$project$Text3d$bd, 4, 7),
			A2($author$project$Text3d$bd, 5, 6),
			A2($author$project$Text3d$bd, 5, 5),
			A2($author$project$Text3d$bd, 5, 4),
			A2($author$project$Text3d$bd, 5, 3),
			A2($author$project$Text3d$bd, 5, 2),
			A2($author$project$Text3d$bd, 2, 1),
			A2($author$project$Text3d$bd, 3, 1),
			A2($author$project$Text3d$bd, 4, 1),
			A2($author$project$Text3d$bd, 2, 3),
			A2($author$project$Text3d$bd, 3, 4),
			A2($author$project$Text3d$bd, 4, 5)
		]));
var $author$project$Text3d$n1 = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 3, 2),
			A2($author$project$Text3d$bd, 3, 3),
			A2($author$project$Text3d$bd, 3, 4),
			A2($author$project$Text3d$bd, 3, 5),
			A2($author$project$Text3d$bd, 3, 6),
			A2($author$project$Text3d$bd, 1, 5),
			A2($author$project$Text3d$bd, 2, 6),
			A2($author$project$Text3d$bd, 3, 7),
			A2($author$project$Text3d$bd, 5, 1),
			A2($author$project$Text3d$bd, 2, 1),
			A2($author$project$Text3d$bd, 3, 1),
			A2($author$project$Text3d$bd, 4, 1),
			A2($author$project$Text3d$bd, 1, 1)
		]));
var $author$project$Text3d$n2 = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 1, 1),
			A2($author$project$Text3d$bd, 1, 2),
			A2($author$project$Text3d$bd, 1, 3),
			A2($author$project$Text3d$bd, 1, 6),
			A2($author$project$Text3d$bd, 2, 7),
			A2($author$project$Text3d$bd, 3, 7),
			A2($author$project$Text3d$bd, 4, 7),
			A2($author$project$Text3d$bd, 5, 6),
			A2($author$project$Text3d$bd, 5, 5),
			A2($author$project$Text3d$bd, 5, 1),
			A2($author$project$Text3d$bd, 2, 4),
			A2($author$project$Text3d$bd, 3, 4),
			A2($author$project$Text3d$bd, 4, 4),
			A2($author$project$Text3d$bd, 2, 1),
			A2($author$project$Text3d$bd, 3, 1),
			A2($author$project$Text3d$bd, 4, 1)
		]));
var $author$project$Text3d$n3 = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 1, 2),
			A2($author$project$Text3d$bd, 1, 6),
			A2($author$project$Text3d$bd, 2, 7),
			A2($author$project$Text3d$bd, 3, 7),
			A2($author$project$Text3d$bd, 4, 7),
			A2($author$project$Text3d$bd, 5, 6),
			A2($author$project$Text3d$bd, 5, 5),
			A2($author$project$Text3d$bd, 5, 3),
			A2($author$project$Text3d$bd, 5, 2),
			A2($author$project$Text3d$bd, 3, 4),
			A2($author$project$Text3d$bd, 4, 4),
			A2($author$project$Text3d$bd, 2, 1),
			A2($author$project$Text3d$bd, 3, 1),
			A2($author$project$Text3d$bd, 4, 1)
		]));
var $author$project$Text3d$n4 = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 1, 3),
			A2($author$project$Text3d$bd, 1, 4),
			A2($author$project$Text3d$bd, 2, 5),
			A2($author$project$Text3d$bd, 3, 6),
			A2($author$project$Text3d$bd, 4, 7),
			A3($author$project$Text3d$bdv, 5, 1, 7),
			A2($author$project$Text3d$bd, 2, 3),
			A2($author$project$Text3d$bd, 3, 3),
			A2($author$project$Text3d$bd, 4, 3)
		]));
var $author$project$Text3d$n5 = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 1, 1),
			A2($author$project$Text3d$bd, 1, 4),
			A2($author$project$Text3d$bd, 1, 5),
			A2($author$project$Text3d$bd, 1, 6),
			A2($author$project$Text3d$bd, 1, 7),
			A2($author$project$Text3d$bd, 2, 7),
			A2($author$project$Text3d$bd, 3, 7),
			A2($author$project$Text3d$bd, 4, 7),
			A2($author$project$Text3d$bd, 5, 7),
			A2($author$project$Text3d$bd, 5, 3),
			A2($author$project$Text3d$bd, 5, 2),
			A2($author$project$Text3d$bd, 2, 4),
			A2($author$project$Text3d$bd, 3, 4),
			A2($author$project$Text3d$bd, 4, 4),
			A2($author$project$Text3d$bd, 2, 1),
			A2($author$project$Text3d$bd, 3, 1),
			A2($author$project$Text3d$bd, 4, 1)
		]));
var $author$project$Text3d$n6 = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 1, 2),
			A2($author$project$Text3d$bd, 1, 3),
			A2($author$project$Text3d$bd, 1, 4),
			A2($author$project$Text3d$bd, 1, 5),
			A2($author$project$Text3d$bd, 1, 6),
			A2($author$project$Text3d$bd, 2, 7),
			A2($author$project$Text3d$bd, 3, 7),
			A2($author$project$Text3d$bd, 4, 7),
			A2($author$project$Text3d$bd, 5, 3),
			A2($author$project$Text3d$bd, 5, 2),
			A2($author$project$Text3d$bd, 2, 4),
			A2($author$project$Text3d$bd, 3, 4),
			A2($author$project$Text3d$bd, 4, 4),
			A2($author$project$Text3d$bd, 2, 1),
			A2($author$project$Text3d$bd, 3, 1),
			A2($author$project$Text3d$bd, 4, 1)
		]));
var $author$project$Text3d$n7 = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 1, 6),
			A2($author$project$Text3d$bd, 1, 7),
			A2($author$project$Text3d$bd, 2, 7),
			A2($author$project$Text3d$bd, 3, 7),
			A2($author$project$Text3d$bd, 4, 7),
			A2($author$project$Text3d$bd, 5, 7),
			A2($author$project$Text3d$bd, 5, 6),
			A2($author$project$Text3d$bd, 5, 5),
			A2($author$project$Text3d$bd, 4, 4),
			A2($author$project$Text3d$bd, 3, 2),
			A2($author$project$Text3d$bd, 3, 1),
			A2($author$project$Text3d$bd, 3, 3)
		]));
var $author$project$Text3d$n8 = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 1, 2),
			A2($author$project$Text3d$bd, 1, 3),
			A2($author$project$Text3d$bd, 1, 5),
			A2($author$project$Text3d$bd, 1, 6),
			A2($author$project$Text3d$bd, 2, 7),
			A2($author$project$Text3d$bd, 3, 7),
			A2($author$project$Text3d$bd, 4, 7),
			A2($author$project$Text3d$bd, 5, 6),
			A2($author$project$Text3d$bd, 5, 5),
			A2($author$project$Text3d$bd, 5, 3),
			A2($author$project$Text3d$bd, 5, 2),
			A2($author$project$Text3d$bd, 2, 4),
			A2($author$project$Text3d$bd, 3, 4),
			A2($author$project$Text3d$bd, 4, 4),
			A2($author$project$Text3d$bd, 2, 1),
			A2($author$project$Text3d$bd, 3, 1),
			A2($author$project$Text3d$bd, 4, 1)
		]));
var $author$project$Text3d$n9 = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 1, 5),
			A2($author$project$Text3d$bd, 1, 6),
			A2($author$project$Text3d$bd, 2, 7),
			A2($author$project$Text3d$bd, 3, 7),
			A2($author$project$Text3d$bd, 4, 7),
			A2($author$project$Text3d$bd, 5, 6),
			A2($author$project$Text3d$bd, 5, 5),
			A2($author$project$Text3d$bd, 5, 4),
			A2($author$project$Text3d$bd, 5, 3),
			A2($author$project$Text3d$bd, 5, 2),
			A2($author$project$Text3d$bd, 2, 4),
			A2($author$project$Text3d$bd, 3, 4),
			A2($author$project$Text3d$bd, 4, 4),
			A2($author$project$Text3d$bd, 2, 1),
			A2($author$project$Text3d$bd, 3, 1),
			A2($author$project$Text3d$bd, 4, 1)
		]));
var $author$project$Text3d$o = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 2, 5),
			A3($author$project$Text3d$bdh, 2, 7, 3),
			A3($author$project$Text3d$bdv, 5, 2, 5),
			A3($author$project$Text3d$bdh, 2, 1, 3)
		]));
var $author$project$Text3d$p = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 1, 7),
			A3($author$project$Text3d$bdh, 2, 7, 3),
			A3($author$project$Text3d$bdv, 5, 5, 2),
			A3($author$project$Text3d$bdh, 2, 4, 3)
		]));
var $author$project$Text3d$pr = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 2, 7),
			A2($author$project$Text3d$bd, 2, 6),
			A2($author$project$Text3d$bd, 2, 5)
		]));
var $author$project$Text3d$q = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 2, 5),
			A3($author$project$Text3d$bdh, 2, 7, 3),
			A3($author$project$Text3d$bdv, 5, 2, 5),
			A3($author$project$Text3d$bdh, 2, 1, 4),
			A2($author$project$Text3d$bd, 4, 2)
		]));
var $author$project$Text3d$qm = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 3, 3),
			A2($author$project$Text3d$bd, 3, 1),
			A2($author$project$Text3d$bd, 4, 4),
			A2($author$project$Text3d$bd, 5, 5),
			A2($author$project$Text3d$bd, 5, 6),
			A2($author$project$Text3d$bd, 4, 7),
			A2($author$project$Text3d$bd, 3, 7),
			A2($author$project$Text3d$bd, 2, 7),
			A2($author$project$Text3d$bd, 1, 6)
		]));
var $author$project$Text3d$r = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 1, 7),
			A3($author$project$Text3d$bdh, 2, 7, 3),
			A3($author$project$Text3d$bdv, 5, 5, 2),
			A3($author$project$Text3d$bdv, 3, 3, 2),
			A2($author$project$Text3d$bd, 4, 2),
			A2($author$project$Text3d$bd, 5, 1),
			A2($author$project$Text3d$bd, 2, 4),
			A2($author$project$Text3d$bd, 4, 4)
		]));
var $author$project$Text3d$s = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 1, 2),
			A2($author$project$Text3d$bd, 1, 5),
			A2($author$project$Text3d$bd, 1, 6),
			A3($author$project$Text3d$bdh, 2, 7, 3),
			A2($author$project$Text3d$bd, 5, 6),
			A3($author$project$Text3d$bdv, 5, 2, 2),
			A3($author$project$Text3d$bdh, 2, 4, 3),
			A3($author$project$Text3d$bdh, 2, 1, 3)
		]));
var $author$project$Text3d$sp = $ianmackenzie$elm_3d_scene$Scene3d$group(_List_Nil);
var $author$project$Text3d$t = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 3, 1, 6),
			A3($author$project$Text3d$bdh, 1, 7, 5)
		]));
var $author$project$Text3d$u = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 2, 6),
			A3($author$project$Text3d$bdv, 5, 2, 6),
			A3($author$project$Text3d$bdh, 2, 1, 3)
		]));
var $author$project$Text3d$v = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 2, 2),
			A3($author$project$Text3d$bdv, 1, 3, 5),
			A3($author$project$Text3d$bdv, 5, 3, 5),
			A2($author$project$Text3d$bd, 4, 2),
			A2($author$project$Text3d$bd, 3, 1)
		]));
var $author$project$Text3d$w = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 1, 2, 6),
			A3($author$project$Text3d$bdv, 5, 2, 6),
			A3($author$project$Text3d$bdv, 3, 2, 2),
			A2($author$project$Text3d$bd, 2, 1),
			A2($author$project$Text3d$bd, 4, 1)
		]));
var $author$project$Text3d$x = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A2($author$project$Text3d$bd, 1, 1),
			A2($author$project$Text3d$bd, 2, 2),
			A2($author$project$Text3d$bd, 3, 3),
			A2($author$project$Text3d$bd, 4, 2),
			A2($author$project$Text3d$bd, 5, 1),
			A2($author$project$Text3d$bd, 3, 4),
			A2($author$project$Text3d$bd, 3, 5),
			A2($author$project$Text3d$bd, 2, 6),
			A2($author$project$Text3d$bd, 4, 6),
			A2($author$project$Text3d$bd, 1, 7),
			A2($author$project$Text3d$bd, 5, 7)
		]));
var $author$project$Text3d$y = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdv, 3, 1, 5),
			A2($author$project$Text3d$bd, 2, 6),
			A2($author$project$Text3d$bd, 4, 6),
			A2($author$project$Text3d$bd, 1, 7),
			A2($author$project$Text3d$bd, 5, 7)
		]));
var $author$project$Text3d$z = $ianmackenzie$elm_3d_scene$Scene3d$group(
	_List_fromArray(
		[
			A3($author$project$Text3d$bdh, 1, 1, 5),
			A2($author$project$Text3d$bd, 1, 2),
			A2($author$project$Text3d$bd, 2, 3),
			A2($author$project$Text3d$bd, 3, 4),
			A2($author$project$Text3d$bd, 4, 5),
			A2($author$project$Text3d$bd, 5, 6),
			A3($author$project$Text3d$bdh, 1, 7, 5)
		]));
var $author$project$Text3d$parser = function (ch) {
	switch (ch.valueOf()) {
		case 'a':
			return $author$project$Text3d$a;
		case 'b':
			return $author$project$Text3d$b;
		case 'c':
			return $author$project$Text3d$c;
		case 'd':
			return $author$project$Text3d$d;
		case 'e':
			return $author$project$Text3d$e;
		case 'f':
			return $author$project$Text3d$f;
		case 'g':
			return $author$project$Text3d$g;
		case 'h':
			return $author$project$Text3d$h;
		case 'i':
			return $author$project$Text3d$i;
		case 'j':
			return $author$project$Text3d$j;
		case 'k':
			return $author$project$Text3d$k;
		case 'l':
			return $author$project$Text3d$l;
		case 'm':
			return $author$project$Text3d$m;
		case 'n':
			return $author$project$Text3d$n;
		case 'o':
			return $author$project$Text3d$o;
		case 'p':
			return $author$project$Text3d$p;
		case 'q':
			return $author$project$Text3d$q;
		case 'r':
			return $author$project$Text3d$r;
		case 's':
			return $author$project$Text3d$s;
		case 't':
			return $author$project$Text3d$t;
		case 'u':
			return $author$project$Text3d$u;
		case 'v':
			return $author$project$Text3d$v;
		case 'w':
			return $author$project$Text3d$w;
		case 'x':
			return $author$project$Text3d$x;
		case 'y':
			return $author$project$Text3d$y;
		case 'z':
			return $author$project$Text3d$z;
		case '0':
			return $author$project$Text3d$n0;
		case '1':
			return $author$project$Text3d$n1;
		case '2':
			return $author$project$Text3d$n2;
		case '3':
			return $author$project$Text3d$n3;
		case '4':
			return $author$project$Text3d$n4;
		case '5':
			return $author$project$Text3d$n5;
		case '6':
			return $author$project$Text3d$n6;
		case '7':
			return $author$project$Text3d$n7;
		case '8':
			return $author$project$Text3d$n8;
		case '9':
			return $author$project$Text3d$n9;
		case '\'':
			return $author$project$Text3d$pr;
		case ',':
			return $author$project$Text3d$cm;
		case '?':
			return $author$project$Text3d$qm;
		default:
			return $author$project$Text3d$sp;
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$scaleAbout = F2(
	function (point, k) {
		var p = $ianmackenzie$elm_geometry$Point3d$unwrap(point);
		var oneMinusK = 1 - k;
		return {isRightHanded: k >= 0, ix: 1, iy: 0, iz: 0, jx: 0, jy: 1, jz: 0, kx: 0, ky: 0, kz: 1, px: oneMinusK * p.x, py: oneMinusK * p.y, pz: oneMinusK * p.z, scale: k};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$scaleAbout = F3(
	function (centerPoint, scale, givenDrawable) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy,
			A2($ianmackenzie$elm_3d_scene$Scene3d$Transformation$scaleAbout, centerPoint, scale),
			givenDrawable);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$scaleAbout = F3(
	function (centerPoint, scale, entity) {
		return A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$scaleAbout, centerPoint, scale, entity);
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $ianmackenzie$elm_geometry$Axis3d$x = A2($ianmackenzie$elm_geometry$Axis3d$through, $ianmackenzie$elm_geometry$Point3d$origin, $ianmackenzie$elm_geometry$Direction3d$x);
var $ianmackenzie$elm_geometry$Axis3d$y = A2($ianmackenzie$elm_geometry$Axis3d$through, $ianmackenzie$elm_geometry$Point3d$origin, $ianmackenzie$elm_geometry$Direction3d$y);
var $author$project$Types$text3d = F4(
	function (str, anchor, scale, rot) {
		var text = A2(
			$elm$core$List$map,
			$author$project$Text3d$parser,
			$elm$core$String$toList(str));
		var moveY = F2(
			function (dy, entity) {
				return A4($author$project$Types$move, 0, dy, 0, entity);
			});
		var dr = A2($ianmackenzie$elm_geometry$Vector3d$from, $ianmackenzie$elm_geometry$Point3d$origin, anchor);
		var combine = F2(
			function (head, rest) {
				return $ianmackenzie$elm_3d_scene$Scene3d$group(
					_List_fromArray(
						[
							head,
							A2(moveY, 6 * $author$project$Text3d$len, rest)
						]));
			});
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$translateBy,
			dr,
			A3(
				$ianmackenzie$elm_3d_scene$Scene3d$rotateAround,
				$ianmackenzie$elm_geometry$Axis3d$x,
				$ianmackenzie$elm_units$Angle$degrees(rot.c),
				A3(
					$ianmackenzie$elm_3d_scene$Scene3d$rotateAround,
					$ianmackenzie$elm_geometry$Axis3d$y,
					$ianmackenzie$elm_units$Angle$degrees(rot.b),
					A3(
						$ianmackenzie$elm_3d_scene$Scene3d$rotateAround,
						$ianmackenzie$elm_geometry$Axis3d$z,
						$ianmackenzie$elm_units$Angle$degrees(rot.a),
						A3(
							$ianmackenzie$elm_3d_scene$Scene3d$scaleAbout,
							$ianmackenzie$elm_geometry$Point3d$origin,
							scale,
							A3($elm$core$List$foldr, combine, $author$project$Text3d$sp, text))))));
	});
var $author$project$Model$settings = function () {
	var text2 = A4(
		$author$project$Types$text3d,
		'help',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 6, 2, 0.7),
		0.4,
		{a: 0, b: 270, c: 0});
	var text1 = A4(
		$author$project$Types$text3d,
		'play',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 2, 2, 0.7),
		0.4,
		{a: 0, b: 270, c: 0});
	var lamps = _List_fromArray(
		[
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 8, 0),
			270),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -3, -3, 0),
			45)
		]);
	return $ianmackenzie$elm_3d_scene$Scene3d$group(
		_Utils_ap(
			lamps,
			_List_fromArray(
				[text1, text2])));
}();
var $author$project$Types$Text3d = F9(
	function (str, anchor, scale, rot, color, occupiedCenters, entities, wall, time) {
		return {anchor: anchor, color: color, entities: entities, occupiedCenters: occupiedCenters, rot: rot, scale: scale, str: str, time: time, wall: wall};
	});
var $ianmackenzie$elm_geometry$Point3d$rotateAround = F3(
	function (_v0, _v1, _v2) {
		var axis = _v0.a;
		var angle = _v1.a;
		var p = _v2.a;
		var halfAngle = 0.5 * angle;
		var qw = $elm$core$Basics$cos(halfAngle);
		var sinHalfAngle = $elm$core$Basics$sin(halfAngle);
		var _v3 = axis.originPoint;
		var p0 = _v3.a;
		var deltaX = p.x - p0.x;
		var deltaY = p.y - p0.y;
		var deltaZ = p.z - p0.z;
		var _v4 = axis.direction;
		var d = _v4.a;
		var qx = d.x * sinHalfAngle;
		var wx = qw * qx;
		var xx = qx * qx;
		var qy = d.y * sinHalfAngle;
		var wy = qw * qy;
		var xy = qx * qy;
		var yy = qy * qy;
		var a22 = 1 - (2 * (xx + yy));
		var qz = d.z * sinHalfAngle;
		var wz = qw * qz;
		var a01 = 2 * (xy - wz);
		var a10 = 2 * (xy + wz);
		var xz = qx * qz;
		var a02 = 2 * (xz + wy);
		var a20 = 2 * (xz - wy);
		var yz = qy * qz;
		var a12 = 2 * (yz - wx);
		var a21 = 2 * (yz + wx);
		var zz = qz * qz;
		var a00 = 1 - (2 * (yy + zz));
		var a11 = 1 - (2 * (xx + zz));
		return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
			{x: ((p0.x + (a00 * deltaX)) + (a01 * deltaY)) + (a02 * deltaZ), y: ((p0.y + (a10 * deltaX)) + (a11 * deltaY)) + (a12 * deltaZ), z: ((p0.z + (a20 * deltaX)) + (a21 * deltaY)) + (a22 * deltaZ)});
	});
var $ianmackenzie$elm_units$Quantity$round = function (_v0) {
	var value = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(
		$elm$core$Basics$round(value));
};
var $ianmackenzie$elm_units$Quantity$toFloatQuantity = function (_v0) {
	var value = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(value);
};
var $author$project$Types$buildText3d = F7(
	function (str, anchor, firstBlockCenter, scale, rot, color, ifWallInit) {
		var strLength = $elm$core$List$length(
			$elm$core$String$toList(str));
		var roundPoint = function (point) {
			var z_ = $ianmackenzie$elm_units$Quantity$toFloatQuantity(
				$ianmackenzie$elm_units$Quantity$round(
					$ianmackenzie$elm_geometry$Point3d$zCoordinate(point)));
			var y_ = $ianmackenzie$elm_units$Quantity$toFloatQuantity(
				$ianmackenzie$elm_units$Quantity$round(
					$ianmackenzie$elm_geometry$Point3d$yCoordinate(point)));
			var x_ = $ianmackenzie$elm_units$Quantity$toFloatQuantity(
				$ianmackenzie$elm_units$Quantity$round(
					$ianmackenzie$elm_geometry$Point3d$xCoordinate(point)));
			return A3($ianmackenzie$elm_geometry$Point3d$xyz, x_, y_, z_);
		};
		var length = $elm$core$Basics$ceiling((((strLength * 6) - 1) * scale) / 2);
		var entities = A4(
			$author$project$Types$text3d,
			str,
			anchor,
			scale,
			{a: rot, b: 0, c: 0});
		var dr = A2($ianmackenzie$elm_geometry$Vector3d$from, $ianmackenzie$elm_geometry$Point3d$origin, firstBlockCenter);
		var coordinates = A2(
			$elm$core$List$map,
			function (yc) {
				return A2(
					$ianmackenzie$elm_geometry$Point3d$translateBy,
					dr,
					roundPoint(
						A3(
							$ianmackenzie$elm_geometry$Point3d$rotateAround,
							$ianmackenzie$elm_geometry$Axis3d$z,
							$ianmackenzie$elm_units$Angle$degrees(rot),
							A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 2 * yc, 0))));
			},
			A2($elm$core$List$range, 0, length - 1));
		var wall = A2(
			$elm$core$List$map,
			function (center) {
				return A4($author$project$Types$buildColorBlock, center, $avh4$elm_color$Color$lightYellow, $elm$core$Maybe$Nothing, $author$project$Types$R);
			},
			coordinates);
		return A9($author$project$Types$Text3d, str, anchor, scale, rot, color, coordinates, entities, wall, ifWallInit);
	});
var $author$project$Model$texts3d = _List_fromArray(
	[
		A7(
		$author$project$Types$buildText3d,
		'unravel',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -3, 1),
		0.4,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'group6',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -1, -10, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -1, -9, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'rc release',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 1, -10, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 1, -9, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'less',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 12, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 3, 1),
		0.4,
		-30,
		$avh4$elm_color$Color$white,
		-1)
	]);
var $author$project$Model$texts3dRev = _List_Nil;
var $author$project$Model$init = function () {
	var moveBlock = function (block) {
		var newCenter = A2(
			$ianmackenzie$elm_geometry$Point3d$translateBy,
			A3($ianmackenzie$elm_geometry$Vector3d$meters, 2, 6, 0),
			block.center);
		var newThis = $author$project$Types$buildBlock(newCenter);
		return _Utils_update(
			block,
			{center: newCenter, _this: newThis});
	};
	var mapSize = A2($author$project$Types$GroundSize, 7, 7);
	var initWall = _Utils_ap(
		$author$project$Types$buildWall(mapSize),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				function (block) {
					return moveBlock(block);
				},
				$author$project$Types$buildWall(
					A2($author$project$Types$GroundSize, 1, 1))),
			_List_fromArray(
				[
					A4(
					$author$project$Types$buildColorBlock,
					A3($ianmackenzie$elm_geometry$Point3d$meters, -3, -3, 1),
					$avh4$elm_color$Color$lightYellow,
					$elm$core$Maybe$Nothing,
					$author$project$Types$R)
				])));
	var initScene = {background: $avh4$elm_color$Color$white, luminance: 5000, renderOpt: 10};
	var initGoal = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 1, 1);
	var initCenter = A3($ianmackenzie$elm_geometry$Point3d$meters, -1, -1, 1);
	var initBlock = $author$project$Types$buildBlock(initCenter);
	var groundSize = A2($author$project$Types$GroundSize, 50, 50);
	return _Utils_Tuple2(
		{
			actives: $author$project$Model$actives,
			camera: {
				azimuth: $ianmackenzie$elm_units$Angle$degrees(-20),
				distance: $ianmackenzie$elm_units$Length$meters(50),
				elevation: $ianmackenzie$elm_units$Angle$degrees(50),
				focalPoint: A3($ianmackenzie$elm_geometry$Point3d$meters, 2, 0, 1)
			},
			carPeriod: 50,
			cars: _List_Nil,
			enableKey: true,
			enableMouse: false,
			event: $elm$core$Maybe$Nothing,
			frameTime: 100,
			gameStatus: A2($author$project$Types$PreGame, 1, 600),
			goal: {center: initGoal},
			godMode: false,
			groundSize: groundSize,
			level: 0,
			level3Lock: -1,
			level6Lock: false,
			mapSize: mapSize,
			nactives: $author$project$Model$nactives,
			playerRound: true,
			reverseTimer: 0,
			scene: initScene,
			screen: A2($author$project$Types$ScreenSize, $ianmackenzie$elm_units$Quantity$zero, $ianmackenzie$elm_units$Quantity$zero),
			self: A5($author$project$Types$Block, initBlock, initCenter, $avh4$elm_color$Color$white, $elm$core$Maybe$Nothing, $author$project$Types$R),
			settings: $author$project$Model$settings,
			text: $author$project$Model$initText,
			texts3d: $author$project$Model$texts3d,
			texts3dRev: $author$project$Model$texts3dRev,
			time: 0,
			wall: initWall,
			world: $author$project$Types$Normal
		},
		$elm$core$Platform$Cmd$none);
}();
var $author$project$Main$init = $author$project$Model$init;
var $author$project$Msg$KeyUp = {$: 'KeyUp'};
var $author$project$Msg$MouseDown = {$: 'MouseDown'};
var $author$project$Msg$MouseUp = {$: 'MouseUp'};
var $author$project$Msg$Resize = F2(
	function (a, b) {
		return {$: 'Resize', a: a, b: b};
	});
var $author$project$Msg$Scroll = function (a) {
	return {$: 'Scroll', a: a};
};
var $author$project$Msg$Tick = function (a) {
	return {$: 'Tick', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $ianmackenzie$elm_units$Pixels$int = function (numPixels) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numPixels);
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Types$Down = {$: 'Down'};
var $author$project$Types$G = {$: 'G'};
var $author$project$Msg$KeyDown = function (a) {
	return {$: 'KeyDown', a: a};
};
var $author$project$Types$Left = {$: 'Left'};
var $author$project$Msg$Pause = function (a) {
	return {$: 'Pause', a: a};
};
var $author$project$Types$Right = {$: 'Right'};
var $author$project$Msg$Switch = function (a) {
	return {$: 'Switch', a: a};
};
var $elm$json$Json$Decode$fail = _Json_fail;
var $author$project$Subscriptions$keyMapping1 = function (raw) {
	switch (raw) {
		case 'ArrowLeft':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$Left));
		case 'ArrowRight':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$Right));
		case 'ArrowUp':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$Up));
		case 'ArrowDown':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$Down));
		case 'A':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$Left));
		case 'D':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$Right));
		case 'W':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$Up));
		case 'S':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$Down));
		case 'a':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$Left));
		case 'd':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$Right));
		case 'w':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$Up));
		case 's':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$Down));
		case 'r':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$R));
		case 'R':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$R));
		case 'g':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$G));
		case 'G':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$KeyDown($author$project$Types$G));
		case 'Esc':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$Pause(true));
		case 'Escape':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$Pause(true));
		case '=':
			return $elm$json$Json$Decode$succeed(
				$author$project$Msg$Switch(1));
		default:
			return $elm$json$Json$Decode$fail('????');
	}
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Subscriptions$keyDecoder1 = A2(
	$elm$json$Json$Decode$andThen,
	$author$project$Subscriptions$keyMapping1,
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $ianmackenzie$elm_units$Duration$seconds = function (numSeconds) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numSeconds);
};
var $ianmackenzie$elm_units$Duration$milliseconds = function (numMilliseconds) {
	return $ianmackenzie$elm_units$Duration$seconds(0.001 * numMilliseconds);
};
var $author$project$Msg$MouseMove = F2(
	function (a, b) {
		return {$: 'MouseMove', a: a, b: b};
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $ianmackenzie$elm_units$Pixels$float = function (numPixels) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numPixels);
};
var $author$project$Subscriptions$mouseDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Msg$MouseMove,
	A2(
		$elm$json$Json$Decode$field,
		'movementX',
		A2($elm$json$Json$Decode$map, $ianmackenzie$elm_units$Pixels$float, $elm$json$Json$Decode$float)),
	A2(
		$elm$json$Json$Decode$field,
		'movementY',
		A2($elm$json$Json$Decode$map, $ianmackenzie$elm_units$Pixels$float, $elm$json$Json$Decode$float)));
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 'Delta', a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {oldTime: oldTime, request: request, subs: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$browser$Browser$AnimationManager$now = _Browser_now(_Utils_Tuple0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(_Utils_Tuple0);
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var request = _v0.request;
		var oldTime = _v0.oldTime;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 'Nothing') {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var subs = _v0.subs;
		var oldTime = _v0.oldTime;
		var send = function (sub) {
			if (sub.$ === 'Time') {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 'Time', a: a};
};
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (sub.$ === 'Time') {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrameDelta = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Delta(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrameDelta = $elm$browser$Browser$AnimationManager$onAnimationFrameDelta;
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keyup');
var $elm$browser$Browser$Events$onMouseDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'mousedown');
var $elm$browser$Browser$Events$onMouseMove = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'mousemove');
var $elm$browser$Browser$Events$onMouseUp = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'mouseup');
var $elm$browser$Browser$Events$Window = {$: 'Window'};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		$elm$browser$Browser$Events$Window,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Ports$onScroll = _Platform_incomingPort('onScroll', $elm$json$Json$Decode$float);
var $author$project$Subscriptions$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$elm$browser$Browser$Events$onAnimationFrameDelta(
				A2($elm$core$Basics$composeR, $ianmackenzie$elm_units$Duration$milliseconds, $author$project$Msg$Tick)),
				$elm$browser$Browser$Events$onResize(
				F2(
					function (w, h) {
						return A2(
							$author$project$Msg$Resize,
							$ianmackenzie$elm_units$Pixels$int(w),
							$ianmackenzie$elm_units$Pixels$int(h));
					})),
				$author$project$Ports$onScroll($author$project$Msg$Scroll),
				model.enableMouse ? $elm$core$Platform$Sub$batch(
				_List_fromArray(
					[
						$elm$browser$Browser$Events$onMouseMove($author$project$Subscriptions$mouseDecoder),
						$elm$browser$Browser$Events$onMouseUp(
						$elm$json$Json$Decode$succeed($author$project$Msg$MouseUp))
					])) : $elm$browser$Browser$Events$onMouseDown(
				$elm$json$Json$Decode$succeed($author$project$Msg$MouseDown)),
				model.enableKey ? $elm$browser$Browser$Events$onKeyDown($author$project$Subscriptions$keyDecoder1) : $elm$browser$Browser$Events$onKeyUp(
				$elm$json$Json$Decode$succeed($author$project$Msg$KeyUp))
			]));
};
var $author$project$Types$Play = {$: 'Play'};
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $ianmackenzie$elm_units$Quantity$clamp = F3(
	function (_v0, _v1, _v2) {
		var lower = _v0.a;
		var upper = _v1.a;
		var value = _v2.a;
		return (_Utils_cmp(lower, upper) < 1) ? $ianmackenzie$elm_units$Quantity$Quantity(
			A3($elm$core$Basics$clamp, lower, upper, value)) : $ianmackenzie$elm_units$Quantity$Quantity(
			A3($elm$core$Basics$clamp, upper, lower, value));
	});
var $author$project$Types$LoseFadeOut = F2(
	function (a, b) {
		return {$: 'LoseFadeOut', a: a, b: b};
	});
var $author$project$Types$PrePreGame = F2(
	function (a, b) {
		return {$: 'PrePreGame', a: a, b: b};
	});
var $author$project$Types$StartFadeIn = F2(
	function (a, b) {
		return {$: 'StartFadeIn', a: a, b: b};
	});
var $author$project$Types$WinFadeOut = F3(
	function (a, b, c) {
		return {$: 'WinFadeOut', a: a, b: b, c: c};
	});
var $author$project$Types$Interlude = F5(
	function (a, b, c, d, e) {
		return {$: 'Interlude', a: a, b: b, c: c, d: d, e: e};
	});
var $author$project$Types$Reversed = {$: 'Reversed'};
var $ianmackenzie$elm_geometry$Point3d$along = F2(
	function (_v0, _v1) {
		var axis = _v0.a;
		var distance = _v1.a;
		var _v2 = axis.originPoint;
		var p0 = _v2.a;
		var _v3 = axis.direction;
		var d = _v3.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
			{x: p0.x + (distance * d.x), y: p0.y + (distance * d.y), z: p0.z + (distance * d.z)});
	});
var $ianmackenzie$elm_geometry$Point3d$distanceFrom = F2(
	function (_v0, _v1) {
		var p1 = _v0.a;
		var p2 = _v1.a;
		var deltaZ = p2.z - p1.z;
		var deltaY = p2.y - p1.y;
		var deltaX = p2.x - p1.x;
		var largestComponent = A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(deltaX),
			A2(
				$elm$core$Basics$max,
				$elm$core$Basics$abs(deltaY),
				$elm$core$Basics$abs(deltaZ)));
		if (!largestComponent) {
			return $ianmackenzie$elm_units$Quantity$zero;
		} else {
			var scaledZ = deltaZ / largestComponent;
			var scaledY = deltaY / largestComponent;
			var scaledX = deltaX / largestComponent;
			var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
			return $ianmackenzie$elm_units$Quantity$Quantity(scaledLength * largestComponent);
		}
	});
var $ianmackenzie$elm_geometry$Axis3d$withDirection = F2(
	function (givenDirection, givenPoint) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Axis3d(
			{direction: givenDirection, originPoint: givenPoint});
	});
var $author$project$Update$ifNextStepAvailable = F3(
	function (block, dir, model) {
		if (_Utils_eq(dir, $author$project$Types$R)) {
			var pickText = F2(
				function (text3d, list) {
					return _Utils_eq(text3d.time, -2) ? list : _Utils_ap(list, text3d.wall);
				});
			var texts3d = _Utils_eq(model.world, $author$project$Types$Normal) ? A3($elm$core$List$foldl, pickText, _List_Nil, model.texts3dRev) : A3($elm$core$List$foldl, pickText, _List_Nil, model.texts3d);
			var anchor = block.center;
			var helper = function (cube) {
				return _Utils_eq(cube.center, anchor);
			};
			return !A2($elm$core$List$any, helper, texts3d);
		} else {
			var pickText = F2(
				function (text3d, list) {
					return _Utils_eq(text3d.time, -2) ? list : _Utils_ap(list, text3d.wall);
				});
			var texts3d = _Utils_eq(model.world, $author$project$Types$Normal) ? A3($elm$core$List$foldl, pickText, _List_Nil, model.texts3d) : A3($elm$core$List$foldl, pickText, _List_Nil, model.texts3dRev);
			var object = _Utils_ap(
				model.actives,
				_Utils_ap(
					model.nactives,
					_Utils_ap(
						model.wall,
						_Utils_ap(
							texts3d,
							_Utils_ap(
								_List_fromArray(
									[model.self]),
								model.cars)))));
			var anchor = block.center;
			var horizontalAxis = function () {
				switch (dir.$) {
					case 'Up':
						return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$negativeX, anchor);
					case 'Down':
						return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$positiveX, anchor);
					case 'Left':
						return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$negativeY, anchor);
					default:
						return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$positiveY, anchor);
				}
			}();
			var exPoint = A2(
				$ianmackenzie$elm_geometry$Point3d$along,
				horizontalAxis,
				$ianmackenzie$elm_units$Length$meters(2));
			var helper = function (cube) {
				return A2(
					$ianmackenzie$elm_units$Quantity$lessThanOrEqualTo,
					$ianmackenzie$elm_units$Length$meters(1.99),
					A2($ianmackenzie$elm_geometry$Point3d$distanceFrom, exPoint, cube.center)) && A2(
					$ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo,
					$ianmackenzie$elm_units$Length$meters(0),
					A2($ianmackenzie$elm_geometry$Point3d$distanceFrom, exPoint, cube.center));
			};
			return !A2($elm$core$List$any, helper, object);
		}
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Ports$playSound = _Platform_outgoingPort('playSound', $elm$json$Json$Encode$string);
var $author$project$Update$checkReverse = function (model) {
	return (((model.level >= 3) || (!model.level)) && (_Utils_eq(model.level3Lock, -1) && ((model.level <= 5) && (_Utils_eq(model.event, $elm$core$Maybe$Nothing) && (A3($author$project$Update$ifNextStepAvailable, model.self, $author$project$Types$R, model) && (_Utils_cmp(model.reverseTimer + 60, model.time) < 1)))))) ? _Utils_Tuple2(
		_Utils_update(
			model,
			{
				enableKey: false,
				event: $elm$core$Maybe$Nothing,
				reverseTimer: model.time,
				world: _Utils_eq(model.world, $author$project$Types$Normal) ? $author$project$Types$Reversed : $author$project$Types$Normal
			}),
		$author$project$Ports$playSound('reverse')) : (((model.level === 3) && (model.level3Lock >= 0)) ? _Utils_Tuple2(
		_Utils_update(
			model,
			{
				enableKey: false,
				event: $elm$core$Maybe$Nothing,
				gameStatus: A5($author$project$Types$Interlude, 0, 1200, model.camera.elevation, model.camera.distance, model.camera.azimuth),
				reverseTimer: model.time
			}),
		$author$project$Ports$playSound('reverse_long')) : _Utils_Tuple2(
		_Utils_update(
			model,
			{enableKey: false}),
		$elm$core$Platform$Cmd$none));
};
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Types$playerCameraDistance = $ianmackenzie$elm_units$Length$meters(20);
var $author$project$Types$Clock = {$: 'Clock'};
var $author$project$Level1$Model$actives = function () {
	var p9 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 13, 1);
	var p8 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 31, 1);
	var p7 = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 11, 1);
	var p6 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, -5, 1);
	var p5 = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, -3, 1);
	var p4 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 1, 1);
	var p3 = A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -1, 1);
	var p2 = A3($ianmackenzie$elm_geometry$Point3d$meters, 5, -9, 1);
	var p15 = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 33, 1);
	var p14 = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 25, 1);
	var p13 = A3($ianmackenzie$elm_geometry$Point3d$meters, 7, 15, 1);
	var p12 = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 7, 1);
	var p11 = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 1, 1);
	var p10 = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 13, 1);
	var p1 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, -15, 1);
	var blocksUp = A2(
		$elm$core$List$map,
		function (center) {
			return A4(
				$author$project$Types$buildColorBlock,
				center,
				A3($avh4$elm_color$Color$rgb255, 187, 231, 231),
				$elm$core$Maybe$Nothing,
				$author$project$Types$Up);
		},
		_List_fromArray(
			[p10, p12, p14]));
	var blocksLeft = A2(
		$elm$core$List$map,
		function (center) {
			return A4(
				$author$project$Types$buildColorBlock,
				center,
				A3($avh4$elm_color$Color$rgb255, 139, 198, 198),
				$elm$core$Maybe$Nothing,
				$author$project$Types$Left);
		},
		_List_fromArray(
			[p8, p9, p13]));
	var blocksG = A2(
		$elm$core$List$map,
		function (center) {
			return A4(
				$author$project$Types$buildColorBlock,
				center,
				A3($avh4$elm_color$Color$rgb255, 172, 215, 216),
				$elm$core$Maybe$Nothing,
				$author$project$Types$G);
		},
		_List_fromArray(
			[p1, p2, p3, p4, p15]));
	var blocksClock = A2(
		$elm$core$List$map,
		function (center) {
			return A4(
				$author$project$Types$buildColorBlock,
				center,
				A3($avh4$elm_color$Color$rgb255, 172, 215, 216),
				$elm$core$Maybe$Nothing,
				$author$project$Types$Clock);
		},
		_List_fromArray(
			[p5, p6, p7]));
	var blocks = _Utils_ap(
		blocksG,
		_Utils_ap(
			blocksLeft,
			_Utils_ap(blocksClock, blocksUp)));
	return blocks;
}();
var $avh4$elm_color$Color$black = A4($avh4$elm_color$Color$RgbaSpace, 0 / 255, 0 / 255, 0 / 255, 1.0);
var $author$project$Level4$Model$buildLine = F4(
	function (dir, num, x, y) {
		var blocks = function () {
			switch (dir) {
				case 'hor':
					return A2(
						$elm$core$List$map,
						function (point) {
							return A3($ianmackenzie$elm_geometry$Point3d$meters, (x + (2 * point)) - 2, y, 1);
						},
						A2($elm$core$List$range, 1, num));
				case 'ver':
					return A2(
						$elm$core$List$map,
						function (point) {
							return A3($ianmackenzie$elm_geometry$Point3d$meters, x, (y + (2 * point)) - 2, 1);
						},
						A2($elm$core$List$range, 1, num));
				default:
					return _List_Nil;
			}
		}();
		return A2(
			$elm$core$List$map,
			function (center) {
				return A4($author$project$Types$buildColorBlock, center, $avh4$elm_color$Color$black, $elm$core$Maybe$Nothing, $author$project$Types$R);
			},
			blocks);
	});
var $author$project$Level1$Model$boundary = function () {
	var l9 = A4($author$project$Level4$Model$buildLine, 'ver', 4, 9, 17);
	var l8 = A4($author$project$Level4$Model$buildLine, 'ver', 2, 9, 1);
	var l7 = A4($author$project$Level4$Model$buildLine, 'ver', 3, -9, 29);
	var l6 = A4($author$project$Level4$Model$buildLine, 'ver', 2, -9, 17);
	var l5 = A4($author$project$Level4$Model$buildLine, 'ver', 2, -9, -3);
	var l4 = A4($author$project$Level4$Model$buildLine, 'ver', 2, 9, -21);
	var l3 = A4($author$project$Level4$Model$buildLine, 'hor', 1, 9, -35);
	var l2 = A4($author$project$Level4$Model$buildLine, 'hor', 17, -25, -37);
	var l12 = A4($author$project$Level4$Model$buildLine, 'hor', 3, -7, 35);
	var l11 = A4($author$project$Level4$Model$buildLine, 'hor', 3, 3, 35);
	var l10 = A4($author$project$Level4$Model$buildLine, 'ver', 1, 9, 33);
	var l1 = A4($author$project$Level4$Model$buildLine, 'hor', 9, -25, -19);
	return $elm$core$List$concat(
		_List_fromArray(
			[l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12]));
}();
var $author$project$Level1$Model$initText = {
	content: '',
	event: {duration: 0, init: 0, name: $author$project$Types$Noop},
	left: 0,
	opacity: 1,
	size: 0,
	top: 0
};
var $author$project$Level1$Model$nactives = function () {
	var blocks = _List_Nil;
	return blocks;
}();
var $author$project$Types$Point = F3(
	function (x, y, z) {
		return {x: x, y: y, z: z};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow = F2(
	function (givenMaterial, givenBlock) {
		return A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$block, true, true, givenMaterial, givenBlock);
	});
var $avh4$elm_color$Color$gray = A4($avh4$elm_color$Color$RgbaSpace, 211 / 255, 215 / 255, 207 / 255, 1.0);
var $ianmackenzie$elm_3d_scene$Scene3d$Types$LambertianMaterial = F3(
	function (a, b, c) {
		return {$: 'LambertianMaterial', a: a, b: b, c: c};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$VerticalNormal = {$: 'VerticalNormal'};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$LinearRgb = function (a) {
	return {$: 'LinearRgb', a: a};
};
var $elm$core$Basics$pow = _Basics_pow;
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$inverseGamma = function (u) {
	return A3(
		$elm$core$Basics$clamp,
		0,
		1,
		(u <= 0.04045) ? (u / 12.92) : A2($elm$core$Basics$pow, (u + 0.055) / 1.055, 2.4));
};
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$colorToLinearRgb = function (color) {
	var _v0 = $avh4$elm_color$Color$toRgba(color);
	var red = _v0.red;
	var green = _v0.green;
	var blue = _v0.blue;
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$LinearRgb(
		A3(
			$elm_explorations$linear_algebra$Math$Vector3$vec3,
			$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$inverseGamma(red),
			$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$inverseGamma(green),
			$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$inverseGamma(blue)));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Material$matte = function (materialColor) {
	return A3(
		$ianmackenzie$elm_3d_scene$Scene3d$Types$LambertianMaterial,
		$ianmackenzie$elm_3d_scene$Scene3d$Types$UseMeshUvs,
		$ianmackenzie$elm_3d_scene$Scene3d$Types$Constant(
			$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$colorToLinearRgb(materialColor)),
		$ianmackenzie$elm_3d_scene$Scene3d$Types$Constant($ianmackenzie$elm_3d_scene$Scene3d$Types$VerticalNormal));
};
var $author$project$Level1$Model$buildStore = function (center) {
	var z = center.z;
	var y = center.y;
	var x = center.x;
	var block7 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 8, y - 6, z),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 10, y + 8, z + 8));
	var block6 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 10, y - 6, z),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 8, y + 6, z + 8));
	var block5 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 10, y + 6, z),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 10, y + 8, z + 8));
	var block4 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 2, y - 6, z + 4),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 2, y - 4, z + 8));
	var block3 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 10, y - 6, z),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 2, y - 4, z + 8));
	var block2 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 10, y - 6, z),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 2, y - 4, z + 8));
	var block1 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 10, y - 6, z + 7),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 10, y + 6, z + 8));
	var blocks = A2(
		$elm$core$List$map,
		function (block) {
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow,
				$ianmackenzie$elm_3d_scene$Scene3d$Material$matte($avh4$elm_color$Color$gray),
				block);
		},
		_List_fromArray(
			[block1, block2, block3, block4, block5, block6, block7]));
	return A3(
		$elm$core$List$foldr,
		$elm$core$List$append,
		_List_Nil,
		_List_fromArray(
			[blocks]));
};
var $author$project$Level1$Model$settings = function () {
	var text1 = A4(
		$author$project$Types$text3d,
		'store',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -3.5, 33.3, 5),
		0.25,
		{a: 270, b: 0, c: 0});
	var tallWall = A2(
		$ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow,
		$ianmackenzie$elm_3d_scene$Scene3d$Material$color($avh4$elm_color$Color$black),
		A2(
			$ianmackenzie$elm_geometry$Block3d$from,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -44, -20, 0),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -8, -19, 8)));
	var store = $author$project$Level1$Model$buildStore(
		A3($author$project$Types$Point, 0, 40, 0));
	var lamps = _List_fromArray(
		[
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -8, -20, 0),
			0),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -8, 0, 0),
			0),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -8, 20, 0),
			0),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 8, -20, 0),
			180),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 8, 0, 0),
			180),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 8, 20, 0),
			180),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 8, -40, 0),
			180),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -8, -40, 0),
			0),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 8, -60, 0),
			180),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -8, -60, 0),
			0)
		]);
	return $ianmackenzie$elm_3d_scene$Scene3d$group(
		_Utils_ap(
			store,
			_Utils_ap(
				lamps,
				_List_fromArray(
					[text1, tallWall]))));
}();
var $author$project$Level1$Model$texts3d = _List_fromArray(
	[
		A7(
		$author$project$Types$buildText3d,
		'you need food',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -25, -36, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -25, -35, 1),
		0.2,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'nobody hurts',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -8, -37, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, -37, 1),
		0.2,
		90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'coward?',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 6, -37, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, -37, 1),
		0.3,
		90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'you see it',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, -23, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, -23, 1),
		0.2,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'they don\'t bite',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, -1, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, -1, 1),
		0.2,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'you are dying',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, 1, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, 1, 1),
		0.2,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'you have to',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, -16, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, -17, 1),
		0.2,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'almost',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, 22, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, 21, 1),
		0.2,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'be brave',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, 14, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, 13, 1),
		0.2,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'away!',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -17, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -17, 1),
		0.2,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'stranger',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -2, -11, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -1, -11, 1),
		0.2,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'leave me alone',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, 6, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, 7, 1),
		0.2,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'nearly',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, 31, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, 31, 1),
		0.2,
		180,
		$avh4$elm_color$Color$white,
		-1)
	]);
var $author$project$Level1$Model$texts3dRev = _List_Nil;
var $author$project$Level1$Model$init = function () {
	var mapSize = A2($author$project$Types$GroundSize, 20, 15);
	var initWall = $author$project$Level1$Model$boundary;
	var initScene = {
		background: A3($avh4$elm_color$Color$rgb255, 10, 10, 10),
		luminance: 5000,
		renderOpt: 20
	};
	var initGoal = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 33, 1);
	var initCenter = A3($ianmackenzie$elm_geometry$Point3d$meters, -19, -29, 1);
	var initBlock = $author$project$Types$buildBlock(initCenter);
	var groundSize = A2($author$project$Types$GroundSize, 50, 50);
	return _Utils_Tuple2(
		{
			actives: $author$project$Level1$Model$actives,
			camera: {
				azimuth: $ianmackenzie$elm_units$Angle$degrees(0),
				distance: $author$project$Types$playerCameraDistance,
				elevation: $ianmackenzie$elm_units$Angle$degrees(30),
				focalPoint: initCenter
			},
			carPeriod: 50,
			cars: _List_Nil,
			enableKey: true,
			enableMouse: false,
			event: $elm$core$Maybe$Nothing,
			frameTime: 0,
			gameStatus: A2($author$project$Types$PreGame, 1, 600),
			goal: {center: initGoal},
			godMode: false,
			groundSize: groundSize,
			level: 1,
			level3Lock: -1,
			level6Lock: false,
			mapSize: mapSize,
			nactives: $author$project$Level1$Model$nactives,
			playerRound: true,
			reverseTimer: 0,
			scene: initScene,
			screen: A2($author$project$Types$ScreenSize, $ianmackenzie$elm_units$Quantity$zero, $ianmackenzie$elm_units$Quantity$zero),
			self: A5($author$project$Types$Block, initBlock, initCenter, $avh4$elm_color$Color$white, $elm$core$Maybe$Nothing, $author$project$Types$R),
			settings: $author$project$Level1$Model$settings,
			text: $author$project$Level1$Model$initText,
			texts3d: $author$project$Level1$Model$texts3d,
			texts3dRev: $author$project$Level1$Model$texts3dRev,
			time: 0,
			wall: initWall,
			world: $author$project$Types$Normal
		},
		$author$project$Ports$playSound('bgm_1'));
}();
var $author$project$Level2$Model$actives = function () {
	var p9 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, -13, 1);
	var p8 = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, -7, 1);
	var p7 = A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -5, 1);
	var p6 = A3($ianmackenzie$elm_geometry$Point3d$meters, -1, 13, 1);
	var p5 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 13, 1);
	var p4 = A3($ianmackenzie$elm_geometry$Point3d$meters, -5, 13, 1);
	var p3 = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, -19, 1);
	var p2 = A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -13, 1);
	var p13 = A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 19, 1);
	var p12 = A3($ianmackenzie$elm_geometry$Point3d$meters, -5, 7, 1);
	var p11 = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 1, 1);
	var p10 = A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 1, 1);
	var p1 = A3($ianmackenzie$elm_geometry$Point3d$meters, 5, -19, 1);
	var blocks = A2(
		$elm$core$List$map,
		function (center) {
			return A4($author$project$Types$buildColorBlock, center, $avh4$elm_color$Color$lightGray, $elm$core$Maybe$Nothing, $author$project$Types$Up);
		},
		_List_Nil);
	return blocks;
}();
var $author$project$Level2$Model$initText = {
	content: '',
	event: {duration: 0, init: 0, name: $author$project$Types$Noop},
	left: 0,
	opacity: 1,
	size: 0,
	top: 0
};
var $author$project$Level2$Model$nactives = function () {
	var blocks = _List_Nil;
	return blocks;
}();
var $author$project$Level2$Model$settings = function () {
	var lamps = _List_fromArray(
		[
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 12, 12, 0),
			225),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 12, -12, 0),
			135),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -12, 12, 0),
			315),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -12, -12, 0),
			45)
		]);
	return $ianmackenzie$elm_3d_scene$Scene3d$group(lamps);
}();
var $author$project$Level2$Model$texts3d = _List_fromArray(
	[
		A7(
		$author$project$Types$buildText3d,
		'keep busy',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, 11, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, 11, 1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'be positive',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 11, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 11, 1),
		0.08,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'work harder',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, 11, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, 11, 1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\'t be trapped',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, 3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, 3, 1),
		0.09,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'keep busy',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -11, 7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -11, 7, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'keep moving',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -11, -1, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -11, -1, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'move',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, 9, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, 9, 1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\'t be trapped',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -1, 9, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -1, 9, 1),
		0.09,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\' stop',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, 9, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, 9, 1),
		0.08,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\' stop',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, 7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, 7, 1),
		0.08,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'move',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 7, 1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\' stop',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 7, 1),
		0.08,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'keep busy',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, 3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, 3, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'keep busy',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, 3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, 3, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\'t be trapped',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, 5, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, 5, 1),
		0.09,
		180,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'work harder',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, 5, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, 5, 1),
		0.1,
		180,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'move',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 5, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 5, 1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'keep moving',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 5, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 5, 1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\' stop',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, 3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, 3, 1),
		0.08,
		180,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'be positive',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 3, 1),
		0.08,
		180,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'keep busy',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -1, 3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -1, 3, 1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'move',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 1, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 1, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'move',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 1, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 1, 1),
		0.1,
		180,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'work harder',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 1, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 1, 1),
		0.1,
		180,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\' stop',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, 1, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, 1, 1),
		0.08,
		-90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'keep moving',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, -3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, -3, 1),
		0.1,
		90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\' stop',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -1, -5, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -1, -5, 1),
		0.08,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'be positive',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -3, -5, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -3, -5, 1),
		0.08,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'move',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -3, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\'t be trapped',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, -9, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, -9, 1),
		0.09,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'work harder',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, -7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, -7, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'keep busy',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, -5, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, -5, 1),
		0.1,
		90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'move',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, -5, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, -5, 1),
		0.1,
		90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'keep moving',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -11, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -11, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\' stop',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -11, -7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -11, -7, 1),
		0.08,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\' stop',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, -7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, -7, 1),
		0.08,
		180,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'move',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, -7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, -7, 1),
		0.1,
		180,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'be positive',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, -7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, -7, 1),
		0.08,
		90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'move',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 1, -7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 1, -7, 1),
		0.1,
		90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'move',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -3, -9, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -3, -9, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'don\'t be trapped',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, -9, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, -9, 1),
		0.09,
		90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'move',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, -9, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, -9, 1),
		0.1,
		90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'work harder',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, -11, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, -11, 1),
		0.1,
		90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'keep busy',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 1, -11, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 1, -11, 1),
		0.1,
		90,
		$avh4$elm_color$Color$white,
		-2),
		A7(
		$author$project$Types$buildText3d,
		'be positive',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, -11, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, -11, 1),
		0.08,
		90,
		$avh4$elm_color$Color$white,
		-2)
	]);
var $author$project$Level2$Model$texts3dRev = _List_Nil;
var $author$project$Level2$Model$init = function () {
	var mapSize = A2($author$project$Types$GroundSize, 5, 5);
	var initWall = $author$project$Types$buildWall(mapSize);
	var initScene = {background: $avh4$elm_color$Color$white, luminance: 5000, renderOpt: 20};
	var initGoal = A3($ianmackenzie$elm_geometry$Point3d$meters, -1, 1, 100);
	var initCenter = A3($ianmackenzie$elm_geometry$Point3d$meters, -1, 1, 1);
	var initBlock = $author$project$Types$buildBlock(initCenter);
	var groundSize = A2($author$project$Types$GroundSize, 20, 20);
	return _Utils_Tuple2(
		{
			actives: $author$project$Level2$Model$actives,
			camera: {
				azimuth: $ianmackenzie$elm_units$Angle$degrees(90),
				distance: $author$project$Types$playerCameraDistance,
				elevation: $ianmackenzie$elm_units$Angle$degrees(30),
				focalPoint: initCenter
			},
			carPeriod: 50,
			cars: _List_Nil,
			enableKey: true,
			enableMouse: false,
			event: $elm$core$Maybe$Nothing,
			frameTime: 0,
			gameStatus: A2($author$project$Types$PrePreGame, 0, 200),
			goal: {center: initGoal},
			godMode: false,
			groundSize: groundSize,
			level: 2,
			level3Lock: -1,
			level6Lock: false,
			mapSize: mapSize,
			nactives: $author$project$Level2$Model$nactives,
			playerRound: true,
			reverseTimer: 0,
			scene: initScene,
			screen: A2($author$project$Types$ScreenSize, $ianmackenzie$elm_units$Quantity$zero, $ianmackenzie$elm_units$Quantity$zero),
			self: A5($author$project$Types$Block, initBlock, initCenter, $avh4$elm_color$Color$white, $elm$core$Maybe$Nothing, $author$project$Types$R),
			settings: $author$project$Level2$Model$settings,
			text: $author$project$Level2$Model$initText,
			texts3d: $author$project$Level2$Model$texts3d,
			texts3dRev: $author$project$Level2$Model$texts3dRev,
			time: 0,
			wall: initWall,
			world: $author$project$Types$Normal
		},
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					$author$project$Ports$playSound('reverse_long'),
					A2(
					$elm$core$Task$perform,
					function (_v0) {
						var viewport = _v0.viewport;
						return A2(
							$author$project$Msg$Resize,
							$ianmackenzie$elm_units$Pixels$int(
								$elm$core$Basics$round(viewport.width)),
							$ianmackenzie$elm_units$Pixels$int(
								$elm$core$Basics$round(viewport.height)));
					},
					$elm$browser$Browser$Dom$getViewport)
				])));
}();
var $author$project$Level3$Model$actives = function () {
	var p9 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, -13, 1);
	var p8 = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, -7, 1);
	var p7 = A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -5, 1);
	var p6 = A3($ianmackenzie$elm_geometry$Point3d$meters, -1, 13, 1);
	var p5 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 13, 1);
	var p4 = A3($ianmackenzie$elm_geometry$Point3d$meters, -5, 13, 1);
	var p3 = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, -19, 1);
	var p2 = A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -13, 1);
	var p13 = A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 19, 1);
	var p12 = A3($ianmackenzie$elm_geometry$Point3d$meters, -5, 7, 1);
	var p11 = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 1, 1);
	var p10 = A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 1, 1);
	var p1 = A3($ianmackenzie$elm_geometry$Point3d$meters, 5, -19, 1);
	var blocks = A2(
		$elm$core$List$map,
		function (center) {
			return A4($author$project$Types$buildColorBlock, center, $avh4$elm_color$Color$lightGray, $elm$core$Maybe$Nothing, $author$project$Types$Up);
		},
		_List_Nil);
	return blocks;
}();
var $author$project$Level3$Model$cars = function () {
	var blocks = _List_Nil;
	return blocks;
}();
var $author$project$Level3$Model$initText = {
	content: '',
	event: {duration: 0, init: 0, name: $author$project$Types$Noop},
	left: 0,
	opacity: 1,
	size: 0,
	top: 0
};
var $author$project$Level3$Model$nactives = function () {
	var blocks = _List_Nil;
	return blocks;
}();
var $author$project$Types$road = F3(
	function (point1, point2, color) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$block,
			$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(color),
			A2($ianmackenzie$elm_geometry$Block3d$from, point1, point2));
	});
var $author$project$Level3$Model$settings = function () {
	var roads = _List_fromArray(
		[
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 10, 7.6, 0),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -10, 10.4, 0.01),
			A3($avh4$elm_color$Color$rgb255, 30, 30, 30)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 10, 13.6, 0),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -10, 16.4, 0.01),
			A3($avh4$elm_color$Color$rgb255, 30, 30, 30)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 10, -7.6, 0),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -10, -10.4, 0.01),
			A3($avh4$elm_color$Color$rgb255, 30, 30, 30)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 10, -13.6, 0),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -10, -16.4, 0.01),
			A3($avh4$elm_color$Color$rgb255, 30, 30, 30)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, 7.9, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, 8.5, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, 9.1, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, 9.7, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, 10.3, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, 10.9, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, 11.5, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, 12.1, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, 12.7, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, 13.3, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, 13.9, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, 14.5, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, 15.1, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, 15.7, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, -7.9, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, -8.5, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, -9.1, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, -9.7, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, -10.3, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, -10.9, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, -11.5, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, -12.1, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, -12.7, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, -13.3, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, -13.9, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, -14.5, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255)),
			A3(
			$author$project$Types$road,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, -15.1, 0.01),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -2, -15.7, 0.02),
			A3($avh4$elm_color$Color$rgb255, 255, 255, 255))
		]);
	var lamps = _List_fromArray(
		[
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 6, 7, 0),
			90),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 6, -7, 0),
			-90),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -6, 7, 0),
			90),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -6, -7, 0),
			-90),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 6, 17, 0),
			-90),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 6, -17, 0),
			90),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -6, 17, 0),
			-90),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -6, -17, 0),
			90)
		]);
	return $ianmackenzie$elm_3d_scene$Scene3d$group(
		_Utils_ap(lamps, roads));
}();
var $author$project$Level3$Model$texts3d = _List_fromArray(
	[
		A7(
		$author$project$Types$buildText3d,
		'help me out',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -11, -5, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -11, -5, 1),
		0.15,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'is this a nightmare?',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, 7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, 7, 1),
		0.13,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'stop',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 4, 7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 7, 1),
		0.15,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'they hate you',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -10, 7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, 7, 1),
		0.15,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'idiot',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -1, -7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -1, -7, 1),
		0.15,
		90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'why',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, -7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, -7, 1),
		0.15,
		90,
		$avh4$elm_color$Color$white,
		-1)
	]);
var $author$project$Level3$Model$texts3dRev = _List_fromArray(
	[
		A7(
		$author$project$Types$buildText3d,
		'i think i can do it',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -11, -11, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -11, -11, 1),
		0.2,
		0,
		$avh4$elm_color$Color$white,
		-1)
	]);
var $author$project$Level3$Model$init = function () {
	var mapSize = A2($author$project$Types$GroundSize, 10, 5);
	var initWall = $author$project$Types$buildWall(mapSize);
	var initScene = {
		background: A3($avh4$elm_color$Color$rgb255, 50, 50, 50),
		luminance: 5000,
		renderOpt: 20
	};
	var initGoal = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 19, 1);
	var initCenter = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, -1, 1);
	var initBlock = $author$project$Types$buildBlock(initCenter);
	var groundSize = A2($author$project$Types$GroundSize, 50, 50);
	return _Utils_Tuple2(
		{
			actives: $author$project$Level3$Model$actives,
			camera: {
				azimuth: $ianmackenzie$elm_units$Quantity$zero,
				distance: $ianmackenzie$elm_units$Length$meters(30),
				elevation: $ianmackenzie$elm_units$Angle$degrees(30),
				focalPoint: initCenter
			},
			carPeriod: 60,
			cars: $author$project$Level3$Model$cars,
			enableKey: true,
			enableMouse: false,
			event: $elm$core$Maybe$Nothing,
			frameTime: 0,
			gameStatus: A2($author$project$Types$PreGame, 1, 600),
			goal: {center: initGoal},
			godMode: false,
			groundSize: groundSize,
			level: 3,
			level3Lock: 0,
			level6Lock: false,
			mapSize: mapSize,
			nactives: $author$project$Level3$Model$nactives,
			playerRound: true,
			reverseTimer: 0,
			scene: initScene,
			screen: A2($author$project$Types$ScreenSize, $ianmackenzie$elm_units$Quantity$zero, $ianmackenzie$elm_units$Quantity$zero),
			self: A5($author$project$Types$Block, initBlock, initCenter, $avh4$elm_color$Color$white, $elm$core$Maybe$Nothing, $author$project$Types$R),
			settings: $author$project$Level3$Model$settings,
			text: $author$project$Level3$Model$initText,
			texts3d: $author$project$Level3$Model$texts3d,
			texts3dRev: $author$project$Level3$Model$texts3dRev,
			time: 0,
			wall: initWall,
			world: $author$project$Types$Normal
		},
		$author$project$Ports$playSound('bgm_3'));
}();
var $author$project$Level4$Model$actives = function () {
	var blocks = A2(
		$elm$core$List$map,
		function (center) {
			return A4($author$project$Types$buildColorBlock, center, $avh4$elm_color$Color$lightGray, $elm$core$Maybe$Nothing, $author$project$Types$Up);
		},
		_List_Nil);
	return blocks;
}();
var $author$project$Level4$Model$initText = {
	content: '',
	event: {duration: 0, init: 0, name: $author$project$Types$Noop},
	left: 0,
	opacity: 1,
	size: 0,
	top: 0
};
var $author$project$Level4$Model$initWall_4 = function () {
	var l9 = A4($author$project$Level4$Model$buildLine, 'hor', 2, 15, 17);
	var l8 = A4($author$project$Level4$Model$buildLine, 'hor', 7, 5, 13);
	var l7 = A4($author$project$Level4$Model$buildLine, 'hor', 14, 5, 3);
	var l6 = A4($author$project$Level4$Model$buildLine, 'hor', 10, 13, 7);
	var l5 = A4($author$project$Level4$Model$buildLine, 'hor', 5, 23, 13);
	var l4 = A4($author$project$Level4$Model$buildLine, 'hor', 5, 23, 19);
	var l3 = A4($author$project$Level4$Model$buildLine, 'hor', 6, 17, 23);
	var l20 = A4($author$project$Level4$Model$buildLine, 'ver', 1, 31, 1);
	var l2 = A4($author$project$Level4$Model$buildLine, 'hor', 17, -1, 27);
	var l19 = A4($author$project$Level4$Model$buildLine, 'ver', 5, 61, -1);
	var l18 = A4($author$project$Level4$Model$buildLine, 'hor', 14, 33, 7);
	var l17 = A4($author$project$Level4$Model$buildLine, 'hor', 14, 33, -1);
	var l16 = A4($author$project$Level4$Model$buildLine, 'hor', 3, -1, 1);
	var l15 = A4($author$project$Level4$Model$buildLine, 'ver', 5, 13, 13);
	var l14 = A4($author$project$Level4$Model$buildLine, 'ver', 6, 5, 3);
	var l13 = A4($author$project$Level4$Model$buildLine, 'hor', 1, 23, 21);
	var l12 = A4($author$project$Level4$Model$buildLine, 'hor', 2, 3, 23);
	var l11 = A4($author$project$Level4$Model$buildLine, 'hor', 2, 3, 21);
	var l10 = A4($author$project$Level4$Model$buildLine, 'hor', 3, 1, 17);
	var l1 = A4($author$project$Level4$Model$buildLine, 'ver', 13, -1, 3);
	return $elm$core$List$concat(
		_List_fromArray(
			[l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20]));
}();
var $avh4$elm_color$Color$darkCharcoal = A4($avh4$elm_color$Color$RgbaSpace, 46 / 255, 52 / 255, 54 / 255, 1.0);
var $ianmackenzie$elm_geometry$Vector3d$fromMeters = function (givenComponents) {
	return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(givenComponents);
};
var $author$project$Level4$Model$buildBrick = F4(
	function (dir, num, x, y) {
		var comp = 1;
		var vec = function () {
			switch (dir) {
				case 'hor':
					return $ianmackenzie$elm_geometry$Vector3d$fromMeters(
						{x: comp * num, y: comp, z: comp});
				case 'ver':
					return $ianmackenzie$elm_geometry$Vector3d$fromMeters(
						{x: comp, y: comp * num, z: comp});
				default:
					return $ianmackenzie$elm_geometry$Vector3d$zero;
			}
		}();
		var center_y = function () {
			switch (dir) {
				case 'hor':
					return y;
				case 'ver':
					return (y + (comp * num)) - 1;
				default:
					return 0;
			}
		}();
		var center_x = function () {
			switch (dir) {
				case 'hor':
					return (x + (comp * num)) - 1;
				case 'ver':
					return x;
				default:
					return 0;
			}
		}();
		var center = A3($ianmackenzie$elm_geometry$Point3d$meters, center_x, center_y, 1);
		var v1 = A2($ianmackenzie$elm_geometry$Point3d$translateBy, vec, center);
		var v2 = A2(
			$ianmackenzie$elm_geometry$Point3d$translateBy,
			$ianmackenzie$elm_geometry$Vector3d$reverse(vec),
			center);
		var _this = A2($ianmackenzie$elm_geometry$Block3d$from, v1, v2);
		var event = $elm$core$Maybe$Nothing;
		var dir_ = $author$project$Types$R;
		var color = $avh4$elm_color$Color$darkCharcoal;
		return A5($author$project$Types$Block, _this, center, color, event, dir_);
	});
var $author$project$Level4$Model$maze = function () {
	var l9 = A4($author$project$Level4$Model$buildBrick, 'hor', 2, 15, 17);
	var l8 = A4($author$project$Level4$Model$buildBrick, 'hor', 7, 5, 13);
	var l7 = A4($author$project$Level4$Model$buildBrick, 'hor', 14, 5, 3);
	var l6 = A4($author$project$Level4$Model$buildBrick, 'hor', 10, 13, 7);
	var l5 = A4($author$project$Level4$Model$buildBrick, 'hor', 5, 23, 13);
	var l4 = A4($author$project$Level4$Model$buildBrick, 'hor', 5, 23, 19);
	var l3 = A4($author$project$Level4$Model$buildBrick, 'hor', 6, 17, 23);
	var l2 = A4($author$project$Level4$Model$buildBrick, 'hor', 17, -1, 27);
	var l16 = A4($author$project$Level4$Model$buildBrick, 'hor', 3, -1, 1);
	var l15 = A4($author$project$Level4$Model$buildBrick, 'ver', 5, 13, 13);
	var l14 = A4($author$project$Level4$Model$buildBrick, 'ver', 6, 5, 3);
	var l13 = A4($author$project$Level4$Model$buildBrick, 'hor', 1, 23, 21);
	var l12 = A4($author$project$Level4$Model$buildBrick, 'hor', 2, 3, 23);
	var l11 = A4($author$project$Level4$Model$buildBrick, 'hor', 2, 3, 21);
	var l10 = A4($author$project$Level4$Model$buildBrick, 'hor', 3, 1, 17);
	var l1 = A4($author$project$Level4$Model$buildBrick, 'ver', 13, -1, 3);
	return _List_fromArray(
		[l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16]);
}();
var $author$project$Level4$Model$nactives = function () {
	var maze_ = $author$project$Level4$Model$maze;
	var blocks = maze_;
	return blocks;
}();
var $author$project$Level4$Model$settings = function () {
	var lamp_ = _List_fromArray(
		[
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 63, 5, 0),
			180)
		]);
	var boy = _List_fromArray(
		[
			A2(
			$ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow,
			$ianmackenzie$elm_3d_scene$Scene3d$Material$color($avh4$elm_color$Color$white),
			$author$project$Types$buildBlock(
				A3($ianmackenzie$elm_geometry$Point3d$meters, 61, 5, 1)))
		]);
	return $ianmackenzie$elm_3d_scene$Scene3d$group(
		_Utils_ap(lamp_, boy));
}();
var $author$project$Level4$Model$texts3d = _List_fromArray(
	[
		A7(
		$author$project$Types$buildText3d,
		'stop',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, 17, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, 17, 1),
		0.2,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'you don\'t deserve',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, 25, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, 25, 1),
		0.07,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'you\'ll be hurt',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 27, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 25, 1),
		0.07,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'protect yourself',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 19, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 19, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'please not ',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 11, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 11, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'stop',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 17, 9, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 17, 9, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'i beg you',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, 7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, 7, 1),
		0.08,
		90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'you\'ll die',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 7, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'i can give you my loneliness,',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 37, 13, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 37, 13, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'my darkness,',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 41, 3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 41, 3, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'the hunger of my heart,',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 45, 13, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 45, 13, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'i am trying to bribe you with uncertainty,',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 49, 3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 49, 3, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'with danger, with defeat.',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 53, 15, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 53, 15, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1)
	]);
var $author$project$Level4$Model$texts3dRev = _List_fromArray(
	[
		A7(
		$author$project$Types$buildText3d,
		'you can',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, 23, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, 23, 1),
		0.15,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'try',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 25, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 25, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'just have a try',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 27, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 27, 1),
		0.07,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'It won\'t hurt much ',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 19, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 19, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'break it ',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 11, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 33, 11, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'try it',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 13, 9, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 13, 9, 1),
		0.06,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'try',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 17, 6, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 17, 5, 1),
		0.07,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'i can give you my loneliness,',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 37, 13, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 37, 13, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'my darkness,',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 41, 3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 41, 3, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'the hunger of my heart,',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 45, 13, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 45, 13, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'i am trying to bribe you with uncertainty,',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 49, 3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 49, 3, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'with danger, with defeat.',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 53, 15, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 53, 15, 1),
		0.06,
		180,
		$avh4$elm_color$Color$white,
		-1)
	]);
var $author$project$Level4$Model$init = function () {
	var mapSize = A2($author$project$Types$GroundSize, 50, 50);
	var initScene = {background: $avh4$elm_color$Color$white, luminance: 5000, renderOpt: 20};
	var initGoal = A3($ianmackenzie$elm_geometry$Point3d$meters, 59, 5, 1);
	var initCenter = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 3, 1);
	var initBlock = $author$project$Types$buildBlock(initCenter);
	var groundSize = A2($author$project$Types$GroundSize, 100, 100);
	return _Utils_Tuple2(
		{
			actives: $author$project$Level4$Model$actives,
			camera: {
				azimuth: $ianmackenzie$elm_units$Angle$degrees(-90),
				distance: $author$project$Types$playerCameraDistance,
				elevation: $ianmackenzie$elm_units$Angle$degrees(30),
				focalPoint: initCenter
			},
			carPeriod: 100,
			cars: _List_Nil,
			enableKey: true,
			enableMouse: false,
			event: $elm$core$Maybe$Nothing,
			frameTime: 0,
			gameStatus: A2($author$project$Types$PreGame, 1, 600),
			goal: {center: initGoal},
			godMode: false,
			groundSize: groundSize,
			level: 4,
			level3Lock: -1,
			level6Lock: false,
			mapSize: mapSize,
			nactives: $author$project$Level4$Model$nactives,
			playerRound: true,
			reverseTimer: 0,
			scene: initScene,
			screen: A2($author$project$Types$ScreenSize, $ianmackenzie$elm_units$Quantity$zero, $ianmackenzie$elm_units$Quantity$zero),
			self: A5($author$project$Types$Block, initBlock, initCenter, $avh4$elm_color$Color$white, $elm$core$Maybe$Nothing, $author$project$Types$R),
			settings: $author$project$Level4$Model$settings,
			text: $author$project$Level4$Model$initText,
			texts3d: $author$project$Level4$Model$texts3d,
			texts3dRev: $author$project$Level4$Model$texts3dRev,
			time: 0,
			wall: $author$project$Level4$Model$initWall_4,
			world: $author$project$Types$Normal
		},
		$author$project$Ports$playSound('bgm_4'));
}();
var $author$project$Level5$Model$actives = function () {
	var p9 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 19, 1);
	var p8 = A3($ianmackenzie$elm_geometry$Point3d$meters, 15, 5, 1);
	var p7 = A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 15, 1);
	var p6 = A3($ianmackenzie$elm_geometry$Point3d$meters, 19, -3, 1);
	var p5 = A3($ianmackenzie$elm_geometry$Point3d$meters, 19, -7, 1);
	var p4 = A3($ianmackenzie$elm_geometry$Point3d$meters, 5, -13, 1);
	var p3 = A3($ianmackenzie$elm_geometry$Point3d$meters, -1, -15, 1);
	var p2 = A3($ianmackenzie$elm_geometry$Point3d$meters, -7, -15, 1);
	var p18 = A3($ianmackenzie$elm_geometry$Point3d$meters, -11, 15, 1);
	var p17 = A3($ianmackenzie$elm_geometry$Point3d$meters, -9, 15, 1);
	var p16 = A3($ianmackenzie$elm_geometry$Point3d$meters, -7, 15, 1);
	var p15 = A3($ianmackenzie$elm_geometry$Point3d$meters, -5, 15, 1);
	var p14 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 15, 1);
	var p13 = A3($ianmackenzie$elm_geometry$Point3d$meters, -11, 19, 1);
	var p12 = A3($ianmackenzie$elm_geometry$Point3d$meters, -9, 19, 1);
	var p11 = A3($ianmackenzie$elm_geometry$Point3d$meters, -7, 19, 1);
	var p10 = A3($ianmackenzie$elm_geometry$Point3d$meters, -5, 19, 1);
	var p1 = A3($ianmackenzie$elm_geometry$Point3d$meters, -13, -13, 1);
	var blocks = A2(
		$elm$core$List$map,
		function (center) {
			return A4($author$project$Types$buildColorBlock, center, $avh4$elm_color$Color$lightGray, $elm$core$Maybe$Nothing, $author$project$Types$Up);
		},
		_List_fromArray(
			[p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18]));
	return blocks;
}();
var $avh4$elm_color$Color$darkGrey = A4($avh4$elm_color$Color$RgbaSpace, 186 / 255, 189 / 255, 182 / 255, 1.0);
var $author$project$Level5$Model$initText = {
	content: '',
	event: {duration: 0, init: 0, name: $author$project$Types$Noop},
	left: 0,
	opacity: 1,
	size: 0,
	top: 0
};
var $author$project$Level5$Model$nactives = function () {
	var blocks = _List_Nil;
	return blocks;
}();
var $author$project$Level5$Model$settings = function () {
	var lamps = _List_fromArray(
		[
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 20, 20, 0),
			225),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 20, -20, 0),
			135),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -20, 20, 0),
			315),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -20, -20, 0),
			45),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -6, -14, 0),
			270),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 10, -12, 0),
			270),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 16, 0, 0),
			0),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 10, 0),
			90)
		]);
	return $ianmackenzie$elm_3d_scene$Scene3d$group(lamps);
}();
var $author$project$Level5$Model$texts3d = _List_fromArray(
	[
		A7(
		$author$project$Types$buildText3d,
		'no one will help me',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -15, -9, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -15, -9, 1),
		0.1,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'they will think me of odd',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, -9, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 7, -9, 1),
		0.08,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'i don\'t think they will accept me',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, 3, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 9, 3, 1),
		0.08,
		0,
		$avh4$elm_color$Color$white,
		-1)
	]);
var $author$project$Level5$Model$texts3dRev = _List_fromArray(
	[
		A7(
		$author$project$Types$buildText3d,
		'maybe things aren\'t so bad',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -7, 1),
		0.09,
		180,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'i can contact more with other people',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, -5, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 11, -5, 1),
		0.05,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'why don\'t have a try',
		A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 7, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 7, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'so many people helped me',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -15, 9, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -15, 9, 1),
		0.1,
		0,
		$avh4$elm_color$Color$white,
		-1)
	]);
var $author$project$Level5$Model$init = function () {
	var mapSize = A2($author$project$Types$GroundSize, 10, 10);
	var initWall = $author$project$Types$buildWall(mapSize);
	var initScene = {background: $avh4$elm_color$Color$darkGrey, luminance: 5000, renderOpt: 20};
	var initGoal = A3($ianmackenzie$elm_geometry$Point3d$meters, -19, 19, 1);
	var initCenter = A3($ianmackenzie$elm_geometry$Point3d$meters, -19, -19, 1);
	var initBlock = $author$project$Types$buildBlock(initCenter);
	var groundSize = A2($author$project$Types$GroundSize, 50, 50);
	return _Utils_Tuple2(
		{
			actives: $author$project$Level5$Model$actives,
			camera: {
				azimuth: $ianmackenzie$elm_units$Angle$degrees(90),
				distance: $author$project$Types$playerCameraDistance,
				elevation: $ianmackenzie$elm_units$Angle$degrees(30),
				focalPoint: initCenter
			},
			carPeriod: 50,
			cars: _List_Nil,
			enableKey: true,
			enableMouse: false,
			event: $elm$core$Maybe$Nothing,
			frameTime: 0,
			gameStatus: A2($author$project$Types$PreGame, 1, 600),
			goal: {center: initGoal},
			godMode: false,
			groundSize: groundSize,
			level: 5,
			level3Lock: -1,
			level6Lock: false,
			mapSize: mapSize,
			nactives: $author$project$Level5$Model$nactives,
			playerRound: true,
			reverseTimer: 0,
			scene: initScene,
			screen: A2($author$project$Types$ScreenSize, $ianmackenzie$elm_units$Quantity$zero, $ianmackenzie$elm_units$Quantity$zero),
			self: A5($author$project$Types$Block, initBlock, initCenter, $avh4$elm_color$Color$white, $elm$core$Maybe$Nothing, $author$project$Types$R),
			settings: $author$project$Level5$Model$settings,
			text: $author$project$Level5$Model$initText,
			texts3d: $author$project$Level5$Model$texts3d,
			texts3dRev: $author$project$Level5$Model$texts3dRev,
			time: 0,
			wall: initWall,
			world: $author$project$Types$Normal
		},
		$author$project$Ports$playSound('bgm_5'));
}();
var $author$project$Level6$Model$actives = function () {
	var p9 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 13, 1);
	var p8 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 31, 1);
	var p7 = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 11, 1);
	var p6 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, -5, 1);
	var p5 = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, -3, 1);
	var p4 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, 1, 1);
	var p3 = A3($ianmackenzie$elm_geometry$Point3d$meters, -5, -1, 1);
	var p2 = A3($ianmackenzie$elm_geometry$Point3d$meters, 5, -9, 1);
	var p15 = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 33, 1);
	var p14 = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 25, 1);
	var p13 = A3($ianmackenzie$elm_geometry$Point3d$meters, 7, 15, 1);
	var p12 = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 7, 1);
	var p11 = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 1, 1);
	var p10 = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 13, 1);
	var p1 = A3($ianmackenzie$elm_geometry$Point3d$meters, -3, -15, 1);
	var blocksUp = A2(
		$elm$core$List$map,
		function (center) {
			return A4(
				$author$project$Types$buildColorBlock,
				center,
				A3($avh4$elm_color$Color$rgb255, 187, 231, 231),
				$elm$core$Maybe$Nothing,
				$author$project$Types$Up);
		},
		_List_fromArray(
			[p10, p11, p12, p14]));
	var blocksLeft = A2(
		$elm$core$List$map,
		function (center) {
			return A4(
				$author$project$Types$buildColorBlock,
				center,
				A3($avh4$elm_color$Color$rgb255, 139, 198, 198),
				$elm$core$Maybe$Nothing,
				$author$project$Types$Left);
		},
		_List_fromArray(
			[p8, p9, p13]));
	var blocksG = A2(
		$elm$core$List$map,
		function (center) {
			return A4(
				$author$project$Types$buildColorBlock,
				center,
				A3($avh4$elm_color$Color$rgb255, 172, 215, 216),
				$elm$core$Maybe$Nothing,
				$author$project$Types$G);
		},
		_List_fromArray(
			[p1, p2, p3, p4, p15]));
	var blocksClock = A2(
		$elm$core$List$map,
		function (center) {
			return A4(
				$author$project$Types$buildColorBlock,
				center,
				A3($avh4$elm_color$Color$rgb255, 172, 215, 216),
				$elm$core$Maybe$Nothing,
				$author$project$Types$Clock);
		},
		_List_fromArray(
			[p5, p6, p7]));
	var blocks = _Utils_ap(
		blocksG,
		_Utils_ap(
			blocksLeft,
			_Utils_ap(blocksClock, blocksUp)));
	return blocks;
}();
var $author$project$Level6$Model$boundary = function () {
	var l9 = A4($author$project$Level4$Model$buildLine, 'ver', 4, 9, 17);
	var l10 = A4($author$project$Level4$Model$buildLine, 'ver', 1, 9, 33);
	return $elm$core$List$concat(
		_List_fromArray(
			[l9, l10]));
}();
var $author$project$Level6$Model$initText = {
	content: '',
	event: {duration: 0, init: 0, name: $author$project$Types$Noop},
	left: 0,
	opacity: 1,
	size: 0,
	top: 0
};
var $author$project$Level6$Model$initY = -321;
var $author$project$Level6$Model$nactives = function () {
	var blocks = _List_Nil;
	return blocks;
}();
var $author$project$Level6$Model$settings = function () {
	var road2 = A2(
		$ianmackenzie$elm_3d_scene$Scene3d$block,
		$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(
			A3($avh4$elm_color$Color$rgb255, 66, 66, 66)),
		A2(
			$ianmackenzie$elm_geometry$Block3d$from,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -4, $author$project$Level6$Model$initY, 0),
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, -141, -0.1)));
	var road1 = A2(
		$ianmackenzie$elm_3d_scene$Scene3d$block,
		$ianmackenzie$elm_3d_scene$Scene3d$Material$color($avh4$elm_color$Color$white),
		A2(
			$ianmackenzie$elm_geometry$Block3d$from,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -4, $author$project$Level6$Model$initY, -0.1),
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, -141, -100)));
	var lamps = _List_fromArray(
		[
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -8, -20, 0),
			0),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -6, $author$project$Level6$Model$initY + 24, 0),
			0),
			A2(
			$author$project$Types$lamp,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 6, -100, 0),
			180)
		]);
	return $ianmackenzie$elm_3d_scene$Scene3d$group(
		_Utils_ap(
			lamps,
			_List_fromArray(
				[road1, road2])));
}();
var $author$project$Types$buildText3dRot = F7(
	function (str, anchor, firstBlockCenter, scale, rot, color, ifWallInit) {
		var strLength = $elm$core$List$length(
			$elm$core$String$toList(str));
		var roundPoint = function (point) {
			var z_ = $ianmackenzie$elm_units$Quantity$toFloatQuantity(
				$ianmackenzie$elm_units$Quantity$round(
					$ianmackenzie$elm_geometry$Point3d$zCoordinate(point)));
			var y_ = $ianmackenzie$elm_units$Quantity$toFloatQuantity(
				$ianmackenzie$elm_units$Quantity$round(
					$ianmackenzie$elm_geometry$Point3d$yCoordinate(point)));
			var x_ = $ianmackenzie$elm_units$Quantity$toFloatQuantity(
				$ianmackenzie$elm_units$Quantity$round(
					$ianmackenzie$elm_geometry$Point3d$xCoordinate(point)));
			return A3($ianmackenzie$elm_geometry$Point3d$xyz, x_, y_, z_);
		};
		var length = $elm$core$Basics$ceiling((((strLength * 6) - 1) * scale) / 2);
		var entities = A4(
			$author$project$Types$text3d,
			str,
			anchor,
			scale,
			{a: rot, b: 0, c: -90});
		var dr = A2($ianmackenzie$elm_geometry$Vector3d$from, $ianmackenzie$elm_geometry$Point3d$origin, firstBlockCenter);
		var coordinates = A2(
			$elm$core$List$map,
			function (yc) {
				return A2(
					$ianmackenzie$elm_geometry$Point3d$translateBy,
					dr,
					roundPoint(
						A3(
							$ianmackenzie$elm_geometry$Point3d$rotateAround,
							$ianmackenzie$elm_geometry$Axis3d$z,
							$ianmackenzie$elm_units$Angle$degrees(rot),
							A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 2 * yc, 0))));
			},
			A2($elm$core$List$range, 0, length - 1));
		var wall = A2(
			$elm$core$List$map,
			function (center) {
				return A4($author$project$Types$buildColorBlock, center, $avh4$elm_color$Color$lightYellow, $elm$core$Maybe$Nothing, $author$project$Types$R);
			},
			coordinates);
		return A9($author$project$Types$Text3d, str, anchor, scale, rot, color, coordinates, entities, wall, ifWallInit);
	});
var $author$project$Level6$Model$texts3d = _List_fromArray(
	[
		A7(
		$author$project$Types$buildText3d,
		'you need food',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -25, -36, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -25, -35, 1),
		0.2,
		0,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'another dream?',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, -89, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -8, -89, 4),
		0.2,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3d,
		'seems not',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, -75, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, -75, 4),
		0.2,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3dRot,
		'what can i hold you with',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, $author$project$Level6$Model$initY + 30, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, $author$project$Level6$Model$initY + 30, -1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3dRot,
		'i offer you that kernel of myself that i',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, $author$project$Level6$Model$initY + 50, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -9, $author$project$Level6$Model$initY + 50, -1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3dRot,
		'have saved somehow',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7.5, $author$project$Level6$Model$initY + 70, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, $author$project$Level6$Model$initY + 70, -1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3dRot,
		'the central heart that deals not in words',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -14, $author$project$Level6$Model$initY + 90, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -13, $author$project$Level6$Model$initY + 90, -1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3dRot,
		'traffics not with dreams and is untouched ',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -14, $author$project$Level6$Model$initY + 110, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -13, $author$project$Level6$Model$initY + 110, -1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3dRot,
		'by time     by joy     by adversities',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -10.5, $author$project$Level6$Model$initY + 130, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -11, $author$project$Level6$Model$initY + 130, -1),
		0.1,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3dRot,
		'i can give you my loneliness',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7.5, $author$project$Level6$Model$initY + 150, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, $author$project$Level6$Model$initY + 150, -1),
		0.2,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3dRot,
		'my darkness',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7.5, $author$project$Level6$Model$initY + 170, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -7, $author$project$Level6$Model$initY + 170, -1),
		0.2,
		-90,
		$avh4$elm_color$Color$white,
		-1),
		A7(
		$author$project$Types$buildText3dRot,
		'the hunger of my heart',
		A3($ianmackenzie$elm_geometry$Point3d$meters, -15, $author$project$Level6$Model$initY + 190, 1),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -15, $author$project$Level6$Model$initY + 190, -1),
		0.2,
		-90,
		$avh4$elm_color$Color$white,
		-1)
	]);
var $author$project$Level6$Model$texts3dRev = _List_Nil;
var $author$project$Level6$Model$init = function () {
	var mapSize = A2($author$project$Types$GroundSize, 20, 15);
	var initWall = $author$project$Level6$Model$boundary;
	var initScene = {background: $avh4$elm_color$Color$black, luminance: 5000, renderOpt: 10};
	var initGoal = A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 33, 1);
	var initCenter = A3($ianmackenzie$elm_geometry$Point3d$meters, -1, $author$project$Level6$Model$initY + 20, 1);
	var initBlock = $author$project$Types$buildBlock(initCenter);
	var groundSize = A2($author$project$Types$GroundSize, 57, 55);
	return _Utils_Tuple2(
		{
			actives: $author$project$Level6$Model$actives,
			camera: {
				azimuth: $ianmackenzie$elm_units$Angle$degrees(-90),
				distance: $ianmackenzie$elm_units$Length$meters(50),
				elevation: $ianmackenzie$elm_units$Angle$degrees(90),
				focalPoint: initCenter
			},
			carPeriod: 50,
			cars: _List_Nil,
			enableKey: true,
			enableMouse: false,
			event: $elm$core$Maybe$Nothing,
			frameTime: 0,
			gameStatus: A2($author$project$Types$PreGame, 1, 600),
			goal: {center: initGoal},
			godMode: false,
			groundSize: groundSize,
			level: 6,
			level3Lock: -1,
			level6Lock: true,
			mapSize: mapSize,
			nactives: $author$project$Level6$Model$nactives,
			playerRound: true,
			reverseTimer: 0,
			scene: initScene,
			screen: A2($author$project$Types$ScreenSize, $ianmackenzie$elm_units$Quantity$zero, $ianmackenzie$elm_units$Quantity$zero),
			self: A5($author$project$Types$Block, initBlock, initCenter, $avh4$elm_color$Color$white, $elm$core$Maybe$Nothing, $author$project$Types$R),
			settings: $author$project$Level6$Model$settings,
			text: $author$project$Level6$Model$initText,
			texts3d: $author$project$Level6$Model$texts3d,
			texts3dRev: $author$project$Level6$Model$texts3dRev,
			time: 0,
			wall: initWall,
			world: $author$project$Types$Normal
		},
		$author$project$Ports$playSound('bgm_6'));
}();
var $author$project$Update$reInit = function (model) {
	var _v0 = function () {
		var _v1 = model.level;
		switch (_v1) {
			case 1:
				return $author$project$Level1$Model$init;
			case 2:
				return $author$project$Level2$Model$init;
			case 3:
				var _v2 = model.gameStatus;
				if (_v2.$ === 'LoseFadeOut') {
					var _v3 = $author$project$Level3$Model$init;
					var tModel = _v3.a;
					var tMsg = _v3.b;
					var newModel = _Utils_update(
						tModel,
						{level3Lock: model.level3Lock});
					return _Utils_Tuple2(newModel, tMsg);
				} else {
					return $author$project$Level3$Model$init;
				}
			case 4:
				return $author$project$Level4$Model$init;
			case 5:
				return $author$project$Level5$Model$init;
			case 6:
				return $author$project$Level6$Model$init;
			default:
				return $author$project$Model$init;
		}
	}();
	var model_ = _v0.a;
	var msg = _v0.b;
	return _Utils_Tuple2(model_, msg);
};
var $author$project$Types$LevelChange = function (a) {
	return {$: 'LevelChange', a: a};
};
var $author$project$Update$updateAnimation0 = function (model) {
	var newFrameTime = model.frameTime - 4;
	return (newFrameTime < 0) ? _Utils_update(
		model,
		{
			gameStatus: $author$project$Types$LevelChange(1)
		}) : _Utils_update(
		model,
		{frameTime: newFrameTime});
};
var $author$project$Types$Lose = {$: 'Lose'};
var $author$project$Update$examDistance = F4(
	function (block1, block2, max, min) {
		var selfCenter = block2.center;
		var blockCenter = block1.center;
		var distance = A2($ianmackenzie$elm_geometry$Point3d$distanceFrom, blockCenter, selfCenter);
		return A2($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, max, distance) && A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, min, distance);
	});
var $author$project$Types$WordEmerge = {$: 'WordEmerge'};
var $author$project$Update$makeText = F2(
	function (model, text) {
		var newEvent = {duration: text.event.duration, init: model.time, name: $author$project$Types$WordEmerge};
		var newText = _Utils_update(
			text,
			{event: newEvent});
		return _Utils_update(
			model,
			{text: newText});
	});
var $author$project$Types$CounterClock = {$: 'CounterClock'};
var $author$project$Event$stampBlock = F2(
	function (dir, block) {
		var dis = function () {
			switch (dir.$) {
				case 'Up':
					return A2($ianmackenzie$elm_geometry$Vector3d$withLength, $author$project$Types$blockLen, $ianmackenzie$elm_geometry$Direction3d$negativeX);
				case 'Down':
					return A2($ianmackenzie$elm_geometry$Vector3d$withLength, $author$project$Types$blockLen, $ianmackenzie$elm_geometry$Direction3d$positiveX);
				case 'Left':
					return A2($ianmackenzie$elm_geometry$Vector3d$withLength, $author$project$Types$blockLen, $ianmackenzie$elm_geometry$Direction3d$negativeY);
				default:
					return A2($ianmackenzie$elm_geometry$Vector3d$withLength, $author$project$Types$blockLen, $ianmackenzie$elm_geometry$Direction3d$positiveY);
			}
		}();
		var newCenter = A2($ianmackenzie$elm_geometry$Point3d$translateBy, dis, block.center);
		var newSelf = $author$project$Types$buildBlock(newCenter);
		return (_Utils_eq(dir, $author$project$Types$R) || (_Utils_eq(dir, $author$project$Types$Clock) || _Utils_eq(dir, $author$project$Types$CounterClock))) ? block : _Utils_update(
			block,
			{center: newCenter, _this: newSelf});
	});
var $author$project$Level1$Text$text1 = {
	content: 'Stay away from them...',
	event: {duration: 200, init: 0, name: $author$project$Types$Noop},
	left: 45,
	opacity: 0,
	size: 2,
	top: 20
};
var $author$project$Level5$Text$text1 = {
	content: 'It\'s so cold ...',
	event: {duration: 200, init: 0, name: $author$project$Types$Noop},
	left: 45,
	opacity: 0,
	size: 2,
	top: 20
};
var $author$project$Level6$Text$text1 = {
	content: 'Hello, nice to meet you !',
	event: {duration: 200, init: 0, name: $author$project$Types$Noop},
	left: 45,
	opacity: 0,
	size: 1.5,
	top: 20
};
var $author$project$Level1$Text$text2 = {
	content: 'I\'m afraid',
	event: {duration: 200, init: 0, name: $author$project$Types$Noop},
	left: 45,
	opacity: 0,
	size: 2,
	top: 20
};
var $author$project$Level5$Text$text2 = {
	content: 'Help me ...',
	event: {duration: 200, init: 0, name: $author$project$Types$Noop},
	left: 45,
	opacity: 0,
	size: 2,
	top: 20
};
var $author$project$Level6$Text$text2 = {
	content: 'Are you a new resident here?',
	event: {duration: 200, init: 0, name: $author$project$Types$Noop},
	left: 45,
	opacity: 0,
	size: 1.5,
	top: 20
};
var $author$project$Level1$Text$text3 = {
	content: ' I don\'t like strangers...',
	event: {duration: 200, init: 0, name: $author$project$Types$Noop},
	left: 45,
	opacity: 0,
	size: 2,
	top: 20
};
var $author$project$Level6$Text$text3 = {
	content: 'What a nice day.',
	event: {duration: 200, init: 0, name: $author$project$Types$Noop},
	left: 45,
	opacity: 0,
	size: 1.5,
	top: 20
};
var $author$project$Update$examLoseAndWarn = F2(
	function (key, model) {
		var preSelf = _Utils_eq(model.self.event, $elm$core$Maybe$Nothing) ? A2($author$project$Event$stampBlock, key, model.self) : model.self;
		var newStatus = function () {
			var _v1 = model.level;
			switch (_v1) {
				case 5:
					return model.gameStatus;
				case 6:
					return model.gameStatus;
				default:
					return (A2(
						$elm$core$List$any,
						function (block) {
							return A4(
								$author$project$Update$examDistance,
								block,
								preSelf,
								$ianmackenzie$elm_units$Length$meters(2),
								$ianmackenzie$elm_units$Length$meters(0));
						},
						model.actives) && (_Utils_eq(model.gameStatus, $author$project$Types$Play) && (!_Utils_eq(preSelf.center, model.goal.center)))) ? $author$project$Types$Lose : model.gameStatus;
			}
		}();
		var newModel = function () {
			if (A2(
				$elm$core$List$any,
				function (block) {
					return A4(
						$author$project$Update$examDistance,
						block,
						preSelf,
						$ianmackenzie$elm_units$Length$meters(4),
						$ianmackenzie$elm_units$Length$meters(2.5));
				},
				model.actives)) {
				if (!model.text.event.duration) {
					var _v0 = model.level;
					switch (_v0) {
						case 1:
							return _Utils_eq(model.gameStatus, $author$project$Types$Play) ? ((!A2($elm$core$Basics$modBy, 3, model.time)) ? A2($author$project$Update$makeText, model, $author$project$Level1$Text$text1) : ((A2($elm$core$Basics$modBy, 3, model.time) === 1) ? A2($author$project$Update$makeText, model, $author$project$Level1$Text$text2) : A2($author$project$Update$makeText, model, $author$project$Level1$Text$text3))) : model;
						case 5:
							return (!A2($elm$core$Basics$modBy, 2, model.time)) ? A2($author$project$Update$makeText, model, $author$project$Level5$Text$text1) : A2($author$project$Update$makeText, model, $author$project$Level5$Text$text2);
						case 6:
							return _Utils_eq(model.gameStatus, $author$project$Types$Play) ? ((!A2($elm$core$Basics$modBy, 3, model.time)) ? A2($author$project$Update$makeText, model, $author$project$Level6$Text$text1) : ((A2($elm$core$Basics$modBy, 3, model.time) === 1) ? A2($author$project$Update$makeText, model, $author$project$Level6$Text$text2) : A2($author$project$Update$makeText, model, $author$project$Level6$Text$text3))) : model;
						default:
							return model;
					}
				} else {
					return model;
				}
			} else {
				return model;
			}
		}();
		return _Utils_update(
			newModel,
			{gameStatus: newStatus});
	});
var $ianmackenzie$elm_units$Quantity$greaterThan = F2(
	function (_v0, _v1) {
		var y = _v0.a;
		var x = _v1.a;
		return _Utils_cmp(x, y) > 0;
	});
var $ianmackenzie$elm_units$Length$inMeters = function (_v0) {
	var numMeters = _v0.a;
	return numMeters;
};
var $ianmackenzie$elm_units$Length$inCentimeters = function (length) {
	return 100 * $ianmackenzie$elm_units$Length$inMeters(length);
};
var $author$project$Types$Event = F3(
	function (name, init, duration) {
		return {duration: duration, init: init, name: name};
	});
var $author$project$Types$Rotate = function (a) {
	return {$: 'Rotate', a: a};
};
var $author$project$Event$keyToEvent = F3(
	function (key, time, block) {
		var _v0 = block.event;
		if (_v0.$ === 'Nothing') {
			var newEvent = A3(
				$author$project$Types$Event,
				$author$project$Types$Rotate(key),
				time,
				15);
			var newBlock = _Utils_update(
				block,
				{
					dirBefore: key,
					event: $elm$core$Maybe$Just(newEvent)
				});
			return _Utils_update(
				newBlock,
				{
					event: $elm$core$Maybe$Just(newEvent)
				});
		} else {
			return block;
		}
	});
var $ianmackenzie$elm_units$Quantity$lessThan = F2(
	function (_v0, _v1) {
		var y = _v0.a;
		var x = _v1.a;
		return _Utils_cmp(x, y) < 0;
	});
var $avh4$elm_color$Color$lightRed = A4($avh4$elm_color$Color$RgbaSpace, 239 / 255, 41 / 255, 41 / 255, 1.0);
var $author$project$Update$reverseDir = function (dir) {
	switch (dir.$) {
		case 'Up':
			return $author$project$Types$Down;
		case 'Down':
			return $author$project$Types$Up;
		case 'Left':
			return $author$project$Types$Right;
		case 'Right':
			return $author$project$Types$Left;
		case 'Clock':
			return $author$project$Types$CounterClock;
		case 'CounterClock':
			return $author$project$Types$Clock;
		default:
			return dir;
	}
};
var $ianmackenzie$elm_geometry$Direction3d$rotateAround = F3(
	function (_v0, _v1, _v2) {
		var axis = _v0.a;
		var angle = _v1.a;
		var d = _v2.a;
		var halfAngle = 0.5 * angle;
		var qw = $elm$core$Basics$cos(halfAngle);
		var sinHalfAngle = $elm$core$Basics$sin(halfAngle);
		var _v3 = axis.direction;
		var a = _v3.a;
		var qx = a.x * sinHalfAngle;
		var qwx = qw * qx;
		var qxx = qx * qx;
		var qy = a.y * sinHalfAngle;
		var qwy = qw * qy;
		var qxy = qx * qy;
		var qyy = qy * qy;
		var a22 = 1 - (2 * (qxx + qyy));
		var qz = a.z * sinHalfAngle;
		var qwz = qw * qz;
		var a01 = 2 * (qxy - qwz);
		var a10 = 2 * (qxy + qwz);
		var qxz = qx * qz;
		var a02 = 2 * (qxz + qwy);
		var a20 = 2 * (qxz - qwy);
		var qyz = qy * qz;
		var a12 = 2 * (qyz - qwx);
		var a21 = 2 * (qyz + qwx);
		var qzz = qz * qz;
		var a00 = 1 - (2 * (qyy + qzz));
		var a11 = 1 - (2 * (qxx + qzz));
		return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
			{x: ((a00 * d.x) + (a01 * d.y)) + (a02 * d.z), y: ((a10 * d.x) + (a11 * d.y)) + (a12 * d.z), z: ((a20 * d.x) + (a21 * d.y)) + (a22 * d.z)});
	});
var $ianmackenzie$elm_geometry$Frame3d$rotateAround = F3(
	function (axis, angle, frame) {
		return $ianmackenzie$elm_geometry$Frame3d$unsafe(
			{
				originPoint: A3(
					$ianmackenzie$elm_geometry$Point3d$rotateAround,
					axis,
					angle,
					$ianmackenzie$elm_geometry$Frame3d$originPoint(frame)),
				xDirection: A3(
					$ianmackenzie$elm_geometry$Direction3d$rotateAround,
					axis,
					angle,
					$ianmackenzie$elm_geometry$Frame3d$xDirection(frame)),
				yDirection: A3(
					$ianmackenzie$elm_geometry$Direction3d$rotateAround,
					axis,
					angle,
					$ianmackenzie$elm_geometry$Frame3d$yDirection(frame)),
				zDirection: A3(
					$ianmackenzie$elm_geometry$Direction3d$rotateAround,
					axis,
					angle,
					$ianmackenzie$elm_geometry$Frame3d$zDirection(frame))
			});
	});
var $ianmackenzie$elm_geometry$Block3d$rotateAround = F3(
	function (axis, angle, block) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Block3d(
			{
				axes: A3(
					$ianmackenzie$elm_geometry$Frame3d$rotateAround,
					axis,
					angle,
					$ianmackenzie$elm_geometry$Block3d$axes(block)),
				dimensions: $ianmackenzie$elm_geometry$Block3d$dimensions(block)
			});
	});
var $author$project$Types$rotateRate = $ianmackenzie$elm_units$Angle$degrees(6);
var $author$project$Event$rotateBlock = F3(
	function (time, event, block) {
		var _v0 = event.name;
		if (_v0.$ === 'Rotate') {
			var dir = _v0.a;
			var ifEnd = (!((event.init + event.duration) - time)) ? true : false;
			if (ifEnd) {
				return A2($author$project$Event$stampBlock, dir, block);
			} else {
				var halfLen = $ianmackenzie$elm_units$Quantity$half($author$project$Types$blockLen);
				var axisHelper = F2(
					function (x, y) {
						return A2($ianmackenzie$elm_geometry$Axis3d$through, y, x);
					});
				var axis = function () {
					switch (dir.$) {
						case 'Up':
							return A2(
								axisHelper,
								$ianmackenzie$elm_geometry$Direction3d$negativeY,
								A2(
									$ianmackenzie$elm_geometry$Point3d$translateBy,
									A3(
										$ianmackenzie$elm_geometry$Vector3d$xyz,
										A2($ianmackenzie$elm_units$Quantity$multiplyBy, -1, halfLen),
										halfLen,
										A2($ianmackenzie$elm_units$Quantity$multiplyBy, -1, halfLen)),
									block.center));
						case 'Down':
							return A2(
								axisHelper,
								$ianmackenzie$elm_geometry$Direction3d$y,
								A2(
									$ianmackenzie$elm_geometry$Point3d$translateBy,
									A3(
										$ianmackenzie$elm_geometry$Vector3d$xyz,
										halfLen,
										halfLen,
										A2($ianmackenzie$elm_units$Quantity$multiplyBy, -1, halfLen)),
									block.center));
						case 'Left':
							return A2(
								axisHelper,
								$ianmackenzie$elm_geometry$Direction3d$x,
								A2(
									$ianmackenzie$elm_geometry$Point3d$translateBy,
									A3(
										$ianmackenzie$elm_geometry$Vector3d$xyz,
										halfLen,
										A2($ianmackenzie$elm_units$Quantity$multiplyBy, -1, halfLen),
										A2($ianmackenzie$elm_units$Quantity$multiplyBy, -1, halfLen)),
									block.center));
						case 'Right':
							return A2(
								axisHelper,
								$ianmackenzie$elm_geometry$Direction3d$negativeX,
								A2(
									$ianmackenzie$elm_geometry$Point3d$translateBy,
									A3(
										$ianmackenzie$elm_geometry$Vector3d$xyz,
										A2($ianmackenzie$elm_units$Quantity$multiplyBy, -1, halfLen),
										halfLen,
										A2($ianmackenzie$elm_units$Quantity$multiplyBy, -1, halfLen)),
									block.center));
						default:
							return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$positiveZ, block.center);
					}
				}();
				var angle = $author$project$Types$rotateRate;
				var newCube = _Utils_eq(dir, $author$project$Types$CounterClock) ? A3(
					$ianmackenzie$elm_geometry$Block3d$rotateAround,
					axis,
					$ianmackenzie$elm_units$Angle$degrees(-6),
					block._this) : A3($ianmackenzie$elm_geometry$Block3d$rotateAround, axis, angle, block._this);
				return _Utils_eq(dir, $author$project$Types$R) ? block : _Utils_update(
					block,
					{_this: newCube});
			}
		} else {
			return block;
		}
	});
var $author$project$Event$updateEvent = F2(
	function (time, event) {
		var _v0 = event.name;
		var remainTime = (event.init + event.duration) - time;
		return (remainTime <= 0) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(event);
	});
var $author$project$Update$updateBlock = F2(
	function (model, block) {
		var time = model.time;
		var _v0 = block.event;
		if (_v0.$ === 'Nothing') {
			return block;
		} else {
			var event = _v0.a;
			var newEvent = A2($author$project$Event$updateEvent, time, event);
			var _v1 = event.name;
			if (_v1.$ === 'Rotate') {
				var dir = _v1.a;
				var newBlock = A3($author$project$Event$rotateBlock, time, event, block);
				return _Utils_update(
					newBlock,
					{event: newEvent});
			} else {
				return block;
			}
		}
	});
var $author$project$Update$updateActiveBlock = F2(
	function (model, block) {
		var time = model.time;
		var self = model.self;
		if (_Utils_eq(block.color, $avh4$elm_color$Color$lightRed) || ((model.level === 1) && (!_Utils_eq(model.gameStatus, $author$project$Types$Play)))) {
			var _v0 = block.event;
			if (_v0.$ === 'Nothing') {
				if (!model.playerRound) {
					var y_ = $ianmackenzie$elm_geometry$Point3d$yCoordinate(self.center);
					var y = $ianmackenzie$elm_geometry$Point3d$yCoordinate(block.center);
					var x_ = $ianmackenzie$elm_geometry$Point3d$xCoordinate(self.center);
					var x = $ianmackenzie$elm_geometry$Point3d$xCoordinate(block.center);
					var dir2 = A2($ianmackenzie$elm_units$Quantity$lessThan, y_, y) ? $author$project$Types$Right : (A2($ianmackenzie$elm_units$Quantity$greaterThan, y_, y) ? $author$project$Types$Left : (A2($ianmackenzie$elm_units$Quantity$lessThan, x_, x) ? $author$project$Types$Down : $author$project$Types$Up));
					var dir1 = A2($ianmackenzie$elm_units$Quantity$lessThan, x_, x) ? $author$project$Types$Down : (A2($ianmackenzie$elm_units$Quantity$greaterThan, x_, x) ? $author$project$Types$Up : (A2($ianmackenzie$elm_units$Quantity$lessThan, y_, y) ? $author$project$Types$Right : $author$project$Types$Left));
					var dir = (!A2($elm$core$Basics$modBy, 3, time)) ? dir1 : dir2;
					return A3($author$project$Update$ifNextStepAvailable, block, dir, model) ? A2(
						$author$project$Update$updateBlock,
						model,
						A3($author$project$Event$keyToEvent, dir, time, block)) : block;
				} else {
					return block;
				}
			} else {
				return A2($author$project$Update$updateBlock, model, block);
			}
		} else {
			if (((model.level === 6) || (model.level === 1)) && _Utils_eq(model.gameStatus, $author$project$Types$Play)) {
				var distance = $elm$core$Basics$round(
					$ianmackenzie$elm_units$Length$inCentimeters(
						A2(
							$ianmackenzie$elm_geometry$Point3d$distanceFrom,
							block.center,
							A3($ianmackenzie$elm_geometry$Point3d$meters, 10, -10, 10))));
				var random = A2($elm$core$Basics$modBy, 1100, distance);
				var _v1 = block.event;
				if (_v1.$ === 'Nothing') {
					if (!A2($elm$core$Basics$modBy, random, model.time)) {
						var _v2 = block.dirBefore;
						switch (_v2.$) {
							case 'G':
								return block;
							case 'Clock':
								var dir = $author$project$Update$reverseDir(block.dirBefore);
								var newBlock = A3($author$project$Event$keyToEvent, dir, time, block);
								return A2($author$project$Update$updateBlock, model, newBlock);
							case 'CounterClock':
								var dir = $author$project$Update$reverseDir(block.dirBefore);
								var newBlock = A3($author$project$Event$keyToEvent, dir, time, block);
								return A2($author$project$Update$updateBlock, model, newBlock);
							default:
								var dir = $author$project$Update$reverseDir(block.dirBefore);
								return A3($author$project$Update$ifNextStepAvailable, block, dir, model) ? A2(
									$author$project$Update$updateBlock,
									model,
									A3($author$project$Event$keyToEvent, dir, time, block)) : block;
						}
					} else {
						return block;
					}
				} else {
					return A2($author$project$Update$updateBlock, model, block);
				}
			} else {
				return block;
			}
		}
	});
var $author$project$Update$updateActives = function (model) {
	var updateActiveBlocks = function (list) {
		return A2(
			$elm$core$List$map,
			function (block) {
				return A2($author$project$Update$updateActiveBlock, model, block);
			},
			list);
	};
	var switchRound = !A2(
		$elm$core$List$any,
		function (block) {
			return !_Utils_eq(block.event, $elm$core$Maybe$Nothing);
		},
		model.actives);
	var actives = updateActiveBlocks(model.actives);
	var activeModel = ((model.level === 6) && (!model.level6Lock)) ? _Utils_update(
		model,
		{actives: actives, playerRound: switchRound}) : (((model.level === 6) && model.level6Lock) ? model : _Utils_update(
		model,
		{actives: actives, playerRound: switchRound}));
	var newModel = A2($author$project$Update$examLoseAndWarn, $author$project$Types$R, activeModel);
	return _Utils_update(
		newModel,
		{text: model.text});
};
var $author$project$Update$updateBlocks = function (model) {
	var newSelf = A2($author$project$Update$updateBlock, model, model.self);
	var switchRound = _Utils_eq(model.gameStatus, $author$project$Types$Play) ? ((!_Utils_eq(newSelf.center, model.self.center)) ? false : true) : ((model.frameTime !== 80) ? true : false);
	return $author$project$Update$updateActives(
		_Utils_update(
			model,
			{playerRound: switchRound, self: newSelf}));
};
var $author$project$Types$Animation = function (a) {
	return {$: 'Animation', a: a};
};
var $author$project$Update$updateFrame = F2(
	function (frame, model) {
		var newFrameTime = (!(!model.frameTime)) ? (model.frameTime - 1) : 0;
		var newStatus = function () {
			if (newFrameTime === 1) {
				if (model.level === 1) {
					return (frame === 5) ? $author$project$Types$LevelChange(2) : $author$project$Types$Animation(frame + 1);
				} else {
					if (model.level === 6) {
						return (frame === 12) ? $author$project$Types$LevelChange(0) : $author$project$Types$Animation(frame + 1);
					} else {
						var _v0 = model.level;
						if (_v0 === 4) {
							return $author$project$Types$LevelChange(5);
						} else {
							return $author$project$Types$Play;
						}
					}
				}
			} else {
				return model.gameStatus;
			}
		}();
		return _Utils_update(
			model,
			{frameTime: newFrameTime, gameStatus: newStatus});
	});
var $author$project$Update$updateText = function (model) {
	var textNow = model.text;
	var newTop = ((_Utils_cmp((textNow.event.init + textNow.event.duration) - model.time, ((3 * textNow.event.duration) / 4) | 0) > 0) || (_Utils_cmp((textNow.event.init + textNow.event.duration) - model.time, (textNow.event.duration / 4) | 0) < 0)) ? (textNow.top - 0.01) : textNow.top;
	var newOpacity = (_Utils_cmp((textNow.event.init + textNow.event.duration) - model.time, ((3 * textNow.event.duration) / 4) | 0) > 0) ? (textNow.opacity + 0.04) : ((_Utils_cmp((textNow.event.init + textNow.event.duration) - model.time, (textNow.event.duration / 4) | 0) < 0) ? (textNow.opacity - 0.04) : textNow.opacity);
	var textUpdated = _Utils_update(
		textNow,
		{opacity: newOpacity, top: newTop});
	var ifEnd = (!((textNow.event.init + textNow.event.duration) - model.time)) ? true : false;
	return ifEnd ? _Utils_update(
		model,
		{text: $author$project$Level1$Model$initText}) : _Utils_update(
		model,
		{text: textUpdated});
};
var $author$project$Update$updateAnimation1 = F2(
	function (model, frame) {
		var oldCamera = model.camera;
		var newTime = model.time + 1;
		var newFrameTime = (!model.frameTime) ? 80 : model.frameTime;
		var newModel = function () {
			switch (frame) {
				case 1:
					return $author$project$Update$updateText(
						A2(
							$author$project$Update$updateFrame,
							frame,
							$author$project$Update$updateBlocks(
								_Utils_update(
									model,
									{frameTime: newFrameTime}))));
				case 2:
					return $author$project$Update$updateText(
						A2(
							$author$project$Update$updateFrame,
							frame,
							$author$project$Update$updateBlocks(
								_Utils_update(
									model,
									{frameTime: newFrameTime}))));
				case 3:
					return $author$project$Update$updateText(
						A2(
							$author$project$Update$updateFrame,
							frame,
							$author$project$Update$updateBlocks(
								_Utils_update(
									model,
									{frameTime: newFrameTime}))));
				case 4:
					return $author$project$Update$updateText(
						A2(
							$author$project$Update$updateFrame,
							frame,
							$author$project$Update$updateBlocks(
								_Utils_update(
									model,
									{frameTime: newFrameTime}))));
				case 5:
					return $author$project$Update$updateText(
						A2(
							$author$project$Update$updateFrame,
							frame,
							$author$project$Update$updateBlocks(
								_Utils_update(
									model,
									{frameTime: newFrameTime}))));
				default:
					return model;
			}
		}();
		var distance = A2(
			$ianmackenzie$elm_units$Quantity$plus,
			$ianmackenzie$elm_units$Length$meters(25),
			model.camera.distance);
		var _v0 = function () {
			if (!model.frameTime) {
				switch (frame) {
					case 1:
						return _Utils_Tuple2(
							$author$project$Ports$playSound('reverse_1'),
							model.camera.distance);
					case 2:
						return _Utils_Tuple2(
							$author$project$Ports$playSound('reverse_2'),
							distance);
					case 3:
						return _Utils_Tuple2(
							$author$project$Ports$playSound('reverse_3'),
							distance);
					case 4:
						return _Utils_Tuple2(
							$author$project$Ports$playSound('reverse_4'),
							distance);
					case 5:
						return _Utils_Tuple2(
							$author$project$Ports$playSound('reverse_5'),
							distance);
					default:
						return _Utils_Tuple2($elm$core$Platform$Cmd$none, model.camera.distance);
				}
			} else {
				return _Utils_Tuple2($elm$core$Platform$Cmd$none, model.camera.distance);
			}
		}();
		var newMsg = _v0.a;
		var newDistance = _v0.b;
		var newCamera = _Utils_update(
			oldCamera,
			{distance: newDistance});
		return _Utils_Tuple2(
			_Utils_update(
				newModel,
				{camera: newCamera, time: newTime}),
			newMsg);
	});
var $author$project$Update$updateAnimation4 = F2(
	function (model, frame) {
		var text = {
			content: 'I finally tell you.',
			event: {duration: 200, init: 0, name: $author$project$Types$Noop},
			left: 45,
			opacity: 0,
			size: 2,
			top: 20
		};
		var newTime = model.time + 1;
		var newFrameTime = (!model.frameTime) ? 80 : model.frameTime;
		var newModel = (!model.frameTime) ? A2($author$project$Update$makeText, model, text) : model;
		return $author$project$Update$updateText(
			A2(
				$author$project$Update$updateFrame,
				frame,
				_Utils_update(
					newModel,
					{frameTime: newFrameTime, time: newTime})));
	});
var $author$project$Update$updateAnimation6 = F2(
	function (model, frame) {
		var text2 = {
			content: 'Have we met in the dream?',
			event: {duration: 300, init: 0, name: $author$project$Types$Noop},
			left: 46,
			opacity: 0,
			size: 0.7,
			top: 50
		};
		var text1 = {
			content: 'Hi.',
			event: {duration: 200, init: 0, name: $author$project$Types$Noop},
			left: 45,
			opacity: 0,
			size: 1.5,
			top: 20
		};
		var newTime = model.time + 1;
		var newFrameTime = (!model.frameTime) ? 80 : model.frameTime;
		var newModel = (frame === 2) ? A2($author$project$Update$makeText, model, text1) : ((frame === 7) ? A2($author$project$Update$makeText, model, text2) : model);
		return $author$project$Update$updateText(
			A2(
				$author$project$Update$updateFrame,
				frame,
				_Utils_update(
					newModel,
					{frameTime: newFrameTime, time: newTime})));
	});
var $ianmackenzie$elm_units$Quantity$at = F2(
	function (_v0, _v1) {
		var rate = _v0.a;
		var independentValue = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(rate * independentValue);
	});
var $ianmackenzie$elm_units$Quantity$per = F2(
	function (_v0, _v1) {
		var independentValue = _v0.a;
		var dependentValue = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(dependentValue / independentValue);
	});
var $ianmackenzie$elm_units$Pixels$pixels = function (numPixels) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numPixels);
};
var $ianmackenzie$elm_units$Pixels$pixel = $ianmackenzie$elm_units$Pixels$pixels(1);
var $author$project$Update$updateElevationAzimuth = F3(
	function (dx, dy, model) {
		var camera = model.camera;
		var camRate = A2(
			$ianmackenzie$elm_units$Quantity$per,
			$ianmackenzie$elm_units$Pixels$pixel,
			$ianmackenzie$elm_units$Angle$degrees(0.75));
		var newAzimuth = A2(
			$ianmackenzie$elm_units$Quantity$minus,
			A2($ianmackenzie$elm_units$Quantity$at, camRate, dx),
			model.camera.azimuth);
		var newElevation = (model.godMode ? A2(
			$ianmackenzie$elm_units$Quantity$clamp,
			$ianmackenzie$elm_units$Angle$degrees(0),
			$ianmackenzie$elm_units$Angle$degrees(90)) : (model.level6Lock ? A2(
			$ianmackenzie$elm_units$Quantity$clamp,
			$ianmackenzie$elm_units$Angle$degrees(90),
			$ianmackenzie$elm_units$Angle$degrees(90)) : ((model.level === 3) ? A2(
			$ianmackenzie$elm_units$Quantity$clamp,
			$ianmackenzie$elm_units$Angle$degrees(22),
			$ianmackenzie$elm_units$Angle$degrees(40)) : A2(
			$ianmackenzie$elm_units$Quantity$clamp,
			$ianmackenzie$elm_units$Angle$degrees(10),
			$ianmackenzie$elm_units$Angle$degrees(40)))))(
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				A2($ianmackenzie$elm_units$Quantity$at, camRate, dy),
				model.camera.elevation));
		var newCamera = _Utils_update(
			camera,
			{azimuth: newAzimuth, elevation: newElevation});
		return (!model.level) ? model : _Utils_update(
			model,
			{camera: newCamera});
	});
var $ianmackenzie$elm_geometry$Block3d$centerPoint = function (block) {
	return $ianmackenzie$elm_geometry$Frame3d$originPoint(
		$ianmackenzie$elm_geometry$Block3d$axes(block));
};
var $ianmackenzie$elm_geometry$Vector3d$rThetaOn = F3(
	function (_v0, _v1, _v2) {
		var sketchPlane = _v0.a;
		var r = _v1.a;
		var theta = _v2.a;
		var y = r * $elm$core$Basics$sin(theta);
		var x = r * $elm$core$Basics$cos(theta);
		var _v3 = sketchPlane.yDirection;
		var j = _v3.a;
		var _v4 = sketchPlane.xDirection;
		var i = _v4.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: (x * i.x) + (y * j.x), y: (x * i.y) + (y * j.y), z: (x * i.z) + (y * j.z)});
	});
var $author$project$Update$updateFocalPoint = function (model) {
	if (model.godMode) {
		return model;
	} else {
		if (!model.level) {
			var x = A2($elm$core$Basics$modBy, 360, model.time);
			var vector = A3(
				$ianmackenzie$elm_geometry$Vector3d$rThetaOn,
				$ianmackenzie$elm_geometry$SketchPlane3d$xy,
				$ianmackenzie$elm_units$Length$meters(0.5),
				$ianmackenzie$elm_units$Angle$degrees(x));
			var oldCoordinate = A3($ianmackenzie$elm_geometry$Point3d$meters, 2, 0, 1);
			var oldCamera = model.camera;
			var newCoordinate = A2($ianmackenzie$elm_geometry$Point3d$translateBy, vector, oldCoordinate);
			var newCamera = _Utils_update(
				oldCamera,
				{focalPoint: newCoordinate});
			return _Utils_update(
				model,
				{camera: newCamera});
		} else {
			var selfCoordinate = $ianmackenzie$elm_geometry$Block3d$centerPoint(model.self._this);
			var oldCamera = model.camera;
			var newCoordinate = A3(
				$ianmackenzie$elm_geometry$Point3d$xyz,
				$ianmackenzie$elm_geometry$Point3d$xCoordinate(selfCoordinate),
				$ianmackenzie$elm_geometry$Point3d$yCoordinate(selfCoordinate),
				$ianmackenzie$elm_units$Length$meters(1));
			var newCamera = _Utils_update(
				oldCamera,
				{focalPoint: newCoordinate});
			return _Utils_update(
				model,
				{camera: newCamera});
		}
	}
};
var $author$project$Types$Drive = function (a) {
	return {$: 'Drive', a: a};
};
var $author$project$Update$createCars = F5(
	function (cars, time, period, dir, point) {
		var event = A3(
			$author$project$Types$Event,
			$author$project$Types$Drive(dir),
			time,
			0);
		var newCar = A4(
			$author$project$Types$buildColorBlock,
			point,
			$avh4$elm_color$Color$lightRed,
			$elm$core$Maybe$Just(event),
			$author$project$Types$Up);
		var newCars = ((A2($elm$core$Basics$modBy, period, time) === 1) && (($elm$core$List$length(cars) <= 3) && (!A2(
			$elm$core$List$any,
			function (car) {
				return A4(
					$author$project$Update$examDistance,
					car,
					newCar,
					$ianmackenzie$elm_units$Length$meters(2),
					$ianmackenzie$elm_units$Length$meters(0));
			},
			cars)))) ? _Utils_ap(
			cars,
			_List_fromArray(
				[newCar])) : cars;
		return newCars;
	});
var $ianmackenzie$elm_units$Constants$meter = 1.0;
var $ianmackenzie$elm_units$Constants$inch = 0.0254 * $ianmackenzie$elm_units$Constants$meter;
var $ianmackenzie$elm_units$Length$inInches = function (length) {
	return $ianmackenzie$elm_units$Length$inMeters(length) / $ianmackenzie$elm_units$Constants$inch;
};
var $ianmackenzie$elm_geometry$Point3d$toTuple = F2(
	function (fromQuantity, point) {
		return _Utils_Tuple3(
			fromQuantity(
				$ianmackenzie$elm_geometry$Point3d$xCoordinate(point)),
			fromQuantity(
				$ianmackenzie$elm_geometry$Point3d$yCoordinate(point)),
			fromQuantity(
				$ianmackenzie$elm_geometry$Point3d$zCoordinate(point)));
	});
var $author$project$Update$deleteCar = F3(
	function (car, point1, point2) {
		var _v0 = A2($ianmackenzie$elm_geometry$Point3d$toTuple, $ianmackenzie$elm_units$Length$inInches, point2);
		var x2 = _v0.a;
		var y2 = _v0.b;
		var z2 = _v0.c;
		var _v1 = A2($ianmackenzie$elm_geometry$Point3d$toTuple, $ianmackenzie$elm_units$Length$inInches, point1);
		var x1 = _v1.a;
		var y1 = _v1.b;
		var z1 = _v1.c;
		var _v2 = A2($ianmackenzie$elm_geometry$Point3d$toTuple, $ianmackenzie$elm_units$Length$inInches, car.center);
		var x = _v2.a;
		var y = _v2.b;
		var z = _v2.c;
		return !((_Utils_cmp(x, x1) > -1) && ((_Utils_cmp(x, x2) < 1) && ((_Utils_cmp(y, y1) > -1) && (_Utils_cmp(y, y2) < 1))));
	});
var $author$project$Update$deleteCars = F3(
	function (cars, point1, point2) {
		return A2(
			$elm$core$List$filter,
			function (car) {
				return A3($author$project$Update$deleteCar, car, point1, point2);
			},
			cars);
	});
var $ianmackenzie$elm_geometry$Frame3d$translateBy = F2(
	function (vector, frame) {
		return $ianmackenzie$elm_geometry$Frame3d$unsafe(
			{
				originPoint: A2(
					$ianmackenzie$elm_geometry$Point3d$translateBy,
					vector,
					$ianmackenzie$elm_geometry$Frame3d$originPoint(frame)),
				xDirection: $ianmackenzie$elm_geometry$Frame3d$xDirection(frame),
				yDirection: $ianmackenzie$elm_geometry$Frame3d$yDirection(frame),
				zDirection: $ianmackenzie$elm_geometry$Frame3d$zDirection(frame)
			});
	});
var $ianmackenzie$elm_geometry$Block3d$translateBy = F2(
	function (displacement, block) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Block3d(
			{
				axes: A2(
					$ianmackenzie$elm_geometry$Frame3d$translateBy,
					displacement,
					$ianmackenzie$elm_geometry$Block3d$axes(block)),
				dimensions: $ianmackenzie$elm_geometry$Block3d$dimensions(block)
			});
	});
var $ianmackenzie$elm_geometry$Block3d$translateIn = F3(
	function (direction, distance, block) {
		return A2(
			$ianmackenzie$elm_geometry$Block3d$translateBy,
			A2($ianmackenzie$elm_geometry$Vector3d$withLength, distance, direction),
			block);
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Update$moveCar = F4(
	function (car, cars, speed, model) {
		var event = A2(
			$elm$core$Maybe$withDefault,
			A3($author$project$Types$Event, $author$project$Types$Noop, 0, 0),
			car.event);
		var name = event.name;
		var horizontalAxis = function () {
			_v7$3:
			while (true) {
				if (name.$ === 'Drive') {
					switch (name.a.$) {
						case 'Up':
							var _v8 = name.a;
							return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$negativeX, car.center);
						case 'Down':
							var _v9 = name.a;
							return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$positiveX, car.center);
						case 'Left':
							var _v10 = name.a;
							return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$negativeY, car.center);
						default:
							break _v7$3;
					}
				} else {
					break _v7$3;
				}
			}
			return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$positiveY, car.center);
		}();
		var exPoint = A2(
			$ianmackenzie$elm_geometry$Point3d$along,
			horizontalAxis,
			$ianmackenzie$elm_units$Length$meters(speed));
		var examThis = function (cube) {
			return A2(
				$ianmackenzie$elm_units$Quantity$lessThan,
				$ianmackenzie$elm_units$Length$meters(1.99),
				A2($ianmackenzie$elm_geometry$Point3d$distanceFrom, exPoint, cube.center)) && A2(
				$ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo,
				$ianmackenzie$elm_units$Length$meters(0),
				A2($ianmackenzie$elm_geometry$Point3d$distanceFrom, exPoint, cube.center));
		};
		var newCenter = A2(
			$ianmackenzie$elm_geometry$Point3d$along,
			horizontalAxis,
			$ianmackenzie$elm_units$Length$meters(speed));
		var newThis = function () {
			_v2$4:
			while (true) {
				if (name.$ === 'Drive') {
					switch (name.a.$) {
						case 'Up':
							var _v3 = name.a;
							return A3(
								$ianmackenzie$elm_geometry$Block3d$translateIn,
								$ianmackenzie$elm_geometry$Direction3d$negativeX,
								$ianmackenzie$elm_units$Length$meters(speed),
								car._this);
						case 'Down':
							var _v4 = name.a;
							return A3(
								$ianmackenzie$elm_geometry$Block3d$translateIn,
								$ianmackenzie$elm_geometry$Direction3d$positiveX,
								$ianmackenzie$elm_units$Length$meters(speed),
								car._this);
						case 'Left':
							var _v5 = name.a;
							return A3(
								$ianmackenzie$elm_geometry$Block3d$translateIn,
								$ianmackenzie$elm_geometry$Direction3d$negativeY,
								$ianmackenzie$elm_units$Length$meters(speed),
								car._this);
						case 'Right':
							var _v6 = name.a;
							return A3(
								$ianmackenzie$elm_geometry$Block3d$translateIn,
								$ianmackenzie$elm_geometry$Direction3d$positiveY,
								$ianmackenzie$elm_units$Length$meters(speed),
								car._this);
						default:
							break _v2$4;
					}
				} else {
					break _v2$4;
				}
			}
			return car._this;
		}();
		var dirSelf = function () {
			var _v0 = model.self.event;
			if (_v0.$ === 'Nothing') {
				return $author$project$Types$R;
			} else {
				var selfEvent = _v0.a;
				var _v1 = selfEvent.name;
				if (_v1.$ === 'Rotate') {
					var dir = _v1.a;
					return dir;
				} else {
					return $author$project$Types$R;
				}
			}
		}();
		var preSelf = (!_Utils_eq(model.self.event, $elm$core$Maybe$Nothing)) ? A2($author$project$Event$stampBlock, dirSelf, model.self) : model.self;
		var carsExceptSelf = A2(
			$elm$core$List$filter,
			function (everyCar) {
				return !_Utils_eq(everyCar, car);
			},
			cars);
		return (A2(
			$elm$core$List$any,
			examThis,
			_Utils_ap(
				carsExceptSelf,
				_List_fromArray(
					[model.self, preSelf]))) && _Utils_eq(model.world, $author$project$Types$Reversed)) ? car : ((A2(
			$elm$core$List$any,
			examThis,
			_Utils_ap(
				carsExceptSelf,
				_List_fromArray(
					[model.self, preSelf]))) && (!_Utils_eq(model.self.event, $elm$core$Maybe$Nothing))) ? car : _Utils_update(
			car,
			{center: newCenter, _this: newThis}));
	});
var $author$project$Update$moveCars = F3(
	function (cars, speed, model) {
		return A2(
			$elm$core$List$map,
			function (car) {
				return A4($author$project$Update$moveCar, car, cars, speed, model);
			},
			cars);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Update$transformCar = F2(
	function (car, walls) {
		var wallNear = A2(
			$elm$core$List$filter,
			function (block) {
				return A4(
					$author$project$Update$examDistance,
					block,
					car,
					$ianmackenzie$elm_units$Length$meters(2),
					$ianmackenzie$elm_units$Length$meters(0));
			},
			walls);
		var wall = A2(
			$elm$core$Maybe$withDefault,
			car,
			$elm$core$List$head(wallNear));
		var distance = A2($ianmackenzie$elm_geometry$Point3d$distanceFrom, wall.center, car.center);
		var comp = $ianmackenzie$elm_units$Quantity$half(
			$ianmackenzie$elm_units$Length$meters(2));
		var vec = A3($ianmackenzie$elm_geometry$Vector3d$xyz, comp, comp, comp);
		var _v0 = A2($ianmackenzie$elm_geometry$Point3d$toTuple, $ianmackenzie$elm_units$Length$inInches, wall.center);
		var x1 = _v0.a;
		var y1 = _v0.b;
		var z1 = _v0.c;
		var _v1 = A2($ianmackenzie$elm_geometry$Point3d$toTuple, $ianmackenzie$elm_units$Length$inInches, car.center);
		var x = _v1.a;
		var y = _v1.b;
		var z = _v1.c;
		var moveVector = (_Utils_cmp(x1, x) < 0) ? A3(
			$ianmackenzie$elm_geometry$Vector3d$xyz,
			A2(
				$ianmackenzie$elm_units$Quantity$minus,
				distance,
				$ianmackenzie$elm_units$Length$meters(2)),
			$ianmackenzie$elm_units$Length$meters(0),
			$ianmackenzie$elm_units$Length$meters(0)) : A3(
			$ianmackenzie$elm_geometry$Vector3d$xyz,
			A2(
				$ianmackenzie$elm_units$Quantity$minus,
				$ianmackenzie$elm_units$Length$meters(2),
				distance),
			$ianmackenzie$elm_units$Length$meters(0),
			$ianmackenzie$elm_units$Length$meters(0));
		var v1 = (_Utils_cmp(x1, x) > -1) ? A2(
			$ianmackenzie$elm_geometry$Point3d$translateBy,
			moveVector,
			A2($ianmackenzie$elm_geometry$Point3d$translateBy, vec, car.center)) : A2($ianmackenzie$elm_geometry$Point3d$translateBy, vec, car.center);
		var v2 = (_Utils_cmp(x1, x) < 0) ? A2(
			$ianmackenzie$elm_geometry$Point3d$translateBy,
			moveVector,
			A2(
				$ianmackenzie$elm_geometry$Point3d$translateBy,
				$ianmackenzie$elm_geometry$Vector3d$reverse(vec),
				car.center)) : A2(
			$ianmackenzie$elm_geometry$Point3d$translateBy,
			$ianmackenzie$elm_geometry$Vector3d$reverse(vec),
			car.center);
		return (A2(
			$ianmackenzie$elm_units$Quantity$lessThan,
			$ianmackenzie$elm_units$Length$meters(2),
			distance) && A2(
			$ianmackenzie$elm_units$Quantity$greaterThan,
			$ianmackenzie$elm_units$Length$meters(0),
			distance)) ? A5(
			$author$project$Types$Block,
			A2($ianmackenzie$elm_geometry$Block3d$from, v1, v2),
			car.center,
			car.color,
			car.event,
			car.dirBefore) : car;
	});
var $author$project$Update$transformCars = F2(
	function (cars, walls) {
		return A2(
			$elm$core$List$map,
			function (car) {
				return A2($author$project$Update$transformCar, car, walls);
			},
			cars);
	});
var $author$project$Update$updateCarsInLine = F6(
	function (cars, model, begin, end, dir, speed) {
		var horizontalAxis = function () {
			switch (dir.$) {
				case 'Up':
					return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$negativeX, end);
				case 'Down':
					return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$positiveX, end);
				case 'Left':
					return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$negativeY, end);
				default:
					return A2($ianmackenzie$elm_geometry$Axis3d$withDirection, $ianmackenzie$elm_geometry$Direction3d$positiveY, end);
			}
		}();
		var endRange = A2(
			$ianmackenzie$elm_geometry$Point3d$along,
			horizontalAxis,
			$ianmackenzie$elm_units$Length$meters(speed));
		var createdCars = A5($author$project$Update$createCars, cars, model.time, model.carPeriod, dir, begin);
		var movedCars = A3($author$project$Update$moveCars, createdCars, speed, model);
		var deletedCars = function () {
			switch (dir.$) {
				case 'Up':
					return A3($author$project$Update$deleteCars, movedCars, endRange, end);
				case 'Down':
					return A3($author$project$Update$deleteCars, movedCars, end, endRange);
				case 'Left':
					return A3($author$project$Update$deleteCars, movedCars, endRange, end);
				default:
					return A3($author$project$Update$deleteCars, movedCars, end, endRange);
			}
		}();
		var newCars = A2($author$project$Update$transformCars, deletedCars, model.wall);
		return newCars;
	});
var $author$project$Update$updateCars = F2(
	function (speed, model) {
		var cars4 = A2(
			$elm$core$List$filter,
			function (car) {
				return $ianmackenzie$elm_geometry$Point3d$toMeters(car.center).y === 15;
			},
			model.cars);
		var newCars4 = A6(
			$author$project$Update$updateCarsInLine,
			cars4,
			model,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 11, 15, 1),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -11, 15, 1),
			$author$project$Types$Up,
			speed);
		var cars3 = A2(
			$elm$core$List$filter,
			function (car) {
				return $ianmackenzie$elm_geometry$Point3d$toMeters(car.center).y === 9;
			},
			model.cars);
		var newCars3 = A6(
			$author$project$Update$updateCarsInLine,
			cars3,
			model,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -11, 9, 1),
			A3($ianmackenzie$elm_geometry$Point3d$meters, 11, 9, 1),
			$author$project$Types$Down,
			speed);
		var cars2 = A2(
			$elm$core$List$filter,
			function (car) {
				return _Utils_eq(
					$ianmackenzie$elm_geometry$Point3d$toMeters(car.center).y,
					-9);
			},
			model.cars);
		var newCars2 = A6(
			$author$project$Update$updateCarsInLine,
			cars2,
			model,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 11, -9, 1),
			A3($ianmackenzie$elm_geometry$Point3d$meters, -11, -9, 1),
			$author$project$Types$Up,
			speed);
		var cars1 = A2(
			$elm$core$List$filter,
			function (car) {
				return _Utils_eq(
					$ianmackenzie$elm_geometry$Point3d$toMeters(car.center).y,
					-15);
			},
			model.cars);
		var newCars1 = A6(
			$author$project$Update$updateCarsInLine,
			cars1,
			model,
			A3($ianmackenzie$elm_geometry$Point3d$meters, -11, -15, 1),
			A3($ianmackenzie$elm_geometry$Point3d$meters, 11, -15, 1),
			$author$project$Types$Down,
			speed);
		var cars = _Utils_ap(
			newCars1,
			_Utils_ap(
				newCars2,
				_Utils_ap(newCars3, newCars4)));
		var _v0 = (A2(
			$elm$core$List$any,
			function (block) {
				return A4(
					$author$project$Update$examDistance,
					block,
					model.self,
					$ianmackenzie$elm_units$Length$meters(1.99),
					$ianmackenzie$elm_units$Length$meters(0));
			},
			cars) && _Utils_eq(model.world, $author$project$Types$Normal)) ? _Utils_Tuple2($author$project$Types$Lose, model.level3Lock + 1) : _Utils_Tuple2(model.gameStatus, model.level3Lock);
		var newStatus = _v0.a;
		var newLock = _v0.b;
		return (model.level === 3) ? _Utils_update(
			model,
			{cars: cars, gameStatus: newStatus, level3Lock: newLock}) : model;
	});
var $author$project$Update$updateText3dPosition = F2(
	function (duration, text3d) {
		if ((text3d.time < 0) || (_Utils_cmp(text3d.time, duration) > -1)) {
			return text3d;
		} else {
			var h = 2;
			var z = h * (1 - $elm$core$Basics$sqrt(
				$elm$core$Basics$sin(((text3d.time / duration) * $elm$core$Basics$pi) / 2)));
			var newAnchor = A3(
				$ianmackenzie$elm_geometry$Point3d$translateIn,
				$ianmackenzie$elm_geometry$Direction3d$z,
				$ianmackenzie$elm_units$Length$meters(z),
				text3d.anchor);
			var entities = A4(
				$author$project$Types$text3d,
				text3d.str,
				newAnchor,
				text3d.scale,
				{a: text3d.rot, b: 0, c: 0});
			var newEntities = A3(
				$ianmackenzie$elm_3d_scene$Scene3d$translateIn,
				$ianmackenzie$elm_geometry$Direction3d$positiveZ,
				$ianmackenzie$elm_units$Length$meters(z),
				entities);
			return _Utils_update(
				text3d,
				{entities: newEntities, time: text3d.time + 1});
		}
	});
var $author$project$Update$updateText3dPositionAdvanced = F2(
	function (duration, text3d) {
		if (text3d.time < 0) {
			return text3d;
		} else {
			if ((_Utils_cmp(text3d.time, duration) > 0) && (_Utils_cmp(text3d.time, 9 * duration) < 0)) {
				return _Utils_update(
					text3d,
					{time: text3d.time + 1});
			} else {
				if ((text3d.time >= 0) && (_Utils_cmp(text3d.time, duration) < 1)) {
					var h = 2;
					var z = h * (1 - $elm$core$Basics$sqrt(
						$elm$core$Basics$sin(((text3d.time / duration) * $elm$core$Basics$pi) / 2)));
					var newAnchor = A3(
						$ianmackenzie$elm_geometry$Point3d$translateIn,
						$ianmackenzie$elm_geometry$Direction3d$z,
						$ianmackenzie$elm_units$Length$meters(z),
						text3d.anchor);
					var entities = A4(
						$author$project$Types$text3d,
						text3d.str,
						newAnchor,
						text3d.scale,
						{a: text3d.rot, b: 0, c: 0});
					var newEntities = A3(
						$ianmackenzie$elm_3d_scene$Scene3d$translateIn,
						$ianmackenzie$elm_geometry$Direction3d$positiveZ,
						$ianmackenzie$elm_units$Length$meters(z),
						entities);
					return _Utils_update(
						text3d,
						{entities: newEntities, time: text3d.time + 1});
				} else {
					if (_Utils_cmp(text3d.time, 10 * duration) > 0) {
						return _Utils_update(
							text3d,
							{time: -1});
					} else {
						var newTime = (10 * duration) - text3d.time;
						var h = 2;
						var z = h * (1 - $elm$core$Basics$sqrt(
							$elm$core$Basics$sin(((newTime / duration) * $elm$core$Basics$pi) / 2)));
						var newAnchor = A3(
							$ianmackenzie$elm_geometry$Point3d$translateIn,
							$ianmackenzie$elm_geometry$Direction3d$z,
							$ianmackenzie$elm_units$Length$meters(z),
							text3d.anchor);
						var entities = A4(
							$author$project$Types$text3d,
							text3d.str,
							newAnchor,
							text3d.scale,
							{a: text3d.rot, b: 0, c: 0});
						var newEntities = A3(
							$ianmackenzie$elm_3d_scene$Scene3d$translateIn,
							$ianmackenzie$elm_geometry$Direction3d$positiveZ,
							$ianmackenzie$elm_units$Length$meters(z),
							entities);
						return _Utils_update(
							text3d,
							{entities: newEntities, time: text3d.time + 1});
					}
				}
			}
		}
	});
var $author$project$Update$updateText3dPositionAdvancedRot = F2(
	function (duration, text3d) {
		if (text3d.time < 0) {
			return text3d;
		} else {
			if ((_Utils_cmp(text3d.time, duration) > 0) && (_Utils_cmp(text3d.time, 9 * duration) < 0)) {
				return _Utils_update(
					text3d,
					{time: text3d.time + 1});
			} else {
				if ((text3d.time >= 0) && (_Utils_cmp(text3d.time, duration) < 1)) {
					var h = 2;
					var z = h * (1 - $elm$core$Basics$sqrt(
						$elm$core$Basics$sin(((text3d.time / duration) * $elm$core$Basics$pi) / 2)));
					var newAnchor = A3(
						$ianmackenzie$elm_geometry$Point3d$translateIn,
						$ianmackenzie$elm_geometry$Direction3d$z,
						$ianmackenzie$elm_units$Length$meters(z),
						text3d.anchor);
					var entities = A4(
						$author$project$Types$text3d,
						text3d.str,
						newAnchor,
						text3d.scale,
						{a: text3d.rot, b: 0, c: -90});
					var newEntities = A3(
						$ianmackenzie$elm_3d_scene$Scene3d$translateIn,
						$ianmackenzie$elm_geometry$Direction3d$positiveZ,
						$ianmackenzie$elm_units$Length$meters(z),
						entities);
					return _Utils_update(
						text3d,
						{entities: newEntities, time: text3d.time + 1});
				} else {
					if (_Utils_cmp(text3d.time, 10 * duration) > 0) {
						return _Utils_update(
							text3d,
							{time: -1});
					} else {
						var newTime = (10 * duration) - text3d.time;
						var h = 2;
						var z = h * (1 - $elm$core$Basics$sqrt(
							$elm$core$Basics$sin(((newTime / duration) * $elm$core$Basics$pi) / 2)));
						var newAnchor = A3(
							$ianmackenzie$elm_geometry$Point3d$translateIn,
							$ianmackenzie$elm_geometry$Direction3d$z,
							$ianmackenzie$elm_units$Length$meters(z),
							text3d.anchor);
						var entities = A4(
							$author$project$Types$text3d,
							text3d.str,
							newAnchor,
							text3d.scale,
							{a: text3d.rot, b: 0, c: -90});
						var newEntities = A3(
							$ianmackenzie$elm_3d_scene$Scene3d$translateIn,
							$ianmackenzie$elm_geometry$Direction3d$positiveZ,
							$ianmackenzie$elm_units$Length$meters(z),
							entities);
						return _Utils_update(
							text3d,
							{entities: newEntities, time: text3d.time + 1});
					}
				}
			}
		}
	});
var $author$project$Update$updateTexts3d = function (model) {
	var _v0 = function () {
		var _v1 = model.level;
		switch (_v1) {
			case 0:
				return _Utils_Tuple2(
					A2(
						$elm$core$List$map,
						$author$project$Update$updateText3dPosition(60),
						model.texts3d),
					A2(
						$elm$core$List$map,
						$author$project$Update$updateText3dPosition(60),
						model.texts3dRev));
			case 2:
				return _Utils_Tuple2(
					A2(
						$elm$core$List$map,
						$author$project$Update$updateText3dPosition(40),
						model.texts3d),
					A2(
						$elm$core$List$map,
						$author$project$Update$updateText3dPosition(40),
						model.texts3dRev));
			case 3:
				var _v2 = model.gameStatus;
				if (_v2.$ === 'Interlude') {
					return _Utils_Tuple2(
						A2(
							$elm$core$List$map,
							$author$project$Update$updateText3dPositionAdvanced(200),
							model.texts3d),
						A2(
							$elm$core$List$map,
							$author$project$Update$updateText3dPositionAdvanced(200),
							model.texts3dRev));
				} else {
					return _Utils_Tuple2(
						A2(
							$elm$core$List$map,
							$author$project$Update$updateText3dPositionAdvanced(40),
							model.texts3d),
						A2(
							$elm$core$List$map,
							$author$project$Update$updateText3dPositionAdvanced(40),
							model.texts3dRev));
				}
			case 4:
				var _v3 = model.gameStatus;
				if (_v3.$ === 'Interlude') {
					return _Utils_Tuple2(
						A2(
							$elm$core$List$map,
							$author$project$Update$updateText3dPosition(100),
							model.texts3d),
						A2(
							$elm$core$List$map,
							$author$project$Update$updateText3dPosition(100),
							model.texts3dRev));
				} else {
					return _Utils_Tuple2(
						A2(
							$elm$core$List$map,
							$author$project$Update$updateText3dPositionAdvanced(40),
							model.texts3d),
						A2(
							$elm$core$List$map,
							$author$project$Update$updateText3dPositionAdvanced(40),
							model.texts3dRev));
				}
			case 6:
				return model.level6Lock ? _Utils_Tuple2(
					A2(
						$elm$core$List$map,
						$author$project$Update$updateText3dPositionAdvancedRot(100),
						model.texts3d),
					A2(
						$elm$core$List$map,
						$author$project$Update$updateText3dPositionAdvancedRot(100),
						model.texts3dRev)) : _Utils_Tuple2(
					A2(
						$elm$core$List$map,
						$author$project$Update$updateText3dPositionAdvanced(40),
						model.texts3d),
					A2(
						$elm$core$List$map,
						$author$project$Update$updateText3dPositionAdvanced(40),
						model.texts3dRev));
			default:
				return _Utils_Tuple2(
					A2(
						$elm$core$List$map,
						$author$project$Update$updateText3dPositionAdvanced(40),
						model.texts3d),
					A2(
						$elm$core$List$map,
						$author$project$Update$updateText3dPositionAdvanced(40),
						model.texts3dRev));
		}
	}();
	var newTexts3d = _v0.a;
	var newTexts3dRev = _v0.b;
	return _Utils_update(
		model,
		{texts3d: newTexts3d, texts3dRev: newTexts3dRev});
};
var $author$project$Update$updateInterlude3 = F6(
	function (time, duration, originalElevation, originalDistance, originalAzimuth, model) {
		var text3 = {
			content: 'They accept me.',
			event: {duration: 200, init: 0, name: $author$project$Types$Noop},
			left: 65,
			opacity: 0,
			size: 1,
			top: 65
		};
		var text2 = {
			content: 'The world is reversed. I see another world. It\'s the inner world of people.',
			event: {duration: 320, init: 0, name: $author$project$Types$Noop},
			left: 65,
			opacity: 0,
			size: 1,
			top: 65
		};
		var text1 = {
			content: '... is there really no one who wants to stop for me?',
			event: {duration: 320, init: 0, name: $author$project$Types$Noop},
			left: 65,
			opacity: 0,
			size: 1,
			top: 65
		};
		var tartgetAzimuth = $ianmackenzie$elm_units$Angle$degrees(-58);
		var targetElevation = $ianmackenzie$elm_units$Angle$degrees(40);
		var targetDistance = $ianmackenzie$elm_units$Length$meters(50);
		var ratio = 0.15;
		var oldCamera = model.camera;
		var _v0 = (_Utils_cmp(time, duration) > -1) ? _Utils_Tuple2($author$project$Types$Play, $author$project$Types$Reversed) : _Utils_Tuple2(
			A5($author$project$Types$Interlude, time + 1, duration, originalElevation, originalDistance, originalAzimuth),
			$author$project$Types$Normal);
		var newGameStatus = _v0.a;
		var newWorld = _v0.b;
		var _v1 = (_Utils_cmp(time, ratio * duration) < 1) ? _Utils_Tuple3(
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				originalElevation,
				A2(
					$ianmackenzie$elm_units$Quantity$multiplyBy,
					($elm$core$Basics$sin((((time / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
					A2($ianmackenzie$elm_units$Quantity$minus, originalElevation, targetElevation))),
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				originalDistance,
				A2(
					$ianmackenzie$elm_units$Quantity$multiplyBy,
					($elm$core$Basics$sin((((time / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
					A2($ianmackenzie$elm_units$Quantity$minus, originalDistance, targetDistance))),
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				originalAzimuth,
				A2(
					$ianmackenzie$elm_units$Quantity$multiplyBy,
					($elm$core$Basics$sin((((time / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
					A2($ianmackenzie$elm_units$Quantity$minus, originalAzimuth, tartgetAzimuth)))) : ((_Utils_cmp(time, (1 - ratio) * duration) > -1) ? _Utils_Tuple3(
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				originalElevation,
				A2(
					$ianmackenzie$elm_units$Quantity$multiplyBy,
					($elm$core$Basics$sin(((((duration - time) / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
					A2($ianmackenzie$elm_units$Quantity$minus, originalElevation, targetElevation))),
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				originalDistance,
				A2(
					$ianmackenzie$elm_units$Quantity$multiplyBy,
					($elm$core$Basics$sin(((((duration - time) / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
					A2($ianmackenzie$elm_units$Quantity$minus, originalDistance, targetDistance))),
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				originalAzimuth,
				A2(
					$ianmackenzie$elm_units$Quantity$multiplyBy,
					($elm$core$Basics$sin(((((duration - time) / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
					A2($ianmackenzie$elm_units$Quantity$minus, originalAzimuth, tartgetAzimuth)))) : _Utils_Tuple3(oldCamera.elevation, oldCamera.distance, oldCamera.azimuth));
		var newElevation = _v1.a;
		var newDistance = _v1.b;
		var newAzimuth = _v1.c;
		var newCamera = _Utils_update(
			oldCamera,
			{azimuth: newAzimuth, distance: newDistance, elevation: newElevation});
		var newModel = $author$project$Update$updateText(
			$author$project$Update$updateTexts3d(
				A2(
					$author$project$Update$updateCars,
					0.02,
					_Utils_update(
						model,
						{camera: newCamera, gameStatus: newGameStatus, level3Lock: -1, time: model.time + 1, world: newWorld}))));
		var newNewModel = (time === 200) ? A2($author$project$Update$makeText, newModel, text1) : ((time === 510) ? A2($author$project$Update$makeText, newModel, text2) : ((time === 820) ? A2($author$project$Update$makeText, newModel, text3) : newModel));
		return newNewModel;
	});
var $ianmackenzie$elm_geometry$Vector3d$scaleBy = F2(
	function (k, _v0) {
		var v = _v0.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: k * v.x, y: k * v.y, z: k * v.z});
	});
var $ianmackenzie$elm_geometry$Vector3d$xyOn = F3(
	function (_v0, _v1, _v2) {
		var sketchPlane = _v0.a;
		var x = _v1.a;
		var y = _v2.a;
		var _v3 = sketchPlane.yDirection;
		var j = _v3.a;
		var _v4 = sketchPlane.xDirection;
		var i = _v4.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: (x * i.x) + (y * j.x), y: (x * i.y) + (y * j.y), z: (x * i.z) + (y * j.z)});
	});
var $author$project$Update$updateInterlude4 = F6(
	function (time, duration, originalElevation, originalDistance, originalAzimuth, model) {
		var text3d2 = _List_fromArray(
			[
				A7(
				$author$project$Types$buildText3d,
				'i love you',
				A3($ianmackenzie$elm_geometry$Point3d$meters, 48, 9, 1),
				A3($ianmackenzie$elm_geometry$Point3d$meters, 53, 5, 1),
				0.2,
				-90,
				$avh4$elm_color$Color$white,
				0)
			]);
		var text3d1 = _List_fromArray(
			[
				A7(
				$author$project$Types$buildText3d,
				'me too',
				A3($ianmackenzie$elm_geometry$Point3d$meters, 67, 2, 1),
				A3($ianmackenzie$elm_geometry$Point3d$meters, 57, 5, -1),
				0.3,
				180,
				$avh4$elm_color$Color$white,
				0)
			]);
		var text1 = {
			content: 'I finally tell you.',
			event: {duration: 200, init: 0, name: $author$project$Types$Noop},
			left: 46,
			opacity: 0,
			size: 1,
			top: 49
		};
		var tartgetAzimuth = $ianmackenzie$elm_units$Angle$degrees(217);
		var targetElevation = $ianmackenzie$elm_units$Angle$degrees(37);
		var targetDistance = $ianmackenzie$elm_units$Length$meters(50);
		var ratio = 0.25;
		var originalFocalPoint = model.goal.center;
		var oldCamera = model.camera;
		var newGameStatus = (_Utils_cmp(time, duration) > -1) ? model.gameStatus : A5($author$project$Types$Interlude, time + 1, duration, originalElevation, originalDistance, originalAzimuth);
		var newFocalPoint = (_Utils_cmp(time, ratio * duration) < 1) ? A2(
			$ianmackenzie$elm_geometry$Point3d$translateBy,
			A2(
				$ianmackenzie$elm_geometry$Vector3d$scaleBy,
				($elm$core$Basics$sin((((time / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
				A3(
					$ianmackenzie$elm_geometry$Vector3d$xyOn,
					$ianmackenzie$elm_geometry$SketchPlane3d$xy,
					$ianmackenzie$elm_units$Length$meters(3),
					$ianmackenzie$elm_units$Length$meters(-4))),
			originalFocalPoint) : oldCamera.focalPoint;
		var _v0 = (_Utils_cmp(time, ratio * duration) < 1) ? _Utils_Tuple3(
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				originalElevation,
				A2(
					$ianmackenzie$elm_units$Quantity$multiplyBy,
					($elm$core$Basics$sin((((time / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
					A2($ianmackenzie$elm_units$Quantity$minus, originalElevation, targetElevation))),
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				originalDistance,
				A2(
					$ianmackenzie$elm_units$Quantity$multiplyBy,
					($elm$core$Basics$sin((((time / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
					A2($ianmackenzie$elm_units$Quantity$minus, originalDistance, targetDistance))),
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				originalAzimuth,
				A2(
					$ianmackenzie$elm_units$Quantity$multiplyBy,
					($elm$core$Basics$sin((((time / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
					A2($ianmackenzie$elm_units$Quantity$minus, originalAzimuth, tartgetAzimuth)))) : _Utils_Tuple3(oldCamera.elevation, oldCamera.distance, oldCamera.azimuth);
		var newElevation = _v0.a;
		var newDistance = _v0.b;
		var newAzimuth = _v0.c;
		var newCamera = _Utils_update(
			oldCamera,
			{azimuth: newAzimuth, distance: newDistance, elevation: newElevation, focalPoint: newFocalPoint});
		var _v1 = (!time) ? _Utils_Tuple3(_List_Nil, _List_Nil, $elm$core$Platform$Cmd$none) : ((time === 320) ? _Utils_Tuple3(
			text3d2,
			text3d2,
			$author$project$Ports$playSound('reverse_1')) : ((time === 510) ? _Utils_Tuple3(
			_Utils_ap(model.texts3d, text3d1),
			_Utils_ap(model.texts3dRev, text3d1),
			$author$project$Ports$playSound('reverse_3')) : ((time === 700) ? _Utils_Tuple3(
			model.texts3d,
			model.texts3dRev,
			$author$project$Ports$playSound('reverse_5')) : _Utils_Tuple3(model.texts3d, model.texts3dRev, $elm$core$Platform$Cmd$none))));
		var newTexts3d = _v1.a;
		var rev = _v1.b;
		var msg = _v1.c;
		var newModel = (time === 750) ? $author$project$Update$updateText(
			$author$project$Update$updateTexts3d(
				A2(
					$author$project$Update$makeText,
					_Utils_update(
						model,
						{camera: newCamera, gameStatus: newGameStatus, texts3d: newTexts3d, texts3dRev: rev, time: model.time + 1}),
					text1))) : $author$project$Update$updateText(
			$author$project$Update$updateTexts3d(
				_Utils_update(
					model,
					{camera: newCamera, gameStatus: newGameStatus, texts3d: newTexts3d, texts3dRev: rev, time: model.time + 1})));
		return (_Utils_cmp(time, duration) > -1) ? $author$project$Update$reInit(
			_Utils_update(
				model,
				{level: 6})) : _Utils_Tuple2(newModel, msg);
	});
var $author$project$Update$updateInterlude6 = F6(
	function (time, duration, originalElevation, originalDistance, originalAzimuth, model) {
		var tartgetAzimuth = $ianmackenzie$elm_units$Angle$degrees(-90);
		var targetElevation = $ianmackenzie$elm_units$Angle$degrees(10);
		var targetDistance = $ianmackenzie$elm_units$Length$meters(20);
		var ratio = 1;
		var oldCamera = model.camera;
		var newGameStatus = (_Utils_cmp(time, duration) > -1) ? $author$project$Types$Play : A5($author$project$Types$Interlude, time + 1, duration, originalElevation, originalDistance, originalAzimuth);
		var _v0 = _Utils_Tuple3(
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				originalElevation,
				A2(
					$ianmackenzie$elm_units$Quantity$multiplyBy,
					($elm$core$Basics$sin((((time / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
					A2($ianmackenzie$elm_units$Quantity$minus, originalElevation, targetElevation))),
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				originalDistance,
				A2(
					$ianmackenzie$elm_units$Quantity$multiplyBy,
					($elm$core$Basics$sin((((time / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
					A2($ianmackenzie$elm_units$Quantity$minus, originalDistance, targetDistance))),
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				originalAzimuth,
				A2(
					$ianmackenzie$elm_units$Quantity$multiplyBy,
					($elm$core$Basics$sin((((time / duration) / ratio) * $elm$core$Basics$pi) - ($elm$core$Basics$pi / 2)) + 1) / 2,
					A2($ianmackenzie$elm_units$Quantity$minus, originalAzimuth, tartgetAzimuth))));
		var newElevation = _v0.a;
		var newDistance = _v0.b;
		var newAzimuth = _v0.c;
		var newCamera = _Utils_update(
			oldCamera,
			{azimuth: newAzimuth, distance: newDistance, elevation: newElevation});
		return _Utils_update(
			model,
			{camera: newCamera, gameStatus: newGameStatus});
	});
var $author$project$Update$updateKey = F2(
	function (key, model) {
		var original = function () {
			switch (key.$) {
				case 'Up':
					return 0;
				case 'Left':
					return 1;
				case 'Down':
					return 2;
				case 'Right':
					return 3;
				default:
					return 1;
			}
		}();
		var azimuth = model.camera.azimuth;
		var cos = $ianmackenzie$elm_units$Angle$cos(azimuth);
		var sin = $ianmackenzie$elm_units$Angle$sin(azimuth);
		var _switch = (cos > 0.707) ? 0 : (((sin > 0) && (_Utils_cmp(cos, -0.707) > 0)) ? 1 : ((_Utils_cmp(cos, -0.707) < 0) ? 2 : 3));
		var after = A2($elm$core$Basics$modBy, 4, _switch + original);
		switch (after) {
			case 0:
				return $author$project$Types$Up;
			case 1:
				return $author$project$Types$Left;
			case 2:
				return $author$project$Types$Down;
			default:
				return $author$project$Types$Right;
		}
	});
var $author$project$Update$switchLevel = function (level) {
	switch (level) {
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 0;
		default:
			return level;
	}
};
var $ianmackenzie$elm_geometry$Point3d$toRecord = F2(
	function (fromQuantity, point) {
		return {
			x: fromQuantity(
				$ianmackenzie$elm_geometry$Point3d$xCoordinate(point)),
			y: fromQuantity(
				$ianmackenzie$elm_geometry$Point3d$yCoordinate(point)),
			z: fromQuantity(
				$ianmackenzie$elm_geometry$Point3d$zCoordinate(point))
		};
	});
var $avh4$elm_color$Color$rgb = F3(
	function (r, g, b) {
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, 1.0);
	});
var $author$project$Update$updateBackground = function (model) {
	var scene = model.scene;
	var colorNumber = 1 - (model.time / 1500);
	var newBackground = A3($avh4$elm_color$Color$rgb, colorNumber, colorNumber, colorNumber);
	var newScene = _Utils_update(
		scene,
		{background: newBackground});
	return (model.level === 2) ? _Utils_update(
		model,
		{scene: newScene}) : model;
};
var $author$project$Update$turn = function (camera) {
	var newElevation = A2(
		$ianmackenzie$elm_units$Quantity$minus,
		$ianmackenzie$elm_units$Angle$degrees(6),
		camera.elevation);
	return _Utils_update(
		camera,
		{elevation: newElevation});
};
var $author$project$Update$updateGEvents = function (model) {
	var _v0 = model.event;
	if (_v0.$ === 'Nothing') {
		return model;
	} else {
		var event = _v0.a;
		var _v1 = event.name;
		if (_v1.$ === 'Reverse') {
			var t = model.time - event.init;
			var newEvent = A2($author$project$Event$updateEvent, model.time, event);
			if (t < 5) {
				var newCam = $author$project$Update$turn(model.camera);
				return _Utils_update(
					model,
					{camera: newCam});
			} else {
				if (t < 35) {
					var self = model.self;
					var newBlock = A3(
						$ianmackenzie$elm_geometry$Block3d$translateIn,
						$ianmackenzie$elm_geometry$Direction3d$positiveZ,
						$ianmackenzie$elm_units$Length$meters((0.02 * (t - 5)) - (1041 / 2900)),
						self._this);
					var newSelf = _Utils_update(
						self,
						{_this: newBlock});
					return _Utils_update(
						model,
						{event: newEvent, self: newSelf});
				} else {
					if (t < 55) {
						return _Utils_update(
							model,
							{event: newEvent});
					} else {
						if (t < 80) {
							var newCam = $author$project$Update$turn(model.camera);
							return _Utils_update(
								model,
								{camera: newCam});
						} else {
							if (t === 80) {
								var self = model.self;
								var newWorld = _Utils_eq(model.world, $author$project$Types$Reversed) ? $author$project$Types$Normal : $author$project$Types$Reversed;
								var newCam = $author$project$Update$turn(model.camera);
								var newBlock = $author$project$Types$buildBlock(self.center);
								var newSelf = _Utils_update(
									self,
									{_this: newBlock});
								return _Utils_update(
									model,
									{camera: newCam, enableKey: true, event: newEvent, self: newSelf, world: newWorld});
							} else {
								return model;
							}
						}
					}
				}
			}
		} else {
			return model;
		}
	}
};
var $author$project$Update$updateLevel0Text = function (model) {
	var text2 = {
		content: 'Press ESC to setup menu.',
		event: {duration: 200, init: 0, name: $author$project$Types$Noop},
		left: 46,
		opacity: 0,
		size: 0.7,
		top: 10
	};
	var text1 = {
		content: 'Press WASD to move.',
		event: {duration: 200, init: 0, name: $author$project$Types$Noop},
		left: 46,
		opacity: 0,
		size: 0.7,
		top: 10
	};
	var t = model.time;
	return (((t === 150) || (t === 1000)) && (_Utils_eq(
		model.self.center,
		A3($ianmackenzie$elm_geometry$Point3d$meters, -1, -1, 1)) && (!model.level))) ? A2($author$project$Update$makeText, model, text1) : (((t === 500) && (!model.level)) ? A2($author$project$Update$makeText, model, text2) : model);
};
var $author$project$Update$updateLevel3Text = function (model) {
	var text3 = {
		content: 'Press R to reverse your mind.',
		event: {duration: 400, init: 0, name: $author$project$Types$Noop},
		left: 45,
		opacity: 0,
		size: 0.7,
		top: 10
	};
	var text2 = {
		content: 'Try to \'r\'everse your inner world.',
		event: {duration: 400, init: 0, name: $author$project$Types$Noop},
		left: 44,
		opacity: 0,
		size: 0.7,
		top: 10
	};
	var text1 = {
		content: 'Try to \'r\'everse your mind.',
		event: {duration: 400, init: 0, name: $author$project$Types$Noop},
		left: 45,
		opacity: 0,
		size: 0.7,
		top: 10
	};
	var t = model.time;
	return ((t === 700) && ((model.level3Lock <= 3) && ((model.level3Lock >= 0) && (model.level === 3)))) ? A2($author$project$Update$makeText, model, text1) : (((t === 2000) && ((model.level3Lock <= 3) && ((model.level3Lock >= 0) && (model.level === 3)))) ? A2($author$project$Update$makeText, model, text2) : (((t === 5000) && ((model.level3Lock <= 3) && ((model.level3Lock >= 0) && (model.level === 3)))) ? A2($author$project$Update$makeText, model, text3) : ((((t === 500) || (t === 1500)) && ((model.level3Lock > 3) && (model.level === 3))) ? A2($author$project$Update$makeText, model, text3) : model)));
};
var $avh4$elm_color$Color$fromRgba = function (components) {
	return A4($avh4$elm_color$Color$RgbaSpace, components.red, components.green, components.blue, components.alpha);
};
var $author$project$Update$level5ChangeColor = F2(
	function (rate, color) {
		var stamp = function (x) {
			return ((0 <= x) && (x <= 1)) ? x : ((x < 0) ? 0 : 1);
		};
		return $avh4$elm_color$Color$fromRgba(
			function (c) {
				return _Utils_update(
					c,
					{
						alpha: stamp(c.alpha),
						blue: stamp(c.blue),
						green: stamp(c.green),
						red: stamp(c.red)
					});
			}(
				function (c) {
					return _Utils_update(
						c,
						{alpha: c.alpha + (0.004 * rate), blue: c.blue + (0.0008 * rate), green: c.green + (0.004 * rate), red: c.red + (0.004 * rate)});
				}(
					$avh4$elm_color$Color$toRgba(color))));
	});
var $author$project$Update$updateLevel5onTime = function (model) {
	var self = model.self;
	var ifMeet = A2(
		$elm$core$List$any,
		function (block) {
			return A4(
				$author$project$Update$examDistance,
				block,
				self,
				$ianmackenzie$elm_units$Length$meters(2.2),
				$ianmackenzie$elm_units$Length$meters(1.9));
		},
		model.actives);
	var newColor = (_Utils_eq(model.world, $author$project$Types$Reversed) && ifMeet) ? A2($author$project$Update$level5ChangeColor, 5, self.color) : A2($author$project$Update$level5ChangeColor, -1, self.color);
	var newSelf = _Utils_update(
		self,
		{color: newColor});
	var ifEnd = 0.001 > $avh4$elm_color$Color$toRgba(newColor).alpha;
	return (model.level === 5) ? (ifEnd ? _Utils_update(
		model,
		{gameStatus: $author$project$Types$Lose}) : _Utils_update(
		model,
		{self: newSelf})) : model;
};
var $author$project$Update$updateLevel5 = function (model) {
	return $author$project$Update$updateLevel5onTime(model);
};
var $author$project$Level6$Model$buildStore = function (center) {
	var z = center.z;
	var y = center.y;
	var x = center.x;
	var block7 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 8, y - 6, z),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 10, y + 8, z + 8));
	var block6 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 10, y - 6, z),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 8, y + 6, z + 8));
	var block5 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 10, y + 6, z),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 10, y + 8, z + 8));
	var block4 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 2, y - 6, z + 4),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 2, y - 4, z + 8));
	var block3 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 10, y - 6, z),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 2, y - 4, z + 8));
	var block2 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 10, y - 6, z),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 2, y - 4, z + 8));
	var block1 = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, x - 10, y - 6, z + 7),
		A3($ianmackenzie$elm_geometry$Point3d$meters, x + 10, y + 6, z + 8));
	var blocks = A2(
		$elm$core$List$map,
		function (block) {
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow,
				$ianmackenzie$elm_3d_scene$Scene3d$Material$matte($avh4$elm_color$Color$gray),
				block);
		},
		_List_fromArray(
			[block1, block2, block3, block4, block5, block6, block7]));
	return A3(
		$elm$core$List$foldr,
		$elm$core$List$append,
		_List_Nil,
		_List_fromArray(
			[blocks]));
};
var $author$project$Update$updateLock = function (model) {
	var selfY = A2(
		$ianmackenzie$elm_units$Quantity$ratio,
		$ianmackenzie$elm_geometry$Point3d$yCoordinate(
			$ianmackenzie$elm_geometry$Block3d$centerPoint(model.self._this)),
		$ianmackenzie$elm_units$Length$meters(1));
	var newSettings = function () {
		var text1 = A4(
			$author$project$Types$text3d,
			'store',
			A3($ianmackenzie$elm_geometry$Point3d$meters, -3.5, 33.3, 5),
			0.25,
			{a: 270, b: 0, c: 0});
		var store = $author$project$Level6$Model$buildStore(
			A3($author$project$Types$Point, 0, 40, 0));
		var lamps = _List_fromArray(
			[
				A2(
				$author$project$Types$lamp,
				A3($ianmackenzie$elm_geometry$Point3d$meters, -8, -20, 0),
				0),
				A2(
				$author$project$Types$lamp,
				A3($ianmackenzie$elm_geometry$Point3d$meters, -8, 0, 0),
				0),
				A2(
				$author$project$Types$lamp,
				A3($ianmackenzie$elm_geometry$Point3d$meters, -8, 20, 0),
				0),
				A2(
				$author$project$Types$lamp,
				A3($ianmackenzie$elm_geometry$Point3d$meters, 8, -20, 0),
				180),
				A2(
				$author$project$Types$lamp,
				A3($ianmackenzie$elm_geometry$Point3d$meters, 8, 0, 0),
				180),
				A2(
				$author$project$Types$lamp,
				A3($ianmackenzie$elm_geometry$Point3d$meters, 8, 20, 0),
				180),
				A2(
				$author$project$Types$lamp,
				A3($ianmackenzie$elm_geometry$Point3d$meters, 8, -40, 0),
				180),
				A2(
				$author$project$Types$lamp,
				A3($ianmackenzie$elm_geometry$Point3d$meters, -8, -40, 0),
				0),
				A2(
				$author$project$Types$lamp,
				A3($ianmackenzie$elm_geometry$Point3d$meters, 8, -60, 0),
				180),
				A2(
				$author$project$Types$lamp,
				A3($ianmackenzie$elm_geometry$Point3d$meters, -8, -60, 0),
				0),
				A2(
				$author$project$Types$lamp,
				A3($ianmackenzie$elm_geometry$Point3d$meters, 6, -100, 0),
				180)
			]);
		return $ianmackenzie$elm_3d_scene$Scene3d$group(
			_Utils_ap(
				store,
				_Utils_ap(
					lamps,
					_List_fromArray(
						[text1]))));
	}();
	return (_Utils_eq(selfY, -99) && model.level6Lock) ? _Utils_update(
		model,
		{
			gameStatus: A5($author$project$Types$Interlude, 0, 300, model.camera.elevation, model.camera.distance, model.camera.azimuth),
			level6Lock: false,
			settings: newSettings
		}) : model;
};
var $author$project$Update$updateLevel6 = function (model) {
	return (model.level !== 6) ? model : $author$project$Update$updateLock(model);
};
var $author$project$Update$findFallText = F2(
	function (text3d, _v0) {
		var model = _v0.a;
		var list = _v0.b;
		return (_Utils_eq(text3d.time, -2) && (A2(
			$elm$core$List$any,
			function (block) {
				return A4(
					$author$project$Update$examDistance,
					block,
					model.self,
					$ianmackenzie$elm_units$Length$meters(4.1),
					$ianmackenzie$elm_units$Length$meters(1.9));
			},
			text3d.wall) && (A2(
			$elm$core$List$all,
			function (block) {
				return !A4(
					$author$project$Update$examDistance,
					block,
					model.self,
					$ianmackenzie$elm_units$Length$meters(1.5),
					$ianmackenzie$elm_units$Length$meters(0));
			},
			text3d.wall) && (!A2(
			$elm$core$List$any,
			function (text) {
				return !text.time;
			},
			list))))) ? _Utils_Tuple2(
			model,
			_Utils_ap(
				list,
				_List_fromArray(
					[
						_Utils_update(
						text3d,
						{time: 0})
					]))) : _Utils_Tuple2(
			model,
			_Utils_ap(
				list,
				_List_fromArray(
					[text3d])));
	});
var $author$project$Update$updateText3dStart = function (model) {
	var period = _Utils_eq(model.self.event, $elm$core$Maybe$Nothing) ? 50 : 100;
	var dirSelf = function () {
		var _v1 = model.self.event;
		if (_v1.$ === 'Nothing') {
			return $author$project$Types$R;
		} else {
			var selfEvent = _v1.a;
			var _v2 = selfEvent.name;
			if (_v2.$ === 'Rotate') {
				var dir = _v2.a;
				return dir;
			} else {
				return $author$project$Types$R;
			}
		}
	}();
	var preSelf = A2($author$project$Event$stampBlock, dirSelf, model.self);
	var preModel = _Utils_update(
		model,
		{self: preSelf});
	var _v0 = (!A2($elm$core$Basics$modBy, period, model.time)) ? A3(
		$elm$core$List$foldl,
		$author$project$Update$findFallText,
		_Utils_Tuple2(preModel, _List_Nil),
		preModel.texts3d) : _Utils_Tuple2(preModel, preModel.texts3d);
	var newModel1 = _v0.a;
	var texts = _v0.b;
	var newGameStatus = (_Utils_eq(texts, preModel.texts3d) && (!A2($elm$core$Basics$modBy, period, model.time))) ? $author$project$Types$Lose : ((model.time === 1500) ? $author$project$Types$LevelChange(3) : model.gameStatus);
	return (model.level === 2) ? _Utils_update(
		model,
		{gameStatus: newGameStatus, texts3d: texts}) : model;
};
var $author$project$Update$blockDistance = F2(
	function (block1, block2) {
		return A2(
			$ianmackenzie$elm_geometry$Point3d$distanceFrom,
			$ianmackenzie$elm_geometry$Block3d$centerPoint(block1._this),
			$ianmackenzie$elm_geometry$Block3d$centerPoint(block2._this));
	});
var $ianmackenzie$elm_units$Quantity$minimum = function (quantities) {
	if (!quantities.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var first = quantities.a;
		var rest = quantities.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $ianmackenzie$elm_units$Quantity$min, first, rest));
	}
};
var $ianmackenzie$elm_units$Quantity$negate = function (_v0) {
	var value = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(-value);
};
var $author$project$Update$updateWarning = function (model) {
	var _v0 = model.level;
	switch (_v0) {
		case 1:
			var threshold = $ianmackenzie$elm_units$Length$meters(6);
			var originalScene = model.scene;
			var originalColor = model.scene.background;
			var oldCamera = model.camera;
			var f = 5;
			var x = (360 / f) * A2($elm$core$Basics$modBy, f, model.time);
			var distance = A2(
				$elm$core$Maybe$withDefault,
				$ianmackenzie$elm_units$Length$meters(0),
				$ianmackenzie$elm_units$Quantity$minimum(
					A2(
						$elm$core$List$map,
						function (block) {
							return A2($author$project$Update$blockDistance, model.self, block);
						},
						model.actives)));
			var _v1 = A2($ianmackenzie$elm_units$Quantity$lessThan, threshold, distance) ? _Utils_Tuple2(
				A2(
					$ianmackenzie$elm_units$Quantity$divideBy,
					60,
					A2(
						$ianmackenzie$elm_units$Quantity$plus,
						threshold,
						$ianmackenzie$elm_units$Quantity$negate(distance))),
				A3(
					$avh4$elm_color$Color$rgb,
					(3 - A2($ianmackenzie$elm_units$Quantity$ratio, distance, threshold)) * $avh4$elm_color$Color$toRgba(originalColor).green,
					$avh4$elm_color$Color$toRgba(originalColor).green,
					$avh4$elm_color$Color$toRgba(originalColor).blue)) : _Utils_Tuple2(
				$ianmackenzie$elm_units$Length$meters(0),
				A3($avh4$elm_color$Color$rgb255, 10, 10, 10));
			var r = _v1.a;
			var rgb = _v1.b;
			var vector = A3(
				$ianmackenzie$elm_geometry$Vector3d$rThetaOn,
				$ianmackenzie$elm_geometry$SketchPlane3d$xy,
				r,
				$ianmackenzie$elm_units$Angle$degrees(x));
			var newCoordinate = A2($ianmackenzie$elm_geometry$Point3d$translateBy, vector, oldCamera.focalPoint);
			var newCamera = _Utils_update(
				oldCamera,
				{focalPoint: newCoordinate});
			var newScene = _Utils_update(
				originalScene,
				{background: rgb});
			return _Utils_update(
				model,
				{camera: newCamera, scene: newScene});
		case 2:
			var threshold = $ianmackenzie$elm_units$Length$meters(6);
			var originalScene = model.scene;
			var originalColor = model.scene.background;
			var oldCamera = model.camera;
			var f = 5;
			var x = (360 / f) * A2($elm$core$Basics$modBy, f, model.time);
			var distance = A2(
				$elm$core$Maybe$withDefault,
				$ianmackenzie$elm_units$Length$meters(0),
				$ianmackenzie$elm_units$Quantity$minimum(
					A2(
						$elm$core$List$map,
						function (block) {
							return A2($author$project$Update$blockDistance, model.self, block);
						},
						model.actives)));
			var _v2 = A2($ianmackenzie$elm_units$Quantity$lessThan, threshold, distance) ? _Utils_Tuple2(
				$ianmackenzie$elm_units$Length$meters((model.time * 0.05) / 1500),
				A3(
					$avh4$elm_color$Color$rgb,
					(3 - A2($ianmackenzie$elm_units$Quantity$ratio, distance, threshold)) * $avh4$elm_color$Color$toRgba(originalColor).green,
					$avh4$elm_color$Color$toRgba(originalColor).green,
					$avh4$elm_color$Color$toRgba(originalColor).blue)) : _Utils_Tuple2(
				$ianmackenzie$elm_units$Length$meters(0),
				A3($avh4$elm_color$Color$rgb255, 10, 10, 10));
			var r = _v2.a;
			var rgb = _v2.b;
			var vector = A3(
				$ianmackenzie$elm_geometry$Vector3d$rThetaOn,
				$ianmackenzie$elm_geometry$SketchPlane3d$xy,
				r,
				$ianmackenzie$elm_units$Angle$degrees(x));
			var newCoordinate = A2($ianmackenzie$elm_geometry$Point3d$translateBy, vector, oldCamera.focalPoint);
			var newCamera = _Utils_update(
				oldCamera,
				{focalPoint: newCoordinate});
			var newScene = _Utils_update(
				originalScene,
				{background: rgb});
			return _Utils_update(
				model,
				{camera: newCamera});
		default:
			return model;
	}
};
var $author$project$Update$updateModelMsg = function (model) {
	var point = A2($ianmackenzie$elm_geometry$Point3d$toRecord, $ianmackenzie$elm_units$Length$inMeters, model.self.center);
	var goal = function () {
		var _v3 = model.level;
		if (!_v3) {
			return A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 1, 1);
		} else {
			return model.goal.center;
		}
	}();
	var checkGoal = _Utils_eq(model.self.center, goal) ? true : (((model.level === 3) && ((point.y >= 18) || (_Utils_cmp(point.y, -18) < 1))) ? true : false);
	var cmdMsg = function () {
		if (checkGoal) {
			var _v2 = model.level;
			if (!_v2) {
				return $author$project$Ports$playSound('reverse_long');
			} else {
				return $elm$core$Platform$Cmd$none;
			}
		} else {
			return $elm$core$Platform$Cmd$none;
		}
	}();
	var newStatus = function () {
		if (checkGoal) {
			var _v1 = model.level;
			switch (_v1) {
				case 0:
					return $author$project$Types$Animation(1);
				case 1:
					return $author$project$Types$Animation(1);
				case 3:
					return $author$project$Types$LevelChange(5);
				case 4:
					return A5($author$project$Types$Interlude, 0, 1000, model.camera.elevation, model.camera.distance, model.camera.azimuth);
				case 5:
					return $author$project$Types$LevelChange(4);
				case 6:
					return $author$project$Types$Animation(1);
				default:
					return $author$project$Types$LevelChange(
						$author$project$Update$switchLevel(model.level));
			}
		} else {
			return model.gameStatus;
		}
	}();
	var _v0 = model.level;
	if (_v0 === 5) {
		return _Utils_Tuple2(
			$author$project$Update$updateLevel5(
				$author$project$Update$updateBackground(
					$author$project$Update$updateTexts3d(
						$author$project$Update$updateText(
							$author$project$Update$updateFocalPoint(
								$author$project$Update$updateGEvents(
									$author$project$Update$updateBlocks(
										_Utils_update(
											model,
											{gameStatus: newStatus, time: model.time + 1})))))))),
			cmdMsg);
	} else {
		return _Utils_Tuple2(
			$author$project$Update$updateLevel6(
				$author$project$Update$updateWarning(
					$author$project$Update$updateLevel3Text(
						$author$project$Update$updateLevel0Text(
							$author$project$Update$updateBackground(
								$author$project$Update$updateText3dStart(
									$author$project$Update$updateTexts3d(
										A2(
											$author$project$Update$updateCars,
											0.1,
											$author$project$Update$updateText(
												$author$project$Update$updateFocalPoint(
													$author$project$Update$updateGEvents(
														$author$project$Update$updateBlocks(
															_Utils_update(
																model,
																{gameStatus: newStatus, time: model.time + 1}))))))))))))),
			cmdMsg);
	}
};
var $author$project$Update$editTextHelper = F2(
	function (text3d, _v0) {
		var model = _v0.a;
		var list = _v0.b;
		return (_Utils_eq(text3d.time, -1) && A2(
			$elm$core$List$any,
			function (block) {
				return A4(
					$author$project$Update$examDistance,
					block,
					model.self,
					$ianmackenzie$elm_units$Length$meters(2.2),
					$ianmackenzie$elm_units$Length$meters(1.9));
			},
			text3d.wall)) ? _Utils_Tuple2(
			model,
			_Utils_ap(
				list,
				_List_fromArray(
					[
						_Utils_update(
						text3d,
						{time: 0})
					]))) : _Utils_Tuple2(
			model,
			_Utils_ap(
				list,
				_List_fromArray(
					[text3d])));
	});
var $author$project$Update$editTextHelper6 = F2(
	function (text3d, _v0) {
		var model = _v0.a;
		var list = _v0.b;
		return (_Utils_eq(text3d.time, -1) && A2(
			$elm$core$List$any,
			function (block) {
				return A4(
					$author$project$Update$examDistance,
					block,
					model.self,
					$ianmackenzie$elm_units$Length$meters(10),
					$ianmackenzie$elm_units$Length$meters(1.9));
			},
			text3d.wall)) ? _Utils_Tuple2(
			model,
			_Utils_ap(
				list,
				_List_fromArray(
					[
						_Utils_update(
						text3d,
						{time: 0})
					]))) : _Utils_Tuple2(
			model,
			_Utils_ap(
				list,
				_List_fromArray(
					[text3d])));
	});
var $author$project$Update$examTextFall = F2(
	function (key, model) {
		var _v0 = model.level;
		switch (_v0) {
			case 2:
				return model;
			case 6:
				var preSelf = A2($author$project$Event$stampBlock, key, model.self);
				var preModel = _Utils_update(
					model,
					{self: preSelf});
				var _v1 = A3(
					$elm$core$List$foldl,
					$author$project$Update$editTextHelper6,
					_Utils_Tuple2(preModel, _List_Nil),
					preModel.texts3dRev);
				var newModel2 = _v1.a;
				var textsRev = _v1.b;
				var _v2 = A3(
					$elm$core$List$foldl,
					$author$project$Update$editTextHelper6,
					_Utils_Tuple2(preModel, _List_Nil),
					preModel.texts3d);
				var newModel1 = _v2.a;
				var texts = _v2.b;
				return _Utils_update(
					model,
					{texts3d: texts, texts3dRev: textsRev});
			default:
				var preSelf = A2($author$project$Event$stampBlock, key, model.self);
				var preModel = _Utils_update(
					model,
					{self: preSelf});
				var _v3 = A3(
					$elm$core$List$foldl,
					$author$project$Update$editTextHelper,
					_Utils_Tuple2(preModel, _List_Nil),
					preModel.texts3dRev);
				var newModel2 = _v3.a;
				var textsRev = _v3.b;
				var _v4 = A3(
					$elm$core$List$foldl,
					$author$project$Update$editTextHelper,
					_Utils_Tuple2(preModel, _List_Nil),
					preModel.texts3d);
				var newModel1 = _v4.a;
				var texts = _v4.b;
				return _Utils_update(
					model,
					{texts3d: texts, texts3dRev: textsRev});
		}
	});
var $author$project$Update$updateKeyEvent = F2(
	function (key, model) {
		return _Utils_update(
			model,
			{
				self: A3($author$project$Event$keyToEvent, key, model.time, model.self)
			});
	});
var $author$project$Update$updateWhenMove = F2(
	function (key, model) {
		return (model.playerRound && A3($author$project$Update$ifNextStepAvailable, model.self, key, model)) ? A2(
			$author$project$Update$examTextFall,
			key,
			A2(
				$author$project$Update$updateKeyEvent,
				key,
				A2($author$project$Update$examLoseAndWarn, key, model))) : model;
	});
var $author$project$Update$updateGame = F2(
	function (msg, model) {
		var _v0 = model.gameStatus;
		switch (_v0.$) {
			case 'Paused':
				if (msg.$ === 'Option') {
					var opt = msg.a;
					var scene = model.scene;
					var renderOpt = function () {
						var _v2 = $elm$core$String$toInt(opt);
						if (_v2.$ === 'Just') {
							var n = _v2.a;
							return n;
						} else {
							return 5;
						}
					}();
					var newScene = _Utils_update(
						scene,
						{renderOpt: renderOpt});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{scene: newScene}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'PrePreGame':
				var time = _v0.a;
				var duration = _v0.b;
				switch (msg.$) {
					case 'Tick':
						return (_Utils_cmp(time, duration) > 0) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{
									gameStatus: A2($author$project$Types$PreGame, 0, 600)
								}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{
									gameStatus: A2($author$project$Types$PrePreGame, time + 1, duration)
								}),
							$elm$core$Platform$Cmd$none);
					case 'MouseDown':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableMouse: true}),
							$elm$core$Platform$Cmd$none);
					case 'MouseUp':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableMouse: false}),
							$elm$core$Platform$Cmd$none);
					case 'MouseMove':
						var dx = msg.a;
						var dy = msg.b;
						return _Utils_Tuple2(
							A3($author$project$Update$updateElevationAzimuth, dx, dy, model),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'PreGame':
				var time = _v0.a;
				var duration = _v0.b;
				if (msg.$ === 'Tick') {
					if (_Utils_cmp(time, duration) > 0) {
						var _v5 = model.level;
						if (_v5 === 2) {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{gameStatus: $author$project$Types$Play}),
								$author$project$Ports$playSound('bgm_2'));
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										gameStatus: A2($author$project$Types$StartFadeIn, 0, 25)
									}),
								A2(
									$elm$core$Task$perform,
									function (_v6) {
										var viewport = _v6.viewport;
										return A2(
											$author$project$Msg$Resize,
											$ianmackenzie$elm_units$Pixels$int(
												$elm$core$Basics$round(viewport.width)),
											$ianmackenzie$elm_units$Pixels$int(
												$elm$core$Basics$round(viewport.height)));
									},
									$elm$browser$Browser$Dom$getViewport));
						}
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									gameStatus: A2($author$project$Types$PreGame, time + 1, duration)
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'StartFadeIn':
				var time = _v0.a;
				var duration = _v0.b;
				switch (msg.$) {
					case 'Tick':
						return (_Utils_cmp(time, duration) > 0) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{gameStatus: $author$project$Types$Play}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{
									gameStatus: A2($author$project$Types$StartFadeIn, time + 1, duration)
								}),
							$elm$core$Platform$Cmd$none);
					case 'MouseDown':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableMouse: true}),
							$elm$core$Platform$Cmd$none);
					case 'MouseUp':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableMouse: false}),
							$elm$core$Platform$Cmd$none);
					case 'MouseMove':
						var dx = msg.a;
						var dy = msg.b;
						return _Utils_Tuple2(
							A3($author$project$Update$updateElevationAzimuth, dx, dy, model),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'Interlude':
				var time = _v0.a;
				var duration = _v0.b;
				var originalElevation = _v0.c;
				var originalDistance = _v0.d;
				var originalAzimuth = _v0.e;
				if (msg.$ === 'Tick') {
					var _v9 = model.level;
					switch (_v9) {
						case 6:
							return _Utils_Tuple2(
								A6($author$project$Update$updateInterlude6, time, duration, originalElevation, originalDistance, originalAzimuth, model),
								$elm$core$Platform$Cmd$none);
						case 3:
							return _Utils_Tuple2(
								A6($author$project$Update$updateInterlude3, time, duration, originalElevation, originalDistance, originalAzimuth, model),
								$elm$core$Platform$Cmd$none);
						case 4:
							return A6($author$project$Update$updateInterlude4, time, duration, originalElevation, originalDistance, originalAzimuth, model);
						default:
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'Animation':
				var frame = _v0.a;
				switch (msg.$) {
					case 'Tick':
						var _v11 = model.level;
						switch (_v11) {
							case 0:
								return _Utils_Tuple2(
									$author$project$Update$updateAnimation0(model),
									$elm$core$Platform$Cmd$none);
							case 1:
								return A2($author$project$Update$updateAnimation1, model, frame);
							case 4:
								return _Utils_Tuple2(
									A2($author$project$Update$updateAnimation4, model, frame),
									$elm$core$Platform$Cmd$none);
							case 6:
								return _Utils_Tuple2(
									A2($author$project$Update$updateAnimation6, model, frame),
									$elm$core$Platform$Cmd$none);
							default:
								return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					case 'MouseDown':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableMouse: true}),
							$elm$core$Platform$Cmd$none);
					case 'MouseUp':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableMouse: false}),
							$elm$core$Platform$Cmd$none);
					case 'MouseMove':
						var dx = msg.a;
						var dy = msg.b;
						return _Utils_Tuple2(
							A3($author$project$Update$updateElevationAzimuth, dx, dy, model),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'Lose':
				return (!_Utils_eq(model.self.event, $elm$core$Maybe$Nothing)) ? $author$project$Update$updateModelMsg(model) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							gameStatus: A2($author$project$Types$LoseFadeOut, 15, 15)
						}),
					$elm$core$Platform$Cmd$none);
			case 'LoseFadeOut':
				var time = _v0.a;
				var duration = _v0.b;
				switch (msg.$) {
					case 'Tick':
						if (!time) {
							var _v13 = $author$project$Update$reInit(model);
							var originalModel = _v13.a;
							var cmdMsg = _v13.b;
							var restartMsg = $elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										cmdMsg,
										A2(
										$elm$core$Task$perform,
										function (_v14) {
											var viewport = _v14.viewport;
											return A2(
												$author$project$Msg$Resize,
												$ianmackenzie$elm_units$Pixels$int(
													$elm$core$Basics$round(viewport.width)),
												$ianmackenzie$elm_units$Pixels$int(
													$elm$core$Basics$round(viewport.height)));
										},
										$elm$browser$Browser$Dom$getViewport)
									]));
							var restartModel = _Utils_update(
								originalModel,
								{
									gameStatus: A2($author$project$Types$StartFadeIn, 0, 25)
								});
							return _Utils_Tuple2(restartModel, restartMsg);
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										gameStatus: A2($author$project$Types$LoseFadeOut, time - 1, duration)
									}),
								$elm$core$Platform$Cmd$none);
						}
					case 'MouseDown':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableMouse: true}),
							$elm$core$Platform$Cmd$none);
					case 'MouseUp':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableMouse: false}),
							$elm$core$Platform$Cmd$none);
					case 'MouseMove':
						var dx = msg.a;
						var dy = msg.b;
						return _Utils_Tuple2(
							A3($author$project$Update$updateElevationAzimuth, dx, dy, model),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'LevelChange':
				var newLevel = _v0.a;
				return (newLevel === 2) ? $author$project$Update$reInit(
					_Utils_update(
						model,
						{level: newLevel})) : ((!newLevel) ? $author$project$Update$reInit(
					_Utils_update(
						model,
						{level: newLevel})) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							gameStatus: A3($author$project$Types$WinFadeOut, newLevel, 40, 40)
						}),
					$elm$core$Platform$Cmd$none));
			case 'WinFadeOut':
				var newLevel = _v0.a;
				var time = _v0.b;
				var duration = _v0.c;
				switch (msg.$) {
					case 'Tick':
						return (!time) ? $author$project$Update$reInit(
							_Utils_update(
								model,
								{level: newLevel})) : _Utils_Tuple2(
							_Utils_update(
								model,
								{
									gameStatus: A3($author$project$Types$WinFadeOut, newLevel, time - 1, duration)
								}),
							$elm$core$Platform$Cmd$none);
					case 'MouseDown':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableMouse: true}),
							$elm$core$Platform$Cmd$none);
					case 'MouseUp':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableMouse: false}),
							$elm$core$Platform$Cmd$none);
					case 'MouseMove':
						var dx = msg.a;
						var dy = msg.b;
						return _Utils_Tuple2(
							A3($author$project$Update$updateElevationAzimuth, dx, dy, model),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			default:
				switch (msg.$) {
					case 'Tick':
						return $author$project$Update$updateModelMsg(model);
					case 'KeyDown':
						var key = msg.a;
						switch (key.$) {
							case 'R':
								return $author$project$Update$checkReverse(model);
							case 'G':
								var oldCamera = model.camera;
								var playerCamera = _Utils_update(
									oldCamera,
									{distance: $author$project$Types$playerCameraDistance});
								var godCamera = _Utils_update(
									oldCamera,
									{
										distance: $ianmackenzie$elm_units$Length$meters(50)
									});
								return model.godMode ? _Utils_Tuple2(
									$author$project$Update$updateFocalPoint(
										_Utils_update(
											model,
											{camera: playerCamera, enableKey: false, godMode: false})),
									$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
									_Utils_update(
										model,
										{camera: godCamera, enableKey: false, godMode: true}),
									$elm$core$Platform$Cmd$none);
							default:
								var newKey = A2($author$project$Update$updateKey, key, model);
								return _Utils_Tuple2(
									A2(
										$author$project$Update$updateWhenMove,
										newKey,
										_Utils_update(
											model,
											{enableKey: false})),
									$elm$core$Platform$Cmd$none);
						}
					case 'KeyUp':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableKey: true}),
							$elm$core$Platform$Cmd$none);
					case 'MouseDown':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableMouse: true}),
							$elm$core$Platform$Cmd$none);
					case 'MouseUp':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{enableMouse: false}),
							$elm$core$Platform$Cmd$none);
					case 'MouseMove':
						var dx = msg.a;
						var dy = msg.b;
						return _Utils_Tuple2(
							A3($author$project$Update$updateElevationAzimuth, dx, dy, model),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Types$Paused = {$: 'Paused'};
var $author$project$Update$updatePause = F2(
	function (bool, model) {
		return (bool && _Utils_eq(model.gameStatus, $author$project$Types$Play)) ? _Utils_update(
			model,
			{gameStatus: $author$project$Types$Paused}) : (_Utils_eq(model.gameStatus, $author$project$Types$Paused) ? _Utils_update(
			model,
			{gameStatus: $author$project$Types$Play}) : model);
	});
var $author$project$Update$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Resize':
				var w = msg.a;
				var h = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							screen: {height: h, width: w}
						}),
					$elm$core$Platform$Cmd$none);
			case 'Scroll':
				var dy = msg.a;
				var camera = model.camera;
				var newDis = (dy > 0) ? A3(
					$ianmackenzie$elm_units$Quantity$clamp,
					$ianmackenzie$elm_units$Length$meters(5),
					$ianmackenzie$elm_units$Length$meters(50),
					A2(
						$ianmackenzie$elm_units$Quantity$plus,
						$ianmackenzie$elm_units$Length$meters(0.8),
						camera.distance)) : A2(
					$ianmackenzie$elm_units$Quantity$minus,
					$ianmackenzie$elm_units$Length$meters(0.8),
					camera.distance);
				var newCam = _Utils_update(
					camera,
					{distance: newDis});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{camera: newCam}),
					$elm$core$Platform$Cmd$none);
			case 'Switch':
				if (_Utils_eq(model.gameStatus, $author$project$Types$Play)) {
					var self = model.self;
					var newThis = $author$project$Types$buildBlock(model.goal.center);
					var newSelf = _Utils_update(
						self,
						{center: model.goal.center, _this: newThis});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{self: newSelf}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'Pause':
				var esc = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Update$updatePause, esc, model),
					$elm$core$Platform$Cmd$none);
			default:
				return A2($author$project$Update$updateGame, msg, model);
		}
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$br = _VirtualDom_node('br');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$View$preGameView = function (model) {
	var fade = 0.1;
	var alpha = function () {
		var _v3 = model.gameStatus;
		if (_v3.$ === 'PreGame') {
			var time = _v3.a;
			var duration = _v3.b;
			return (_Utils_cmp(time, fade * duration) < 0) ? (time / (fade * duration)) : ((_Utils_cmp(time, (1 - (fade * 2)) * duration) > 0) ? (((duration * (1 - fade)) - time) / (fade * duration)) : ((_Utils_cmp(time, (1 - fade) * duration) > 0) ? 0 : 1));
		} else {
			return 0;
		}
	}();
	var _v0 = function () {
		var _v1 = model.level;
		switch (_v1) {
			case 1:
				return _Utils_Tuple3(
					'#222222',
					'STORE',
					_List_fromArray(
						[
							$elm$html$Html$text('I hate shopping days. The food in the belly is the recompense for the horrific torture of the heart.'),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							$elm$html$Html$text('Those strangers will chew up my bones, my flesh and my wretched soul.')
						]));
			case 2:
				return _Utils_Tuple3(
					'#333333',
					'BLACK DOG',
					_List_fromArray(
						[
							$elm$html$Html$text('I fall into the deep dream.'),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							$elm$html$Html$text('I see the black dog. I know it is him. It stirs in the shadows, waiting for me to stop and swallow me up. I can\'t stop.'),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							$elm$html$Html$text('I have a black dog. His name is depression.')
						]));
			case 3:
				return _Utils_Tuple3(
					'#333333',
					'ANOTHER WORLD',
					_List_fromArray(
						[
							$elm$html$Html$text('I walk through endless dreams and meet a never-ending cycle of death.'),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							$elm$html$Html$text('The traffic flows uninterruptedly. No one is willing to wait for me to cross.')
						]));
			case 4:
				return _Utils_Tuple3(
					'#444444',
					'ABOUT YOU',
					_List_fromArray(
						[
							$elm$html$Html$text('I want to tell you'),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							$elm$html$Html$text('all of those tangled secrets.')
						]));
			case 5:
				return _Utils_Tuple3(
					'#333333',
					'RAIN',
					_List_fromArray(
						[
							$elm$html$Html$text('It is a mediocre downpour, which is as bleak as ever. However, it is no longer dark as usual.'),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							$elm$html$Html$text('I find them, like shadows with a faint light.')
						]));
			case 6:
				return _Utils_Tuple3(
					'#333333',
					'WAKE UP',
					_List_fromArray(
						[
							$elm$html$Html$text('I walk through the long darkness, with the real and the dream, the unreality and the disappointment.'),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							$elm$html$Html$text('For the first time, I was able to touch the real world and hear their voice.')
						]));
			default:
				return _Utils_Tuple3(
					'#333333',
					'',
					_List_fromArray(
						[
							$elm$html$Html$text('')
						]));
		}
	}();
	var background = _v0.a;
	var title = _v0.b;
	var words = _v0.c;
	var _v2 = model.level;
	if (!_v2) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', 'black'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha)),
					A2(
					$elm$html$Html$Attributes$style,
					'display',
					(alpha > 0) ? 'flex' : 'none')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'top', '7%'),
							A2($elm$html$Html$Attributes$style, 'width', '650px'),
							A2($elm$html$Html$Attributes$style, 'height', '650px'),
							$elm$html$Html$Attributes$src('./assets/logo_white.png'),
							$elm$html$Html$Attributes$alt('Expeditioner'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha))
						]),
					_List_Nil),
					A2(
					$elm$html$Html$h1,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'white-space', 'pre'),
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'display', 'table'),
							A2($elm$html$Html$Attributes$style, 'top', '73%'),
							A2($elm$html$Html$Attributes$style, 'color', 'white'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2($elm$html$Html$Attributes$style, 'font-size', '40px'),
							A2($elm$html$Html$Attributes$style, 'font-family', 'Century Gothic'),
							A2($elm$html$Html$Attributes$style, 'font-weight', '100'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha)),
							A2($elm$html$Html$Attributes$style, 'letter-spacing', '50px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(' PRESENT')
						]))
				]));
	} else {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background', background),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2($elm$html$Html$Attributes$style, 'top', '0'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'Century Gothic'),
					A2($elm$html$Html$Attributes$style, 'font-size', '48px'),
					A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
					A2(
					$elm$html$Html$Attributes$style,
					'opacity',
					$elm$core$String$fromFloat(alpha)),
					A2(
					$elm$html$Html$Attributes$style,
					'display',
					(alpha > 0) ? 'flex' : 'none')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'top', '55%'),
							A2($elm$html$Html$Attributes$style, 'width', '100%'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2($elm$html$Html$Attributes$style, 'font-size', '0.8vw'),
							A2($elm$html$Html$Attributes$style, 'letter-spacing', '0.5px'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha))
						]),
					words),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'letter-spacing', '20px'),
							A2($elm$html$Html$Attributes$style, 'top', '30%'),
							A2($elm$html$Html$Attributes$style, 'width', '100%'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2($elm$html$Html$Attributes$style, 'font-size', '2.5vw'),
							A2(
							$elm$html$Html$Attributes$style,
							'opacity',
							$elm$core$String$fromFloat(alpha))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title)
						]))
				]));
	}
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Msg$Option = function (a) {
	return {$: 'Option', a: a};
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$step = function (n) {
	return A2($elm$html$Html$Attributes$stringProperty, 'step', n);
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$View$slider = F2(
	function (step, value) {
		return A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin', '5vh 1vw'),
					$elm$html$Html$Attributes$type_('range'),
					$elm$html$Html$Attributes$min('5'),
					$elm$html$Html$Attributes$max(
					$elm$core$String$fromInt(step)),
					$elm$html$Html$Attributes$step('1'),
					$elm$html$Html$Attributes$value(
					$elm$core$String$fromInt(value)),
					$elm$html$Html$Events$onInput($author$project$Msg$Option)
				]),
			_List_Nil);
	});
var $author$project$View$renderEscMenu = function (model) {
	if (_Utils_eq(model.gameStatus, $author$project$Types$Paused)) {
		var renderOpt = model.scene.renderOpt;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background-color', '#515158'),
					A2($elm$html$Html$Attributes$style, 'width', '40%'),
					A2($elm$html$Html$Attributes$style, 'height', '40%'),
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'top', '30%'),
					A2($elm$html$Html$Attributes$style, 'left', '30%'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '0.5vw'),
					A2($elm$html$Html$Attributes$style, 'padding', '2vh 2vw'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'Century Gothic'),
					A2($elm$html$Html$Attributes$style, 'font-size', '2vw'),
					A2($elm$html$Html$Attributes$style, 'opacity', '0.85')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Settings'),
					A2($elm$html$Html$br, _List_Nil, _List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-size', '1.2vw'),
							A2($elm$html$Html$Attributes$style, 'color', 'white')
						]),
					_List_fromArray(
						[
							A2($author$project$View$slider, 20, renderOpt),
							$elm$html$Html$text('Graphic Quality')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-size', '1.2vw'),
							A2($elm$html$Html$Attributes$style, 'color', 'white'),
							A2($elm$html$Html$Attributes$style, 'margin', '15vh 0'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							$elm$html$Html$Events$onClick(
							$author$project$Msg$Pause(false))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Return')
						]))
				]));
	} else {
		return A2($elm$html$Html$div, _List_Nil, _List_Nil);
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$BackgroundColor = function (a) {
	return {$: 'BackgroundColor', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$backgroundColor = function (color) {
	return $ianmackenzie$elm_3d_scene$Scene3d$BackgroundColor(color);
};
var $elm_explorations$webgl$WebGL$Internal$Alpha = function (a) {
	return {$: 'Alpha', a: a};
};
var $elm_explorations$webgl$WebGL$alpha = $elm_explorations$webgl$WebGL$Internal$Alpha;
var $elm_explorations$webgl$WebGL$Internal$Antialias = {$: 'Antialias'};
var $elm_explorations$webgl$WebGL$antialias = $elm_explorations$webgl$WebGL$Internal$Antialias;
var $elm_explorations$webgl$WebGL$Internal$ClearColor = F4(
	function (a, b, c, d) {
		return {$: 'ClearColor', a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$clearColor = $elm_explorations$webgl$WebGL$Internal$ClearColor;
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm_explorations$webgl$WebGL$Internal$Depth = function (a) {
	return {$: 'Depth', a: a};
};
var $elm_explorations$webgl$WebGL$depth = $elm_explorations$webgl$WebGL$Internal$Depth;
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNode;
var $elm_explorations$webgl$WebGL$Internal$Stencil = function (a) {
	return {$: 'Stencil', a: a};
};
var $elm_explorations$webgl$WebGL$stencil = $elm_explorations$webgl$WebGL$Internal$Stencil;
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $avh4$elm_color$Color$toCssString = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	var roundTo = function (x) {
		return $elm$core$Basics$round(x * 1000) / 1000;
	};
	var pct = function (x) {
		return $elm$core$Basics$round(x * 10000) / 100;
	};
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'rgba(',
				$elm$core$String$fromFloat(
				pct(r)),
				'%,',
				$elm$core$String$fromFloat(
				pct(g)),
				'%,',
				$elm$core$String$fromFloat(
				pct(b)),
				'%,',
				$elm$core$String$fromFloat(
				roundTo(a)),
				')'
			]));
};
var $elm_explorations$webgl$WebGL$toHtmlWith = F3(
	function (options, attributes, entities) {
		return A3(_WebGL_toHtml, options, attributes, entities);
	});
var $ianmackenzie$elm_units$Pixels$toInt = function (_v0) {
	var numPixels = _v0.a;
	return numPixels;
};
var $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled = A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 1, 1, 1, 1);
var $ianmackenzie$elm_3d_scene$Scene3d$call = F3(
	function (renderPasses, lights, settings) {
		return A2(
			$elm$core$List$map,
			function (renderPass) {
				return A2(renderPass, lights, settings);
			},
			renderPasses);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$CieXyz = F3(
	function (a, b, c) {
		return {$: 'CieXyz', a: a, b: b, c: c};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToCieXyz = F2(
	function (_v0, _v1) {
		var intensity = _v0.a;
		var x = _v1.a.x;
		var y = _v1.a.y;
		return A3($ianmackenzie$elm_3d_scene$Scene3d$Types$CieXyz, (intensity * x) / y, intensity, (intensity * ((1 - x) - y)) / y);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$cieXyzToLinearRgb = function (_v0) {
	var bigX = _v0.a;
	var bigY = _v0.b;
	var bigZ = _v0.c;
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$LinearRgb(
		A3($elm_explorations$linear_algebra$Math$Vector3$vec3, ((3.2406 * bigX) - (1.5372 * bigY)) - (0.4986 * bigZ), (((-0.9689) * bigX) + (1.8758 * bigY)) + (0.0415 * bigZ), ((0.0557 * bigX) - (0.204 * bigY)) + (1.057 * bigZ)));
};
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToLinearRgb = F2(
	function (intensity, chromaticity) {
		return $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$cieXyzToLinearRgb(
			A2($ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToCieXyz, intensity, chromaticity));
	});
var $elm_explorations$linear_algebra$Math$Matrix4$fromRecord = _MJS_m4x4fromRecord;
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$modelMatrix = function (transformation) {
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{m11: transformation.ix, m12: transformation.jx, m13: transformation.kx, m14: transformation.px, m21: transformation.iy, m22: transformation.jy, m23: transformation.ky, m24: transformation.py, m31: transformation.iz, m32: transformation.jz, m33: transformation.kz, m34: transformation.pz, m41: 0, m42: 0, m43: 0, m44: 1});
};
var $ianmackenzie$elm_3d_scene$Scene3d$createRenderPass = F5(
	function (sceneProperties, viewMatrix, projectionMatrix, transformation, drawFunction) {
		var normalSign = transformation.isRightHanded ? 1 : (-1);
		var modelScale = A4($elm_explorations$linear_algebra$Math$Vector4$vec4, transformation.scale, transformation.scale, transformation.scale, normalSign);
		return A6(
			drawFunction,
			sceneProperties,
			modelScale,
			$ianmackenzie$elm_3d_scene$Scene3d$Transformation$modelMatrix(transformation),
			transformation.isRightHanded,
			viewMatrix,
			projectionMatrix);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$collectRenderPasses = F6(
	function (sceneProperties, viewMatrix, projectionMatrix, currentTransformation, node, accumulated) {
		collectRenderPasses:
		while (true) {
			switch (node.$) {
				case 'EmptyNode':
					return accumulated;
				case 'Transformed':
					var transformation = node.a;
					var childNode = node.b;
					var $temp$sceneProperties = sceneProperties,
						$temp$viewMatrix = viewMatrix,
						$temp$projectionMatrix = projectionMatrix,
						$temp$currentTransformation = A2($ianmackenzie$elm_3d_scene$Scene3d$Transformation$compose, transformation, currentTransformation),
						$temp$node = childNode,
						$temp$accumulated = accumulated;
					sceneProperties = $temp$sceneProperties;
					viewMatrix = $temp$viewMatrix;
					projectionMatrix = $temp$projectionMatrix;
					currentTransformation = $temp$currentTransformation;
					node = $temp$node;
					accumulated = $temp$accumulated;
					continue collectRenderPasses;
				case 'MeshNode':
					var meshDrawFunction = node.b;
					var updatedMeshes = A2(
						$elm$core$List$cons,
						A5($ianmackenzie$elm_3d_scene$Scene3d$createRenderPass, sceneProperties, viewMatrix, projectionMatrix, currentTransformation, meshDrawFunction),
						accumulated.meshes);
					return {meshes: updatedMeshes, points: accumulated.points, shadows: accumulated.shadows};
				case 'PointNode':
					var pointDrawFunction = node.b;
					var updatedPoints = A2(
						$elm$core$List$cons,
						A5($ianmackenzie$elm_3d_scene$Scene3d$createRenderPass, sceneProperties, viewMatrix, projectionMatrix, currentTransformation, pointDrawFunction),
						accumulated.points);
					return {meshes: accumulated.meshes, points: updatedPoints, shadows: accumulated.shadows};
				case 'ShadowNode':
					var shadowDrawFunction = node.a;
					var updatedShadows = A2(
						$elm$core$List$cons,
						A5($ianmackenzie$elm_3d_scene$Scene3d$createRenderPass, sceneProperties, viewMatrix, projectionMatrix, currentTransformation, shadowDrawFunction),
						accumulated.shadows);
					return {meshes: accumulated.meshes, points: accumulated.points, shadows: updatedShadows};
				default:
					var childNodes = node.a;
					return A3(
						$elm$core$List$foldl,
						A4($ianmackenzie$elm_3d_scene$Scene3d$collectRenderPasses, sceneProperties, viewMatrix, projectionMatrix, currentTransformation),
						accumulated,
						childNodes);
			}
		}
	});
var $elm_explorations$webgl$WebGL$Internal$ColorMask = F4(
	function (a, b, c, d) {
		return {$: 'ColorMask', a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$colorMask = $elm_explorations$webgl$WebGL$Internal$ColorMask;
var $elm_explorations$webgl$WebGL$Internal$DepthTest = F4(
	function (a, b, c, d) {
		return {$: 'DepthTest', a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$DepthTest$greaterOrEqual = function (_v0) {
	var write = _v0.write;
	var near = _v0.near;
	var far = _v0.far;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 518, write, near, far);
};
var $elm_explorations$webgl$WebGL$Internal$PolygonOffset = F2(
	function (a, b) {
		return {$: 'PolygonOffset', a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$Settings$polygonOffset = $elm_explorations$webgl$WebGL$Internal$PolygonOffset;
var $ianmackenzie$elm_3d_scene$Scene3d$createShadowStencil = _List_fromArray(
	[
		$elm_explorations$webgl$WebGL$Settings$DepthTest$greaterOrEqual(
		{far: 1, near: 0, write: false}),
		A4($elm_explorations$webgl$WebGL$Settings$colorMask, false, false, false, false),
		A2($elm_explorations$webgl$WebGL$Settings$polygonOffset, 0.0, 1.0)
	]);
var $ianmackenzie$elm_3d_scene$Scene3d$initialStencilCount = 8;
var $ianmackenzie$elm_3d_scene$Scene3d$lowerFourBits = 15;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$replace = $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation(7681);
var $ianmackenzie$elm_3d_scene$Scene3d$dummyFragmentShader = {
	src: '\n        precision lowp float;\n\n        void main() {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n        }\n    ',
	attributes: {},
	uniforms: {}
};
var $elm_explorations$webgl$WebGL$Mesh1 = F2(
	function (a, b) {
		return {$: 'Mesh1', a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$triangleStrip = $elm_explorations$webgl$WebGL$Mesh1(
	{elemSize: 1, indexSize: 0, mode: 5});
var $ianmackenzie$elm_3d_scene$Scene3d$fullScreenQuadMesh = $elm_explorations$webgl$WebGL$triangleStrip(
	_List_fromArray(
		[
			{
			position: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -1, -1)
		},
			{
			position: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, -1)
		},
			{
			position: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -1, 1)
		},
			{
			position: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 1)
		}
		]));
var $ianmackenzie$elm_3d_scene$Scene3d$fullScreenQuadVertexShader = {
	src: '\n        precision lowp float;\n\n        attribute vec2 position;\n\n        void main() {\n            gl_Position = vec4(position, 0.0, 1.0);\n        }\n    ',
	attributes: {position: 'position'},
	uniforms: {}
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$test = function (stencilTest) {
	return A3(
		$elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
		{mask: stencilTest.mask, ref: stencilTest.ref, writeMask: stencilTest.writeMask},
		{fail: stencilTest.fail, test: stencilTest.test, zfail: stencilTest.zfail, zpass: stencilTest.zpass},
		{fail: stencilTest.fail, test: stencilTest.test, zfail: stencilTest.zfail, zpass: stencilTest.zpass});
};
var $ianmackenzie$elm_3d_scene$Scene3d$updateStencil = function (test) {
	return A5(
		$elm_explorations$webgl$WebGL$entityWith,
		_List_fromArray(
			[
				$elm_explorations$webgl$WebGL$Settings$StencilTest$test(test),
				A4($elm_explorations$webgl$WebGL$Settings$colorMask, false, false, false, false)
			]),
		$ianmackenzie$elm_3d_scene$Scene3d$fullScreenQuadVertexShader,
		$ianmackenzie$elm_3d_scene$Scene3d$dummyFragmentShader,
		$ianmackenzie$elm_3d_scene$Scene3d$fullScreenQuadMesh,
		{});
};
var $ianmackenzie$elm_3d_scene$Scene3d$resetStencil = $ianmackenzie$elm_3d_scene$Scene3d$updateStencil(
	{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace, mask: 0, ref: $ianmackenzie$elm_3d_scene$Scene3d$initialStencilCount, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, writeMask: $ianmackenzie$elm_3d_scene$Scene3d$lowerFourBits, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace});
var $elm_explorations$webgl$WebGL$Settings$StencilTest$greater = $elm_explorations$webgl$WebGL$Settings$StencilTest$Test(516);
var $elm_explorations$webgl$WebGL$Settings$StencilTest$invert = $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation(5386);
var $ianmackenzie$elm_3d_scene$Scene3d$singleLightMask = function (index) {
	return A2($elm$core$Basics$pow, 2, index + 4);
};
var $ianmackenzie$elm_3d_scene$Scene3d$storeStencilValue = function (lightIndex) {
	return $ianmackenzie$elm_3d_scene$Scene3d$updateStencil(
		{
			fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep,
			mask: $ianmackenzie$elm_3d_scene$Scene3d$lowerFourBits,
			ref: $ianmackenzie$elm_3d_scene$Scene3d$initialStencilCount,
			test: $elm_explorations$webgl$WebGL$Settings$StencilTest$greater,
			writeMask: $ianmackenzie$elm_3d_scene$Scene3d$singleLightMask(lightIndex),
			zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$invert,
			zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$invert
		});
};
var $ianmackenzie$elm_3d_scene$Scene3d$createShadow = F3(
	function (shadowRenderPasses, lightIndex, lightMatrix) {
		return $elm$core$List$concat(
			_List_fromArray(
				[
					A3($ianmackenzie$elm_3d_scene$Scene3d$call, shadowRenderPasses, lightMatrix, $ianmackenzie$elm_3d_scene$Scene3d$createShadowStencil),
					_List_fromArray(
					[
						$ianmackenzie$elm_3d_scene$Scene3d$storeStencilValue(lightIndex),
						$ianmackenzie$elm_3d_scene$Scene3d$resetStencil
					])
				]));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$createShadows = F2(
	function (shadowRenderPasses, shadowCasters) {
		return $elm$core$List$concat(
			A2(
				$elm$core$List$indexedMap,
				$ianmackenzie$elm_3d_scene$Scene3d$createShadow(shadowRenderPasses),
				shadowCasters));
	});
var $elm_explorations$webgl$WebGL$Settings$DepthTest$less = function (_v0) {
	var write = _v0.write;
	var near = _v0.near;
	var far = _v0.far;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 513, write, near, far);
};
var $elm_explorations$webgl$WebGL$Settings$DepthTest$default = $elm_explorations$webgl$WebGL$Settings$DepthTest$less(
	{far: 1, near: 0, write: true});
var $elm_explorations$webgl$WebGL$Internal$Blend = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {$: 'Blend', a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm_explorations$webgl$WebGL$Settings$Blend$custom = function (_v0) {
	var r = _v0.r;
	var g = _v0.g;
	var b = _v0.b;
	var a = _v0.a;
	var color = _v0.color;
	var alpha = _v0.alpha;
	var expand = F2(
		function (_v1, _v2) {
			var eq1 = _v1.a;
			var f11 = _v1.b;
			var f12 = _v1.c;
			var eq2 = _v2.a;
			var f21 = _v2.b;
			var f22 = _v2.c;
			return $elm_explorations$webgl$WebGL$Internal$Blend(eq1)(f11)(f12)(eq2)(f21)(f22)(r)(g)(b)(a);
		});
	return A2(expand, color, alpha);
};
var $elm_explorations$webgl$WebGL$Settings$Blend$Blender = F3(
	function (a, b, c) {
		return {$: 'Blender', a: a, b: b, c: c};
	});
var $elm_explorations$webgl$WebGL$Settings$Blend$customAdd = F2(
	function (_v0, _v1) {
		var factor1 = _v0.a;
		var factor2 = _v1.a;
		return A3($elm_explorations$webgl$WebGL$Settings$Blend$Blender, 32774, factor1, factor2);
	});
var $elm_explorations$webgl$WebGL$Settings$Blend$Factor = function (a) {
	return {$: 'Factor', a: a};
};
var $elm_explorations$webgl$WebGL$Settings$Blend$one = $elm_explorations$webgl$WebGL$Settings$Blend$Factor(1);
var $elm_explorations$webgl$WebGL$Settings$Blend$oneMinusSrcAlpha = $elm_explorations$webgl$WebGL$Settings$Blend$Factor(771);
var $elm_explorations$webgl$WebGL$Settings$Blend$srcAlpha = $elm_explorations$webgl$WebGL$Settings$Blend$Factor(770);
var $ianmackenzie$elm_3d_scene$Scene3d$defaultBlend = $elm_explorations$webgl$WebGL$Settings$Blend$custom(
	{
		a: 0,
		alpha: A2($elm_explorations$webgl$WebGL$Settings$Blend$customAdd, $elm_explorations$webgl$WebGL$Settings$Blend$one, $elm_explorations$webgl$WebGL$Settings$Blend$oneMinusSrcAlpha),
		b: 0,
		color: A2($elm_explorations$webgl$WebGL$Settings$Blend$customAdd, $elm_explorations$webgl$WebGL$Settings$Blend$srcAlpha, $elm_explorations$webgl$WebGL$Settings$Blend$oneMinusSrcAlpha),
		g: 0,
		r: 0
	});
var $ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault = _List_fromArray(
	[$elm_explorations$webgl$WebGL$Settings$DepthTest$default, $ianmackenzie$elm_3d_scene$Scene3d$defaultBlend]);
var $ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint = function (_v0) {
	var frame = _v0.a;
	return $ianmackenzie$elm_geometry$Frame3d$originPoint(frame);
};
var $ianmackenzie$elm_geometry$Point3d$unsafe = function (givenCoordinates) {
	return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(givenCoordinates);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$placementFrame = function (transformation) {
	return $ianmackenzie$elm_geometry$Frame3d$unsafe(
		{
			originPoint: $ianmackenzie$elm_geometry$Point3d$unsafe(
				{x: transformation.px, y: transformation.py, z: transformation.pz}),
			xDirection: $ianmackenzie$elm_geometry$Direction3d$unsafe(
				{x: transformation.ix, y: transformation.iy, z: transformation.iz}),
			yDirection: $ianmackenzie$elm_geometry$Direction3d$unsafe(
				{x: transformation.jx, y: transformation.jy, z: transformation.jz}),
			zDirection: $ianmackenzie$elm_geometry$Direction3d$unsafe(
				{x: transformation.kx, y: transformation.ky, z: transformation.kz})
		});
};
var $ianmackenzie$elm_geometry$Direction3d$relativeTo = F2(
	function (_v0, _v1) {
		var frame = _v0.a;
		var d = _v1.a;
		var _v2 = frame.zDirection;
		var k = _v2.a;
		var _v3 = frame.yDirection;
		var j = _v3.a;
		var _v4 = frame.xDirection;
		var i = _v4.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
			{x: ((d.x * i.x) + (d.y * i.y)) + (d.z * i.z), y: ((d.x * j.x) + (d.y * j.y)) + (d.z * j.z), z: ((d.x * k.x) + (d.y * k.y)) + (d.z * k.z)});
	});
var $ianmackenzie$elm_geometry$Point3d$relativeTo = F2(
	function (_v0, _v1) {
		var frame = _v0.a;
		var p = _v1.a;
		var _v2 = frame.originPoint;
		var p0 = _v2.a;
		var deltaX = p.x - p0.x;
		var deltaY = p.y - p0.y;
		var deltaZ = p.z - p0.z;
		var _v3 = frame.zDirection;
		var k = _v3.a;
		var _v4 = frame.yDirection;
		var j = _v4.a;
		var _v5 = frame.xDirection;
		var i = _v5.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
			{x: ((deltaX * i.x) + (deltaY * i.y)) + (deltaZ * i.z), y: ((deltaX * j.x) + (deltaY * j.y)) + (deltaZ * j.z), z: ((deltaX * k.x) + (deltaY * k.y)) + (deltaZ * k.z)});
	});
var $ianmackenzie$elm_geometry$Frame3d$relativeTo = F2(
	function (otherFrame, frame) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Frame3d(
			{
				originPoint: A2(
					$ianmackenzie$elm_geometry$Point3d$relativeTo,
					otherFrame,
					$ianmackenzie$elm_geometry$Frame3d$originPoint(frame)),
				xDirection: A2(
					$ianmackenzie$elm_geometry$Direction3d$relativeTo,
					otherFrame,
					$ianmackenzie$elm_geometry$Frame3d$xDirection(frame)),
				yDirection: A2(
					$ianmackenzie$elm_geometry$Direction3d$relativeTo,
					otherFrame,
					$ianmackenzie$elm_geometry$Frame3d$yDirection(frame)),
				zDirection: A2(
					$ianmackenzie$elm_geometry$Direction3d$relativeTo,
					otherFrame,
					$ianmackenzie$elm_geometry$Frame3d$zDirection(frame))
			});
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$union = F2(
	function (firstBox, secondBox) {
		var b2 = $ianmackenzie$elm_geometry$BoundingBox3d$extrema(secondBox);
		var b1 = $ianmackenzie$elm_geometry$BoundingBox3d$extrema(firstBox);
		return $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d(
			{
				maxX: A2($ianmackenzie$elm_units$Quantity$max, b1.maxX, b2.maxX),
				maxY: A2($ianmackenzie$elm_units$Quantity$max, b1.maxY, b2.maxY),
				maxZ: A2($ianmackenzie$elm_units$Quantity$max, b1.maxZ, b2.maxZ),
				minX: A2($ianmackenzie$elm_units$Quantity$min, b1.minX, b2.minX),
				minY: A2($ianmackenzie$elm_units$Quantity$min, b1.minY, b2.minY),
				minZ: A2($ianmackenzie$elm_units$Quantity$min, b1.minZ, b2.minZ)
			});
	});
var $ianmackenzie$elm_geometry$Point3d$coordinates = function (_v0) {
	var p = _v0.a;
	return _Utils_Tuple3(
		$ianmackenzie$elm_units$Quantity$Quantity(p.x),
		$ianmackenzie$elm_units$Quantity$Quantity(p.y),
		$ianmackenzie$elm_units$Quantity$Quantity(p.z));
};
var $ianmackenzie$elm_geometry$BoundingBox3d$withDimensions = F2(
	function (_v0, givenCenterPoint) {
		var givenLength = _v0.a;
		var givenWidth = _v0.b;
		var givenHeight = _v0.c;
		var halfWidth = $ianmackenzie$elm_units$Quantity$half(
			$ianmackenzie$elm_units$Quantity$abs(givenWidth));
		var halfLength = $ianmackenzie$elm_units$Quantity$half(
			$ianmackenzie$elm_units$Quantity$abs(givenLength));
		var halfHeight = $ianmackenzie$elm_units$Quantity$half(
			$ianmackenzie$elm_units$Quantity$abs(givenHeight));
		var _v1 = $ianmackenzie$elm_geometry$Point3d$coordinates(givenCenterPoint);
		var x0 = _v1.a;
		var y0 = _v1.b;
		var z0 = _v1.c;
		return $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d(
			{
				maxX: A2($ianmackenzie$elm_units$Quantity$plus, halfLength, x0),
				maxY: A2($ianmackenzie$elm_units$Quantity$plus, halfWidth, y0),
				maxZ: A2($ianmackenzie$elm_units$Quantity$plus, halfHeight, z0),
				minX: A2($ianmackenzie$elm_units$Quantity$minus, halfLength, x0),
				minY: A2($ianmackenzie$elm_units$Quantity$minus, halfWidth, y0),
				minZ: A2($ianmackenzie$elm_units$Quantity$minus, halfHeight, z0)
			});
	});
var $ianmackenzie$elm_3d_scene$Scene3d$updateViewBounds = F4(
	function (viewFrame, scale, modelBounds, current) {
		var originalCenter = modelBounds.centerPoint;
		var modelZDimension = (2 * modelBounds.halfZ) * scale;
		var modelYDimension = (2 * modelBounds.halfY) * scale;
		var modelXDimension = (2 * modelBounds.halfX) * scale;
		var modelCenterZ = originalCenter.z * scale;
		var modelCenterY = originalCenter.y * scale;
		var modelCenterX = originalCenter.x * scale;
		var k = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Frame3d$zDirection(viewFrame));
		var zDimension = ($elm$core$Basics$abs(modelXDimension * k.x) + $elm$core$Basics$abs(modelYDimension * k.y)) + $elm$core$Basics$abs(modelZDimension * k.z);
		var j = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Frame3d$yDirection(viewFrame));
		var yDimension = ($elm$core$Basics$abs(modelXDimension * j.x) + $elm$core$Basics$abs(modelYDimension * j.y)) + $elm$core$Basics$abs(modelZDimension * j.z);
		var i = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Frame3d$xDirection(viewFrame));
		var xDimension = ($elm$core$Basics$abs(modelXDimension * i.x) + $elm$core$Basics$abs(modelYDimension * i.y)) + $elm$core$Basics$abs(modelZDimension * i.z);
		var nodeBounds = A2(
			$ianmackenzie$elm_geometry$BoundingBox3d$withDimensions,
			_Utils_Tuple3(
				$ianmackenzie$elm_units$Quantity$Quantity(xDimension),
				$ianmackenzie$elm_units$Quantity$Quantity(yDimension),
				$ianmackenzie$elm_units$Quantity$Quantity(zDimension)),
			A2(
				$ianmackenzie$elm_geometry$Point3d$relativeTo,
				viewFrame,
				A3($ianmackenzie$elm_geometry$Point3d$meters, modelCenterX, modelCenterY, modelCenterZ)));
		if (current.$ === 'Just') {
			var currentBounds = current.a;
			return $elm$core$Maybe$Just(
				A2($ianmackenzie$elm_geometry$BoundingBox3d$union, currentBounds, nodeBounds));
		} else {
			return $elm$core$Maybe$Just(nodeBounds);
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$getViewBounds = F4(
	function (viewFrame, scale, current, nodes) {
		getViewBounds:
		while (true) {
			if (nodes.b) {
				var first = nodes.a;
				var rest = nodes.b;
				switch (first.$) {
					case 'EmptyNode':
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = current,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 'MeshNode':
						var modelBounds = first.a;
						var updated = A4($ianmackenzie$elm_3d_scene$Scene3d$updateViewBounds, viewFrame, scale, modelBounds, current);
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = updated,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 'ShadowNode':
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = current,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 'PointNode':
						var modelBounds = first.a;
						var updated = A4($ianmackenzie$elm_3d_scene$Scene3d$updateViewBounds, viewFrame, scale, modelBounds, current);
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = updated,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 'Group':
						var childNodes = first.a;
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = A4($ianmackenzie$elm_3d_scene$Scene3d$getViewBounds, viewFrame, scale, current, childNodes),
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					default:
						var transformation = first.a;
						var childNode = first.b;
						var localViewFrame = A2(
							$ianmackenzie$elm_geometry$Frame3d$relativeTo,
							$ianmackenzie$elm_3d_scene$Scene3d$Transformation$placementFrame(transformation),
							viewFrame);
						var localScale = scale * transformation.scale;
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = A4(
							$ianmackenzie$elm_3d_scene$Scene3d$getViewBounds,
							localViewFrame,
							localScale,
							current,
							_List_fromArray(
								[childNode])),
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
				}
			} else {
				return current;
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$identity = {isRightHanded: true, ix: 1, iy: 0, iz: 0, jx: 0, jy: 1, jz: 0, kx: 0, ky: 0, kz: 1, px: 0, py: 0, pz: 0, scale: 1};
var $ianmackenzie$elm_3d_scene$Scene3d$initStencil = $ianmackenzie$elm_3d_scene$Scene3d$updateStencil(
	{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace, mask: 0, ref: $ianmackenzie$elm_3d_scene$Scene3d$initialStencilCount, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, writeMask: 255, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace});
var $ianmackenzie$elm_geometry$Vector3d$length = function (_v0) {
	var v = _v0.a;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.x),
		A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(v.y),
			$elm$core$Basics$abs(v.z)));
	if (!largestComponent) {
		return $ianmackenzie$elm_units$Quantity$zero;
	} else {
		var scaledZ = v.z / largestComponent;
		var scaledY = v.y / largestComponent;
		var scaledX = v.x / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
		return $ianmackenzie$elm_units$Quantity$Quantity(scaledLength * largestComponent);
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Light = function (a) {
	return {$: 'Light', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled = $ianmackenzie$elm_3d_scene$Scene3d$Types$Light(
	{b: 0, castsShadows: false, g: 0, parameter: 0, r: 0, type_: 0, x: 0, y: 0, z: 0});
var $ianmackenzie$elm_3d_scene$Scene3d$lightPair = F2(
	function (_v0, _v1) {
		var first = _v0.a;
		var second = _v1.a;
		return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
			{m11: first.x, m12: first.r, m13: second.x, m14: second.r, m21: first.y, m22: first.g, m23: second.y, m24: second.g, m31: first.z, m32: first.b, m33: second.z, m34: second.b, m41: first.type_, m42: first.parameter, m43: second.type_, m44: second.parameter});
	});
var $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled = _Utils_Tuple2(
	{
		lights12: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled),
		lights34: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled),
		lights56: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled),
		lights78: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled)
	},
	A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0, 0, 0, 0));
var $elm_explorations$webgl$WebGL$Settings$StencilTest$equal = $elm_explorations$webgl$WebGL$Settings$StencilTest$Test(514);
var $elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual = function (_v0) {
	var write = _v0.write;
	var near = _v0.near;
	var far = _v0.far;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 515, write, near, far);
};
var $ianmackenzie$elm_3d_scene$Scene3d$upperFourBits = 240;
var $ianmackenzie$elm_3d_scene$Scene3d$outsideStencil = _List_fromArray(
	[
		$elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual(
		{far: 1, near: 0, write: true}),
		$elm_explorations$webgl$WebGL$Settings$StencilTest$test(
		{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, mask: $ianmackenzie$elm_3d_scene$Scene3d$upperFourBits, ref: 0, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$equal, writeMask: 0, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep}),
		$ianmackenzie$elm_3d_scene$Scene3d$defaultBlend
	]);
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $ianmackenzie$elm_3d_camera$WebGL$Matrices$projectionMatrix = F2(
	function (_v0, _v1) {
		var camera = _v0.a;
		var nearClipDepth = _v1.nearClipDepth;
		var farClipDepth = _v1.farClipDepth;
		var aspectRatio = _v1.aspectRatio;
		var _v2 = $ianmackenzie$elm_units$Quantity$abs(nearClipDepth);
		var n = _v2.a;
		var _v3 = $ianmackenzie$elm_units$Quantity$abs(farClipDepth);
		var f = _v3.a;
		var _v4 = camera.projection;
		if (_v4.$ === 'Perspective') {
			var frustumSlope = _v4.a;
			return $elm$core$Basics$isInfinite(f) ? $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
				{m11: 1 / (aspectRatio * frustumSlope), m12: 0, m13: 0, m14: 0, m21: 0, m22: 1 / frustumSlope, m23: 0, m24: 0, m31: 0, m32: 0, m33: -1, m34: (-2) * n, m41: 0, m42: 0, m43: -1, m44: 0}) : $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
				{m11: 1 / (aspectRatio * frustumSlope), m12: 0, m13: 0, m14: 0, m21: 0, m22: 1 / frustumSlope, m23: 0, m24: 0, m31: 0, m32: 0, m33: (-(f + n)) / (f - n), m34: (((-2) * f) * n) / (f - n), m41: 0, m42: 0, m43: -1, m44: 0});
		} else {
			var viewportHeight = _v4.a.a;
			return $elm$core$Basics$isInfinite(f) ? $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
				{m11: 2 / (aspectRatio * viewportHeight), m12: 0, m13: 0, m14: 0, m21: 0, m22: 2 / viewportHeight, m23: 0, m24: 0, m31: 0, m32: 0, m33: 0, m34: -1, m41: 0, m42: 0, m43: 0, m44: 1}) : $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
				{m11: 2 / (aspectRatio * viewportHeight), m12: 0, m13: 0, m14: 0, m21: 0, m22: 2 / viewportHeight, m23: 0, m24: 0, m31: 0, m32: 0, m33: (-2) / (f - n), m34: (-(f + n)) / (f - n), m41: 0, m42: 0, m43: 0, m44: 1});
		}
	});
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $ianmackenzie$elm_3d_scene$Scene3d$enabledFlag = F2(
	function (lightMask, lightIndex) {
		return ((1 & (lightMask >> lightIndex)) === 1) ? 0 : 1;
	});
var $ianmackenzie$elm_3d_scene$Scene3d$insideStencil = function (lightMask) {
	return _List_fromArray(
		[
			$elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual(
			{far: 1, near: 0, write: true}),
			$elm_explorations$webgl$WebGL$Settings$StencilTest$test(
			{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, mask: $ianmackenzie$elm_3d_scene$Scene3d$upperFourBits, ref: lightMask, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$equal, writeMask: 0, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep}),
			$ianmackenzie$elm_3d_scene$Scene3d$defaultBlend
		]);
};
var $ianmackenzie$elm_3d_scene$Scene3d$renderWithinShadows = F3(
	function (meshRenderPasses, lightMatrices, numShadowingLights) {
		return $elm$core$List$concat(
			A2(
				$elm$core$List$map,
				function (lightMask) {
					var stencilMask = lightMask << 4;
					var enabledLights = A4(
						$elm_explorations$linear_algebra$Math$Vector4$vec4,
						A2($ianmackenzie$elm_3d_scene$Scene3d$enabledFlag, lightMask, 0),
						A2($ianmackenzie$elm_3d_scene$Scene3d$enabledFlag, lightMask, 1),
						A2($ianmackenzie$elm_3d_scene$Scene3d$enabledFlag, lightMask, 2),
						A2($ianmackenzie$elm_3d_scene$Scene3d$enabledFlag, lightMask, 3));
					return A3(
						$ianmackenzie$elm_3d_scene$Scene3d$call,
						meshRenderPasses,
						_Utils_Tuple2(lightMatrices, enabledLights),
						$ianmackenzie$elm_3d_scene$Scene3d$insideStencil(stencilMask));
				},
				A2(
					$elm$core$List$range,
					1,
					A2($elm$core$Basics$pow, 2, numShadowingLights) - 1)));
	});
var $ianmackenzie$elm_geometry$Direction3d$reverse = function (_v0) {
	var d = _v0.a;
	return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
		{x: -d.x, y: -d.y, z: -d.z});
};
var $elm_explorations$linear_algebra$Math$Matrix4$toRecord = _MJS_m4x4toRecord;
var $ianmackenzie$elm_3d_camera$Viewpoint3d$viewDirection = function (_v0) {
	var frame = _v0.a;
	return $ianmackenzie$elm_geometry$Direction3d$reverse(
		$ianmackenzie$elm_geometry$Frame3d$zDirection(frame));
};
var $ianmackenzie$elm_geometry$Frame3d$atOrigin = $ianmackenzie$elm_geometry$Geometry$Types$Frame3d(
	{originPoint: $ianmackenzie$elm_geometry$Point3d$origin, xDirection: $ianmackenzie$elm_geometry$Direction3d$x, yDirection: $ianmackenzie$elm_geometry$Direction3d$y, zDirection: $ianmackenzie$elm_geometry$Direction3d$z});
var $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Frame3d$toMat4 = function (frame) {
	var p = $ianmackenzie$elm_geometry$Point3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$originPoint(frame));
	var k = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$zDirection(frame));
	var j = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$yDirection(frame));
	var i = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$xDirection(frame));
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{m11: i.x, m12: j.x, m13: k.x, m14: p.x, m21: i.y, m22: j.y, m23: k.y, m24: p.y, m31: i.z, m32: j.z, m33: k.z, m34: p.z, m41: 0, m42: 0, m43: 0, m44: 1});
};
var $ianmackenzie$elm_3d_camera$WebGL$Matrices$modelViewMatrix = F2(
	function (modelFrame, _v0) {
		var viewpointFrame = _v0.a;
		return $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Frame3d$toMat4(
			A2($ianmackenzie$elm_geometry$Frame3d$relativeTo, viewpointFrame, modelFrame));
	});
var $ianmackenzie$elm_3d_camera$WebGL$Matrices$viewMatrix = function (camera) {
	return A2($ianmackenzie$elm_3d_camera$WebGL$Matrices$modelViewMatrix, $ianmackenzie$elm_geometry$Frame3d$atOrigin, camera);
};
var $ianmackenzie$elm_3d_camera$Camera3d$viewpoint = function (_v0) {
	var camera = _v0.a;
	return camera.viewpoint;
};
var $ianmackenzie$elm_3d_camera$Viewpoint3d$xDirection = function (_v0) {
	var frame = _v0.a;
	return $ianmackenzie$elm_geometry$Frame3d$xDirection(frame);
};
var $ianmackenzie$elm_3d_camera$Viewpoint3d$yDirection = function (_v0) {
	var frame = _v0.a;
	return $ianmackenzie$elm_geometry$Frame3d$yDirection(frame);
};
var $ianmackenzie$elm_3d_scene$Scene3d$toWebGLEntities = function (_arguments) {
	var viewpoint = $ianmackenzie$elm_3d_camera$Camera3d$viewpoint(_arguments.camera);
	var viewFrame = $ianmackenzie$elm_geometry$Frame3d$unsafe(
		{
			originPoint: $ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint(viewpoint),
			xDirection: $ianmackenzie$elm_3d_camera$Viewpoint3d$xDirection(viewpoint),
			yDirection: $ianmackenzie$elm_3d_camera$Viewpoint3d$yDirection(viewpoint),
			zDirection: $ianmackenzie$elm_geometry$Direction3d$reverse(
				$ianmackenzie$elm_3d_camera$Viewpoint3d$viewDirection(viewpoint))
		});
	var _v0 = $ianmackenzie$elm_3d_scene$Scene3d$Entity$group(_arguments.entities);
	var rootNode = _v0.a;
	var _v1 = A4(
		$ianmackenzie$elm_3d_scene$Scene3d$getViewBounds,
		viewFrame,
		1,
		$elm$core$Maybe$Nothing,
		_List_fromArray(
			[rootNode]));
	if (_v1.$ === 'Nothing') {
		return _List_Nil;
	} else {
		var viewBounds = _v1.a;
		var viewMatrix = $ianmackenzie$elm_3d_camera$WebGL$Matrices$viewMatrix(viewpoint);
		var nearClipDepth = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			0.99,
			A2(
				$ianmackenzie$elm_units$Quantity$max,
				$ianmackenzie$elm_units$Quantity$abs(_arguments.clipDepth),
				$ianmackenzie$elm_units$Quantity$negate(
					$ianmackenzie$elm_geometry$BoundingBox3d$maxZ(viewBounds))));
		var _v2 = $ianmackenzie$elm_geometry$BoundingBox3d$dimensions(viewBounds);
		var xDimension = _v2.a;
		var yDimension = _v2.b;
		var zDimension = _v2.c;
		var sceneDiameter = $ianmackenzie$elm_geometry$Vector3d$length(
			A3($ianmackenzie$elm_geometry$Vector3d$xyz, xDimension, yDimension, zDimension));
		var farClipDepth = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			1.01,
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				sceneDiameter,
				$ianmackenzie$elm_units$Quantity$negate(
					$ianmackenzie$elm_geometry$BoundingBox3d$minZ(viewBounds))));
		var projectionMatrix = A2(
			$ianmackenzie$elm_3d_camera$WebGL$Matrices$projectionMatrix,
			_arguments.camera,
			{aspectRatio: _arguments.aspectRatio, farClipDepth: farClipDepth, nearClipDepth: nearClipDepth});
		var projectionType = $elm_explorations$linear_algebra$Math$Matrix4$toRecord(projectionMatrix).m44;
		var eyePointOrDirectionToCamera = (!projectionType) ? $ianmackenzie$elm_geometry$Point3d$toMeters(
			$ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint(viewpoint)) : $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Direction3d$reverse(
				$ianmackenzie$elm_3d_camera$Viewpoint3d$viewDirection(viewpoint)));
		var _v3 = function () {
			var _v4 = _arguments.toneMapping;
			switch (_v4.$) {
				case 'NoToneMapping':
					return _Utils_Tuple2(0, 0);
				case 'ReinhardLuminanceToneMapping':
					return _Utils_Tuple2(1, 0);
				case 'ReinhardPerChannelToneMapping':
					return _Utils_Tuple2(2, 0);
				case 'ExtendedReinhardLuminanceToneMapping':
					var overexposureLimit = _v4.a;
					return _Utils_Tuple2(3, overexposureLimit);
				case 'ExtendedReinhardPerChannelToneMapping':
					var overexposureLimit = _v4.a;
					return _Utils_Tuple2(4, overexposureLimit);
				default:
					return _Utils_Tuple2(5, 0);
			}
		}();
		var toneMapType = _v3.a;
		var toneMapParam = _v3.b;
		var _v5 = _arguments.exposure;
		var exposureLuminance = _v5.a;
		var _v6 = A2($ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToLinearRgb, exposureLuminance, _arguments.whiteBalance);
		var referenceWhite = _v6.a;
		var sceneProperties = $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
			{
				m11: 0,
				m12: eyePointOrDirectionToCamera.x,
				m13: $elm_explorations$linear_algebra$Math$Vector3$getX(referenceWhite),
				m14: _arguments.supersampling,
				m21: 0,
				m22: eyePointOrDirectionToCamera.y,
				m23: $elm_explorations$linear_algebra$Math$Vector3$getY(referenceWhite),
				m24: $ianmackenzie$elm_units$Length$inMeters(sceneDiameter),
				m31: 0,
				m32: eyePointOrDirectionToCamera.z,
				m33: $elm_explorations$linear_algebra$Math$Vector3$getZ(referenceWhite),
				m34: toneMapType,
				m41: 0,
				m42: projectionType,
				m43: 0,
				m44: toneMapParam
			});
		var renderPasses = A6(
			$ianmackenzie$elm_3d_scene$Scene3d$collectRenderPasses,
			sceneProperties,
			viewMatrix,
			projectionMatrix,
			$ianmackenzie$elm_3d_scene$Scene3d$Transformation$identity,
			rootNode,
			{meshes: _List_Nil, points: _List_Nil, shadows: _List_Nil});
		var _v7 = _arguments.lights;
		switch (_v7.$) {
			case 'SingleUnshadowedPass':
				var lightMatrices = _v7.a;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.meshes,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							$ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault),
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.points, $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled, $ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault)
						]));
			case 'SingleShadowedPass':
				var lightMatrices = _v7.a;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.meshes, $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled, $ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault),
							_List_fromArray(
							[$ianmackenzie$elm_3d_scene$Scene3d$initStencil]),
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.shadows, lightMatrices.lights12, $ianmackenzie$elm_3d_scene$Scene3d$createShadowStencil),
							_List_fromArray(
							[
								$ianmackenzie$elm_3d_scene$Scene3d$storeStencilValue(0)
							]),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.meshes,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							$ianmackenzie$elm_3d_scene$Scene3d$outsideStencil),
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.points, $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled, $ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault)
						]));
			default:
				var shadowCasters = _v7.a;
				var allLightMatrices = _v7.b;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.meshes,
							_Utils_Tuple2(allLightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							$ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault),
							_List_fromArray(
							[$ianmackenzie$elm_3d_scene$Scene3d$initStencil]),
							A2($ianmackenzie$elm_3d_scene$Scene3d$createShadows, renderPasses.shadows, shadowCasters),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$renderWithinShadows,
							renderPasses.meshes,
							allLightMatrices,
							$elm$core$List$length(shadowCasters)),
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.points, $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled, $ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault)
						]));
		}
	}
};
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $ianmackenzie$elm_3d_scene$Scene3d$composite = F2(
	function (_arguments, scenes) {
		var commonWebGLOptions = _List_fromArray(
			[
				$elm_explorations$webgl$WebGL$depth(1),
				$elm_explorations$webgl$WebGL$stencil(0),
				$elm_explorations$webgl$WebGL$alpha(true),
				A4($elm_explorations$webgl$WebGL$clearColor, 0, 0, 0, 0)
			]);
		var _v0 = function () {
			var _v1 = _arguments.antialiasing;
			switch (_v1.$) {
				case 'NoAntialiasing':
					return _Utils_Tuple3(commonWebGLOptions, '0', 1);
				case 'Multisampling':
					return _Utils_Tuple3(
						A2($elm$core$List$cons, $elm_explorations$webgl$WebGL$antialias, commonWebGLOptions),
						'1',
						1);
				default:
					var value = _v1.a;
					return _Utils_Tuple3(commonWebGLOptions, '0', value);
			}
		}();
		var webGLOptions = _v0.a;
		var key = _v0.b;
		var scalingFactor = _v0.c;
		var _v2 = _arguments.dimensions;
		var width = _v2.a;
		var height = _v2.b;
		var heightInPixels = $ianmackenzie$elm_units$Pixels$toInt(height);
		var heightCss = A2(
			$elm$html$Html$Attributes$style,
			'height',
			$elm$core$String$fromInt(heightInPixels) + 'px');
		var widthInPixels = $ianmackenzie$elm_units$Pixels$toInt(width);
		var aspectRatio = widthInPixels / heightInPixels;
		var webGLEntities = A2(
			$elm$core$List$concatMap,
			function (scene) {
				return $ianmackenzie$elm_3d_scene$Scene3d$toWebGLEntities(
					{aspectRatio: aspectRatio, camera: _arguments.camera, clipDepth: _arguments.clipDepth, entities: scene.entities, exposure: scene.exposure, lights: scene.lights, supersampling: scalingFactor, toneMapping: scene.toneMapping, whiteBalance: scene.whiteBalance});
			},
			scenes);
		var widthCss = A2(
			$elm$html$Html$Attributes$style,
			'width',
			$elm$core$String$fromInt(widthInPixels) + 'px');
		var _v3 = _arguments.background;
		var givenBackgroundColor = _v3.a;
		var backgroundColorString = $avh4$elm_color$Color$toCssString(givenBackgroundColor);
		return A3(
			$elm$html$Html$Keyed$node,
			'div',
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'padding', '0px'),
					widthCss,
					heightCss
				]),
			_List_fromArray(
				[
					_Utils_Tuple2(
					key,
					A3(
						$elm_explorations$webgl$WebGL$toHtmlWith,
						webGLOptions,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$width(
								$elm$core$Basics$round(widthInPixels * scalingFactor)),
								$elm$html$Html$Attributes$height(
								$elm$core$Basics$round(heightInPixels * scalingFactor)),
								widthCss,
								heightCss,
								A2($elm$html$Html$Attributes$style, 'display', 'block'),
								A2($elm$html$Html$Attributes$style, 'background-color', backgroundColorString)
							]),
						webGLEntities))
				]));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$custom = function (_arguments) {
	return A2(
		$ianmackenzie$elm_3d_scene$Scene3d$composite,
		{antialiasing: _arguments.antialiasing, background: _arguments.background, camera: _arguments.camera, clipDepth: _arguments.clipDepth, dimensions: _arguments.dimensions},
		_List_fromArray(
			[
				{entities: _arguments.entities, exposure: _arguments.exposure, lights: _arguments.lights, toneMapping: _arguments.toneMapping, whiteBalance: _arguments.whiteBalance}
			]));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Exposure = function (a) {
	return {$: 'Exposure', a: a};
};
var $ianmackenzie$elm_units$Luminance$nits = function (numNits) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numNits);
};
var $ianmackenzie$elm_3d_scene$Scene3d$exposureValue = function (ev100) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Exposure(
		$ianmackenzie$elm_units$Luminance$nits(
			1.2 * A2($elm$core$Basics$pow, 2, ev100)));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Chromaticity = function (a) {
	return {$: 'Chromaticity', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$chromaticity = function (xy) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$Chromaticity(xy);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent = $ianmackenzie$elm_3d_scene$Scene3d$Light$chromaticity(
	{x: 0.44757, y: 0.40745});
var $ianmackenzie$elm_3d_camera$Camera3d$Types$Viewpoint3d = function (a) {
	return {$: 'Viewpoint3d', a: a};
};
var $ianmackenzie$elm_geometry$Vector3d$direction = function (_v0) {
	var v = _v0.a;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.x),
		A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(v.y),
			$elm$core$Basics$abs(v.z)));
	if (!largestComponent) {
		return $elm$core$Maybe$Nothing;
	} else {
		var scaledZ = v.z / largestComponent;
		var scaledY = v.y / largestComponent;
		var scaledX = v.x / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
		return $elm$core$Maybe$Just(
			$ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
				{x: scaledX / scaledLength, y: scaledY / scaledLength, z: scaledZ / scaledLength}));
	}
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $ianmackenzie$elm_geometry$Vector3d$dot = F2(
	function (_v0, _v1) {
		var v2 = _v0.a;
		var v1 = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(((v1.x * v2.x) + (v1.y * v2.y)) + (v1.z * v2.z));
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $ianmackenzie$elm_geometry$Vector3d$minus = F2(
	function (_v0, _v1) {
		var v2 = _v0.a;
		var v1 = _v1.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z});
	});
var $ianmackenzie$elm_geometry$Vector3d$projectionIn = F2(
	function (_v0, _v1) {
		var d = _v0.a;
		var v = _v1.a;
		var projectedLength = ((v.x * d.x) + (v.y * d.y)) + (v.z * d.z);
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: d.x * projectedLength, y: d.y * projectedLength, z: d.z * projectedLength});
	});
var $ianmackenzie$elm_geometry$Direction3d$orthonormalize = F3(
	function (xVector, xyVector, xyzVector) {
		return A2(
			$elm$core$Maybe$andThen,
			function (xDirection) {
				var yVector = A2(
					$ianmackenzie$elm_geometry$Vector3d$minus,
					A2($ianmackenzie$elm_geometry$Vector3d$projectionIn, xDirection, xyVector),
					xyVector);
				return A2(
					$elm$core$Maybe$andThen,
					function (yDirection) {
						var rightHandedZVector = A2($ianmackenzie$elm_geometry$Vector3d$cross, xyVector, xVector);
						var tripleProduct = A2($ianmackenzie$elm_geometry$Vector3d$dot, xyzVector, rightHandedZVector);
						var zVector = A2($ianmackenzie$elm_units$Quantity$greaterThan, $ianmackenzie$elm_units$Quantity$zero, tripleProduct) ? rightHandedZVector : (A2($ianmackenzie$elm_units$Quantity$lessThan, $ianmackenzie$elm_units$Quantity$zero, tripleProduct) ? $ianmackenzie$elm_geometry$Vector3d$reverse(rightHandedZVector) : $ianmackenzie$elm_geometry$Vector3d$zero);
						return A2(
							$elm$core$Maybe$map,
							function (zDirection) {
								return _Utils_Tuple3(xDirection, yDirection, zDirection);
							},
							$ianmackenzie$elm_geometry$Vector3d$direction(zVector));
					},
					$ianmackenzie$elm_geometry$Vector3d$direction(yVector));
			},
			$ianmackenzie$elm_geometry$Vector3d$direction(xVector));
	});
var $ianmackenzie$elm_geometry$Frame3d$withZDirection = F2(
	function (givenZDirection, givenOrigin) {
		var _v0 = $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis(givenZDirection);
		var computedXDirection = _v0.a;
		var computedYDirection = _v0.b;
		return $ianmackenzie$elm_geometry$Frame3d$unsafe(
			{originPoint: givenOrigin, xDirection: computedXDirection, yDirection: computedYDirection, zDirection: givenZDirection});
	});
var $ianmackenzie$elm_3d_camera$Viewpoint3d$lookAt = function (_arguments) {
	var zVector = A2($ianmackenzie$elm_geometry$Vector3d$from, _arguments.focalPoint, _arguments.eyePoint);
	var yVector = $ianmackenzie$elm_geometry$Direction3d$toVector(_arguments.upDirection);
	var xVector = A2($ianmackenzie$elm_geometry$Vector3d$cross, zVector, yVector);
	var _v0 = A3($ianmackenzie$elm_geometry$Direction3d$orthonormalize, zVector, yVector, xVector);
	if (_v0.$ === 'Just') {
		var _v1 = _v0.a;
		var normalizedZDirection = _v1.a;
		var normalizedYDirection = _v1.b;
		var normalizedXDirection = _v1.c;
		return $ianmackenzie$elm_3d_camera$Camera3d$Types$Viewpoint3d(
			$ianmackenzie$elm_geometry$Frame3d$unsafe(
				{originPoint: _arguments.eyePoint, xDirection: normalizedXDirection, yDirection: normalizedYDirection, zDirection: normalizedZDirection}));
	} else {
		var _v2 = $ianmackenzie$elm_geometry$Vector3d$direction(zVector);
		if (_v2.$ === 'Just') {
			var zDirection = _v2.a;
			return $ianmackenzie$elm_3d_camera$Camera3d$Types$Viewpoint3d(
				A2($ianmackenzie$elm_geometry$Frame3d$withZDirection, zDirection, _arguments.eyePoint));
		} else {
			var _v3 = $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis(_arguments.upDirection);
			var arbitraryZDirection = _v3.a;
			var arbitraryXDirection = _v3.b;
			return $ianmackenzie$elm_3d_camera$Camera3d$Types$Viewpoint3d(
				$ianmackenzie$elm_geometry$Frame3d$unsafe(
					{originPoint: _arguments.eyePoint, xDirection: arbitraryXDirection, yDirection: _arguments.upDirection, zDirection: arbitraryZDirection}));
		}
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$NoToneMapping = {$: 'NoToneMapping'};
var $ianmackenzie$elm_3d_scene$Scene3d$noToneMapping = $ianmackenzie$elm_3d_scene$Scene3d$NoToneMapping;
var $ianmackenzie$elm_3d_scene$Scene3d$nothing = $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
var $ianmackenzie$elm_geometry$Unsafe$Direction3d$unsafeCrossProduct = F2(
	function (_v0, _v1) {
		var d1 = _v0.a;
		var d2 = _v1.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
			{x: (d1.y * d2.z) - (d1.z * d2.y), y: (d1.z * d2.x) - (d1.x * d2.z), z: (d1.x * d2.y) - (d1.y * d2.x)});
	});
var $ianmackenzie$elm_geometry$SketchPlane3d$xDirection = function (_v0) {
	var properties = _v0.a;
	return properties.xDirection;
};
var $ianmackenzie$elm_geometry$SketchPlane3d$yDirection = function (_v0) {
	var properties = _v0.a;
	return properties.yDirection;
};
var $ianmackenzie$elm_geometry$SketchPlane3d$normalDirection = function (sketchPlane) {
	return A2(
		$ianmackenzie$elm_geometry$Unsafe$Direction3d$unsafeCrossProduct,
		$ianmackenzie$elm_geometry$SketchPlane3d$xDirection(sketchPlane),
		$ianmackenzie$elm_geometry$SketchPlane3d$yDirection(sketchPlane));
};
var $ianmackenzie$elm_geometry$Frame3d$rotateAroundOwn = F3(
	function (axis, angle, frame) {
		return A3(
			$ianmackenzie$elm_geometry$Frame3d$rotateAround,
			axis(frame),
			angle,
			frame);
	});
var $ianmackenzie$elm_geometry$Frame3d$translateIn = F3(
	function (direction, distance, frame) {
		return A2(
			$ianmackenzie$elm_geometry$Frame3d$translateBy,
			A2($ianmackenzie$elm_geometry$Vector3d$withLength, distance, direction),
			frame);
	});
var $ianmackenzie$elm_geometry$Frame3d$translateAlongOwn = F3(
	function (axis, distance, frame) {
		return A3(
			$ianmackenzie$elm_geometry$Frame3d$translateIn,
			$ianmackenzie$elm_geometry$Axis3d$direction(
				axis(frame)),
			distance,
			frame);
	});
var $ianmackenzie$elm_geometry$Frame3d$xAxis = function (_v0) {
	var frame = _v0.a;
	return A2($ianmackenzie$elm_geometry$Axis3d$through, frame.originPoint, frame.xDirection);
};
var $ianmackenzie$elm_geometry$Frame3d$yAxis = function (_v0) {
	var frame = _v0.a;
	return A2($ianmackenzie$elm_geometry$Axis3d$through, frame.originPoint, frame.yDirection);
};
var $ianmackenzie$elm_geometry$Frame3d$zAxis = function (_v0) {
	var frame = _v0.a;
	return A2($ianmackenzie$elm_geometry$Axis3d$through, frame.originPoint, frame.zDirection);
};
var $ianmackenzie$elm_3d_camera$Viewpoint3d$orbit = function (_arguments) {
	var initialFrame = $ianmackenzie$elm_geometry$Frame3d$unsafe(
		{
			originPoint: _arguments.focalPoint,
			xDirection: $ianmackenzie$elm_geometry$SketchPlane3d$yDirection(_arguments.groundPlane),
			yDirection: $ianmackenzie$elm_geometry$SketchPlane3d$normalDirection(_arguments.groundPlane),
			zDirection: $ianmackenzie$elm_geometry$SketchPlane3d$xDirection(_arguments.groundPlane)
		});
	var finalFrame = A3(
		$ianmackenzie$elm_geometry$Frame3d$translateAlongOwn,
		$ianmackenzie$elm_geometry$Frame3d$zAxis,
		_arguments.distance,
		A3(
			$ianmackenzie$elm_geometry$Frame3d$rotateAroundOwn,
			$ianmackenzie$elm_geometry$Frame3d$xAxis,
			$ianmackenzie$elm_units$Quantity$negate(_arguments.elevation),
			A3($ianmackenzie$elm_geometry$Frame3d$rotateAroundOwn, $ianmackenzie$elm_geometry$Frame3d$yAxis, _arguments.azimuth, initialFrame)));
	return $ianmackenzie$elm_3d_camera$Camera3d$Types$Viewpoint3d(finalFrame);
};
var $ianmackenzie$elm_3d_camera$Viewpoint3d$orbitZ = function (_v0) {
	var focalPoint = _v0.focalPoint;
	var azimuth = _v0.azimuth;
	var elevation = _v0.elevation;
	var distance = _v0.distance;
	return $ianmackenzie$elm_3d_camera$Viewpoint3d$orbit(
		{azimuth: azimuth, distance: distance, elevation: elevation, focalPoint: focalPoint, groundPlane: $ianmackenzie$elm_geometry$SketchPlane3d$xy});
};
var $ianmackenzie$elm_3d_camera$Camera3d$Types$Camera3d = function (a) {
	return {$: 'Camera3d', a: a};
};
var $ianmackenzie$elm_3d_camera$Camera3d$Types$Perspective = function (a) {
	return {$: 'Perspective', a: a};
};
var $elm$core$Basics$tan = _Basics_tan;
var $ianmackenzie$elm_units$Angle$tan = function (_v0) {
	var angle = _v0.a;
	return $elm$core$Basics$tan(angle);
};
var $ianmackenzie$elm_3d_camera$Camera3d$perspective = function (_arguments) {
	var halfFieldOfView = $ianmackenzie$elm_units$Quantity$half(
		$ianmackenzie$elm_units$Quantity$abs(_arguments.verticalFieldOfView));
	var frustumSlope = $ianmackenzie$elm_units$Angle$tan(halfFieldOfView);
	return $ianmackenzie$elm_3d_camera$Camera3d$Types$Camera3d(
		{
			projection: $ianmackenzie$elm_3d_camera$Camera3d$Types$Perspective(frustumSlope),
			viewpoint: _arguments.viewpoint
		});
};
var $ianmackenzie$elm_3d_scene$Scene3d$Supersampling = function (a) {
	return {$: 'Supersampling', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$supersampling = function (factor) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Supersampling(factor);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$CastsShadows = function (a) {
	return {$: 'CastsShadows', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows = function (flag) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Light$CastsShadows(flag);
};
var $ianmackenzie$elm_units$Temperature$inKelvins = function (_v0) {
	var numKelvins = _v0.a;
	return numKelvins;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$colorTemperature = function (temperature) {
	var t = A3(
		$elm$core$Basics$clamp,
		1667,
		25000,
		$ianmackenzie$elm_units$Temperature$inKelvins(temperature));
	var x = (t <= 4000) ? ((((((-0.2661239) * 1.0e9) / ((t * t) * t)) - ((0.2343589 * 1.0e6) / (t * t))) + ((0.8776956 * 1.0e3) / t)) + 0.17991) : ((((((-3.0258469) * 1.0e9) / ((t * t) * t)) + ((2.1070379 * 1.0e6) / (t * t))) + ((0.2226347 * 1.0e3) / t)) + 0.24039);
	var y = (t <= 2222) ? (((((-1.1063814) * ((x * x) * x)) - (1.3481102 * (x * x))) + (2.18555832 * x)) - 0.20219683) : ((t <= 4000) ? (((((-0.9549476) * ((x * x) * x)) - (1.37418593 * (x * x))) + (2.09137015 * x)) - 0.16748867) : ((((3.081758 * ((x * x) * x)) - (5.8733867 * (x * x))) + (3.75112997 * x)) - 0.37001483));
	return $ianmackenzie$elm_3d_scene$Scene3d$Light$chromaticity(
		{x: x, y: y});
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$directional = F2(
	function (_v0, light) {
		var shadowFlag = _v0.a;
		var _v1 = $ianmackenzie$elm_geometry$Direction3d$unwrap(light.direction);
		var x = _v1.x;
		var y = _v1.y;
		var z = _v1.z;
		var _v2 = A2($ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToLinearRgb, light.intensity, light.chromaticity);
		var rgb = _v2.a;
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Light(
			{
				b: $elm_explorations$linear_algebra$Math$Vector3$getZ(rgb),
				castsShadows: shadowFlag,
				g: $elm_explorations$linear_algebra$Math$Vector3$getY(rgb),
				parameter: 0,
				r: $elm_explorations$linear_algebra$Math$Vector3$getX(rgb),
				type_: 1,
				x: -x,
				y: -y,
				z: -z
			});
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent = $ianmackenzie$elm_3d_scene$Scene3d$Light$chromaticity(
	{x: 0.37208, y: 0.37529});
var $ianmackenzie$elm_3d_scene$Scene3d$MultiplePasses = F2(
	function (a, b) {
		return {$: 'MultiplePasses', a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$SingleUnshadowedPass = function (a) {
	return {$: 'SingleUnshadowedPass', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$eraseLight = function (_v0) {
	var light = _v0.a;
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$Light(light);
};
var $ianmackenzie$elm_3d_scene$Scene3d$lightCastsShadows = function (_v0) {
	var properties = _v0.a;
	return properties.castsShadows;
};
var $ianmackenzie$elm_3d_scene$Scene3d$noLights = $ianmackenzie$elm_3d_scene$Scene3d$SingleUnshadowedPass($ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled.a);
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$singleLight = function (_v0) {
	var light = _v0.a;
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{m11: light.x, m12: light.r, m13: 0, m14: 0, m21: light.y, m22: light.g, m23: 0, m24: 0, m31: light.z, m32: light.b, m33: 0, m34: 0, m41: light.type_, m42: light.parameter, m43: 0, m44: 0});
};
var $ianmackenzie$elm_3d_scene$Scene3d$eightLights = F8(
	function (first, second, third, fourth, fifth, sixth, seventh, eigth) {
		var _v0 = A2(
			$elm$core$List$partition,
			$ianmackenzie$elm_3d_scene$Scene3d$lightCastsShadows,
			_List_fromArray(
				[
					$ianmackenzie$elm_3d_scene$Scene3d$eraseLight(first),
					$ianmackenzie$elm_3d_scene$Scene3d$eraseLight(second),
					$ianmackenzie$elm_3d_scene$Scene3d$eraseLight(third),
					$ianmackenzie$elm_3d_scene$Scene3d$eraseLight(fourth)
				]));
		var enabledShadowCasters = _v0.a;
		var disabledShadowCasters = _v0.b;
		if (!enabledShadowCasters.b) {
			return $ianmackenzie$elm_3d_scene$Scene3d$SingleUnshadowedPass(
				{
					lights12: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, first, second),
					lights34: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, third, fourth),
					lights56: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, fifth, sixth),
					lights78: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, seventh, eigth)
				});
		} else {
			var sortedLights = _Utils_ap(enabledShadowCasters, disabledShadowCasters);
			if ((((sortedLights.b && sortedLights.b.b) && sortedLights.b.b.b) && sortedLights.b.b.b.b) && (!sortedLights.b.b.b.b.b)) {
				var light0 = sortedLights.a;
				var _v3 = sortedLights.b;
				var light1 = _v3.a;
				var _v4 = _v3.b;
				var light2 = _v4.a;
				var _v5 = _v4.b;
				var light3 = _v5.a;
				return A2(
					$ianmackenzie$elm_3d_scene$Scene3d$MultiplePasses,
					A2($elm$core$List$map, $ianmackenzie$elm_3d_scene$Scene3d$singleLight, enabledShadowCasters),
					{
						lights12: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, light0, light1),
						lights34: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, light2, light3),
						lights56: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, fifth, sixth),
						lights78: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, seventh, eigth)
					});
			} else {
				return $ianmackenzie$elm_3d_scene$Scene3d$noLights;
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$fourLights = F4(
	function (first, second, third, fourth) {
		return A8($ianmackenzie$elm_3d_scene$Scene3d$eightLights, first, second, third, fourth, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled);
	});
var $ianmackenzie$elm_units$Temperature$Temperature = function (a) {
	return {$: 'Temperature', a: a};
};
var $ianmackenzie$elm_units$Temperature$kelvins = function (numKelvins) {
	return $ianmackenzie$elm_units$Temperature$Temperature(numKelvins);
};
var $ianmackenzie$elm_units$LuminousFlux$lumens = function (numLumens) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numLumens);
};
var $ianmackenzie$elm_units$Illuminance$lux = function (numLux) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numLux);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$point = F2(
	function (_v0, light) {
		var shadowFlag = _v0.a;
		var _v1 = $ianmackenzie$elm_geometry$Point3d$unwrap(light.position);
		var x = _v1.x;
		var y = _v1.y;
		var z = _v1.z;
		var _v2 = A2($ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToLinearRgb, light.intensity, light.chromaticity);
		var rgb = _v2.a;
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Light(
			{
				b: $elm_explorations$linear_algebra$Math$Vector3$getZ(rgb),
				castsShadows: shadowFlag,
				g: $elm_explorations$linear_algebra$Math$Vector3$getY(rgb),
				parameter: 0,
				r: $elm_explorations$linear_algebra$Math$Vector3$getX(rgb),
				type_: 2,
				x: x,
				y: y,
				z: z
			});
	});
var $ianmackenzie$elm_units$Quantity$float = function (value) {
	return $ianmackenzie$elm_units$Quantity$Quantity(value);
};
var $ianmackenzie$elm_units$Illuminance$inLux = function (_v0) {
	var numLux = _v0.a;
	return numLux;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$soft = function (light) {
	soft:
	while (true) {
		if (_Utils_eq(light.intensityAbove, $ianmackenzie$elm_units$Quantity$zero) && _Utils_eq(light.intensityBelow, $ianmackenzie$elm_units$Quantity$zero)) {
			return $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled;
		} else {
			if (A2(
				$ianmackenzie$elm_units$Quantity$greaterThan,
				$ianmackenzie$elm_units$Quantity$abs(light.intensityAbove),
				$ianmackenzie$elm_units$Quantity$abs(light.intensityBelow))) {
				var $temp$light = {
					chromaticity: light.chromaticity,
					intensityAbove: light.intensityBelow,
					intensityBelow: light.intensityAbove,
					upDirection: $ianmackenzie$elm_geometry$Direction3d$reverse(light.upDirection)
				};
				light = $temp$light;
				continue soft;
			} else {
				var nitsBelow = $elm$core$Basics$abs(
					$ianmackenzie$elm_units$Illuminance$inLux(light.intensityBelow) / $elm$core$Basics$pi);
				var nitsAbove = $elm$core$Basics$abs(
					$ianmackenzie$elm_units$Illuminance$inLux(light.intensityAbove) / $elm$core$Basics$pi);
				var _v0 = $ianmackenzie$elm_geometry$Direction3d$unwrap(light.upDirection);
				var x = _v0.x;
				var y = _v0.y;
				var z = _v0.z;
				var _v1 = A2(
					$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToLinearRgb,
					$ianmackenzie$elm_units$Quantity$float(1),
					light.chromaticity);
				var rgb = _v1.a;
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Light(
					{
						b: nitsAbove * $elm_explorations$linear_algebra$Math$Vector3$getZ(rgb),
						castsShadows: false,
						g: nitsAbove * $elm_explorations$linear_algebra$Math$Vector3$getY(rgb),
						parameter: nitsBelow / nitsAbove,
						r: nitsAbove * $elm_explorations$linear_algebra$Math$Vector3$getX(rgb),
						type_: 3,
						x: x,
						y: y,
						z: z
					});
			}
		}
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$threeLights = F3(
	function (first, second, third) {
		return A8($ianmackenzie$elm_3d_scene$Scene3d$eightLights, first, second, third, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$twoLights = F2(
	function (first, second) {
		return A8($ianmackenzie$elm_3d_scene$Scene3d$eightLights, first, second, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled);
	});
var $author$project$View$switchLight = function (model) {
	var _v0 = _Utils_Tuple2(model.level, model.world);
	_v0$13:
	while (true) {
		if (_v0.b.$ === 'Reversed') {
			switch (_v0.a) {
				case 0:
					var _v2 = _v0.b;
					var softLighting = $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
							intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(80),
							intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(80),
							upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
						});
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(100000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 20)
						});
					var light1 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(60000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 10)
						});
					return A3($ianmackenzie$elm_3d_scene$Scene3d$threeLights, light1, light2, softLighting);
				case 1:
					var _v4 = _v0.b;
					var softLighting = $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
							intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(80),
							intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(80),
							upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
						});
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(10000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 50, 20)
						});
					var light1 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$colorTemperature(
								$ianmackenzie$elm_units$Temperature$kelvins(7600)),
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(150000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 10, 10)
						});
					return A3($ianmackenzie$elm_3d_scene$Scene3d$threeLights, light1, light2, softLighting);
				case 2:
					var _v6 = _v0.b;
					var softLighting = $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
							intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(80),
							intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(80),
							upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
						});
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(100000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 20)
						});
					var light1 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(60000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 10)
						});
					return A3($ianmackenzie$elm_3d_scene$Scene3d$threeLights, light1, light2, softLighting);
				case 3:
					var _v8 = _v0.b;
					var softLighting = $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
							intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(80),
							intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(80),
							upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
						});
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(100000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 20)
						});
					var light1 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(60000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 10)
						});
					return A3($ianmackenzie$elm_3d_scene$Scene3d$threeLights, light1, light2, softLighting);
				case 5:
					var _v10 = _v0.b;
					var softLighting = $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
							intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(10),
							intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(10),
							upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
						});
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(10000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 50, 20)
						});
					var light1 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$colorTemperature(
								$ianmackenzie$elm_units$Temperature$kelvins(7600)),
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(15000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 10, 10)
						});
					var goalLighting = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(5000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, -19, 19, 1)
						});
					return A4($ianmackenzie$elm_3d_scene$Scene3d$fourLights, light1, light2, goalLighting, softLighting);
				case 4:
					var _v14 = _v0.b;
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(10000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 59, 5, 5)
						});
					var center = A2(
						$ianmackenzie$elm_geometry$Point3d$toRecord,
						$ianmackenzie$elm_units$Length$inMeters,
						$ianmackenzie$elm_geometry$Block3d$centerPoint(model.self._this));
					var light1 = function () {
						var _v15 = model.gameStatus;
						if (_v15.$ === 'Interlude') {
							var time = _v15.a;
							var duration = _v15.b;
							return ((_Utils_cmp(time, 0.125 * duration) > 0) && (_Utils_cmp(time, 0.25 * duration) < 1)) ? A2(
								$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
								$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
								{
									chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
									intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(100000 - (((50000 * time) / 0.125) / duration)),
									position: A3($ianmackenzie$elm_geometry$Point3d$meters, center.x, center.y, 5)
								}) : (((_Utils_cmp(time, 0.125 * duration) < 1) && (time >= 0)) ? A2(
								$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
								$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
								{
									chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
									intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(50000),
									position: A3($ianmackenzie$elm_geometry$Point3d$meters, center.x, center.y, 5)
								}) : A2(
								$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
								$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
								{
									chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
									intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(0),
									position: A3($ianmackenzie$elm_geometry$Point3d$meters, center.x, center.y, 5)
								}));
						} else {
							return A2(
								$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
								$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
								{
									chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
									intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(50000),
									position: A3($ianmackenzie$elm_geometry$Point3d$meters, center.x, center.y, 5)
								});
						}
					}();
					return A2($ianmackenzie$elm_3d_scene$Scene3d$twoLights, light1, light2);
				default:
					break _v0$13;
			}
		} else {
			switch (_v0.a) {
				case 0:
					var _v1 = _v0.b;
					var softLighting = $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
							intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(2),
							intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(5),
							upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
						});
					var light3 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$directional,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							direction: $ianmackenzie$elm_geometry$Direction3d$negativeZ,
							intensity: $ianmackenzie$elm_units$Illuminance$lux(1)
						});
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(3000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 7, 5)
						});
					var light1 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(10000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, -2, -2, 5)
						});
					return A3($ianmackenzie$elm_3d_scene$Scene3d$threeLights, light1, light2, softLighting);
				case 1:
					var _v3 = _v0.b;
					var softLighting = $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
							intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(2),
							intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(5),
							upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
						});
					var light3 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$directional,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							direction: $ianmackenzie$elm_geometry$Direction3d$negativeZ,
							intensity: $ianmackenzie$elm_units$Illuminance$lux(1)
						});
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$chromaticity(
								{x: 0.63, y: 0.33}),
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(30000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 38, 3)
						});
					var light1 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(10000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, -2, -2, 5)
						});
					var goalLighting = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(1000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 5, 31, 1)
						});
					return A4($ianmackenzie$elm_3d_scene$Scene3d$fourLights, light1, light2, light3, softLighting);
				case 2:
					var _v5 = _v0.b;
					var softLightingLumen = 80 - (0.05 * model.time);
					var softLighting = $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
							intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(softLightingLumen),
							intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(softLightingLumen),
							upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
						});
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(false),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(100000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 20)
						});
					var light1Lumen = 60000 - (40 * model.time);
					var light1 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(false),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(light1Lumen),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 10)
						});
					return A2($ianmackenzie$elm_3d_scene$Scene3d$twoLights, light1, softLighting);
				case 3:
					var _v7 = _v0.b;
					var softLighting = $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
							intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(20),
							intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(20),
							upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
						});
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(100000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 20)
						});
					var light1 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(60000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 10)
						});
					var goalLighting = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(5000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 1, 19, 1)
						});
					return A3($ianmackenzie$elm_3d_scene$Scene3d$threeLights, light1, light2, softLighting);
				case 5:
					var _v9 = _v0.b;
					var softLighting = $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
							intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(0),
							intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(0),
							upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
						});
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(10000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 20)
						});
					var light1 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(6000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 10)
						});
					var goalLighting = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(5000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, -19, 19, 1)
						});
					return A4($ianmackenzie$elm_3d_scene$Scene3d$fourLights, light1, light2, goalLighting, softLighting);
				case 4:
					var _v11 = _v0.b;
					var softLighting = function () {
						var _v13 = model.gameStatus;
						if (_v13.$ === 'Interlude') {
							var time = _v13.a;
							var duration = _v13.b;
							return ((_Utils_cmp(time, 0.125 * duration) > 0) && (_Utils_cmp(time, 0.25 * duration) < 1)) ? $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
								{
									chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
									intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(80 - (((40 * time) / 0.125) / duration)),
									intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(80 - (((40 * time) / 0.125) / duration)),
									upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
								}) : (((_Utils_cmp(time, 0.125 * duration) < 1) && (time >= 0)) ? $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
								{
									chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
									intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(40),
									intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(40),
									upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
								}) : $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
								{
									chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
									intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(0),
									intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(0),
									upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
								}));
						} else {
							return $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
								{
									chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
									intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(40),
									intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(40),
									upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
								});
						}
					}();
					var ratio = 0.25;
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(10000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 59, 5, 5)
						});
					var center = A2(
						$ianmackenzie$elm_geometry$Point3d$toRecord,
						$ianmackenzie$elm_units$Length$inMeters,
						$ianmackenzie$elm_geometry$Block3d$centerPoint(model.self._this));
					var light1 = function () {
						var _v12 = model.gameStatus;
						if (_v12.$ === 'Interlude') {
							var time = _v12.a;
							var duration = _v12.b;
							return ((_Utils_cmp(time, 0.125 * duration) > 0) && (_Utils_cmp(time, 0.25 * duration) < 1)) ? A2(
								$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
								$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
								{
									chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
									intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(100000 - (((50000 * time) / 0.125) / duration)),
									position: A3($ianmackenzie$elm_geometry$Point3d$meters, center.x, center.y, 5)
								}) : (((_Utils_cmp(time, 0.125 * duration) < 1) && (time >= 0)) ? A2(
								$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
								$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
								{
									chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
									intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(50000),
									position: A3($ianmackenzie$elm_geometry$Point3d$meters, center.x, center.y, 5)
								}) : A2(
								$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
								$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
								{
									chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
									intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(0),
									position: A3($ianmackenzie$elm_geometry$Point3d$meters, center.x, center.y, 5)
								}));
						} else {
							return A2(
								$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
								$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
								{
									chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
									intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(50000),
									position: A3($ianmackenzie$elm_geometry$Point3d$meters, center.x, center.y, 5)
								});
						}
					}();
					return A3($ianmackenzie$elm_3d_scene$Scene3d$threeLights, light1, softLighting, light2);
				case 6:
					var _v16 = _v0.b;
					var selfY = A2(
						$ianmackenzie$elm_units$Quantity$ratio,
						$ianmackenzie$elm_geometry$Point3d$yCoordinate(
							$ianmackenzie$elm_geometry$Block3d$centerPoint(model.self._this)),
						$ianmackenzie$elm_units$Length$meters(1));
					var max = 80;
					var lumi = function () {
						if (model.level6Lock) {
							return 1.5;
						} else {
							var _v17 = model.gameStatus;
							switch (_v17.$) {
								case 'Play':
									return max;
								case 'Interlude':
									var time = _v17.a;
									var duration = _v17.b;
									return (time / duration) * max;
								default:
									return max;
							}
						}
					}();
					var softLighting = $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
							intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(lumi),
							intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(lumi),
							upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
						});
					var light5 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$directional,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							direction: A2(
								$ianmackenzie$elm_geometry$Direction3d$xyZ,
								$ianmackenzie$elm_units$Angle$degrees(-60),
								$ianmackenzie$elm_units$Angle$degrees(30)),
							intensity: $ianmackenzie$elm_units$Illuminance$lux(80)
						});
					var light4 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens((60000 * lumi) / max),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 10)
						});
					var light3 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens((60000 * lumi) / max),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 38, 3)
						});
					var light2 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(10000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, -100, 5)
						});
					var light1 = A2(
						$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
						$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
						{
							chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
							intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(10000),
							position: A3($ianmackenzie$elm_geometry$Point3d$meters, -6, $author$project$Level6$Model$initY + 20, 5)
						});
					return model.level6Lock ? A3($ianmackenzie$elm_3d_scene$Scene3d$threeLights, light1, light2, softLighting) : A4($ianmackenzie$elm_3d_scene$Scene3d$fourLights, light3, light4, light5, softLighting);
				default:
					break _v0$13;
			}
		}
	}
	var softLighting = $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
		{
			chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$fluorescent,
			intensityAbove: $ianmackenzie$elm_units$Illuminance$lux(80),
			intensityBelow: $ianmackenzie$elm_units$Illuminance$lux(80),
			upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
		});
	var light2 = A2(
		$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
		$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
		{
			chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
			intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(100000),
			position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 20)
		});
	var light1 = A2(
		$ianmackenzie$elm_3d_scene$Scene3d$Light$point,
		$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(true),
		{
			chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent,
			intensity: $ianmackenzie$elm_units$LuminousFlux$lumens(60000),
			position: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 10)
		});
	return A2($ianmackenzie$elm_3d_scene$Scene3d$twoLights, light1, softLighting);
};
var $author$project$View$renderGame = function (model) {
	var wid = model.groundSize.w * 2;
	var settings = model.settings;
	var self = A2(
		$ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow,
		$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(model.self.color),
		model.self._this);
	var pickWall = F2(
		function (text3d, list) {
			return _Utils_eq(text3d.time, -2) ? list : _Utils_ap(list, text3d.wall);
		});
	var text3dWall = _Utils_eq(model.world, $author$project$Types$Normal) ? A3($elm$core$List$foldl, pickWall, _List_Nil, model.texts3d) : A3($elm$core$List$foldl, pickWall, _List_Nil, model.texts3dRev);
	var wall = model.godMode ? A2(
		$elm$core$List$map,
		function (block) {
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow,
				$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(block.color),
				block._this);
		},
		_Utils_ap(model.wall, text3dWall)) : _List_fromArray(
		[$ianmackenzie$elm_3d_scene$Scene3d$nothing]);
	var pickText = F2(
		function (text3d, list) {
			return (text3d.time <= 0) ? list : A2($elm$core$List$cons, text3d.entities, list);
		});
	var opacity = function () {
		var _v6 = model.gameStatus;
		switch (_v6.$) {
			case 'Interlude':
				var time = _v6.a;
				var duration = _v6.b;
				return ((model.level === 4) && (time >= 700)) ? '0' : '1';
			case 'Animation':
				var frame = _v6.a;
				return ((model.level === 6) && ((frame === 5) && (model.frameTime > 1))) ? $elm$core$String$fromFloat(model.frameTime / 80) : (((model.level === 6) && (frame > 5)) ? '0' : '1');
			default:
				return '1';
		}
	}();
	var nactives = A2(
		$elm$core$List$map,
		function (block) {
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow,
				$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(block.color),
				block._this);
		},
		model.nactives);
	var lights = $author$project$View$switchLight(model);
	var len = model.groundSize.l * 2;
	var he = A2(
		$ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow,
		$ianmackenzie$elm_3d_scene$Scene3d$Material$color($avh4$elm_color$Color$white),
		A2(
			$ianmackenzie$elm_geometry$Block3d$from,
			A3($ianmackenzie$elm_geometry$Point3d$meters, 0, 34, 0),
			A3($ianmackenzie$elm_geometry$Point3d$meters, 2, 36, 2)));
	var godText = F2(
		function (text3d, list) {
			return _Utils_ap(
				list,
				_List_fromArray(
					[text3d.entities]));
		});
	var texts3d = model.godMode ? (_Utils_eq(model.world, $author$project$Types$Normal) ? A3($elm$core$List$foldl, godText, _List_Nil, model.texts3d) : A3($elm$core$List$foldl, godText, _List_Nil, model.texts3dRev)) : (_Utils_eq(model.world, $author$project$Types$Normal) ? A3($elm$core$List$foldl, pickText, _List_Nil, model.texts3d) : A3($elm$core$List$foldl, pickText, _List_Nil, model.texts3dRev));
	var floor = A2(
		$ianmackenzie$elm_geometry$Block3d$from,
		A3($ianmackenzie$elm_geometry$Point3d$meters, wid, len, 0),
		A3($ianmackenzie$elm_geometry$Point3d$meters, -wid, -len, -0.01));
	var ground = function () {
		var _v4 = model.level;
		if (_v4 === 6) {
			var rgb = 90;
			var color = function () {
				if (model.level6Lock) {
					return $avh4$elm_color$Color$black;
				} else {
					var _v5 = model.gameStatus;
					switch (_v5.$) {
						case 'Play':
							return A3($avh4$elm_color$Color$rgb255, rgb, rgb, rgb);
						case 'Interlude':
							var time = _v5.a;
							var duration = _v5.b;
							var t = $elm$core$Basics$round((time / duration) * rgb);
							return A3($avh4$elm_color$Color$rgb255, t, t, t);
						default:
							return A3($avh4$elm_color$Color$rgb255, rgb, rgb, rgb);
					}
				}
			}();
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$block,
				$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(color),
				floor);
		} else {
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$block,
				$ianmackenzie$elm_3d_scene$Scene3d$Material$matte($avh4$elm_color$Color$darkGrey),
				floor);
		}
	}();
	var cars = A2(
		$elm$core$List$map,
		function (block) {
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow,
				$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(block.color),
				block._this);
		},
		model.cars);
	var camera = function () {
		var _v3 = model.level;
		if (!_v3) {
			return $ianmackenzie$elm_3d_camera$Camera3d$perspective(
				{
					verticalFieldOfView: $ianmackenzie$elm_units$Angle$degrees(30),
					viewpoint: $ianmackenzie$elm_3d_camera$Viewpoint3d$lookAt(
						{
							eyePoint: A3($ianmackenzie$elm_geometry$Point3d$meters, 25, -9, 36),
							focalPoint: model.camera.focalPoint,
							upDirection: $ianmackenzie$elm_geometry$Direction3d$positiveZ
						})
				});
		} else {
			return $ianmackenzie$elm_3d_camera$Camera3d$perspective(
				{
					verticalFieldOfView: $ianmackenzie$elm_units$Angle$degrees(30),
					viewpoint: $ianmackenzie$elm_3d_camera$Viewpoint3d$orbitZ(model.camera)
				});
		}
	}();
	var background = function () {
		var _v1 = model.level;
		if (_v1 === 6) {
			var r = 160;
			var g = 202;
			var b = 235;
			var color = function () {
				if (model.level6Lock) {
					return $avh4$elm_color$Color$black;
				} else {
					var _v2 = model.gameStatus;
					switch (_v2.$) {
						case 'Play':
							return A3($avh4$elm_color$Color$rgb255, r, g, b);
						case 'Interlude':
							var time = _v2.a;
							var duration = _v2.b;
							return A3(
								$avh4$elm_color$Color$rgb255,
								$elm$core$Basics$round((time / duration) * r),
								$elm$core$Basics$round((time / duration) * g),
								$elm$core$Basics$round((time / duration) * b));
						default:
							return A3($avh4$elm_color$Color$rgb255, r, g, b);
					}
				}
			}();
			return $ianmackenzie$elm_3d_scene$Scene3d$backgroundColor(color);
		} else {
			return $ianmackenzie$elm_3d_scene$Scene3d$backgroundColor(model.scene.background);
		}
	}();
	var actives = A2(
		$elm$core$List$map,
		function (block) {
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$blockWithShadow,
				$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(block.color),
				block._this);
		},
		model.actives);
	var entities = (model.level === 6) ? _Utils_ap(
		_List_fromArray(
			[ground, self, settings, he]),
		_Utils_ap(
			actives,
			_Utils_ap(
				nactives,
				_Utils_ap(
					wall,
					_Utils_ap(cars, texts3d))))) : _Utils_ap(
		_List_fromArray(
			[ground, self, settings]),
		_Utils_ap(
			actives,
			_Utils_ap(
				nactives,
				_Utils_ap(
					wall,
					_Utils_ap(cars, texts3d)))));
	var _v0 = model.screen;
	var width = _v0.width;
	var height = _v0.height;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'opacity', opacity)
			]),
		_List_fromArray(
			[
				$ianmackenzie$elm_3d_scene$Scene3d$custom(
				{
					antialiasing: $ianmackenzie$elm_3d_scene$Scene3d$supersampling(0.1 * model.scene.renderOpt),
					background: background,
					camera: camera,
					clipDepth: $ianmackenzie$elm_units$Length$meters(10),
					dimensions: _Utils_Tuple2(width, height),
					entities: entities,
					exposure: $ianmackenzie$elm_3d_scene$Scene3d$exposureValue(5),
					lights: lights,
					toneMapping: $ianmackenzie$elm_3d_scene$Scene3d$noToneMapping,
					whiteBalance: $ianmackenzie$elm_3d_scene$Scene3d$Light$incandescent
				})
			]));
};
var $author$project$View$renderText = function (model) {
	var top = $elm$core$String$fromFloat(model.text.top) + '%';
	var size = $elm$core$String$fromFloat(model.text.size) + 'vw';
	var opacity = $elm$core$String$fromFloat(model.text.opacity);
	var left = $elm$core$String$fromFloat(model.text.left) + '%';
	var content = model.text.content;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'font-family', 'Century Gothic'),
				A2($elm$html$Html$Attributes$style, 'letter-spacing', '2px'),
				A2($elm$html$Html$Attributes$style, 'font-size', size),
				A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'width', '500px'),
				A2($elm$html$Html$Attributes$style, 'height', '600px'),
				A2($elm$html$Html$Attributes$style, 'left', left),
				A2($elm$html$Html$Attributes$style, 'top', top),
				A2($elm$html$Html$Attributes$style, 'opacity', opacity)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(content)
			]));
};
var $author$project$View$view = function (model) {
	var _this = function () {
		var _v1 = model.actives;
		if (_v1.b) {
			var head = _v1.a;
			return head;
		} else {
			return model.self;
		}
	}();
	var opacity = function () {
		if (!model.level) {
			return model.frameTime / 100;
		} else {
			var _v0 = model.gameStatus;
			switch (_v0.$) {
				case 'LoseFadeOut':
					var time = _v0.a;
					var duration = _v0.b;
					return time / duration;
				case 'WinFadeOut':
					var time = _v0.b;
					var duration = _v0.c;
					return time / duration;
				case 'StartFadeIn':
					var time = _v0.a;
					var duration = _v0.b;
					return time / duration;
				case 'LevelChange':
					return 0;
				case 'Animation':
					var frame = _v0.a;
					return ((frame === 5) && (model.level === 1)) ? 0 : 1;
				default:
					return 1;
			}
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background-color', 'black'),
				A2($elm$html$Html$Attributes$style, 'scroll', 'no'),
				A2($elm$html$Html$Attributes$style, 'overflow', 'hidden')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Attributes$style,
						'opacity',
						$elm$core$String$fromFloat(opacity)),
						A2($elm$html$Html$Attributes$style, 'background-color', 'black')
					]),
				_List_fromArray(
					[
						$author$project$View$renderGame(model),
						$author$project$View$renderText(model),
						$author$project$View$renderEscMenu(model),
						$author$project$View$preGameView(model),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2($elm$html$Html$Attributes$style, 'top', '1%'),
								A2($elm$html$Html$Attributes$style, 'background-color', 'white'),
								A2($elm$html$Html$Attributes$style, 'opacity', '0')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		init: function (_v0) {
			return $author$project$Main$init;
		},
		subscriptions: $author$project$Subscriptions$subscriptions,
		update: $author$project$Update$update,
		view: $author$project$View$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));