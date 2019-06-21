wp.customHtmlWidgets=function(e){"use strict";var t={idBases:["custom_html"],codeEditorSettings:{},l10n:{errorNotice:{singular:"",plural:""}}};return t.CustomHtmlWidgetControl=Backbone.View.extend({events:{},initialize:function(e){var i=this;if(!e.el)throw new Error("Missing options.el");if(!e.syncContainer)throw new Error("Missing options.syncContainer");Backbone.View.prototype.initialize.call(i,e),i.syncContainer=e.syncContainer,i.widgetIdBase=i.syncContainer.parent().find(".id_base").val(),i.widgetNumber=i.syncContainer.parent().find(".widget_number").val(),i.customizeSettingId="widget_"+i.widgetIdBase+"["+String(i.widgetNumber)+"]",i.$el.addClass("custom-html-widget-fields"),i.$el.html(wp.template("widget-custom-html-control-fields")({codeEditorDisabled:t.codeEditorSettings.disabled})),i.errorNoticeContainer=i.$el.find(".code-editor-error-container"),i.currentErrorAnnotations=[],i.saveButton=i.syncContainer.add(i.syncContainer.parent().find(".widget-control-actions")).find(".widget-control-save, #savewidget"),i.saveButton.addClass("custom-html-widget-save-button"),i.fields={title:i.$el.find(".title"),content:i.$el.find(".content")},_.each(i.fields,function(e,t){e.on("input change",function(){var n=i.syncContainer.find(".sync-input."+t);n.val()!==e.val()&&(n.val(e.val()),n.trigger("change"))}),e.val(i.syncContainer.find(".sync-input."+t).val())})},updateFields:function(){var e,t=this;t.fields.title.is(document.activeElement)||(e=t.syncContainer.find(".sync-input.title"),t.fields.title.val(e.val())),t.contentUpdateBypassed=t.fields.content.is(document.activeElement)||t.editor&&t.editor.codemirror.state.focused||0!==t.currentErrorAnnotations,t.contentUpdateBypassed||(e=t.syncContainer.find(".sync-input.content"),t.fields.content.val(e.val()).trigger("change"))},updateErrorNotice:function(i){var n,o,d=this,r="";1===i.length?r=t.l10n.errorNotice.singular.replace("%d","1"):i.length>1&&(r=t.l10n.errorNotice.plural.replace("%d",String(i.length))),d.fields.content[0].setCustomValidity&&d.fields.content[0].setCustomValidity(r),wp.customize&&wp.customize.has(d.customizeSettingId)?((o=wp.customize(d.customizeSettingId)).notifications.remove("htmlhint_error"),0!==i.length&&o.notifications.add("htmlhint_error",new wp.customize.Notification("htmlhint_error",{message:r,type:"error"}))):0!==i.length?((n=e('<div class="inline notice notice-error notice-alt"></div>')).append(e("<p></p>",{text:r})),d.errorNoticeContainer.empty(),d.errorNoticeContainer.append(n),d.errorNoticeContainer.slideDown("fast"),wp.a11y.speak(r)):d.errorNoticeContainer.slideUp("fast")},initializeEditor:function(){var i,n=this;t.codeEditorSettings.disabled||(i=_.extend({},t.codeEditorSettings,{onTabPrevious:function(){n.fields.title.focus()},onTabNext:function(){var e;n.syncContainer.add(n.syncContainer.parent().find(".widget-position, .widget-control-actions")).find(":tabbable").first().focus()},onChangeLintingErrors:function(e){n.currentErrorAnnotations=e},onUpdateErrorNotice:function(e){n.saveButton.toggleClass("validation-blocked disabled",e.length>0),n.updateErrorNotice(e)}}),n.editor=wp.codeEditor.initialize(n.fields.content,i),e(n.editor.codemirror.display.lineDiv).attr({role:"textbox","aria-multiline":"true","aria-labelledby":n.fields.content[0].id+"-label","aria-describedby":"editor-keyboard-trap-help-1 editor-keyboard-trap-help-2 editor-keyboard-trap-help-3 editor-keyboard-trap-help-4"}),e("#"+n.fields.content[0].id+"-label").on("click",function(){n.editor.codemirror.focus()}),n.fields.content.on("change",function(){this.value!==n.editor.codemirror.getValue()&&n.editor.codemirror.setValue(this.value)}),n.editor.codemirror.on("change",function(){var e=n.editor.codemirror.getValue();e!==n.fields.content.val()&&n.fields.content.val(e).trigger("change")}),n.editor.codemirror.on("blur",function(){n.contentUpdateBypassed&&n.syncContainer.find(".sync-input.content").trigger("change")}),wp.customize&&n.editor.codemirror.on("keydown",function(e,t){var i;27===t.keyCode&&t.stopPropagation()}))}}),t.widgetControls={},t.handleWidgetAdded=function(i,n){var o,d,r,a,s,l,c,g=50;d=(o=n.find("> .widget-inside > .form, > .widget-inside > form")).find("> .id_base").val(),-1!==t.idBases.indexOf(d)&&(a=o.find(".widget-id").val(),t.widgetControls[a]||(l=e("<div></div>"),(c=n.find(".widget-content:first")).before(l),r=new t.CustomHtmlWidgetControl({el:l,syncContainer:c}),t.widgetControls[a]=r,(s=function(){(wp.customize?n.parent().hasClass("expanded"):n.hasClass("open"))?r.initializeEditor():setTimeout(s,g)})()))},t.setupAccessibleMode=function(){var i,n,o,d,r;0!==(i=e(".editwidget > form")).length&&(n=i.find("> .widget-control-actions > .id_base").val(),-1!==t.idBases.indexOf(n)&&(d=e("<div></div>"),(r=i.find("> .widget-inside")).before(d),(o=new t.CustomHtmlWidgetControl({el:d,syncContainer:r})).initializeEditor()))},t.handleWidgetUpdated=function(e,i){var n,o,d,r;r=(n=i.find("> .widget-inside > .form, > .widget-inside > form")).find("> .id_base").val(),-1!==t.idBases.indexOf(r)&&(o=n.find("> .widget-id").val(),(d=t.widgetControls[o])&&d.updateFields())},t.init=function(i){var n=e(document);_.extend(t.codeEditorSettings,i),n.on("widget-added",t.handleWidgetAdded),n.on("widget-synced widget-updated",t.handleWidgetUpdated),e(function(){var i;"widgets"===window.pagenow&&((i=e(".widgets-holder-wrap:not(#available-widgets)").find("div.widget")).one("click.toggle-widget-expanded",function(){var i=e(this);t.handleWidgetAdded(new jQuery.Event("widget-added"),i)}),e(window).on("load",function(){t.setupAccessibleMode()}))})},t}(jQuery);