jQuery(function(a){a("body").bind("click.wp-gallery",function(e){var t=a(e.target),n,o;t.hasClass("wp-set-header")?((window.dialogArguments||opener||parent||top).location.href=t.data("location"),e.preventDefault()):t.hasClass("wp-set-background")&&(n=t.data("attachment-id"),o=a('input[name="attachments['+n+'][image-size]"]:checked').val(),jQuery.post(ajaxurl,{action:"set-background-image",attachment_id:n,size:o},function(){var a=window.dialogArguments||opener||parent||top;a.tb_remove(),a.location.reload()}),e.preventDefault())})});