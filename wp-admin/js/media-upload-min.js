var wpActiveEditor,send_to_editor,tb_position;send_to_editor=function(t){var e,i="undefined"!=typeof tinymce,n="undefined"!=typeof QTags;if(wpActiveEditor)i&&(e=tinymce.get(wpActiveEditor));else if(i&&tinymce.activeEditor)e=tinymce.activeEditor,wpActiveEditor=e.id;else if(!n)return!1;if(e&&!e.isHidden()?e.execCommand("mceInsertContent",!1,t):n?QTags.insertContent(t):document.getElementById(wpActiveEditor).value+=t,window.tb_remove)try{window.tb_remove()}catch(t){}},function(t){tb_position=function(){var e=t("#TB_window"),i=t(window).width(),n=t(window).height(),o=833<i?833:i,d=0;return t("#wpadminbar").length&&(d=parseInt(t("#wpadminbar").css("height"),10)),e.length&&(e.width(o-50).height(n-45-d),t("#TB_iframeContent").width(o-50).height(n-75-d),e.css({"margin-left":"-"+parseInt((o-50)/2,10)+"px"}),void 0!==document.body.style.maxWidth&&e.css({top:20+d+"px","margin-top":"0"})),t("a.thickbox").each(function(){var e=t(this).attr("href");e&&(e=(e=e.replace(/&width=[0-9]+/g,"")).replace(/&height=[0-9]+/g,""),t(this).attr("href",e+"&width="+(o-80)+"&height="+(n-85-d)))})},t(window).resize(function(){tb_position()})}(jQuery);