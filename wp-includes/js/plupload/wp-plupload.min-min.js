window.wp=window.wp||{},function(e,t){var r;"undefined"!=typeof _wpPluploadSettings&&(r=function(e){var i,a,o=this,d=-1!=navigator.userAgent.indexOf("Trident/")||-1!=navigator.userAgent.indexOf("MSIE "),n={container:"container",browser:"browse_button",dropzone:"drop_element"};if(this.supports={upload:r.browser.supported},this.supported=this.supports.upload,this.supported){for(i in this.plupload=t.extend(!0,{multipart_params:{}},r.defaults),this.container=document.body,t.extend(!0,this,e),this)t.isFunction(this[i])&&(this[i]=t.proxy(this[i],this));for(i in n)this[i]&&(this[i]=t(this[i]).first(),this[i].length?(this[i].prop("id")||this[i].prop("id","__wp-uploader-id-"+r.uuid++),this.plupload[n[i]]=this[i].prop("id")):delete this[i]);(this.browser&&this.browser.length||this.dropzone&&this.dropzone.length)&&(d||"flash"!==plupload.predictRuntime(this.plupload)||this.plupload.required_features&&this.plupload.required_features.hasOwnProperty("send_binary_string")||(this.plupload.required_features=this.plupload.required_features||{},this.plupload.required_features.send_binary_string=!0),this.uploader=new plupload.Uploader(this.plupload),delete this.plupload,this.param(this.params||{}),delete this.params,a=function(e,t,i){i.attachment&&i.attachment.destroy(),r.errors.unshift({message:e||pluploadL10n.default_error,data:t,file:i}),o.error(e,t,i)},this.uploader.bind("init",function(e){var i,a,d,n=o.dropzone;if(d=o.supports.dragdrop=e.features.dragdrop&&!r.browser.mobile,n){if(n.toggleClass("supports-drag-drop",!!d),!d)return n.unbind(".wp-uploader");n.bind("dragover.wp-uploader",function(){i&&clearTimeout(i),a||(n.trigger("dropzone:enter").addClass("drag-over"),a=!0)}),n.bind("dragleave.wp-uploader, drop.wp-uploader",function(){i=setTimeout(function(){a=!1,n.trigger("dropzone:leave").removeClass("drag-over")},0)}),o.ready=!0,t(o).trigger("uploader:ready")}}),this.uploader.bind("postinit",function(e){e.refresh(),o.init()}),this.uploader.init(),this.browser?this.browser.on("mouseenter",this.refresh):(this.uploader.disableBrowse(!0),t("#"+this.uploader.id+"_html5_container").hide()),this.uploader.bind("FilesAdded",function(e,t){_.each(t,function(e){var t,i;plupload.FAILED!==e.status&&(t=_.extend({file:e,uploading:!0,date:new Date,filename:e.name,menuOrder:0,uploadedTo:wp.media.model.settings.post.id},_.pick(e,"loaded","size","percent")),(i=/(?:jpe?g|png|gif)$/i.exec(e.name))&&(t.type="image",t.subtype="jpg"===i[0]?"jpeg":i[0]),e.attachment=wp.media.model.Attachment.create(t),r.queue.add(e.attachment),o.added(e.attachment))}),e.refresh(),e.start()}),this.uploader.bind("UploadProgress",function(e,t){t.attachment.set(_.pick(t,"loaded","percent")),o.progress(t.attachment)}),this.uploader.bind("FileUploaded",function(e,t,i){var d;try{i=JSON.parse(i.response)}catch(e){return a(pluploadL10n.default_error,e,t)}return!_.isObject(i)||_.isUndefined(i.success)?a(pluploadL10n.default_error,null,t):i.success?(_.each(["file","loaded","size","percent"],function(e){t.attachment.unset(e)}),t.attachment.set(_.extend(i.data,{uploading:!1})),wp.media.model.Attachment.get(i.data.id,t.attachment),(d=r.queue.all(function(e){return!e.get("uploading")}))&&r.queue.reset(),void o.success(t.attachment)):a(i.data&&i.data.message,i.data,t)}),this.uploader.bind("Error",function(e,t){var i,o=pluploadL10n.default_error;for(i in r.errorMap)if(t.code===plupload[i]){o=r.errorMap[i],_.isFunction(o)&&(o=o(t.file,t));break}a(o,t,t.file),e.refresh()}))}},t.extend(r,_wpPluploadSettings),r.uuid=0,r.errorMap={FAILED:pluploadL10n.upload_failed,FILE_EXTENSION_ERROR:pluploadL10n.invalid_filetype,IMAGE_FORMAT_ERROR:pluploadL10n.not_an_image,IMAGE_MEMORY_ERROR:pluploadL10n.image_memory_exceeded,IMAGE_DIMENSIONS_ERROR:pluploadL10n.image_dimensions_exceeded,GENERIC_ERROR:pluploadL10n.upload_failed,IO_ERROR:pluploadL10n.io_error,HTTP_ERROR:pluploadL10n.http_error,SECURITY_ERROR:pluploadL10n.security_error,FILE_SIZE_ERROR:function(e){return pluploadL10n.file_exceeds_size_limit.replace("%s",e.name)}},t.extend(r.prototype,{param:function(e,r){return 1===arguments.length&&"string"==typeof e?this.uploader.settings.multipart_params[e]:void(arguments.length>1?this.uploader.settings.multipart_params[e]=r:t.extend(this.uploader.settings.multipart_params,e))},init:function(){},error:function(){},success:function(){},added:function(){},progress:function(){},complete:function(){},refresh:function(){var e,r,i,a;if(this.browser){for(e=this.browser[0];e;){if(e===document.body){r=!0;break}e=e.parentNode}r||(a="wp-uploader-browser-"+this.uploader.id,(i=t("#"+a)).length||(i=t('<div class="wp-uploader-browser" />').css({position:"fixed",top:"-1000px",left:"-1000px",height:0,width:0}).attr("id","wp-uploader-browser-"+this.uploader.id).appendTo("body")),i.append(this.browser))}this.uploader.refresh()}}),r.queue=new wp.media.model.Attachments([],{query:!1}),r.errors=new Backbone.Collection,e.Uploader=r)}(wp,jQuery);