!function(t){function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function e(){return t.default}:function e(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=20)}({20:function(t,e,i){var s=jQuery,r,n,a,o;window.wp=window.wp||{},o=wp.media=function(t){var e=o.view.MediaFrame,i;if(e)return"select"===(t=_.defaults(t||{},{frame:"select"})).frame&&e.Select?i=new e.Select(t):"post"===t.frame&&e.Post?i=new e.Post(t):"manage"===t.frame&&e.Manage?i=new e.Manage(t):"image"===t.frame&&e.ImageDetails?i=new e.ImageDetails(t):"audio"===t.frame&&e.AudioDetails?i=new e.AudioDetails(t):"video"===t.frame&&e.VideoDetails?i=new e.VideoDetails(t):"edit-attachments"===t.frame&&e.EditAttachments&&(i=new e.EditAttachments(t)),delete t.frame,o.frame=i,i},_.extend(o,{model:{},view:{},controller:{},frames:{}}),a=o.model.l10n=window._wpMediaModelsL10n||{},o.model.settings=a.settings||{},delete a.settings,r=o.model.Attachment=i(21),n=o.model.Attachments=i(22),o.model.Query=i(23),o.model.PostImage=i(24),o.model.Selection=i(25),o.compare=function(t,e,i,s){return _.isEqual(t,e)?i===s?0:i>s?-1:1:t>e?-1:1},_.extend(o,{template:wp.template,post:wp.ajax.post,ajax:wp.ajax.send,fit:function(t){var e=t.width,i=t.height,s=t.maxWidth,r=t.maxHeight,n;return _.isUndefined(s)||_.isUndefined(r)?_.isUndefined(r)?n="width":_.isUndefined(s)&&i>r&&(n="height"):n=e/i>s/r?"width":"height","width"===n&&e>s?{width:s,height:Math.round(s*i/e)}:"height"===n&&i>r?{width:Math.round(r*e/i),height:r}:{width:e,height:i}},truncate:function(t,e,i){return e=e||30,i=i||"&hellip;",t.length<=e?t:t.substr(0,e/2)+i+t.substr(-1*e/2)}}),o.attachment=function(t){return r.get(t)},n.all=new n,o.query=function(t){return new n(null,{props:_.extend(_.defaults(t||{},{orderby:"date"}),{query:!0})})},s(window).on("unload",function(){window.wp=null})},21:function(t,e){var i=Backbone.$,s;s=Backbone.Model.extend({sync:function(t,e,s){return _.isUndefined(this.id)?i.Deferred().rejectWith(this).promise():"read"===t?((s=s||{}).context=this,s.data=_.extend(s.data||{},{action:"get-attachment",id:this.id}),wp.media.ajax(s)):"update"===t?this.get("nonces")&&this.get("nonces").update?((s=s||{}).context=this,s.data=_.extend(s.data||{},{action:"save-attachment",id:this.id,nonce:this.get("nonces").update,post_id:wp.media.model.settings.post.id}),e.hasChanged()&&(s.data.changes={},_.each(e.changed,function(t,e){s.data.changes[e]=this.get(e)},this)),wp.media.ajax(s)):i.Deferred().rejectWith(this).promise():"delete"===t?((s=s||{}).wait||(this.destroyed=!0),s.context=this,s.data=_.extend(s.data||{},{action:"delete-post",id:this.id,_wpnonce:this.get("nonces").delete}),wp.media.ajax(s).done(function(){this.destroyed=!0}).fail(function(){this.destroyed=!1})):Backbone.Model.prototype.sync.apply(this,arguments)},parse:function(t){return t?(t.date=new Date(t.date),t.modified=new Date(t.modified),t):t},saveCompat:function(t,e){var s=this;return this.get("nonces")&&this.get("nonces").update?wp.media.post("save-attachment-compat",_.defaults({id:this.id,nonce:this.get("nonces").update,post_id:wp.media.model.settings.post.id},t)).done(function(t,i,r){s.set(s.parse(t,r),e)}):i.Deferred().rejectWith(this).promise()}},{create:function(t){var e;return wp.media.model.Attachments.all.push(t)},get:_.memoize(function(t,e){var i;return wp.media.model.Attachments.all.push(e||{id:t})})}),t.exports=s},22:function(t,e){var i=Backbone.Collection.extend({model:wp.media.model.Attachment,initialize:function(t,e){e=e||{},this.props=new Backbone.Model,this.filters=e.filters||{},this.props.on("change",this._changeFilteredProps,this),this.props.on("change:order",this._changeOrder,this),this.props.on("change:orderby",this._changeOrderby,this),this.props.on("change:query",this._changeQuery,this),this.props.set(_.defaults(e.props||{})),e.observe&&this.observe(e.observe)},_changeOrder:function(){this.comparator&&this.sort()},_changeOrderby:function(t,e){this.comparator&&this.comparator!==i.comparator||(e&&"post__in"!==e?this.comparator=i.comparator:delete this.comparator)},_changeQuery:function(t,e){e?(this.props.on("change",this._requery,this),this._requery()):this.props.off("change",this._requery,this)},_changeFilteredProps:function(t){var e;this.props.get("query")||_.chain(t.changed).map(function(e,s){var r=i.filters[s],n=t.get(s);if(r){if(n&&!this.filters[s])this.filters[s]=r;else{if(n||this.filters[s]!==r)return;delete this.filters[s]}return!0}},this).any().value()&&(this._source||(this._source=new i(this.models)),this.reset(this._source.filter(this.validator,this)))},validateDestroyed:!1,validator:function(t){return!(!_.isUndefined(t.attributes.context)&&""!==t.attributes.context)&&(!(!this.validateDestroyed&&t.destroyed)&&_.all(this.filters,function(e){return!!e.call(this,t)},this))},validate:function(t,e){var i=this.validator(t),s=!!this.get(t.cid);return!i&&s?this.remove(t,e):i&&!s&&this.add(t,e),this},validateAll:function(t,e){return e=e||{},_.each(t.models,function(t){this.validate(t,{silent:!0})},this),e.silent||this.trigger("reset",this,e),this},observe:function(t){return this.observers=this.observers||[],this.observers.push(t),t.on("add change remove",this._validateHandler,this),t.on("reset",this._validateAllHandler,this),this.validateAll(t),this},unobserve:function(t){return t?(t.off(null,null,this),this.observers=_.without(this.observers,t)):(_.each(this.observers,function(t){t.off(null,null,this)},this),delete this.observers),this},_validateHandler:function(t,e,i){return i=e===this.mirroring?i:{silent:i&&i.silent},this.validate(t,i)},_validateAllHandler:function(t,e){return this.validateAll(t,e)},mirror:function(t){return this.mirroring&&this.mirroring===t?this:(this.unmirror(),this.mirroring=t,this.reset([],{silent:!0}),this.observe(t),this)},unmirror:function(){this.mirroring&&(this.unobserve(this.mirroring),delete this.mirroring)},more:function(t){var e=jQuery.Deferred(),i=this.mirroring,s=this;return i&&i.more?(i.more(t).done(function(){this===s.mirroring&&e.resolveWith(this)}),e.promise()):e.resolveWith(this).promise()},hasMore:function(){return!!this.mirroring&&this.mirroring.hasMore()},parse:function(t,e){return _.isArray(t)||(t=[t]),_.map(t,function(t){var i,s,r;return t instanceof Backbone.Model?(i=t.get("id"),t=t.attributes):i=t.id,r=(s=wp.media.model.Attachment.get(i)).parse(t,e),_.isEqual(s.attributes,r)||s.set(r),s})},_requery:function(t){var e;this.props.get("query")&&((e=this.props.toJSON()).cache=!0!==t,this.mirror(wp.media.model.Query.get(e)))},saveMenuOrder:function(){if("menuOrder"===this.props.get("orderby")){var t=this.chain().filter(function(t){return!_.isUndefined(t.id)}).map(function(t,e){return e+=1,t.set("menuOrder",e),[t.id,e]}).object().value();if(!_.isEmpty(t))return wp.media.post("save-attachment-order",{nonce:wp.media.model.settings.post.nonce,post_id:wp.media.model.settings.post.id,attachments:t})}}},{comparator:function(t,e,i){var s=this.props.get("orderby"),r=this.props.get("order")||"DESC",n=t.cid,a=e.cid;return t=t.get(s),e=e.get(s),"date"!==s&&"modified"!==s||(t=t||new Date,e=e||new Date),i&&i.ties&&(n=a=null),"DESC"===r?wp.media.compare(t,e,n,a):wp.media.compare(e,t,a,n)},filters:{search:function(t){return!this.props.get("search")||_.any(["title","filename","description","caption","name"],function(e){var i=t.get(e);return i&&-1!==i.search(this.props.get("search"))},this)},type:function(t){var e=this.props.get("type"),i=t.toJSON(),s,r;return!(e&&(!_.isArray(e)||e.length))||(s=i.mime||i.file&&i.file.type||"",r=_.isArray(e)?_.find(e,function(t){return-1!==s.indexOf(t)}):-1!==s.indexOf(e))},uploadedTo:function(t){var e=this.props.get("uploadedTo");return!!_.isUndefined(e)||e===t.get("uploadedTo")},status:function(t){var e=this.props.get("status");return!!_.isUndefined(e)||e===t.get("status")}}});t.exports=i},23:function(t,e){var i=wp.media.model.Attachments,s,r;s=i.extend({initialize:function(t,e){var s;e=e||{},i.prototype.initialize.apply(this,arguments),this.args=e.args,this._hasMore=!0,this.created=new Date,this.filters.order=function(t){var e=this.props.get("orderby"),i=this.props.get("order");return!this.comparator||(this.length?1!==this.comparator(t,this.last(),{ties:!0}):"DESC"!==i||"date"!==e&&"modified"!==e?"ASC"===i&&"menuOrder"===e&&0===t.get(e):t.get(e)>=this.created)},s=["s","order","orderby","posts_per_page","post_mime_type","post_parent","author"],wp.Uploader&&_(this.args).chain().keys().difference(s).isEmpty().value()&&this.observe(wp.Uploader.queue)},hasMore:function(){return this._hasMore},more:function(t){var e=this;return this._more&&"pending"===this._more.state()?this._more:this.hasMore()?((t=t||{}).remove=!1,this._more=this.fetch(t).done(function(t){(_.isEmpty(t)||-1===this.args.posts_per_page||t.length<this.args.posts_per_page)&&(e._hasMore=!1)})):jQuery.Deferred().resolveWith(this).promise()},sync:function(t,e,s){var r,n;return"read"===t?((s=s||{}).context=this,s.data=_.extend(s.data||{},{action:"query-attachments",post_id:wp.media.model.settings.post.id}),-1!==(r=_.clone(this.args)).posts_per_page&&(r.paged=Math.round(this.length/r.posts_per_page)+1),s.data.query=r,wp.media.ajax(s)):(n=i.prototype.sync?i.prototype:Backbone).sync.apply(this,arguments)}},{defaultProps:{orderby:"date",order:"DESC"},defaultArgs:{posts_per_page:40},orderby:{allowed:["name","author","date","title","modified","uploadedTo","id","post__in","menuOrder"],valuemap:{id:"ID",uploadedTo:"parent",menuOrder:"menu_order ID"}},propmap:{search:"s",type:"post_mime_type",perPage:"posts_per_page",menuOrder:"menu_order",uploadedTo:"post_parent",status:"post_status",include:"post__in",exclude:"post__not_in",author:"author"},get:(r=[],function(t,e){var i={},n=s.orderby,a=s.defaultProps,o,h=!!t.cache||_.isUndefined(t.cache);return delete t.query,delete t.cache,_.defaults(t,a),t.order=t.order.toUpperCase(),"DESC"!==t.order&&"ASC"!==t.order&&(t.order=a.order.toUpperCase()),_.contains(n.allowed,t.orderby)||(t.orderby=a.orderby),_.each(["include","exclude"],function(e){t[e]&&!_.isArray(t[e])&&(t[e]=[t[e]])}),_.each(t,function(t,e){_.isNull(t)||(i[s.propmap[e]||e]=t)}),_.defaults(i,s.defaultArgs),i.orderby=n.valuemap[t.orderby]||t.orderby,h?o=_.find(r,function(t){return _.isEqual(t.args,i)}):r=[],o||(o=new s([],_.extend(e||{},{props:t,args:i})),r.push(o)),o})}),t.exports=s},24:function(t,e){var i=Backbone.Model.extend({initialize:function(t){var e=wp.media.model.Attachment;this.attachment=!1,t.attachment_id&&(this.attachment=e.get(t.attachment_id),this.attachment.get("url")?(this.dfd=jQuery.Deferred(),this.dfd.resolve()):this.dfd=this.attachment.fetch(),this.bindAttachmentListeners()),this.on("change:link",this.updateLinkUrl,this),this.on("change:size",this.updateSize,this),this.setLinkTypeFromUrl(),this.setAspectRatio(),this.set("originalUrl",t.url)},bindAttachmentListeners:function(){this.listenTo(this.attachment,"sync",this.setLinkTypeFromUrl),this.listenTo(this.attachment,"sync",this.setAspectRatio),this.listenTo(this.attachment,"change",this.updateSize)},changeAttachment:function(t,e){this.stopListening(this.attachment),this.attachment=t,this.bindAttachmentListeners(),this.set("attachment_id",this.attachment.get("id")),this.set("caption",this.attachment.get("caption")),this.set("alt",this.attachment.get("alt")),this.set("size",e.get("size")),this.set("align",e.get("align")),this.set("link",e.get("link")),this.updateLinkUrl(),this.updateSize()},setLinkTypeFromUrl:function(){var t=this.get("linkUrl"),e;t?(e="custom",this.attachment?this.attachment.get("url")===t?e="file":this.attachment.get("link")===t&&(e="post"):this.get("url")===t&&(e="file"),this.set("link",e)):this.set("link","none")},updateLinkUrl:function(){var t,e;switch(this.get("link")){case"file":e=this.attachment?this.attachment.get("url"):this.get("url"),this.set("linkUrl",e);break;case"post":this.set("linkUrl",this.attachment.get("link"));break;case"none":this.set("linkUrl","");break}},updateSize:function(){var t;if(this.attachment){if("custom"===this.get("size"))return this.set("width",this.get("customWidth")),this.set("height",this.get("customHeight")),void this.set("url",this.get("originalUrl"));(t=this.attachment.get("sizes")[this.get("size")])&&(this.set("url",t.url),this.set("width",t.width),this.set("height",t.height))}},setAspectRatio:function(){var t;this.attachment&&this.attachment.get("sizes")&&(t=this.attachment.get("sizes").full)?this.set("aspectRatio",t.width/t.height):this.set("aspectRatio",this.get("customWidth")/this.get("customHeight"))}});t.exports=i},25:function(t,e){var i=wp.media.model.Attachments,s;s=i.extend({initialize:function(t,e){i.prototype.initialize.apply(this,arguments),this.multiple=e&&e.multiple,this.on("add remove reset",_.bind(this.single,this,!1))},add:function(t,e){return this.multiple||this.remove(this.models),i.prototype.add.call(this,t,e)},single:function(t){var e=this._single;return t&&(this._single=t),this._single&&!this.get(this._single.cid)&&delete this._single,this._single=this._single||this.last(),this._single!==e&&(e&&(e.trigger("selection:unsingle",e,this),this.get(e.cid)||this.trigger("selection:unsingle",e,this)),this._single&&this._single.trigger("selection:single",this._single,this)),this._single}}),t.exports=s}});