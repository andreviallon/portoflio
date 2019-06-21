wp.customize.widgetsPreview=wp.customize.WidgetCustomizerPreview=function(e,t,i,r){var a;return(a={renderedSidebars:{},renderedWidgets:{},registeredSidebars:[],registeredWidgets:{},widgetSelectors:[],preview:null,l10n:{widgetTooltip:""},selectiveRefreshableWidgets:{}}).init=function(){var e=this;e.preview=r.preview,t.isEmpty(e.selectiveRefreshableWidgets)||e.addPartials(),e.buildWidgetSelectors(),e.highlightControls(),e.preview.bind("highlight-widget",e.highlightWidget),r.preview.bind("active",function(){e.highlightControls()}),r.preview.bind("refresh-widget-partial",function(t){var i="widget["+t+"]";r.selectiveRefresh.partial.has(i)?r.selectiveRefresh.partial(i).refresh():e.renderedWidgets[t]&&r.preview.send("refresh")})},a.WidgetPartial=r.selectiveRefresh.Partial.extend({initialize:function(e,i){var n=this,s;if(!(s=e.match(/^widget\[(.+)]$/)))throw new Error("Illegal id for widget partial.");this.widgetId=s[1],this.widgetIdParts=a.parseWidgetId(this.widgetId),(i=i||{}).params=t.extend({settings:[a.getWidgetSettingId(this.widgetId)],containerInclusive:!0},i.params||{}),r.selectiveRefresh.Partial.prototype.initialize.call(this,e,i)},refresh:function(){var t=this,i;return a.selectiveRefreshableWidgets[this.widgetIdParts.idBase]?r.selectiveRefresh.Partial.prototype.refresh.call(this):((i=e.Deferred()).reject(),this.fallback(),i.promise())},renderContent:function(e){var t=this;r.selectiveRefresh.Partial.prototype.renderContent.call(this,e)&&(r.preview.send("widget-updated",this.widgetId),r.selectiveRefresh.trigger("widget-updated",this))}}),a.SidebarPartial=r.selectiveRefresh.Partial.extend({initialize:function(e,i){var a=this,n;if(!(n=e.match(/^sidebar\[(.+)]$/)))throw new Error("Illegal id for sidebar partial.");if(this.sidebarId=n[1],(i=i||{}).params=t.extend({settings:["sidebars_widgets["+this.sidebarId+"]"]},i.params||{}),r.selectiveRefresh.Partial.prototype.initialize.call(this,e,i),!this.params.sidebarArgs)throw new Error("The sidebarArgs param was not provided.");if(this.params.settings.length>1)throw new Error("Expected SidebarPartial to only have one associated setting")},ready:function(){var e=this;t.each(e.settings(),function(i){r(i).bind(t.bind(e.handleSettingChange,e))}),r.selectiveRefresh.bind("partial-content-rendered",function(i){var n;i.partial.extended(a.WidgetPartial)&&-1!==t.indexOf(e.getWidgetIds(),i.partial.widgetId)&&r.selectiveRefresh.trigger("sidebar-updated",e)}),r.bind("change",function(i){var r,n;(n=a.parseWidgetSettingId(i.id))&&(r=n.idBase,n.number&&(r+="-"+String(n.number)),-1!==t.indexOf(e.getWidgetIds(),r)&&e.ensureWidgetPlacementContainers(r))})},findDynamicSidebarBoundaryNodes:function(){var e=this,i,r={},a;return i=/^(dynamic_sidebar_before|dynamic_sidebar_after):(.+):(\d+)$/,(a=function(n){t.each(n,function(n){var s;if(8===n.nodeType){if(!(s=n.nodeValue.match(i))||s[2]!==e.sidebarId)return;t.isUndefined(r[s[3]])&&(r[s[3]]={before:null,after:null,instanceNumber:parseInt(s[3],10)}),"dynamic_sidebar_before"===s[1]?r[s[3]].before=n:r[s[3]].after=n}else 1===n.nodeType&&a(n.childNodes)})})(document.body.childNodes),t.values(r)},placements:function(){var e=this;return t.map(e.findDynamicSidebarBoundaryNodes(),function(t){return new r.selectiveRefresh.Placement({partial:e,container:null,startNode:t.before,endNode:t.after,context:{instanceNumber:t.instanceNumber}})})},getWidgetIds:function(){var e=this,i,a;if(!(i=this.settings()[0]))throw new Error("Missing associated setting.");if(!r.has(i))throw new Error("Setting does not exist.");if(a=r(i).get(),!t.isArray(a))throw new Error("Expected setting to be array of widget IDs");return a.slice(0)},reflowWidgets:function(){var e=this,i,a,n,s=[];return a=this.getWidgetIds(),i=this.placements(),n={},t.each(a,function(e){var t=r.selectiveRefresh.partial("widget["+e+"]");t&&(n[e]=t)}),t.each(i,function(e){var i=[],a=!1,d,o=-1;t.each(n,function(r){t.each(r.placements(),function(t){e.context.instanceNumber===t.context.sidebar_instance_number&&(d=t.container.index(),i.push({partial:r,placement:t,position:d}),d<o&&(a=!0),o=d)})}),a&&(t.each(i,function(t){e.endNode.parentNode.insertBefore(t.placement.container[0],e.endNode),r.selectiveRefresh.trigger("partial-content-moved",t.placement)}),s.push(e))}),s.length>0&&r.selectiveRefresh.trigger("sidebar-updated",this),s},ensureWidgetPlacementContainers:function(i){var n=this,s,d=!1,o="widget["+i+"]";return(s=r.selectiveRefresh.partial(o))||(s=new a.WidgetPartial(o,{params:{}})),t.each(n.placements(),function(r){var a,o;(a=t.find(s.placements(),function(e){return e.context.sidebar_instance_number===r.context.instanceNumber}))||(o=e(n.params.sidebarArgs.before_widget.replace(/%1\$s/g,i).replace(/%2\$s/g,"widget")+n.params.sidebarArgs.after_widget))[0]&&(o.attr("data-customize-partial-id",s.id),o.attr("data-customize-partial-type","widget"),o.attr("data-customize-widget-id",i),o.data("customize-partial-placement-context",{sidebar_id:n.sidebarId,sidebar_instance_number:r.context.instanceNumber}),r.endNode.parentNode.insertBefore(o[0],r.endNode),d=!0)}),r.selectiveRefresh.partial.add(s),d&&n.reflowWidgets(),s},handleSettingChange:function(e,i){var n=this,s,d,o,c=[];(s=i.length>0&&0===e.length||e.length>0&&0===i.length)?n.fallback():(d=t.difference(i,e),t.each(d,function(e){var i=r.selectiveRefresh.partial("widget["+e+"]");i&&t.each(i.placements(),function(e){var t;(e.context.sidebar_id===n.sidebarId||e.context.sidebar_args&&e.context.sidebar_args.id===n.sidebarId)&&e.container.remove()}),delete a.renderedWidgets[e]}),o=t.difference(e,i),t.each(o,function(e){var t=n.ensureWidgetPlacementContainers(e);c.push(t),a.renderedWidgets[e]=!0}),t.each(c,function(e){e.refresh()}),r.selectiveRefresh.trigger("sidebar-updated",n))},refresh:function(){var i=this,a=e.Deferred();return a.fail(function(){i.fallback()}),0===i.placements().length?a.reject():(t.each(i.reflowWidgets(),function(e){r.selectiveRefresh.trigger("partial-content-rendered",e)}),a.resolve()),a.promise()}}),r.selectiveRefresh.partialConstructor.sidebar=a.SidebarPartial,r.selectiveRefresh.partialConstructor.widget=a.WidgetPartial,a.addPartials=function(){t.each(a.registeredSidebars,function(e){var t,i="sidebar["+e.id+"]";(t=r.selectiveRefresh.partial(i))||(t=new a.SidebarPartial(i,{params:{sidebarArgs:e}}),r.selectiveRefresh.partial.add(t))})},a.buildWidgetSelectors=function(){var t=this;e.each(t.registeredSidebars,function(i,r){var a=[r.before_widget,r.before_title,r.after_title,r.after_widget].join(""),n,s,d;s=(n=e(a)).prop("tagName")||"",(d=n.prop("className")||"")&&((d=(d=d.replace(/\S*%[12]\$s\S*/g,"")).replace(/^\s+|\s+$/g,""))&&(s+="."+d.split(/\s+/).join(".")),t.widgetSelectors.push(s))})},a.highlightWidget=function(t){var i=e(document.body),r=e("#"+t);i.find(".widget-customizer-highlighted-widget").removeClass("widget-customizer-highlighted-widget"),r.addClass("widget-customizer-highlighted-widget"),setTimeout(function(){r.removeClass("widget-customizer-highlighted-widget")},500)},a.highlightControls=function(){var t=this,i=this.widgetSelectors.join(",");r.settings.channel&&(e(i).attr("title",this.l10n.widgetTooltip),e(document).on("mouseenter",i,function(){t.preview.send("highlight-widget-control",e(this).prop("id"))}),e(document).on("click",i,function(i){i.shiftKey&&(i.preventDefault(),t.preview.send("focus-widget-control",e(this).prop("id")))}))},a.parseWidgetId=function(e){var t,i={idBase:"",number:null};return(t=e.match(/^(.+)-(\d+)$/))?(i.idBase=t[1],i.number=parseInt(t[2],10)):i.idBase=e,i},a.parseWidgetSettingId=function(e){var t,i={idBase:"",number:null};return(t=e.match(/^widget_([^\[]+?)(?:\[(\d+)])?$/))?(i.idBase=t[1],t[2]&&(i.number=parseInt(t[2],10)),i):null},a.getWidgetSettingId=function(e){var t=this.parseWidgetId(e),i;return i="widget_"+t.idBase,t.number&&(i+="["+String(t.number)+"]"),i},r.bind("preview-ready",function(){e.extend(a,_wpWidgetCustomizerPreviewSettings),a.init()}),a}(jQuery,_,wp,wp.customize);