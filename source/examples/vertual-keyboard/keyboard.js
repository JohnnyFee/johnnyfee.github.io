//SET CURSOR POSITION
jQuery.fn.setCursorPosition = function (pos) {
    this.each(function (index, elem) {
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    });
    return this;
};

// GET CURSOR POSITION
jQuery.fn.getCursorPosition = function () {
    if (this.lengh == 0) return -1;
    return $(this).getSelectionStart();
};

jQuery.fn.getSelectionStart = function () {
    if (this.lengh == 0) return -1;
    var input = this[0];

    var pos = input.value.length;

    if (input.createTextRange) {
        var r = document.selection.createRange().duplicate();
        r.moveEnd('character', input.value.length);
        if (r.text == '')
            pos = input.value.length;
        pos = input.value.lastIndexOf(r.text);
    } else if (typeof(input.selectionStart) != "undefined")
        pos = input.selectionStart;

    return pos;
};

// bind all conditional input element
$(function () {
    $(':input').not('[type="reset"]').not('[type="submit"]').on('focus, click', function (e) {
        keyboard.currentElement = $(this);
        keyboard.currentElementCursorPosition = $(this).getCursorPosition();
        console.log('keyboard is now focused on ' + keyboard.currentElement.attr('name') + ' at pos(' + keyboard.currentElementCursorPosition + ')');
    });

    keyboard.currentElement = $(':input[type="text"]:first');
    keyboard.currentElementCursorPosition = keyboard.currentElement.getCursorPosition();
});

window.keyboard = (function () {

    var updateCursor = function () {
        //input cursor focus and position during typing
        this.currentElement.setCursorPosition(this.currentElementCursorPosition);
    };

    return {
        keyPress: function (keycode) {
            // TODO press different keys
            var a = this.currentElement.val(),
                b = String.fromCharCode(keycode),
                output = [a.slice(0, this.currentElementCursorPosition), b, a.slice(this.currentElementCursorPosition)].join('');
            this.currentElement.val(output);
            this.currentElementCursorPosition++; //+1 cursor
            updateCursor();
        }
    }
})();

keyboard.keyPress()
