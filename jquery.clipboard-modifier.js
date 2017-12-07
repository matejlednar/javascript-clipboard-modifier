/**
 * JavaScript Clipboard Modifier
 * 
 * @author Matej Lednár
 * 
 * @param {Object} $ - jQuery
 * @returns {undefined}
 */
(function ($) {
    $.fn.clipboardModifier = function (data) {

        var pasted = false;
        var copied = false;
        var lastFocus = null;
        var clipboard;
        var newValue = "";

        function pasteAction(e) {

            if (data) {
                clipboard = data.clipboard ? data.clipboard : data;
            } else {
                clipboard = {};
            }

            var before = clipboard.before ? clipboard.before : "";
            var after = clipboard.after ? clipboard.after : "";
            var callback = clipboard.callback ? clipboard.callback : function (text) {
                return text
            };

            var inputField;
            var copiedText = "";

            // get clipboard data - only text support
            if (window.clipboardData && window.clipboardData.getData) { // IE
                copiedText = window.clipboardData.getData('Text');
            } else if (e.clipboardData && e.clipboardData.getData) {
                copiedText = e.clipboardData.getData('text/plain');
            }

            if (copiedText == "") {
                return;
            }

            if (pasted) {
                pasted = false
                return;

            } else {
                lastFocus = document.activeElement;
                pasted = true;

                // change clipboard
                inputField = document.createElement("input");
                // selected text bug fix (remove white spaces) and paste it again - Firefox issue
                copiedText = copiedText.replace(/^\s+|\s+$/g, '');
                if (copied) {
                    newValue = before + (callback ? callback(copiedText) : copiedText) + after;
                } else {
                    newValue = copiedText;
                }
                document.body.appendChild(inputField);
                inputField.value = newValue;
                inputField.select();

                try {
                    document.execCommand("copy");
                    document.body.removeChild(inputField);
                } catch (ex) {
                    console.warn("Copy to clipboard action failed.", ex);
                }
                try {
                    lastFocus.focus();
                    document.execCommand("paste");
                } catch (ex) {
                    console.warn("Paste action failed.", ex);
                }

                copied = false;
            }
            return this;
        }

        function copyAction(e) {
            copied = true;
            pasted = false;
        }
        document.addEventListener("paste", pasteAction);
        document.addEventListener("copy", copyAction);

    };
}(jQuery));