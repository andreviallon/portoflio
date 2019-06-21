!function(){var e=function(){"use strict";function e(){}var t=tinymce.util.Tools.resolve("tinymce.PluginManager"),n=tinymce.util.Tools.resolve("tinymce.dom.RangeUtils"),r=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),o=tinymce.util.Tools.resolve("tinymce.util.VK"),i=tinymce.util.Tools.resolve("tinymce.dom.BookmarkManager"),a=tinymce.util.Tools.resolve("tinymce.util.Tools"),s=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),d,l,c,u,f=function(e){return e&&"BR"===e.nodeName},m,g,p,v,h=function(e,t){return!!f(t)&&!(!e.isBlock(t.nextSibling)||f(t.previousSibling))},C,y,N=function(e){return e&&3===e.nodeType},L=function(e){return e&&/^(OL|UL|DL)$/.test(e.nodeName)},S=function(e){return e&&/^(LI|DT|DD)$/.test(e.nodeName)},b=function(e){return e&&/^(TH|TD)$/.test(e.nodeName)},D=f,k=function(e){return e.parentNode.firstChild===e},T=function(e){return e.parentNode.lastChild===e},I=function(e,t){return t&&!!e.schema.getTextBlockElements()[t.nodeName]},B=function(e,t){return e&&e.nodeName in t},R=h,O=function(e,t,n){var r=e.isEmpty(t);return!(n&&e.select("span[data-mce-type=bookmark]",t).length>0)&&r},E=function(e,t){return e.isChildOf(t,e.getRoot())},A=function(e,t){var r=n.getNode(e,t),o;return S(e)&&N(r)?{container:r,offset:t>=e.childNodes.length?r.data.length:0}:{container:e,offset:t}},P=function(e){var t=e.cloneRange(),n=A(e.startContainer,e.startOffset);t.setStart(n.container,n.offset);var r=A(e.endContainer,e.endOffset);return t.setEnd(r.container,r.offset),t},x=A,_=P,M=s.DOM,U,H,$=function(e){var t={},n=function(n){var r,o,i;o=e[n?"startContainer":"endContainer"],i=e[n?"startOffset":"endOffset"],1===o.nodeType&&(r=M.create("span",{"data-mce-type":"bookmark"}),o.hasChildNodes()?(i=Math.min(i,o.childNodes.length-1),n?o.insertBefore(r,o.childNodes[i]):M.insertAfter(r,o.childNodes[i])):o.appendChild(r),o=r,i=0),t[n?"startContainer":"endContainer"]=o,t[n?"startOffset":"endOffset"]=i};return n(!0),e.collapsed||n(),t},w=function(e){function t(t){var n,r,o,i=function(e){for(var t=e.parentNode.firstChild,n=0;t;){if(t===e)return n;1===t.nodeType&&"bookmark"===t.getAttribute("data-mce-type")||n++,t=t.nextSibling}return-1};n=o=e[t?"startContainer":"endContainer"],r=e[t?"startOffset":"endOffset"],n&&(1===n.nodeType&&(r=i(n),n=n.parentNode,M.remove(o),!n.hasChildNodes()&&M.isBlock(n)&&n.appendChild(M.create("br"))),e[t?"startContainer":"endContainer"]=n,e[t?"startOffset":"endOffset"]=r)}t(!0),t();var n=M.createRng();return n.setStart(e.startContainer,e.startOffset),e.endContainer&&n.setEnd(e.endContainer,e.endOffset),_(n)},K=s.DOM,Q=function(e,t){var n,r=t.parentNode;"LI"===r.nodeName&&r.firstChild===t&&((n=r.previousSibling)&&"LI"===n.nodeName?(n.appendChild(t),O(e,r)&&K.remove(r)):K.setStyle(r,"listStyleType","none")),L(r)&&(n=r.previousSibling)&&"LI"===n.nodeName&&n.appendChild(t)},W=function(e,t){a.each(a.grep(e.select("ol,ul",t)),function(t){Q(e,t)})},j=Q,q=W,F=tinymce.util.Tools.resolve("tinymce.dom.DomQuery"),V=function(e){var t=e.selection.getStart(!0);return e.dom.getParent(t,"OL,UL,DL",Z(e,t))},z=function(e,t){return e&&1===t.length&&t[0]===e},G=function(e){return a.grep(e.querySelectorAll("ol,ul,dl"),function(e){return L(e)})},J=function(e){var t=V(e),n=e.selection.getSelectedBlocks();return z(t,n)?G(t):a.grep(n,function(e){return L(e)&&t!==e})},X=function(e,t){var n=a.map(t,function(t){var n=e.dom.getParent(t,"li,dd,dt",Z(e,t));return n||t});return F.unique(n)},Y,Z=function(e,t){var n=e.dom.getParents(t,"TD,TH"),r;return n.length>0?n[0]:e.getBody()},ee={getParentList:V,getSelectedSubLists:J,getSelectedListItems:function(e){var t=e.selection.getSelectedBlocks();return a.grep(X(e,t),function(e){return S(e)})},getClosestListRootElm:Z},te=tinymce.util.Tools.resolve("tinymce.Env"),ne=s.DOM,re,oe=function(e,t,n){var r,o,i=ne.createFragment(),a,s=e.schema.getBlockElements();if(e.settings.forced_root_block&&(n=n||e.settings.forced_root_block),n&&((o=ne.create(n)).tagName===e.settings.forced_root_block&&ne.setAttribs(o,e.settings.forced_root_block_attrs),B(t.firstChild,s)||i.appendChild(o)),t)for(;r=t.firstChild;){var d=r.nodeName;a||"SPAN"===d&&"bookmark"===r.getAttribute("data-mce-type")||(a=!0),B(r,s)?(i.appendChild(r),o=null):n?(o||(o=ne.create(n),i.appendChild(o)),o.appendChild(r)):i.appendChild(r)}return e.settings.forced_root_block?a||te.ie&&!(te.ie>10)||o.appendChild(ne.create("br",{"data-mce-bogus":"1"})):i.appendChild(ne.create("br")),i},ie=s.DOM,ae,se=function(e,t,n,r){var o,i,s,d,l=function(e){a.each(s,function(t){e.parentNode.insertBefore(t,n.parentNode)}),ie.remove(e)};for(s=ie.select('span[data-mce-type="bookmark"]',t),r=r||oe(e,n),(o=ie.createRng()).setStartAfter(n),o.setEndAfter(t),d=(i=o.extractContents()).firstChild;d;d=d.firstChild)if("LI"===d.nodeName&&e.dom.isEmpty(d)){ie.remove(d);break}e.dom.isEmpty(i)||ie.insertAfter(i,t),ie.insertAfter(r,t),O(e.dom,n.parentNode)&&l(n.parentNode),ie.remove(n),O(e.dom,t)&&ie.remove(t)},de=s.DOM,le=function(e,t){O(e,t)&&de.remove(t)},ce=function(e,t){var n=t.parentNode,r,o;return n?(r=n.parentNode,n===e.getBody()||("DD"===t.nodeName?(de.rename(t,"DT"),!0):k(t)&&T(t)?("LI"===r.nodeName?(de.insertAfter(t,r),le(e.dom,r),de.remove(n)):L(r)?de.remove(n,!0):(r.insertBefore(oe(e,t),n),de.remove(n)),!0):k(t)?("LI"===r.nodeName?(de.insertAfter(t,r),t.appendChild(n),le(e.dom,r)):L(r)?r.insertBefore(t,n):(r.insertBefore(oe(e,t),n),de.remove(t)),!0):T(t)?("LI"===r.nodeName?de.insertAfter(t,r):L(r)?de.insertAfter(t,n):(de.insertAfter(oe(e,t),n),de.remove(t)),!0):("LI"===r.nodeName?(n=r,o=oe(e,t,"LI")):o=L(r)?oe(e,t,"LI"):oe(e,t),se(e,n,t,o),q(e.dom,n.parentNode),!0))):(le(e.dom,t),!0)},ue=function(e){var t=ee.getSelectedListItems(e);if(t.length){var n=$(e.selection.getRng()),r=void 0,o=void 0,i=ee.getClosestListRootElm(e,e.selection.getStart(!0));for(r=t.length;r--;)for(var a=t[r].parentNode;a&&a!==i;){for(o=t.length;o--;)if(t[o]===a){t.splice(r,1);break}a=a.parentNode}for(r=0;r<t.length&&(ce(e,t[r])||0!==r);r++);return e.selection.setRng(w(n)),e.nodeChanged(),!0}},fe=ce,me=ue,ge=function(e,t,n){var r=n["list-style-type"]?n["list-style-type"]:null;e.setStyle(t,"list-style-type",r)},pe=function(e,t){a.each(t,function(t,n){e.setAttribute(n,t)})},ve=function(e,t,n){pe(t,n["list-attributes"]),a.each(e.select("li",t),function(e){pe(e,n["list-item-attributes"])})},he=function(e,t,n){ge(e,t,n),ve(e,t,n)},Ce=function(e,t,n){a.each(n,function(n){var r;return e.setStyle(t,((r={})[n]="",r))})},ye=function(e,t,n,r){var o,i;for(o=t[n?"startContainer":"endContainer"],i=t[n?"startOffset":"endOffset"],1===o.nodeType&&(o=o.childNodes[Math.min(i,o.childNodes.length-1)]||o),!n&&D(o.nextSibling)&&(o=o.nextSibling);o.parentNode!==r;){if(I(e,o))return o;if(/^(TD|TH)$/.test(o.parentNode.nodeName))return o;o=o.parentNode}return o},Ne=function(e,t,n){for(var r=[],o=e.dom,s=ye(e,t,!0,n),d=ye(e,t,!1,n),l,c=[],u=s;u&&(c.push(u),u!==d);u=u.nextSibling);return a.each(c,function(t){if(I(e,t))return r.push(t),void(l=null);if(o.isBlock(t)||D(t))return D(t)&&o.remove(t),void(l=null);var a=t.nextSibling;i.isBookmarkNode(t)&&(I(e,a)||!a&&t.parentNode===n)?l=null:(l||(l=o.create("p"),t.parentNode.insertBefore(l,t),r.push(l)),l.appendChild(t))}),r},Le=function(e,t,n){var r=e.getStyle(t,"list-style-type"),o=n?n["list-style-type"]:"";return r===(o=null===o?"":o)},Se=function(e,t,n){void 0===n&&(n={});var r=e.selection.getRng(!0),o,i="LI",s=ee.getClosestListRootElm(e,e.selection.getStart(!0)),d=e.dom;"false"!==d.getContentEditable(e.selection.getNode())&&("DL"===(t=t.toUpperCase())&&(i="DT"),o=$(r),a.each(Ne(e,r,s),function(r){var o,a;(a=r.previousSibling)&&L(a)&&a.nodeName===t&&Le(d,a,n)?(o=a,r=d.rename(r,i),a.appendChild(r)):(o=d.create(t),r.parentNode.insertBefore(o,r),o.appendChild(r),r=d.rename(r,i)),Ce(d,r,["margin","margin-right","margin-bottom","margin-left","margin-top","padding","padding-right","padding-bottom","padding-left","padding-top"]),he(d,o,n),Be(e.dom,o)}),e.selection.setRng(w(o)))},be=function(e){var t=$(e.selection.getRng(!0)),n=ee.getClosestListRootElm(e,e.selection.getStart(!0)),r=ee.getSelectedListItems(e),o=a.grep(r,function(t){return e.dom.isEmpty(t)});r=a.grep(r,function(t){return!e.dom.isEmpty(t)}),a.each(o,function(t){O(e.dom,t)&&fe(e,t)}),a.each(r,function(t){var r,o;if(t.parentNode!==e.getBody()){for(r=t;r&&r!==n;r=r.parentNode)L(r)&&(o=r);se(e,o,t),q(e.dom,o.parentNode)}}),e.selection.setRng(w(t))},De=function(e,t){return e&&t&&L(e)&&e.nodeName===t.nodeName},ke=function(e,t,n){var r,o;return e.getStyle(t,"list-style-type",!0)===e.getStyle(n,"list-style-type",!0)},Te=function(e,t){return e.className===t.className},Ie=function(e,t,n){return De(t,n)&&ke(e,t,n)&&Te(t,n)},Be=function(e,t){var n,r;if(n=t.nextSibling,Ie(e,t,n)){for(;r=n.firstChild;)t.appendChild(r);e.remove(n)}if(n=t.previousSibling,Ie(e,t,n)){for(;r=n.lastChild;)t.insertBefore(r,t.firstChild);e.remove(n)}},Re=function(e,t,n,r){if(t.nodeName!==n){var o=e.rename(t,n);he(e,o,r)}else he(e,t,r)},Oe=function(e,t,n,r,o){if(t.nodeName!==r||Ee(o)){var i=$(e.selection.getRng(!0));a.each([t].concat(n),function(t){Re(e.dom,t,r,o)}),e.selection.setRng(w(i))}else be(e)},Ee=function(e){return"list-style-type"in e},Ae=function(e,t,n,r){if(t!==e.getBody())if(t)if(t.nodeName!==n||Ee(r)){var o=$(e.selection.getRng(!0));he(e.dom,t,r),Be(e.dom,e.dom.rename(t,n)),e.selection.setRng(w(o))}else be(e);else Se(e,n,r)},Pe,xe={toggleList:function(e,t,n){var r=ee.getParentList(e),o=ee.getSelectedSubLists(e);n=n||{},r&&o.length>0?Oe(e,r,o,t,n):Ae(e,r,t,n)},removeList:be,mergeWithAdjacentLists:Be},_e=function(e,t,o,i){var a=t.startContainer,s=t.startOffset,d,l;if(3===a.nodeType&&(o?s<a.data.length:s>0))return a;for(d=e.schema.getNonEmptyElements(),1===a.nodeType&&(a=n.getNode(a,s)),l=new r(a,i),o&&R(e.dom,a)&&l.next();a=l[o?"next":"prev2"]();){if("LI"===a.nodeName&&!a.hasChildNodes())return a;if(d[a.nodeName])return a;if(3===a.nodeType&&a.data.length>0)return a}},Me=function(e,t){var n=t.childNodes;return 1===n.length&&!L(n[0])&&e.isBlock(n[0])},Ue=function(e,t){Me(e,t)&&e.remove(t.firstChild,!0)},He=function(e,t,n){var r,o;if(o=Me(e,n)?n.firstChild:n,Ue(e,t),!O(e,t,!0))for(;r=t.firstChild;)o.appendChild(r)},$e=function(e,t,n){var r,o,i=t.parentNode;E(e,t)&&E(e,n)&&(L(n.lastChild)&&(o=n.lastChild),i===n.lastChild&&D(i.previousSibling)&&e.remove(i.previousSibling),(r=n.lastChild)&&D(r)&&t.hasChildNodes()&&e.remove(r),O(e,n,!0)&&e.$(n).empty(),He(e,t,n),o&&n.appendChild(o),e.remove(t),O(e,i)&&i!==e.getRoot()&&e.remove(i))},we=function(e,t,n){e.dom.$(n).empty(),$e(e.dom,t,n),e.selection.setCursorLocation(n)},Ke=function(e,t,n,r){var o=e.dom;if(o.isEmpty(r))we(e,n,r);else{var i=$(t);$e(o,n,r),e.selection.setRng(w(i))}},Qe=function(e,t,n,r){var o=$(t);$e(e.dom,n,r);var i=w(o);e.selection.setRng(i)},We=function(e,t){var n=e.dom,r=e.selection,o=r.getStart(),i=ee.getClosestListRootElm(e,o),a=n.getParent(r.getStart(),"LI",i),s,d,l;if(a){if((s=a.parentNode)===e.getBody()&&O(n,s))return!0;if(d=_(r.getRng(!0)),(l=n.getParent(_e(e,d,t,i),"LI",i))&&l!==a)return t?Ke(e,d,l,a):Qe(e,d,a,l),!0;if(!l&&!t&&xe.removeList(e))return!0}return!1},je=function(e,t,n){var r=e.getParent(t.parentNode,e.isBlock,n);e.remove(t),r&&e.isEmpty(r)&&e.remove(r)},qe=function(e,t){var n=e.dom,r=e.selection.getStart(),o=ee.getClosestListRootElm(e,r),i=n.getParent(r,n.isBlock,o);if(i&&n.isEmpty(i)){var a=_(e.selection.getRng(!0)),s=n.getParent(_e(e,a,t,o),"LI",o);if(s)return e.undoManager.transact(function(){je(n,i,o),xe.mergeWithAdjacentLists(n,s.parentNode),e.selection.select(s,!0),e.selection.collapse(t)}),!0}return!1},Fe=function(e,t){return We(e,t)||qe(e,t)},Ve=function(e){var t=e.selection.getStart(),n=ee.getClosestListRootElm(e,t),r;return!!(e.dom.getParent(t,"LI,DT,DD",n)||ee.getSelectedListItems(e).length>0)&&(e.undoManager.transact(function(){e.execCommand("Delete"),q(e.dom,e.getBody())}),!0)},ze=function(e,t){return e.selection.isCollapsed()?Fe(e,t):Ve(e)},Ge,Je=function(e){e.on("keydown",function(t){t.keyCode===o.BACKSPACE?ze(e,!1)&&t.preventDefault():t.keyCode===o.DELETE&&ze(e,!0)&&t.preventDefault()})},Xe=ze,Ye,Ze=function(e){return{backspaceDelete:function(t){Xe(e,t)}}},et=s.DOM,tt=function(e,t){var n;if(L(e)){for(;n=e.firstChild;)t.appendChild(n);et.remove(e)}},nt=function(e){var t,n,r;return"DT"===e.nodeName?(et.rename(e,"DD"),!0):(t=e.previousSibling)&&L(t)?(t.appendChild(e),!0):t&&"LI"===t.nodeName&&L(t.lastChild)?(t.lastChild.appendChild(e),tt(e.lastChild,t.lastChild),!0):(t=e.nextSibling)&&L(t)?(t.insertBefore(e,t.firstChild),!0):!(!(t=e.previousSibling)||"LI"!==t.nodeName)&&(n=et.create(e.parentNode.nodeName),(r=et.getStyle(e.parentNode,"listStyleType"))&&et.setStyle(n,"listStyleType",r),t.appendChild(n),n.appendChild(e),tt(e.lastChild,n),!0)},rt,ot=function(e){var t=ee.getSelectedListItems(e);if(t.length){for(var n=$(e.selection.getRng(!0)),r=0;r<t.length&&(nt(t[r])||0!==r);r++);return e.selection.setRng(w(n)),e.nodeChanged(),!0}},it=function(e,t){return function(){var n=e.dom.getParent(e.selection.getStart(),"UL,OL,DL");return n&&n.nodeName===t}},at,st=function(e){e.on("BeforeExecCommand",function(t){var n=t.command.toLowerCase(),r;if("indent"===n?ot(e)&&(r=!0):"outdent"===n&&me(e)&&(r=!0),r)return e.fire("ExecCommand",{command:t.command}),t.preventDefault(),!0}),e.addCommand("InsertUnorderedList",function(t,n){xe.toggleList(e,"UL",n)}),e.addCommand("InsertOrderedList",function(t,n){xe.toggleList(e,"OL",n)}),e.addCommand("InsertDefinitionList",function(t,n){xe.toggleList(e,"DL",n)}),e.addQueryStateHandler("InsertUnorderedList",it(e,"UL")),e.addQueryStateHandler("InsertOrderedList",it(e,"OL")),e.addQueryStateHandler("InsertDefinitionList",it(e,"DL"))},dt,lt=function(e){return e.getParam("lists_indent_on_tab",!0)},ct=function(e){e.on("keydown",function(t){t.keyCode!==o.TAB||o.metaKeyPressed(t)||e.dom.getParent(e.selection.getStart(),"LI,DT,DD")&&(t.preventDefault(),t.shiftKey?me(e):ot(e))})},ut,ft=function(e){lt(e)&&ct(e),Je(e)},mt=function(e,t){for(var n=0;n<e.length;n++){var r;if(t(e[n]))return n}return-1},gt=function(e,t){return function(n){var r=n.control;e.on("NodeChange",function(e){var n=mt(e.parents,b),o=-1!==n?e.parents.slice(0,n):e.parents,i=a.grep(o,L);r.active(i.length>0&&i[0].nodeName===t)})}},pt=function(e){return function(t){var n=t.control;e.on("nodechange",function(){var t=ee.getSelectedListItems(e),r=t.length>0&&k(t[0]);n.disabled(r)})}},vt,ht=function(e){var t;(function(e,t){var n=e.settings.plugins?e.settings.plugins:"";return-1!==a.inArray(n.split(/[ ,]/),t)})(e,"advlist")||(e.addButton("numlist",{active:!1,title:"Numbered list",cmd:"InsertOrderedList",onPostRender:gt(e,"OL")}),e.addButton("bullist",{active:!1,title:"Bullet list",cmd:"InsertUnorderedList",onPostRender:gt(e,"UL")})),e.addButton("indent",{icon:"indent",title:"Increase indent",cmd:"Indent",onPostRender:pt(e)})};return t.add("lists",function(e){return ft(e),ht(e),st(e),Ze(e)}),e}()}();