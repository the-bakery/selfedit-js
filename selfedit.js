/* Copyright 2013, Mate J Kovacs */

expand('window', document.getElementById('view'), this);

function expand(id, view, obj)
{
    summary(id, view, obj, "collapser", function() { collapse(id, view, obj) });
    details(id, view, obj);
}

function collapse(id, view, obj)
{
    summary(id, view, obj, "expander", function() { expand(id, view, obj) });
}

function summary(id, view, obj, style, func)
{
    while (view.hasChildNodes()) { view.removeChild(view.lastChild); }

    var span = document.createElement("span");
    span.setAttribute("class", style);
    span.addEventListener("click", func);
    var type = (obj === null) ? "null" : Object.prototype.toString.call(obj);
    span.appendChild( document.createTextNode(id + " : " + type) );
    view.appendChild(span);
}

function details(id, view, obj)
{
    var node = document.createElement("ul");

    var item = document.createElement("li");
    var text = (obj === null) ? "null" : obj.toString();
    item.appendChild( document.createTextNode(text) );
    node.appendChild(item);

    try
    {
        var keys = Object.getOwnPropertyNames(obj).sort();
        node.appendChild(
            document.createTextNode("properties (" + keys.length + "):")
        );
        for (i = 0; i < keys.length; i++)
        {
            var key = keys[i];
            var child = document.createElement("li");
            collapse(key, child, obj[key]);
            node.appendChild(child);
        }
    }
    catch(e){}

    view.appendChild(node);
}
