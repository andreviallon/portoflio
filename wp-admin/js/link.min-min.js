jQuery(document).ready(function(t){var e,a,c,i=!1;t("#link_name").focus(),postboxes.add_postbox_toggles("link"),t("#category-tabs a").click(function(){var e=t(this).attr("href");return t(this).parent().addClass("tabs").siblings("li").removeClass("tabs"),t(".tabs-panel").hide(),t(e).show(),"#categories-all"==e?deleteUserSetting("cats"):setUserSetting("cats","pop"),!1}),getUserSetting("cats")&&t('#category-tabs a[href="#categories-pop"]').click(),e=t("#newcat").one("focus",function(){t(this).val("").removeClass("form-input-tip")}),t("#link-category-add-submit").click(function(){e.focus()}),a=function(){if(!i){i=!0;var e=t(this),a=e.is(":checked"),c=e.val().toString();t("#in-link-category-"+c+", #in-popular-link_category-"+c).prop("checked",a),i=!1}},c=function(e,c){t(c.what+" response_data",e).each(function(){var e;t(t(this).text()).find("label").each(function(){var e,c=t(this),i=c.find("input").val(),s=c.find("input")[0].id,n=t.trim(c.text());t("#"+s).change(a),e=t('<option value="'+parseInt(i,10)+'"></option>').text(n)})})},t("#categorychecklist").wpList({alt:"",what:"link-category",response:"category-ajax-response",addAfter:c}),t('a[href="#categories-all"]').click(function(){deleteUserSetting("cats")}),t('a[href="#categories-pop"]').click(function(){setUserSetting("cats","pop")}),"pop"==getUserSetting("cats")&&t('a[href="#categories-pop"]').click(),t("#category-add-toggle").click(function(){return t(this).parents("div:first").toggleClass("wp-hidden-children"),t('#category-tabs a[href="#categories-all"]').click(),t("#newcategory").focus(),!1}),t(".categorychecklist :checkbox").change(a).filter(":checked").change()});