jquery-dyncall
==============

Call function, methods or code in elements attributes dynamically

## Usage

Calling a defined function:

```javascript
//Call to alert function with argument
$.dynFn("call","alert",["Hello world!"]);


//You can get the alert function
var fn = $.dynFn("get","alert");
// And call
fn("Hello world!");

fn("This is a test!")
```

Calling not defined function:

```javascript
//We can do something like this
var result = $.dynFn("call","return x + y;", { x : 1, y : 2 });
console.log(result); //this will print "3" on console.
```

If you want to use a dynamically declared function, is recommended to declare only once as this example:

```javascript
var fn = $.dynFn("get","return x + y;", ["x","y"]);
console.log("result => "+fn(1,2));
console.log("result => "+fn(5,8));
```


##Ajax Form Example

Ajax form is a practical use of this example, you can declare a function as this example:

```javascript
function ConfigureAjaxForm(){
	$(".AjaxForm").submit(function(e){
		e.preventDefault();
		var this_form = $(this);
		$.post($(this).attr("action"),$(this).serializeArray(),function(data){
			this_form.dynCall("data-onsucess",[data]);
		});
		return false;
	});
}

function LoginResultData(r){
	if(r.result){
		
	}
}
```

So, now we need to initialize ajax forms

```javascript
$(ConfigureAjaxForm);
```

finally, the form should be as this example:

```html
<form id="user_login" class="AjaxForm" data-onsuccess="LoginResultData" name="user_login" method="post" action="/Example/dologin"><table>
	<tbody><tr>
		<td><label for="username">Username</label></td>
		<td><input type="text" value="" name="username"></td>
	</tr>
	<tr>
		<td><label for="password">Password</label></td>
		<td><input type="text" value="" name="password"></td>
	</tr>
	<tr>
		<td></td>
		<td><input type="submit" value="Sign in" id="submitbutton" name="submit"></td>
	</tr>
</tbody></table>
</form>
```
