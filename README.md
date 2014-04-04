# Connection

Show the connection status.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/rbarros/connection.js/master/dist/Connection.min.js
[max]: https://raw.github.com/rbarros/connection.js/master/dist/Connection.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/Connection.min.js"></script>
<script>
    Connection.run();
</script>
```

## Documentation
_(Coming soon)_

## Examples
```
// Basic run
Connection.run();

// Callback
var oldstatus = Connection.code;
Connection.run(function(code, text) {
    if (oldstatus !== code) {
        var status, msg, div;

        if (code) {
            status = 'alert-success';
            msg = 'Ok ! Sua conexão voltou!';
            $("button").removeAttr("disabled");
            $("a").removeAttr("disabled");
        } else {
            status = 'alert-error';
            msg = 'Atenção: Sua conexão caiu ! Verifique antes de continuar !';
            $("button").attr("disabled", "disabled");
            $("a").attr("disabled", "disabled");
        }

        if ($('.connection').length === 0) {
            $('body').prepend($('<div class="connection alert ' + status + '" style="width: 50%; left: 25%; text-align: center; position: absolute; display: none;"><a class="close" data-dismiss="' + status + '">×</a><p>' + msg + '</p></div>'));
            div = $('.connection');
        } else {
            div = $('.connection');
            div.removeClass('alert-error')
               .removeClass('alert-success')
               .addClass(status)
               .find('a').attr('data-dismiss', status)
               .parent().find('p').text(msg);
        }
        div.slideDown().delay(2000).slideUp();
        oldstatus = code;
    }
});
```

## Release History

* **v1.0.0** - 2013-10-7
   - Initial release.

## License
> Copyright (c) 2013 Ramon Barros

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.