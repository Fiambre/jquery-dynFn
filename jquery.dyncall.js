/*!
 * jQuery DynCall Plugin v0.9
 * https://github.com/HaSuKrOnOs/jquery-dyncall/
 *
 * Copyright 2014 Rodrigo Guerrero Álvarez
 * Released under the MIT license
 */

(function( $ ) {
    $.fn.dynCall = function(s) {
		var fn = $.trim($(this).attr(s));
        if(!fn) $.dynCall(s); else $.dynCall(fn);
    };
}( jQuery ));

jQuery.dynGet = function(code, argNames){
	argNames = (argNames)?argNames:Array();
	var fn = window, parts = (code || "").split(".");
	while (fn && parts.length)fn = fn[parts.shift()];
	if ($.isFunction(fn))return fn;
    argNames.push(code);
    return Function.constructor.apply(null, argNames);
};

jQuery.dynCall = function(s){
	$.dynGet(s).apply(null,Array.prototype.slice.call(arguments, 1));
};
