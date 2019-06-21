!function(){"use strict";var t=tinymce.util.Tools.resolve("tinymce.PluginManager"),e=tinymce.util.Tools.resolve("tinymce.util.VK"),n=function(t){return t.target_list},o=function(t){return t.rel_list},i=function(t){return t.link_class_list},r=function(t){return"boolean"==typeof t.link_assume_external_targets&&t.link_assume_external_targets},a=function(t){return"boolean"==typeof t.link_context_toolbar&&t.link_context_toolbar},l=function(t){return t.link_list},u=function(t){return"string"==typeof t.default_link_target},c=function(t){return t.default_link_target},s=n,f=function(t,e){t.settings.target_list=e},d=function(t){return!1!==n(t)},v=o,m=function(t){return void 0!==o(t)},g=i,h=function(t){return void 0!==i(t)},x=function(t){return!1!==t.link_title},p=function(t){return"boolean"==typeof t.allow_unsafe_link_target&&t.allow_unsafe_link_target},k=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),y=tinymce.util.Tools.resolve("tinymce.Env"),b=function(t){if(!y.ie||10<y.ie){var e=document.createElement("a");e.target="_blank",e.href=t,e.rel="noreferrer noopener";var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),r=e,a=n,document.body.appendChild(r),r.dispatchEvent(a),document.body.removeChild(r)}else{var o=window.open("","_blank");if(o){o.opener=null;var i=o.document;i.open(),i.write('<meta http-equiv="refresh" content="0; url='+k.DOM.encode(t)+'">'),i.close()}}var r,a},_=tinymce.util.Tools.resolve("tinymce.util.Tools"),w=function(t,e){var n,o,i=["noopener"],r=t?t.split(/\s+/):[],a=function(t){return t.filter(function(t){return-1===_.inArray(i,t)})};return(r=e?(n=a(n=r)).length?n.concat(i):i:a(r)).length?(o=r,_.trim(o.sort().join(" "))):null},T=function(t,e){return e=e||t.selection.getNode(),M(e)?t.dom.select("a[href]",e)[0]:t.dom.getParent(e,"a[href]")},C=function(t){return t&&"A"===t.nodeName&&t.href},M=function(t){return t&&"FIGURE"===t.nodeName&&/\bimage\b/i.test(t.className)},O=function(t,e){var n,o;(o=t.dom.select("img",e)[0])&&(n=t.dom.getParents(o,"a[href]",e)[0])&&(n.parentNode.insertBefore(o,n),t.dom.remove(n))},R=function(t,e,n){var o,i;(i=t.dom.select("img",e)[0])&&(o=t.dom.create("a",n),i.parentNode.insertBefore(o,i),o.appendChild(i))},N=function(t,e){return function(n){t.undoManager.transact(function(){var o=t.selection.getNode(),i=T(t,o),r={href:n.href,target:n.target?n.target:null,rel:n.rel?n.rel:null,class:n.class?n.class:null,title:n.title?n.title:null};m(t.settings)||!1!==p(t.settings)||(r.rel=w(r.rel,"_blank"===r.target)),n.href===e.href&&(e.attach(),e={}),i?(t.focus(),n.hasOwnProperty("text")&&("innerText"in i?i.innerText=n.text:i.textContent=n.text),t.dom.setAttribs(i,r),t.selection.select(i),t.undoManager.add()):M(o)?R(t,o,r):n.hasOwnProperty("text")?t.insertContent(t.dom.createHTML("a",r,t.dom.encode(n.text))):t.execCommand("mceInsertLink",!1,r)})}},A=function(t){return function(){t.undoManager.transact(function(){var e=t.selection.getNode();M(e)?O(t,e):t.execCommand("unlink")})}},L=C,P=function(t){return 0<_.grep(t,C).length},E=function(t){return!(/</.test(t)&&(!/^<a [^>]+>[^<]+<\/a>$/.test(t)||-1===t.indexOf("href=")))},S=T,I=function(t,e){var n;return(e?e.innerText||e.textContent:t.getContent({format:"text"})).replace(/\uFEFF/g,"")},K=w,U=tinymce.util.Tools.resolve("tinymce.util.Delay"),D=tinymce.util.Tools.resolve("tinymce.util.XHR"),B={},F=function(t,e,n){var o=function(t,n){return n=n||[],_.each(t,function(t){var i={text:t.text||t.title};t.menu?i.menu=o(t.menu):(i.value=t.value,e&&e(i)),n.push(i)}),n};return o(t,n||[])},q=function(t,e,n){var o=t.selection.getRng();U.setEditorTimeout(t,function(){t.windowManager.confirm(e,function(e){t.selection.setRng(o),n(e)})})},V=function(t,e){var n,o,i,a,l,k,y,b,w,T,C,M={},O=t.selection,R=t.dom,L=function(t){var e=i.find("#text");(!e.value()||t.lastControl&&e.value()===t.lastControl.text())&&e.value(t.control.text()),i.find("#href").value(t.control.value())},P=function(){o||!a||M.text||this.parent().parent().find("#text")[0].value(this.value())};a=E(O.getContent()),n=S(t),M.text=o=I(t.selection,n),M.href=n?R.getAttrib(n,"href"):"",n?M.target=R.getAttrib(n,"target"):u(t.settings)&&(M.target=c(t.settings)),(C=R.getAttrib(n,"rel"))&&(M.rel=C),(C=R.getAttrib(n,"class"))&&(M.class=C),(C=R.getAttrib(n,"title"))&&(M.title=C),a&&(l={name:"text",type:"textbox",size:40,label:"Text to display",onchange:function(){M.text=this.value()}}),e&&(k={type:"listbox",label:"Link list",values:F(e,function(e){e.value=t.convertURL(e.value||e.url,"href")},[{text:"None",value:""}]),onselect:L,value:t.convertURL(M.href,"href"),onPostRender:function(){k=this}}),d(t.settings)&&(void 0===s(t.settings)&&f(t,[{text:"None",value:""},{text:"New window",value:"_blank"}]),b={name:"target",type:"listbox",label:"Target",values:F(s(t.settings))}),m(t.settings)&&(y={name:"rel",type:"listbox",label:"Rel",values:F(v(t.settings),function(e){!1===p(t.settings)&&(e.value=K(e.value,"_blank"===M.target))})}),h(t.settings)&&(w={name:"class",type:"listbox",label:"Class",values:F(g(t.settings),function(e){e.value&&(e.textStyle=function(){return t.formatter.getCssText({inline:"a",classes:[e.value]})})})}),x(t.settings)&&(T={name:"title",type:"textbox",label:"Title",value:M.title}),i=t.windowManager.open({title:"Insert link",data:M,body:[{name:"href",type:"filepicker",filetype:"file",size:40,autofocus:!0,label:"Url",onchange:function(e){var n=e.meta||{};k&&k.value(t.convertURL(this.value(),"href")),_.each(e.meta,function(t,e){var n=i.find("#"+e);"text"===e?0===o.length&&(n.value(t),M.text=t):n.value(t)}),n.attach&&(B={href:this.value(),attach:n.attach}),n.text||P.call(this)},onkeyup:P,onpaste:P,onbeforecall:function(t){t.meta=i.toJSON()}},l,T,function(e){var n=[];if(_.each(t.dom.select("a:not([href])"),function(t){var o=t.name||t.id;o&&n.push({text:o,value:"#"+o,selected:-1!==e.indexOf("#"+o)})}),n.length)return n.unshift({text:"None",value:""}),{name:"anchor",type:"listbox",label:"Anchors",values:n,onselect:L}}(M.href),k,y,b,w],onSubmit:function(e){var n=r(t.settings),i=N(t,B),l=A(t),u=_.extend({},M,e.data),c=u.href;c?(a&&u.text!==o||delete u.text,0<c.indexOf("@")&&-1===c.indexOf("//")&&-1===c.indexOf("mailto:")?q(t,"The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?",function(t){t&&(u.href="mailto:"+c),i(u)}):!0===n&&!/^\w+:/i.test(c)||!1===n&&/^\s*www[\.|\d\.]/i.test(c)?q(t,"The URL you entered seems to be an external link. Do you want to add the required http:// prefix?",function(t){t&&(u.href="http://"+c),i(u)}):i(u)):l()}})},z=function(t){var e,n,o;n=V,"string"==typeof(o=l((e=t).settings))?D.send({url:o,success:function(t){n(e,JSON.parse(t))}}):"function"==typeof o?o(function(t){n(e,t)}):n(e,o)},H=function(t,e){return t.dom.getParent(e,"a[href]")},J=function(t){return H(t,t.selection.getStart())},$=function(t,e){if(e){var n=(i=e).getAttribute("data-mce-href")||i.getAttribute("href");if(/^#/.test(n)){var o=t.$(n);o.length&&t.selection.scrollIntoView(o[0],!0)}else b(e.href)}var i},j=function(t){return function(){z(t)}},G=function(t){return function(){$(t,J(t))}},X=function(t){return function(e){var n,o,i,r;return!!(a(t.settings)&&(!(r=t.plugins.contextmenu)||!r.isContextMenuVisible())&&L(e)&&3===(i=(o=(n=t.selection).getRng()).startContainer).nodeType&&n.isCollapsed()&&0<o.startOffset&&o.startOffset<i.data.length)}},Q=function(t){t.on("click",function(n){var o=H(t,n.target);o&&e.metaKeyPressed(n)&&(n.preventDefault(),$(t,o))}),t.on("keydown",function(e){var n,o=J(t);o&&13===e.keyCode&&!0===(n=e).altKey&&!1===n.shiftKey&&!1===n.ctrlKey&&!1===n.metaKey&&(e.preventDefault(),$(t,o))})},W=function(t){return function(){var e=this;t.on("nodechange",function(n){e.active(!t.readonly&&!!S(t,n.element))})}},Y=function(t){return function(){var e=this,n=function(t){P(t.parents)?e.show():e.hide()};P(t.dom.getParents(t.selection.getStart()))||e.hide(),t.on("nodechange",n),e.on("remove",function(){t.off("nodechange",n)})}},Z=function(t){t.addCommand("mceLink",j(t))},tt=function(t){t.addShortcut("Meta+K","",j(t))},et=function(t){t.addButton("link",{active:!1,icon:"link",tooltip:"Insert/edit link",onclick:j(t),onpostrender:W(t)}),t.addButton("unlink",{active:!1,icon:"unlink",tooltip:"Remove link",onclick:A(t),onpostrender:W(t)}),t.addContextToolbar&&t.addButton("openlink",{icon:"newtab",tooltip:"Open link",onclick:G(t)})},nt=function(t){t.addMenuItem("openlink",{text:"Open link",icon:"newtab",onclick:G(t),onPostRender:Y(t),prependToContext:!0}),t.addMenuItem("link",{icon:"link",text:"Link",shortcut:"Meta+K",onclick:j(t),stateSelector:"a[href]",context:"insert",prependToContext:!0}),t.addMenuItem("unlink",{icon:"unlink",text:"Remove link",onclick:A(t),stateSelector:"a[href]"})},ot=function(t){t.addContextToolbar&&t.addContextToolbar(X(t),"openlink | link unlink")};t.add("link",function(t){et(t),nt(t),ot(t),Q(t),Z(t),tt(t)})}();