# javascript-clipboard-modifier
JavaScript Clipboard Modifier (jQuery Plugin)

You can define static or dynamic clipboard change.

Use properties before, after, or callback for clipboard modification.

Use clipboard object for dynamic clipboard change.

## Static example
```
var args = {
    before : "prefix",
    after : "postfix"
    }
$().clipboardModifier(args);
```

## Dynamic example
```
window.app = {};
// create clipboard object - obligatory
window.app.clipboard = {
    before: "prefix ",
    }
$().clipboardModifier(window.app);
```