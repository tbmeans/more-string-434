# More utilities for strings in JavaScript
The default export of this module is a constructor wrapping the given string
in an object. Produce the given string by calling the property named "str".
Methods for manipulating the given string are as follows.

## MoreString static methods
You can make a string from an array, stringify a number of seconds into H:MM:SS
format, stringify a number of seconds into machine-readable format
"##H ##M ##S", stringify a number of seconds into a valid duration string for
the "datetime" attribute of the semantic time tag, of the form "PT##H##M##S",
according to the [HTML Standard](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-duration-string)

## MoreString.prototype methods
You can validate that the value given to constructor is a string, verify that
the string of the object contains a substring and multiple occurrences, verify
that the string of the object begins with any alphabetic or capital alphabetic
character, break up the string of the object into a multi-line string with no
more than 79 printed characters per line, and show the result of growing a CSV
by one value.

