///<reference path="../typings/index.d.ts" />
declare var require: NodeRequire;

var globalStack;

function makeStack() {
    var stack = [];

    // in order to capture escape event first
    document.body.addEventListener('keydown', function(e) {

        var key = e.keyCode || e.which;
        // yup i hard coded 27 sorry suckas
        if (key === 27) {
            pop(e);
        }
    }, true);

    function addEscapeHandler(handler) {
        stack.push(handler);
        return function() {
            removeEscapeHandler(handler);
        };
    }

    function removeEscapeHandler(handler) {
        var index = stack.indexOf(handler);
        if (index !== -1) {
            stack.splice(index, 1);
        }
    }

    function pop(e) {
        while (stack.length > 0 && !(stack.pop())(e)) {}
    }

    return {
        add: addEscapeHandler,
        pop: pop
    };
}

export default function(global: boolean = false) {
    if (!global) {
        return makeStack();
    }

    if (!globalStack) {
        globalStack = makeStack();
    }
    return globalStack;
};