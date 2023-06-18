(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "react-dom"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    var ReactDOM = require("react-dom");
    var App = function (_a) {
        var greeting = _a.greeting, count = _a.count;
        var _b = React.useState({ count: 0 }), data = _b[0], setData = _b[1];
        return React.createElement(React.Fragment, null,
            React.createElement("div", null,
                React.createElement("h2", null, greeting),
                React.createElement("button", { onClick: function () { return setData({ count: data.count + 1 }); } },
                    "This button has been clicked ",
                    data.count,
                    " times.")));
    };
    ReactDOM.render(React.createElement(App, { greeting: 'Hello world' }), document.getElementById('app'));
});
//# sourceMappingURL=app.js.map