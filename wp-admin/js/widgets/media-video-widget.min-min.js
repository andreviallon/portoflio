!function(e){"use strict";var t,d,i;i=wp.media.view.MediaFrame.VideoDetails.extend({createStates:function(){this.states.add([new wp.media.controller.VideoDetails({media:this.media}),new wp.media.controller.MediaLibrary({type:"video",id:"add-video-source",title:wp.media.view.l10n.videoAddSourceTitle,toolbar:"add-video-source",media:this.media,menu:!1}),new wp.media.controller.MediaLibrary({type:"text",id:"add-track",title:wp.media.view.l10n.videoAddTrackTitle,toolbar:"add-track",media:this.media,menu:"video-details"})])}}),t=e.MediaWidgetModel.extend({}),d=e.MediaWidgetControl.extend({showDisplaySettings:!1,oembedResponses:{},mapModelToMediaFrameProps:function(t){var d,i=this;return(d=e.MediaWidgetControl.prototype.mapModelToMediaFrameProps.call(i,t)).link="embed",d},fetchEmbed:function(){var e,t=this;e=t.model.get("url"),t.oembedResponses[e]||(t.fetchEmbedDfd&&"pending"===t.fetchEmbedDfd.state()&&t.fetchEmbedDfd.abort(),t.fetchEmbedDfd=wp.apiRequest({url:wp.media.view.settings.oEmbedProxyUrl,data:{url:t.model.get("url"),maxwidth:t.model.get("width"),maxheight:t.model.get("height"),discover:!1},type:"GET",dataType:"json",context:t}),t.fetchEmbedDfd.done(function(d){t.oembedResponses[e]=d,t.renderPreview()}),t.fetchEmbedDfd.fail(function(){t.oembedResponses[e]=null}))},isHostedVideo:function(){return!0},renderPreview:function(){var e,t,d,i,o,a,s,m,n,r=this,l="",p=!1;d=r.model.get("attachment_id"),i=r.model.get("url"),s=r.model.get("error"),(d||i)&&((a=r.selectedAttachment.get("mime"))&&d?_.contains(_.values(wp.media.view.settings.embedMimes),a)||(s="unsupported_file_type"):d||((m=document.createElement("a")).href=i,(n=m.pathname.toLowerCase().match(/\.(\w+)$/))?_.contains(_.keys(wp.media.view.settings.embedMimes),n[1])||(s="unsupported_file_type"):p=!0),p&&(r.fetchEmbed(),r.oembedResponses[i]&&(o=r.oembedResponses[i].thumbnail_url,l=r.oembedResponses[i].html.replace(/\swidth="\d+"/,' width="100%"').replace(/\sheight="\d+"/,""))),e=r.$el.find(".media-widget-preview"),t=wp.template("wp-media-widget-video-preview"),e.html(t({model:{attachment_id:d,html:l,src:i,poster:o},is_oembed:p,error:s})),wp.mediaelement.initialize())},editMedia:function(){var e,t,d,o=this;t=o.mapModelToMediaFrameProps(o.model.toJSON()),e=new i({frame:"video",state:"video-details",metadata:t}),wp.media.frame=e,e.$el.addClass("media-widget"),d=function(e){o.selectedAttachment.set(e),o.model.set(_.extend(_.omit(o.model.defaults(),"title"),o.mapMediaToModelProps(e),{error:!1}))},e.state("video-details").on("update",d),e.state("replace-video").on("replace",d),e.on("close",function(){e.detach()}),e.open()}}),e.controlConstructors.media_video=d,e.modelConstructors.media_video=t}(wp.mediaWidgets);