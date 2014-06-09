function addEvent(element, evnt, func) {
    //console.log(element);
    if (!element.addEventListener) {
        element.attachEvent('on'+evnt, func);
    }
    else {
        element.addEventListener(evnt, func, false);
    }
}

if(document.getElementsByClassName) {
    getElementsByClass = function(classList, node) {
        return (node || document).getElementsByClassName(classList);
    }
} else {
    getElementsByClass = function(classList, node) {
        var node = node || document,
            list = node.getElementsByTagName('*'),
            length = list.length,
            classArray = classList.split(/\s+/),
            classes = classArray.length,
            result = [], i,j;

        for(i = 0; i < length; i++) {
            for(j = 0; j < classes; j++) {
                if(list[i].className.search('\\b' + classArray[j] + '\\b') != -1) {
                    result.push(list[i]);
                    break;
                }
            }
        }
        return result;
    }
}

function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem)
    } else {
        return getOffsetSum(elem)
    }
}

function getOffsetSum(elem) {
    var top=0, left=0;
    while(elem) {
        top = top + parseInt(elem.offsetTop)
        left = left + parseInt(elem.offsetLeft)
        elem = elem.offsetParent
    }

    return {top: top, left: left}
}

function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect(),
        body = document.body,
        docElem = document.documentElement,
        scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        top  = box.top +  scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft;

    return {top: Math.round(top), left: Math.round(left)}
}

function addClass(o, c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")

    if (re.test(o.className)) return;
    o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}

function removeClass(o, c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");

    o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}

function hasClass(o, c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")

    if (re.test(o.className)) return true;
    else return false;
}

function getAttr(o, attr) {
    var result = (o.getAttribute && o.getAttribute(attr)) || null;
    if(!result) {
        var attrs = o.attributes,
            length = attrs.length;

        for(var i = 0; i < length; i++)
            if(attrs[i].nodeName === attr)
                result = attrs[i].nodeValue;
    }
    return result;
};

function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, props) {
    props = props || {};
    var exp = props.expires;

    if (typeof exp == "number" && exp) {
        var d = new Date();
        d.setTime(d.getTime() + exp*1000);
        exp = props.expires = d;
    }
    if(exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }

    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;

    for(var propName in props){
        updatedCookie += "; " + propName;
        var propValue = props[propName];

        if(propValue !== true){
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
}

addEvent(window,'load',init);