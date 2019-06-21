!function(i){var t=window.imageEdit={iasapi:{},hold:{},postid:"",_view:!1,intval:function(i){return 0|i},setDisabled:function(i,t){t?i.removeClass("disabled").prop("disabled",!1):i.addClass("disabled").prop("disabled",!0)},init:function(t){var e=this,a=i("#image-editor-"+e.postid),o=e.intval(i("#imgedit-x-"+t).val()),s=e.intval(i("#imgedit-y-"+t).val());e.postid!==t&&a.length&&e.close(e.postid),e.hold.w=e.hold.ow=o,e.hold.h=e.hold.oh=s,e.hold.xy_ratio=o/s,e.hold.sizer=parseFloat(i("#imgedit-sizer-"+t).val()),e.postid=t,i("#imgedit-response-"+t).empty(),i('input[type="text"]',"#imgedit-panel-"+t).keypress(function(t){var e=t.keyCode;if(36<e&&e<41&&i(this).blur(),13===e)return t.preventDefault(),t.stopPropagation(),!1})},toggleEditor:function(t,e){var a=i("#imgedit-wait-"+t);e?a.fadeIn("fast"):a.fadeOut("fast")},toggleHelp:function(t){var e=i(t);return e.attr("aria-expanded","false"===e.attr("aria-expanded")?"true":"false").parents(".imgedit-group-top").toggleClass("imgedit-help-toggled").find(".imgedit-help").slideToggle("fast"),!1},getTarget:function(t){return i('input[name="imgedit-target-'+t+'"]:checked',"#imgedit-save-target-"+t).val()||"full"},scaleChanged:function(t,e,a){var o=i("#imgedit-scale-width-"+t),s=i("#imgedit-scale-height-"+t),n=i("#imgedit-scale-warn-"+t),d="",r="";!1!==this.validateNumeric(a)&&(e?(r=""!==o.val()?Math.round(o.val()/this.hold.xy_ratio):"",s.val(r)):(d=""!==s.val()?Math.round(s.val()*this.hold.xy_ratio):"",o.val(d)),r&&r>this.hold.oh||d&&d>this.hold.ow?n.css("visibility","visible"):n.css("visibility","hidden"))},getSelRatio:function(t){var e=this.hold.w,a=this.hold.h,o=this.intval(i("#imgedit-crop-width-"+t).val()),s=this.intval(i("#imgedit-crop-height-"+t).val());return o&&s?o+":"+s:e&&a?e+":"+a:"1:1"},filterHistory:function(t,e){var a=i("#imgedit-history-"+t).val(),o,s,n,d,r=[];if(""!==a){if(a=JSON.parse(a),(o=this.intval(i("#imgedit-undone-"+t).val()))>0)for(;o>0;)a.pop(),o--;if(e){if(!a.length)return this.hold.w=this.hold.ow,this.hold.h=this.hold.oh,"";(n=(n=a[a.length-1]).c||n.r||n.f||!1)&&(this.hold.w=n.fw,this.hold.h=n.fh)}for(s in a)(d=a[s]).hasOwnProperty("c")?r[s]={c:{x:d.c.x,y:d.c.y,w:d.c.w,h:d.c.h}}:d.hasOwnProperty("r")?r[s]={r:d.r.r}:d.hasOwnProperty("f")&&(r[s]={f:d.f.f});return JSON.stringify(r)}return""},refreshEditor:function(e,a,o){var s=this,n,d;s.toggleEditor(e,1),n={action:"imgedit-preview",_ajax_nonce:a,postid:e,history:s.filterHistory(e,1),rand:s.intval(1e6*Math.random())},d=i('<img id="image-preview-'+e+'" alt="" />').on("load",{history:n.history},function(a){var s,n,r=i("#imgedit-crop-"+e),l=t,h;""!==a.data.history&&(h=JSON.parse(a.data.history))[h.length-1].hasOwnProperty("c")&&(l.setDisabled(i("#image-undo-"+e),!0),i("#image-undo-"+e).focus()),r.empty().append(d),s=Math.max(l.hold.w,l.hold.h),n=Math.max(i(d).width(),i(d).height()),l.hold.sizer=s>n?n/s:1,l.initCrop(e,d,r),l.setCropSelection(e,0),null!=o&&o(),i("#imgedit-history-"+e).val()&&"0"===i("#imgedit-undone-"+e).val()?i("input.imgedit-submit-btn","#imgedit-panel-"+e).removeAttr("disabled"):i("input.imgedit-submit-btn","#imgedit-panel-"+e).prop("disabled",!0),l.toggleEditor(e,0)}).on("error",function(){i("#imgedit-crop-"+e).empty().append('<div class="error"><p>'+imageEditL10n.error+"</p></div>"),s.toggleEditor(e,0)}).attr("src",ajaxurl+"?"+i.param(n))},action:function(t,e,a){var o=this,s,n,d,r,l;if(o.notsaved(t))return!1;if(s={action:"image-editor",_ajax_nonce:e,postid:t},"scale"===a){if(n=i("#imgedit-scale-width-"+t),d=i("#imgedit-scale-height-"+t),r=o.intval(n.val()),l=o.intval(d.val()),r<1)return n.focus(),!1;if(l<1)return d.focus(),!1;if(r===o.hold.ow||l===o.hold.oh)return!1;s.do="scale",s.fwidth=r,s.fheight=l}else{if("restore"!==a)return!1;s.do="restore"}o.toggleEditor(t,1),i.post(ajaxurl,s,function(e){i("#image-editor-"+t).empty().append(e),o.toggleEditor(t,0),o._view&&o._view.refresh()})},save:function(e,a){var o,s=this.getTarget(e),n=this.filterHistory(e,0),d=this;if(""===n)return!1;this.toggleEditor(e,1),o={action:"image-editor",_ajax_nonce:a,postid:e,history:n,target:s,context:i("#image-edit-context").length?i("#image-edit-context").val():null,do:"save"},i.post(ajaxurl,o,function(a){var o=JSON.parse(a);if(o.error)return i("#imgedit-response-"+e).html('<div class="error"><p>'+o.error+"</p></div>"),void t.close(e);o.fw&&o.fh&&i("#media-dims-"+e).html(o.fw+" &times; "+o.fh),o.thumbnail&&i(".thumbnail","#thumbnail-head-"+e).attr("src",""+o.thumbnail),o.msg&&i("#imgedit-response-"+e).html('<div class="updated"><p>'+o.msg+"</p></div>"),d._view?d._view.save():t.close(e)})},open:function(e,a,o){this._view=o;var s,n,d=i("#image-editor-"+e),r=i("#media-head-"+e),l=i("#imgedit-open-btn-"+e),h=l.siblings(".spinner");if(!l.hasClass("button-activated"))return h.addClass("is-active"),n={action:"image-editor",_ajax_nonce:a,postid:e,do:"open"},s=i.ajax({url:ajaxurl,type:"post",data:n,beforeSend:function(){l.addClass("button-activated")}}).done(function(i){d.html(i),r.fadeOut("fast",function(){d.fadeIn("fast"),l.removeClass("button-activated"),h.removeClass("is-active")}),t.init(e)})},imgLoaded:function(t){var e=i("#image-preview-"+t),a=i("#imgedit-crop-"+t);void 0===this.hold.sizer&&this.init(t),this.initCrop(t,e,a),this.setCropSelection(t,0),this.toggleEditor(t,0),i(".imgedit-wrap .imgedit-help-toggle").eq(0).focus()},initCrop:function(e,a,o){var s=this,n=i("#imgedit-sel-width-"+e),d=i("#imgedit-sel-height-"+e),r;s.iasapi=i(a).imgAreaSelect({parent:o,instance:!0,handles:!0,keys:!0,minWidth:3,minHeight:3,onInit:function(t){(r=i(t)).next().css("position","absolute").nextAll(".imgareaselect-outer").css("position","absolute"),o.children().on("mousedown, touchstart",function(i){var t=!1,a,o;i.shiftKey&&(a=s.iasapi.getSelection(),o=s.getSelRatio(e),t=a&&a.width&&a.height?a.width+":"+a.height:o),s.iasapi.setOptions({aspectRatio:t})})},onSelectStart:function(){t.setDisabled(i("#imgedit-crop-sel-"+e),1)},onSelectEnd:function(i,a){t.setCropSelection(e,a)},onSelectChange:function(i,e){var a=t.hold.sizer;n.val(t.round(e.width/a)),d.val(t.round(e.height/a))}})},setCropSelection:function(t,e){var a;if(!(e=e||0)||e.width<3&&e.height<3)return this.setDisabled(i(".imgedit-crop","#imgedit-panel-"+t),0),this.setDisabled(i("#imgedit-crop-sel-"+t),0),i("#imgedit-sel-width-"+t).val(""),i("#imgedit-sel-height-"+t).val(""),i("#imgedit-selection-"+t).val(""),!1;a={x:e.x1,y:e.y1,w:e.width,h:e.height},this.setDisabled(i(".imgedit-crop","#imgedit-panel-"+t),1),i("#imgedit-selection-"+t).val(JSON.stringify(a))},close:function(t,e){if((e=e||!1)&&this.notsaved(t))return!1;this.iasapi={},this.hold={},this._view?this._view.back():i("#image-editor-"+t).fadeOut("fast",function(){i("#media-head-"+t).fadeIn("fast",function(){i("#imgedit-open-btn-"+t).focus()}),i(this).empty()})},notsaved:function(t){var e=i("#imgedit-history-"+t).val(),a=""!==e?JSON.parse(e):[],o;return this.intval(i("#imgedit-undone-"+t).val())<a.length&&!confirm(i("#imgedit-leaving-"+t).html())},addStep:function(t,e,a){for(var o=this,s=i("#imgedit-history-"+e),n=""!==s.val()?JSON.parse(s.val()):[],d=i("#imgedit-undone-"+e),r=o.intval(d.val());r>0;)n.pop(),r--;d.val(0),n.push(t),s.val(JSON.stringify(n)),o.refreshEditor(e,a,function(){o.setDisabled(i("#image-undo-"+e),!0),o.setDisabled(i("#image-redo-"+e),!1)})},rotate:function(t,e,a,o){if(i(o).hasClass("disabled"))return!1;this.addStep({r:{r:t,fw:this.hold.h,fh:this.hold.w}},e,a)},flip:function(t,e,a,o){if(i(o).hasClass("disabled"))return!1;this.addStep({f:{f:t,fw:this.hold.w,fh:this.hold.h}},e,a)},crop:function(t,e,a){var o=i("#imgedit-selection-"+t).val(),s=this.intval(i("#imgedit-sel-width-"+t).val()),n=this.intval(i("#imgedit-sel-height-"+t).val());if(i(a).hasClass("disabled")||""===o)return!1;(o=JSON.parse(o)).w>0&&o.h>0&&s>0&&n>0&&(o.fw=s,o.fh=n,this.addStep({c:o},t,e))},undo:function(t,e){var a=this,o=i("#image-undo-"+t),s=i("#imgedit-undone-"+t),n=a.intval(s.val())+1;o.hasClass("disabled")||(s.val(n),a.refreshEditor(t,e,function(){var e=i("#imgedit-history-"+t),s=""!==e.val()?JSON.parse(e.val()):[];a.setDisabled(i("#image-redo-"+t),!0),a.setDisabled(o,n<s.length),s.length===n&&i("#image-redo-"+t).focus()}))},redo:function(t,e){var a=this,o=i("#image-redo-"+t),s=i("#imgedit-undone-"+t),n=a.intval(s.val())-1;o.hasClass("disabled")||(s.val(n),a.refreshEditor(t,e,function(){a.setDisabled(i("#image-undo-"+t),!0),a.setDisabled(o,n>0),0===n&&i("#image-undo-"+t).focus()}))},setNumSelection:function(t,e){var a,o=i("#imgedit-sel-width-"+t),s=i("#imgedit-sel-height-"+t),n=this.intval(o.val()),d=this.intval(s.val()),r=i("#image-preview-"+t),l=r.height(),h=r.width(),g=this.hold.sizer,c,v,u,p,m=this.iasapi;if(!1!==this.validateNumeric(e))return n<1?(o.val(""),!1):d<1?(s.val(""),!1):void(n&&d&&(a=m.getSelection())&&(u=a.x1+Math.round(n*g),p=a.y1+Math.round(d*g),c=a.x1,v=a.y1,u>h&&(c=0,u=h,o.val(Math.round(u/g))),p>l&&(v=0,p=l,s.val(Math.round(p/g))),m.setSelection(c,v,u,p),m.update(),this.setCropSelection(t,m.getSelection())))},round:function(i){var t;return i=Math.round(i),this.hold.sizer>.6?i:"1"===(t=i.toString().slice(-1))?i-1:"9"===t?i+1:i},setRatioSelection:function(t,e,a){var o,s,n=this.intval(i("#imgedit-crop-width-"+t).val()),d=this.intval(i("#imgedit-crop-height-"+t).val()),r=i("#image-preview-"+t).height();!1!==this.validateNumeric(a)&&n&&d&&(this.iasapi.setOptions({aspectRatio:n+":"+d}),(o=this.iasapi.getSelection(!0))&&((s=Math.ceil(o.y1+(o.x2-o.x1)/(n/d)))>r&&(s=r,e?i("#imgedit-crop-height-"+t).val(""):i("#imgedit-crop-width-"+t).val("")),this.iasapi.setSelection(o.x1,o.y1,o.x2,s),this.iasapi.update()))},validateNumeric:function(t){if(!this.intval(i(t).val()))return i(t).val(""),!1}}}(jQuery);