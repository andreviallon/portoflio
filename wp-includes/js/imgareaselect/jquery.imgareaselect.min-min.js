!function(e){function t(){return e("<div/>")}var o=Math.abs,i=Math.max,s=Math.min,n=Math.round;e.imgAreaSelect=function(r,c){function d(e){return e+ge.left-ve.left}function a(e){return e+ge.top-ve.top}function u(e){return e-ge.left+ve.left}function l(e){return e-ge.top+ve.top}function h(e){return i(e.pageX||0,m(e).x)-ve.left}function f(e){return i(e.pageY||0,m(e).y)-ve.top}function m(e){var t=e.originalEvent||{};return t.touches&&t.touches.length?{x:t.touches[0].pageX,y:t.touches[0].pageY}:{x:0,y:0}}function p(e){var t=e||B,o=e||Q;return{x1:n(we.x1*t),y1:n(we.y1*o),x2:n(we.x2*t),y2:n(we.y2*o),width:n(we.x2*t)-n(we.x1*t),height:n(we.y2*o)-n(we.y1*o)}}function y(e,t,o,i,s){var r=s||B,c=s||Q;(we={x1:n(e/r||0),y1:n(t/c||0),x2:n(o/r||0),y2:n(i/c||0)}).width=we.x2-we.x1,we.height=we.y2-we.y1}function g(){T&&le.width()&&(ge={left:n(le.offset().left),top:n(le.offset().top)},R=le.innerWidth(),X=le.innerHeight(),ge.top+=le.outerHeight()-X>>1,ge.left+=le.outerWidth()-R>>1,G=n(c.minWidth/B)||0,J=n(c.minHeight/Q)||0,U=n(s(c.maxWidth/B||1<<24,R)),V=n(s(c.maxHeight/Q||1<<24,X)),"1.3.2"!=e().jquery||"fixed"!=xe||Se.getBoundingClientRect||(ge.top+=i(document.body.scrollTop,Se.scrollTop),ge.left+=i(document.body.scrollLeft,Se.scrollLeft)),ve=/absolute|relative/.test(Y.css("position"))?{left:n(Y.offset().left)-Y.scrollLeft(),top:n(Y.offset().top)-Y.scrollTop()}:"fixed"==xe?{left:e(document).scrollLeft(),top:e(document).scrollTop()}:{left:0,top:0},j=d(0),D=a(0),(we.x2>R||we.y2>X)&&C())}function v(t){if(_){switch(he.css({left:d(we.x1),top:a(we.y1)}).add(fe).width(de=we.width).height(ae=we.height),fe.add(me).add(ye).css({left:0,top:0}),me.width(i(de-me.outerWidth()+me.innerWidth(),0)).height(i(ae-me.outerHeight()+me.innerHeight(),0)),e(pe[0]).css({left:j,top:D,width:we.x1,height:X}),e(pe[1]).css({left:j+we.x1,top:D,width:de,height:we.y1}),e(pe[2]).css({left:j+we.x2,top:D,width:R-we.x2,height:X}),e(pe[3]).css({left:j+we.x1,top:D+we.y2,width:de,height:X-we.y2}),de-=ye.outerWidth(),ae-=ye.outerHeight(),ye.length){case 8:e(ye[4]).css({left:de>>1}),e(ye[5]).css({left:de,top:ae>>1}),e(ye[6]).css({left:de>>1,top:ae}),e(ye[7]).css({top:ae>>1});case 4:ye.slice(1,3).css({left:de}),ye.slice(2,4).css({top:ae})}!1!==t&&(e.imgAreaSelect.onKeyPress!=ke&&e(document).unbind(e.imgAreaSelect.keyPress,e.imgAreaSelect.onKeyPress),c.keys&&e(document)[e.imgAreaSelect.keyPress](e.imgAreaSelect.onKeyPress=ke)),Ce&&me.outerWidth()-me.innerWidth()==2&&(me.css("margin",0),setTimeout(function(){me.css("margin","auto")},0))}}function b(e){g(),v(e),ee=d(we.x1),te=a(we.y1),oe=d(we.x2),ie=a(we.y2)}function x(e,t){c.fadeSpeed?e.fadeOut(c.fadeSpeed,t):e.hide()}function w(e){var t=u(h(e))-we.x1,o=l(f(e))-we.y1;ue||(g(),ue=!0,he.one("mouseout",function(){ue=!1})),F="",c.resizable&&(o<=c.resizeMargin?F="n":o>=we.height-c.resizeMargin&&(F="s"),t<=c.resizeMargin?F+="w":t>=we.width-c.resizeMargin&&(F+="e")),he.css("cursor",F?F+"-resize":c.movable?"move":""),L&&L.toggle()}function S(t){e("body").css("cursor",""),(c.autoHide||we.width*we.height==0)&&x(he.add(pe),function(){e(this).hide()}),e(document).off("mousemove touchmove",A),he.on("mousemove touchmove",w),c.onSelectEnd(r,p())}function z(t){return("mousedown"!=t.type||1==t.which)&&(w(t),g(),F?(e("body").css("cursor",F+"-resize"),ee=d(we[/w/.test(F)?"x2":"x1"]),te=a(we[/n/.test(F)?"y2":"y1"]),e(document).on("mousemove touchmove",A).one("mouseup touchend",S),he.off("mousemove touchmove",w)):c.movable?($=j+we.x1-h(t),q=D+we.y1-f(t),he.off("mousemove touchmove",w),e(document).on("mousemove touchmove",I).one("mouseup touchend",function(){c.onSelectEnd(r,p()),e(document).off("mousemove touchmove",I),he.on("mousemove touchmove",w)})):le.mousedown(t),!1)}function k(e){Z&&(e?(oe=i(j,s(j+R,ee+o(ie-te)*Z*(oe>ee||-1))),ie=n(i(D,s(D+X,te+o(oe-ee)/Z*(ie>te||-1)))),oe=n(oe)):(ie=i(D,s(D+X,te+o(oe-ee)/Z*(ie>te||-1))),oe=n(i(j,s(j+R,ee+o(ie-te)*Z*(oe>ee||-1)))),ie=n(ie)))}function C(){ee=s(ee,j+R),te=s(te,D+X),o(oe-ee)<G&&((oe=ee-G*(oe<ee||-1))<j?ee=j+G:oe>j+R&&(ee=j+R-G)),o(ie-te)<J&&((ie=te-J*(ie<te||-1))<D?te=D+J:ie>D+X&&(te=D+X-J)),oe=i(j,s(oe,j+R)),ie=i(D,s(ie,D+X)),k(o(oe-ee)<o(ie-te)*Z),o(oe-ee)>U&&(oe=ee-U*(oe<ee||-1),k()),o(ie-te)>V&&(ie=te-V*(ie<te||-1),k(!0)),we={x1:u(s(ee,oe)),x2:u(i(ee,oe)),y1:l(s(te,ie)),y2:l(i(te,ie)),width:o(oe-ee),height:o(ie-te)},v(),c.onSelectChange(r,p())}function A(e){return oe=/w|e|^$/.test(F)||Z?h(e):d(we.x2),ie=/n|s|^$/.test(F)||Z?f(e):a(we.y2),C(),!1}function W(t,o){oe=(ee=t)+we.width,ie=(te=o)+we.height,e.extend(we,{x1:u(ee),y1:l(te),x2:u(oe),y2:l(ie)}),v(),c.onSelectChange(r,p())}function I(e){return ee=i(j,s($+h(e),j+R-we.width)),te=i(D,s(q+f(e),D+X-we.height)),W(ee,te),e.preventDefault(),!1}function K(){e(document).off("mousemove touchmove",K),g(),oe=ee,ie=te,C(),F="",pe.is(":visible")||he.add(pe).hide().fadeIn(c.fadeSpeed||0),_=!0,e(document).off("mouseup touchend",P).on("mousemove touchmove",A).one("mouseup touchend",S),he.off("mousemove touchmove",w),c.onSelectStart(r,p())}function P(){e(document).off("mousemove touchmove",K).off("mouseup touchend",P),x(he.add(pe)),y(u(ee),l(te),u(ee),l(te)),this instanceof e.imgAreaSelect||(c.onSelectChange(r,p()),c.onSelectEnd(r,p()))}function N(t){return!(t.which>1||pe.is(":animated")||(g(),$=ee=h(t),q=te=f(t),e(document).on({"mousemove touchmove":K,"mouseup touchend":P}),1))}function H(){b(!1)}function M(){T=!0,O(c=e.extend({classPrefix:"imgareaselect",movable:!0,parent:"body",resizable:!0,resizeMargin:10,onInit:function(){},onSelectStart:function(){},onSelectChange:function(){},onSelectEnd:function(){}},c)),he.add(pe).css({visibility:""}),c.show&&(_=!0,g(),v(),he.add(pe).hide().fadeIn(c.fadeSpeed||0)),setTimeout(function(){c.onInit(r,p())},0)}function E(e,t){for(var o in t)void 0!==c[o]&&e.css(t[o],c[o])}function O(o){if(o.parent&&(Y=e(o.parent)).append(he.add(pe)),e.extend(c,o),g(),null!=o.handles){for(ye.remove(),ye=e([]),re=o.handles?"corners"==o.handles?4:8:0;re--;)ye=ye.add(t());ye.addClass(c.classPrefix+"-handle").css({position:"absolute",fontSize:0,zIndex:be+1||1}),!parseInt(ye.css("width"))>=0&&ye.width(5).height(5),(ce=c.borderWidth)&&ye.css({borderWidth:ce,borderStyle:"solid"}),E(ye,{borderColor1:"border-color",borderColor2:"background-color",borderOpacity:"opacity"})}for(B=c.imageWidth/R||1,Q=c.imageHeight/X||1,null!=o.x1&&(y(o.x1,o.y1,o.x2,o.y2),o.show=!o.hide),o.keys&&(c.keys=e.extend({shift:1,ctrl:"resize"},o.keys)),pe.addClass(c.classPrefix+"-outer"),fe.addClass(c.classPrefix+"-selection"),re=0;re++<4;)e(me[re-1]).addClass(c.classPrefix+"-border"+re);E(fe,{selectionColor:"background-color",selectionOpacity:"opacity"}),E(me,{borderOpacity:"opacity",borderWidth:"border-width"}),E(pe,{outerColor:"background-color",outerOpacity:"opacity"}),(ce=c.borderColor1)&&e(me[0]).css({borderStyle:"solid",borderColor:ce}),(ce=c.borderColor2)&&e(me[1]).css({borderStyle:"dashed",borderColor:ce}),he.append(fe.add(me).add(L)).append(ye),Ce&&((ce=(pe.css("filter")||"").match(/opacity=(\d+)/))&&pe.css("opacity",ce[1]/100),(ce=(me.css("filter")||"").match(/opacity=(\d+)/))&&me.css("opacity",ce[1]/100)),o.hide?x(he.add(pe)):o.show&&T&&(_=!0,he.add(pe).fadeIn(c.fadeSpeed||0),b()),Z=(ne=(c.aspectRatio||"").split(/:/))[0]/ne[1],le.add(pe).unbind("mousedown",N),c.disable||!1===c.enable?(he.off({"mousemove touchmove":w,"mousedown touchstart":z}),e(window).off("resize",H)):((c.enable||!1===c.disable)&&((c.resizable||c.movable)&&he.on({"mousemove touchmove":w,"mousedown touchstart":z}),e(window).resize(H)),c.persistent||le.add(pe).on("mousedown touchstart",N)),c.enable=c.disable=void 0}var T,L,j,D,R,X,Y,$,q,B,Q,F,G,J,U,V,Z,_,ee,te,oe,ie,se,ne,re,ce,de,ae,ue,le=e(r),he=t(),fe=t(),me=t().add(t()).add(t()).add(t()),pe=t().add(t()).add(t()).add(t()),ye=e([]),ge={left:0,top:0},ve={left:0,top:0},be=0,xe="absolute",we={x1:0,y1:0,x2:0,y2:0,width:0,height:0},Se=document.documentElement,ze=navigator.userAgent,ke=function(e){var t,o,n=c.keys,r=e.keyCode;if(t=isNaN(n.alt)||!e.altKey&&!e.originalEvent.altKey?!isNaN(n.ctrl)&&e.ctrlKey?n.ctrl:!isNaN(n.shift)&&e.shiftKey?n.shift:isNaN(n.arrows)?10:n.arrows:n.alt,"resize"==n.arrows||"resize"==n.shift&&e.shiftKey||"resize"==n.ctrl&&e.ctrlKey||"resize"==n.alt&&(e.altKey||e.originalEvent.altKey)){switch(r){case 37:t=-t;case 39:o=i(ee,oe),ee=s(ee,oe),oe=i(o+t,ee),k();break;case 38:t=-t;case 40:o=i(te,ie),te=s(te,ie),ie=i(o+t,te),k(!0);break;default:return}C()}else switch(ee=s(ee,oe),te=s(te,ie),r){case 37:W(i(ee-t,j),te);break;case 38:W(ee,i(te-t,D));break;case 39:W(ee+s(t,R-u(oe)),te);break;case 40:W(ee,te+s(t,X-l(ie)));break;default:return}return!1};this.remove=function(){O({disable:!0}),he.add(pe).remove()},this.getOptions=function(){return c},this.setOptions=O,this.getSelection=p,this.setSelection=y,this.cancelSelection=P,this.update=b;var Ce=(/msie ([\w.]+)/i.exec(ze)||[])[1],Ae=/opera/i.test(ze),We=/webkit/i.test(ze)&&!/chrome/i.test(ze);for(se=le;se.length;)be=i(be,isNaN(se.css("z-index"))?be:se.css("z-index")),"fixed"==se.css("position")&&(xe="fixed"),se=se.parent(":not(body)");be=c.zIndex||be,Ce&&le.attr("unselectable","on"),e.imgAreaSelect.keyPress=Ce||We?"keydown":"keypress",Ae&&(L=t().css({width:"100%",height:"100%",position:"absolute",zIndex:be+2||2})),he.add(pe).css({visibility:"hidden",position:xe,overflow:"hidden",zIndex:be||"0"}),he.css({zIndex:be+2||2}),fe.add(me).css({position:"absolute",fontSize:0}),r.complete||"complete"==r.readyState||!le.is("img")?M():le.one("load",M),!T&&Ce&&Ce>=7&&(r.src=r.src)},e.fn.imgAreaSelect=function(t){return t=t||{},this.each(function(){e(this).data("imgAreaSelect")?t.remove?(e(this).data("imgAreaSelect").remove(),e(this).removeData("imgAreaSelect")):e(this).data("imgAreaSelect").setOptions(t):t.remove||(void 0===t.enable&&void 0===t.disable&&(t.enable=!0),e(this).data("imgAreaSelect",new e.imgAreaSelect(this,t)))}),t.instance?e(this).data("imgAreaSelect"):this}}(jQuery);