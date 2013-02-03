/* Copyright 2013, Mate J Kovacs */

unfold('window', document.getElementById('view'), this);

function unfold(id, view, obj)
{
    summary(id, view, obj, "-", function() { fold(id, view, obj) });
    details(id, view, obj);
}

function fold(id, view, obj)
{
    summary(id, view, obj, "+", function() { unfold(id, view, obj) });
}

function summary(id, view, obj, text, func)
{
    while (view.hasChildNodes()) { view.removeChild(view.lastChild); }

    var button = document.createElement("button");
    button.appendChild( document.createTextNode(text) );
    button.setAttribute("style", "width:24px; text-align:left");
    button.addEventListener("click", func);
    view.appendChild(button);
    var type = (obj === null) ? "null" : Object.prototype.toString.call(obj);
    view.appendChild( document.createTextNode(id + " : " + type) );
}

function details(id, view, obj)
{
    var node = document.createElement("div");

    node.setAttribute("style", "margin-left:24px");
    if (obj === null)
    {
        node.appendChild( document.createTextNode("null") );
    }
    else
    {
        var string = obj.toString();
        node.appendChild( document.createTextNode(string) );
        node.appendChild( document.createElement("br") );

        try
        {
            var keys = Object.getOwnPropertyNames(obj).sort();
            node.appendChild(
                document.createTextNode("properties (" + keys.length + "):")
            );
            node.appendChild( document.createElement("br") );
            for (i = 0; i < keys.length; i++)
            {
                var key = keys[i];
                var child = document.createElement("div");
                fold(key, child, obj[key]);
                node.appendChild(child);
            }
        }
        catch(e){}
    }

    view.appendChild(node);
}
