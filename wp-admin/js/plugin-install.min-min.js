var tb_position;jQuery(document).ready(function(t){function i(){var i=a.find("#TB_iframeContent");e=i.contents().find("body"),n(),s.focus(),t("#plugin-information-tabs a",e).on("click",function(){n()}),e.on("keydown",function(t){27===t.which&&tb_remove()})}function n(){var i;l=t(":tabbable",e),s=a.find("#TB_closeWindowButton"),d=l.last(),(i=s.add(d)).off("keydown.wp-plugin-details"),i.on("keydown.wp-plugin-details",function(t){o(t)})}function o(t){9===t.which&&(d[0]!==t.target||t.shiftKey?s[0]===t.target&&t.shiftKey&&(t.preventDefault(),d.focus()):(t.preventDefault(),s.focus()))}var a,e,l,s,d,r=t(),c=t(".upload-view-toggle"),u=t(".wrap"),f=t(document.body);tb_position=function(){var i=t(window).width(),n=t(window).height()-(792<i?60:20),o=792<i?772:i-20;return(a=t("#TB_window")).length&&(a.width(o).height(n),t("#TB_iframeContent").width(o).height(n),a.css({"margin-left":"-"+parseInt(o/2,10)+"px"}),void 0!==document.body.style.maxWidth&&a.css({top:"30px","margin-top":"0"})),t("a.thickbox").each(function(){var i=t(this).attr("href");i&&(i=(i=i.replace(/&width=[0-9]+/g,"")).replace(/&height=[0-9]+/g,""),t(this).attr("href",i+"&width="+o+"&height="+n))})},t(window).resize(function(){tb_position()}),f.on("thickbox:iframe:loaded",a,function(){a.hasClass("plugin-details-modal")&&i()}).on("thickbox:removed",function(){r.focus()}),t(".wrap").on("click",".thickbox.open-plugin-details-modal",function(i){var n=t(this).data("title")?plugininstallL10n.plugin_information+" "+t(this).data("title"):plugininstallL10n.plugin_modal_label;i.preventDefault(),i.stopPropagation(),r=t(this),tb_click.call(this),a.attr({role:"dialog","aria-label":plugininstallL10n.plugin_modal_label}).addClass("plugin-details-modal"),a.find("#TB_iframeContent").attr("title",n)}),t("#plugin-information-tabs a").click(function(i){var n=t(this).attr("name");i.preventDefault(),t("#plugin-information-tabs a.current").removeClass("current"),t(this).addClass("current"),"description"!==n&&t(window).width()<772?t("#plugin-information-content").find(".fyi").hide():t("#plugin-information-content").find(".fyi").show(),t("#section-holder div.section").hide(),t("#section-"+n).show()}),u.hasClass("plugin-install-tab-upload")||c.attr({role:"button","aria-expanded":"false"}).on("click",function(t){t.preventDefault(),f.toggleClass("show-upload-view"),c.attr("aria-expanded",f.hasClass("show-upload-view"))})});