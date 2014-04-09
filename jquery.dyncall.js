/*!
 * jQuery DynCall Plugin v0.9.1
 * https://github.com/HaSuKrOnOs/jquery-dyncall/
 *
 * Copyright 2014 Rodrigo Guerrero Álvarez
 * Released under the MIT license
 */

(function( $ ) {
    $.fn.dynCall = function(s) {
	var fn = $.trim($(this).attr(s));
        if(!fn) $.dynFn('call',s); else $.dynFn('call',fn);
    };
}( jQuery ));

jQuery.dynFn = function(mode,fn,arg){
	var modes = { get : "get", call : "call" };
	function dynGetFn(code, argNames){
		
		argNames = (argNames)?argNames:Array();
		
		var fn = window, parts = (code || "").split(".");
		
		while (fn && parts.length)fn = fn[parts.shift()];
		
		if ($.isFunction(fn))return fn;
		
		argNames.push(code);
		
		return Function.constructor.apply(null, argNames);
	}
	
	function dynCallFn(s){
		return dynGetFn(s).apply(null,Array.prototype.slice.call(arguments, 1));
	}
	
	function dynCallCustomFn(s, arg){
		
		var arg_names  = new Array();
		var arg_values = new Array();
		
		for(var key in arg){
			arg_names.push(key);
			arg_values.push(arg[key]);
		}
		
		return dynGetFn(s,arg_names).apply(null,arg_values);
	}
	
	switch(mode){
		case modes.get:
			return dynGetFn(fn,arg);
			break;
		case modes.call:
			//If no arguments, simply call function.
			if(typeof arg === "undefined"){
				return dynCallFn(fn);
			}
			//If arguments are array, call with arguments.
			else if($.isArray(arg)){
				return dynCallFn(fn,arg);	
			}
			//If arguments are object, call custom Function.
			else{
				return dynCallCustomFn(fn,arg);
			}
			break;
		default:
			throw 'Invalid mode';
	}
	
};
