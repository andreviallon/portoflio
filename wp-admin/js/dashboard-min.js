var ajaxWidgets,ajaxPopulateWidgets,quickPressLoad;window.wp=window.wp||{},jQuery(document).ready(function(e){function t(){if(!(document.documentMode&&document.documentMode<9)){e("body").append('<div class="quick-draft-textarea-clone" style="display: none;"></div>');var t=e(".quick-draft-textarea-clone"),n=e("#content"),i=n.height(),o=e(window).height()-100;t.css({"font-family":n.css("font-family"),"font-size":n.css("font-size"),"line-height":n.css("line-height"),"padding-bottom":n.css("paddingBottom"),"padding-left":n.css("paddingLeft"),"padding-right":n.css("paddingRight"),"padding-top":n.css("paddingTop"),"white-space":"pre-wrap","word-wrap":"break-word",display:"none"}),n.on("focus input propertychange",function(){var a=e(this),s=a.val()+"&nbsp;",c=t.css("width",a.css("width")).text(s).outerHeight()+2;n.css("overflow-y","auto"),c===i||c>=o&&i>=o||(i=c>o?o:c,n.css("overflow","hidden"),a.css("height",i+"px"))})}}var n=e("#welcome-panel"),i=e("#wp_welcome_panel-hide"),o;o=function(t){e.post(ajaxurl,{action:"update-welcome-panel",visible:t,welcomepanelnonce:e("#welcomepanelnonce").val()})},n.hasClass("hidden")&&i.prop("checked")&&n.removeClass("hidden"),e(".welcome-panel-close, .welcome-panel-dismiss a",n).click(function(t){t.preventDefault(),n.addClass("hidden"),o(0),e("#wp_welcome_panel-hide").prop("checked",!1)}),i.click(function(){n.toggleClass("hidden",!this.checked),o(this.checked?1:0)});var a=e("#try-gutenberg-panel"),s=e("#wp_try_gutenberg_panel-hide"),c,r;c=function(t){e.post(ajaxurl,{action:"update-try-gutenberg-panel",visible:t,trygutenbergpanelnonce:e("#trygutenbergpanelnonce").val()})},r=function(e){e.activateUrl+="&from=try-gutenberg",e.activateLabel=wp.updates.l10n.activatePluginLabel.replace("%s",e.pluginName),wp.updates.installPluginSuccess(e)},a.hasClass("hidden")&&s.prop("checked")&&a.removeClass("hidden"),e(".try-gutenberg-panel-close, .try-gutenberg-panel-dismiss a",a).click(function(t){t.preventDefault(),a.addClass("hidden"),c(0),e("#wp_try_gutenberg_panel-hide").prop("checked",!1)}),s.click(function(){a.toggleClass("hidden",!this.checked),c(this.checked?1:0)}),a.on("click",".install-now",function(t){t.preventDefault();var n={slug:e(t.target).data("slug"),success:r};wp.updates.installPlugin(n)}),ajaxWidgets=["dashboard_primary"],(ajaxPopulateWidgets=function(t){function n(t,n){var i,o=e("#"+n+" div.inside:visible").find(".widget-loading");o.length&&(i=o.parent(),setTimeout(function(){i.load(ajaxurl+"?action=dashboard-widgets&widget="+n+"&pagenow="+pagenow,"",function(){i.hide().slideDown("normal",function(){e(this).css("display","")})})},500*t))}t?(t=t.toString(),-1!==e.inArray(t,ajaxWidgets)&&n(0,t)):e.each(ajaxWidgets,n)})(),postboxes.add_postbox_toggles(pagenow,{pbshow:ajaxPopulateWidgets}),(quickPressLoad=function(){var n=e("#quickpost-action"),i;e('#quick-press .submit input[type="submit"], #quick-press .submit input[type="reset"]').prop("disabled",!1),i=e("#quick-press").submit(function(t){function n(){var t=e(".drafts ul li").first();t.css("background","#fffbe5"),setTimeout(function(){t.css("background","none")},1e3)}t.preventDefault(),e("#dashboard_quick_press #publishing-action .spinner").show(),e('#quick-press .submit input[type="submit"], #quick-press .submit input[type="reset"]').prop("disabled",!0),e.post(i.attr("action"),i.serializeArray(),function(t){e("#dashboard_quick_press .inside").html(t),e("#quick-press").removeClass("initial-form"),quickPressLoad(),n(),e("#title").focus()})}),e("#publish").click(function(){n.val("post-quickpress-publish")}),e("#title, #tags-input, #content").each(function(){var t=e(this),n=e("#"+this.id+"-prompt-text");""===this.value&&n.removeClass("screen-reader-text"),n.click(function(){e(this).addClass("screen-reader-text"),t.focus()}),t.blur(function(){""===this.value&&n.removeClass("screen-reader-text")}),t.focus(function(){n.addClass("screen-reader-text")})}),e("#quick-press").on("click focusin",function(){wpActiveEditor="content"}),t()})(),e(".meta-box-sortables").sortable("option","containment","#wpwrap")}),jQuery(function(e){"use strict";var t=window.communityEventsData||{},n;n=window.wp.communityEvents={initialized:!1,model:null,init:function(){if(!n.initialized){var i=e("#community-events");e(".community-events-errors").attr("aria-hidden","true").removeClass("hide-if-js"),i.on("click",".community-events-toggle-location, .community-events-cancel",n.toggleLocationForm),i.on("submit",".community-events-form",function(t){var i=e.trim(e("#community-events-location").val());t.preventDefault(),i&&n.getEvents({location:i})}),t&&t.cache&&t.cache.location&&t.cache.events?n.renderEventsTemplate(t.cache,"app"):n.getEvents(),n.initialized=!0}},toggleLocationForm:function(t){var n=e(".community-events-toggle-location"),i=e(".community-events-cancel"),o=e(".community-events-form"),a=e();"object"==typeof t&&(a=e(t.target),t="true"==n.attr("aria-expanded")?"hide":"show"),"hide"===t?(n.attr("aria-expanded","false"),i.attr("aria-expanded","false"),o.attr("aria-hidden","true"),a.hasClass("community-events-cancel")&&n.focus()):(n.attr("aria-expanded","true"),i.attr("aria-expanded","true"),o.attr("aria-hidden","false"))},getEvents:function(n){var i,o=this,a=e(".community-events-form").children(".spinner");(n=n||{})._wpnonce=t.nonce,n.timezone=window.Intl?window.Intl.DateTimeFormat().resolvedOptions().timeZone:"",i=n.location?"user":"app",a.addClass("is-active"),wp.ajax.post("get-community-events",n).always(function(){a.removeClass("is-active")}).done(function(e){"no_location_available"===e.error&&(n.location?e.unknownCity=n.location:delete e.error),o.renderEventsTemplate(e,i)}).fail(function(){o.renderEventsTemplate({location:!1,error:!0},i)})},renderEventsTemplate:function(i,o){var a,s,c=/%(?:\d\$)?s/g,r=e(".community-events-toggle-location"),l=e("#community-events-location-message"),u=e(".community-events-results");s={".community-events":!0,".community-events-loading":!1,".community-events-errors":!1,".community-events-error-occurred":!1,".community-events-could-not-locate":!1,"#community-events-location-message":!1,".community-events-toggle-location":!1,".community-events-results":!1},i.location.ip?(l.text(t.l10n.attend_event_near_generic),i.events.length?(a=wp.template("community-events-event-list"),u.html(a(i))):(a=wp.template("community-events-no-upcoming-events"),u.html(a(i))),s["#community-events-location-message"]=!0,s[".community-events-toggle-location"]=!0,s[".community-events-results"]=!0):i.location.description?(a=wp.template("community-events-attend-event-near"),l.html(a(i)),i.events.length?(a=wp.template("community-events-event-list"),u.html(a(i))):(a=wp.template("community-events-no-upcoming-events"),u.html(a(i))),"user"===o&&wp.a11y.speak(t.l10n.city_updated.replace(c,i.location.description),"assertive"),s["#community-events-location-message"]=!0,s[".community-events-toggle-location"]=!0,s[".community-events-results"]=!0):i.unknownCity?(a=wp.template("community-events-could-not-locate"),e(".community-events-could-not-locate").html(a(i)),wp.a11y.speak(t.l10n.could_not_locate_city.replace(c,i.unknownCity)),s[".community-events-errors"]=!0,s[".community-events-could-not-locate"]=!0):i.error&&"user"===o?(wp.a11y.speak(t.l10n.error_occurred_please_try_again),s[".community-events-errors"]=!0,s[".community-events-error-occurred"]=!0):(l.text(t.l10n.enter_closest_city),s["#community-events-location-message"]=!0,s[".community-events-toggle-location"]=!0),_.each(s,function(t,n){e(n).attr("aria-hidden",!t)}),r.attr("aria-expanded",s[".community-events-toggle-location"]),i.location&&(i.location.ip||i.location.latitude)?(n.toggleLocationForm("hide"),"user"===o&&r.focus()):n.toggleLocationForm("show")}},e("#dashboard_primary").is(":visible")?n.init():e(document).on("postbox-toggled",function(t,i){var o=e(i);"dashboard_primary"===o.attr("id")&&o.is(":visible")&&n.init()})});