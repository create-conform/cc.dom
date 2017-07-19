function DOM() {
    var self = this;

    var DISABLEPAGE_DIV_ID = "disablepage_div";

    //
    //  disablePage()
    //      Disables the page.
    //
    this.disablePage = function () {
        if (document.getElementById(DISABLEPAGE_DIV_ID) != null) {
            return;
        }
        var scdv = document.createElement("div");
        scdv.id = DISABLEPAGE_DIV_ID;
        scdv.setAttribute("style", "filter:alpha(opacity=0); opacity: 0.0; -moz-opacity:0.0; -khtml-opacity: 0.0;");
        scdv.style.filter = "alpha(opacity=0)";
        scdv.style.backgroundColor = "#000000";
        scdv.style.position = "absolute";
        scdv.style.left = "0px";
        scdv.style.top = "0px";
        scdv.style.cursor = "default";
        //scdv.style.width = sk.js.tools.browser.getWidth() + "px";
        //scdv.style.height = sk.js.tools.browser.getHeight() + "px";
        scdv.style.width = "100%";
        scdv.style.height = "100%";
        self.disableSelectionOnElement(scdv);
        //scdv.className = "disableScreen";
        document.body.appendChild(scdv);
    };

    //
    //  enablePage()
    //      Enables the page, after it is disabled.
    //
    this.enablePage = function () {
        var scdv = document.getElementById(DISABLEPAGE_DIV_ID);
        if (scdv == null) {
            return;
        }
        document.body.removeChild(scdv);
    };

    this.getBrowserWidth = function() {
        var w = 0;

        //IE
        if (!window.innerWidth) {
            //strict mode
            if (!(document.documentElement.clientWidth == 0)) {
                w = document.documentElement.clientWidth;
            }
            //quirks mode
            else {
                if (document.body) {
                    w = document.body.clientWidth;
                }
                else {
                    w = 0;
                }
            }
        }
        //w3c
        else {
            w = window.innerWidth;
        }

        return w;
    };
    this.getBrowserHeight = function() {
        //return 0;
        var h = 0;

        //IE
        if (!window.innerHeight) {
            //strict mode
            if (!(document.documentElement.clientHeight == 0)) {
                h = document.documentElement.clientHeight;
            }
            //quirks mode
            else {
                if (document.body) {
                    h = document.body.clientHeight;
                }
                else {
                    h = 0;
                }
            }
        }
        //w3c
        else {
            h = window.innerHeight;
        }

        return h;
    };
    this.getElementPosX = function(obj) {
        var curleft = 0;
        if (obj.offsetParent)
            while (1) {
                curleft += obj.offsetLeft;
                if (!obj.offsetParent)
                    break;
                obj = obj.offsetParent;
            }
        else if (obj.x)
            curleft += obj.x;
        return curleft;
    };
    this.getElementPosY = function(obj) {
        var curtop = 0;
        if (obj.offsetParent)
            while (1) {
                curtop += obj.offsetTop;
                if (!obj.offsetParent)
                    break;
                obj = obj.offsetParent;
            }
        else if (obj.y)
            curtop += obj.y;
        return curtop;
    };
    this.getElementContentWidth = function(obj) {
        return obj.offsetWidth;
    };
    this.getElementContentHeight = function(obj) {
        return obj.offsetHeight;
    };
    this.getElementMarginHeight = function(obj) {
        var elmMargin;
        if (obj.currentStyle) {
            elmMargin = parseInt(obj.currentStyle.marginTop, 10) + parseInt(obj.currentStyle.marginBottom, 10);
        }
        else { // Mozilla
            elmMargin = parseInt(document.defaultView.getComputedStyle(obj, '').getPropertyValue("margin-top")) + parseInt(document.defaultView.getComputedStyle(obj, "").getPropertyValue("margin-bottom"));
        }
        return elmMargin;
    };
    this.getElementMarginWidth = function(obj) {
        var elmMargin;
        if (obj.currentStyle) {
            elmMargin = parseInt(obj.currentStyle.marginLeft, 10) + parseInt(obj.currentStyle.marginRight, 10);
        }
        else { // Mozilla
            elmMargin = parseInt(document.defaultView.getComputedStyle(obj, '').getPropertyValue("margin-left")) + parseInt(document.defaultView.getComputedStyle(obj, "").getPropertyValue("margin-right"));
        }
        return elmMargin;
    };
    this.getElementBorderHeight = function(obj) {
        var elmBorder;
        if (obj.currentStyle) {
            elmBorder = parseInt(obj.currentStyle.borderTop, 10) + parseInt(obj.currentStyle.borderBottom, 10);
        }
        else { // Mozilla
            elmBorder = parseInt(document.defaultView.getComputedStyle(obj, '').getPropertyValue("border-top-width")) + parseInt(document.defaultView.getComputedStyle(obj, "").getPropertyValue("border-bottom-width"));
        }
        return elmBorder;
    };
    this.getElementBorderWidth = function(obj) {
        var elmBorder;
        if (obj.currentStyle) {
            elmBorder = parseInt(obj.currentStyle.borderLeft, 10) + parseInt(obj.currentStyle.borderRight, 10);
        }
        else { // Mozilla
            elmBorder = parseInt(document.defaultView.getComputedStyle(obj, '').getPropertyValue("border-left-width")) + parseInt(document.defaultView.getComputedStyle(obj, "").getPropertyValue("border-right-width"));
        }
        return elmBorder;
    };
    this.getElementHeight = function(obj, withBorder, borderSide) {
        if (borderSide) {
            switch (borderSide) {
                case null:
                case "top":
                case "bottom":
                    break;
                default:
                    throw new RangeError("Unsupported border side: '" + borderSide + "'.");
            }
        }
        var elmHeight, elmMargin, elmPadding, elmBorder;
        if (obj.currentStyle) {
            elmHeight = obj.currentStyle.height;
            elmMargin = (borderSide == null || borderSide == "top"? parseInt(obj.currentStyle.marginTop, 10) : 0) + (borderSide == null || borderSide == "bottom"? parseInt(obj.currentStyle.marginBottom, 10) : 0);
            elmPadding = (borderSide == null || borderSide == "top"? parseInt(obj.currentStyle.paddingTop, 10) : 0) + (borderSide == null || borderSide == "bottom"? parseInt(obj.currentStyle.paddingBottom, 10) : 0);
            elmBorder = (borderSide == null || borderSide == "top"? parseInt(obj.currentStyle.borderTop, 10) : 0) + (borderSide == null || borderSide == "bottom"? parseInt(obj.currentStyle.borderBottom, 10) : 0);
        }
        else { // Mozilla
            elmHeight = document.defaultView.getComputedStyle(obj, "").getPropertyValue("height");
            elmMargin = (borderSide == null || borderSide == "top"? parseInt(document.defaultView.getComputedStyle(obj, '').getPropertyValue("margin-top")) : 0) + (borderSide == null || borderSide == "bottom"? parseInt(document.defaultView.getComputedStyle(obj, "").getPropertyValue("margin-bottom")) : 0);
            elmPadding = (borderSide == null || borderSide == "top"? parseInt(document.defaultView.getComputedStyle(obj, '').getPropertyValue("padding-top")) : 0) + (borderSide == null || borderSide == "bottom"? parseInt(document.defaultView.getComputedStyle(obj, "").getPropertyValue("padding-bottom")) : 0);
            elmBorder = (borderSide == null || borderSide == "top"? parseInt(document.defaultView.getComputedStyle(obj, '').getPropertyValue("border-top-width")) : 0) + (borderSide == null || borderSide == "bottom"? parseInt(document.defaultView.getComputedStyle(obj, "").getPropertyValue("border-bottom-width")) : 0);
        }
        //console.log("getElementHeight()", elmHeight, elmMargin, elmPadding, elmBorder);
        return parseInt(elmHeight.length > 2 && elmHeight.substr(elmHeight.length - 2) == "px"? elmHeight.substr(0, elmHeight.length -2) : elmHeight) + elmMargin + elmPadding + (withBorder? elmBorder: 0);
    };
    this.getElementWidth = function(obj, withBorder, borderSide) {
        if (borderSide) {
            switch (borderSide) {
                case null:
                case "left":
                case "right":
                    break;
                default:
                    throw new RangeError("Unsupported border side: '" + borderSide + "'.");
            }
        }
        var elmWidth, elmMargin, elmPadding, elmBorder;
        if (obj.currentStyle) {
            elmWidth = obj.currentStyle.width;
            elmMargin = (borderSide == null || borderSide == "left"? parseInt(obj.currentStyle.marginLeft, 10) : 0) + (borderSide == null || borderSide == "right"? parseInt(obj.currentStyle.marginRight, 10) : 0);
            elmPadding = (borderSide == null || borderSide == "left"? parseInt(obj.currentStyle.paddingLeft, 10) : 0) + (borderSide == null || borderSide == "right"? parseInt(obj.currentStyle.paddingRight, 10) : 0);
            elmBorder = (borderSide == null || borderSide == "left"? parseInt(obj.currentStyle.borderLeft, 10) : 0) + (borderSide == null || borderSide == "right"? parseInt(obj.currentStyle.borderRight, 10) : 0);
        }
        else { // Mozilla
            elmWidth = document.defaultView.getComputedStyle(obj, "").getPropertyValue("width");
            elmMargin = (borderSide == null || borderSide == "left"? parseInt(document.defaultView.getComputedStyle(obj, '').getPropertyValue("margin-left")) : 0) + (borderSide == null || borderSide == "right"? parseInt(document.defaultView.getComputedStyle(obj, "").getPropertyValue("margin-right")) : 0);
            elmPadding = (borderSide == null || borderSide == "left"? parseInt(document.defaultView.getComputedStyle(obj, '').getPropertyValue("padding-left")) : 0) + (borderSide == null || borderSide == "right"? parseInt(document.defaultView.getComputedStyle(obj, "").getPropertyValue("padding-right")) : 0);
            elmBorder = (borderSide == null || borderSide == "left"? parseInt(document.defaultView.getComputedStyle(obj, '').getPropertyValue("border-left-width")) : 0) + (borderSide == null || borderSide == "right"? parseInt(document.defaultView.getComputedStyle(obj, "").getPropertyValue("border-right-width")) : 0);
        }
        //console.log("getElementWidth()", elmWidth, elmMargin, elmPadding, elmBorder);
        return parseInt(elmWidth.length > 2 && elmWidth.substr(elmWidth.length - 2) == "px"? elmWidth.substr(0, elmWidth.length -2) : elmWidth) + elmMargin + elmPadding + (withBorder? elmBorder: 0);
    };
    //
    //  disableSelection()
    //      Disables text selection on the given element.
    //
    this.disableSelectionOnElement = function (element) {
        element.ondrag = function () { return false; };
        element.onselectstart = function () { return false; };
    };
    //
    //  enableSelection()
    //      Enables text selection on the given element.
    //
    this.enableSelectionOnElement = function (element) {
        element.ondrag = null;
        element.onselectstart = null;
    };

    //
    //  getMousePosition(event)
    //      Grabs the mouse location on the page.
    //
    this.getMousePosition = function (e) {
        e = e || window.event;
        var cursor = { x: 0, y: 0 };
        if (e.pageX || e.pageY) {
            cursor.x = e.pageX;
            cursor.y = e.pageY;
        }
        else {
            cursor.x = e.clientX +
                (document.documentElement.scrollLeft ||
                ((document.body && document.body.scrollLeft) || 0)) -
                document.documentElement.clientLeft;
            cursor.y = e.clientY +
                (document.documentElement.scrollTop ||
                ((document.body && document.body.scrollTop) || 0)) -
                document.documentElement.clientTop;
        }
        return cursor;
    };

    //
    //  getElementSideClicked(event, element, offset)
    //      Returns true if the element was clicked on it's left side. This decision is based on
    //      the calculation that the mouse cursors location was before half the width of the element.
    //      if you want the center to be a few pixels to the right, add offset parameter 2 for example.
    //      the center will be moved 2 pixels to the right.
    //
    this.getElementSideClicked = function (e, element, offset) {
        if (offset == null) {
            offset = 0;
        }
        var relPosX = self.getMousePosition(e).x - self.getElementPosX(element);
        if (relPosX < (self.getElementWidth(element) / 2) + offset) {
            return true;
        }
        return false;
    };

    //Returns true if it is a DOM element
    this.isElement = function(o) {
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
        );
    };

    this.isNode = function(o) {
        return (
            typeof Node === "object" ? o instanceof Node :
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
        );
    };

    //
    // loadCSS(code, resname)
    //      Loads the specified css code in the browser under a new style tag with the given resource name.
    //
    this.loadCSS = function(code, fileName)
    {
        if (code == null)
        {
            return null;
        }

        code += "\r\n/*# sourceURL=" + fileName + "*/";
        var style = document.createElement("style");
        style.type = "text/css";
        style.setAttribute("data-resname", fileName);
        if (style.styleSheet){
            style.styleSheet.cssText = code;
        } else {
            style.appendChild(document.createTextNode(code));
        }

        document.head.appendChild(style);
    }
}

define(function() {
    return new (Function.prototype.bind.apply(DOM, arguments));
});