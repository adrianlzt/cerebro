/* Chosen v1.0.0 | (c) 2011-2013 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
!function(){var a,AbstractChosen,Chosen,SelectParser,b,c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};SelectParser=function(){function SelectParser(){this.options_index=0,this.parsed=[]}return SelectParser.prototype.add_node=function(a){return"OPTGROUP"===a.nodeName.toUpperCase()?this.add_group(a):this.add_option(a)},SelectParser.prototype.add_group=function(a){var b,c,d,e,f,g;for(b=this.parsed.length,this.parsed.push({array_index:b,group:!0,label:this.escapeExpression(a.label),children:0,disabled:a.disabled}),f=a.childNodes,g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(this.add_option(c,b,a.disabled));return g},SelectParser.prototype.add_option=function(a,b,c){return"OPTION"===a.nodeName.toUpperCase()?(""!==a.text?(null!=b&&(this.parsed[b].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:a.value,text:a.text,html:a.innerHTML,selected:a.selected,disabled:c===!0?c:a.disabled,group_array_index:b,classes:a.className,style:a.style.cssText})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0}),this.options_index+=1):void 0},SelectParser.prototype.escapeExpression=function(a){var b,c;return null==a||a===!1?"":/[\&\<\>\"\'\`]/.test(a)?(b={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c=/&(?!\w+;)|[\<\>\"\'\`]/g,a.replace(c,function(a){return b[a]||"&amp;"})):a},SelectParser}(),SelectParser.select_to_array=function(a){var b,c,d,e,f;for(c=new SelectParser,f=a.childNodes,d=0,e=f.length;e>d;d++)b=f[d],c.add_node(b);return c.parsed},AbstractChosen=function(){function AbstractChosen(a,b){this.form_field=a,this.options=null!=b?b:{},AbstractChosen.browser_is_supported()&&(this.is_multiple=this.form_field.multiple,this.set_default_text(),this.set_default_values(),this.setup(),this.set_up_html(),this.register_observers())}return AbstractChosen.prototype.set_default_values=function(){var a=this;return this.click_test_action=function(b){return a.test_active_click(b)},this.activate_action=function(b){return a.activate_field(b)},this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.result_single_selected=null,this.allow_single_deselect=null!=this.options.allow_single_deselect&&null!=this.form_field.options[0]&&""===this.form_field.options[0].text?this.options.allow_single_deselect:!1,this.disable_search_threshold=this.options.disable_search_threshold||0,this.disable_search=this.options.disable_search||!1,this.enable_split_word_search=null!=this.options.enable_split_word_search?this.options.enable_split_word_search:!0,this.group_search=null!=this.options.group_search?this.options.group_search:!0,this.search_contains=this.options.search_contains||!1,this.single_backstroke_delete=null!=this.options.single_backstroke_delete?this.options.single_backstroke_delete:!0,this.max_selected_options=this.options.max_selected_options||1/0,this.inherit_select_classes=this.options.inherit_select_classes||!1,this.display_selected_options=null!=this.options.display_selected_options?this.options.display_selected_options:!0,this.display_disabled_options=null!=this.options.display_disabled_options?this.options.display_disabled_options:!0},AbstractChosen.prototype.set_default_text=function(){return this.default_text=this.form_field.getAttribute("data-placeholder")?this.form_field.getAttribute("data-placeholder"):this.is_multiple?this.options.placeholder_text_multiple||this.options.placeholder_text||AbstractChosen.default_multiple_text:this.options.placeholder_text_single||this.options.placeholder_text||AbstractChosen.default_single_text,this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||AbstractChosen.default_no_result_text},AbstractChosen.prototype.mouse_enter=function(){return this.mouse_on_container=!0},AbstractChosen.prototype.mouse_leave=function(){return this.mouse_on_container=!1},AbstractChosen.prototype.input_focus=function(){var a=this;if(this.is_multiple){if(!this.active_field)return setTimeout(function(){return a.container_mousedown()},50)}else if(!this.active_field)return this.activate_field()},AbstractChosen.prototype.input_blur=function(){var a=this;return this.mouse_on_container?void 0:(this.active_field=!1,setTimeout(function(){return a.blur_test()},100))},AbstractChosen.prototype.results_option_build=function(a){var b,c,d,e,f;for(b="",f=this.results_data,d=0,e=f.length;e>d;d++)c=f[d],b+=c.group?this.result_add_group(c):this.result_add_option(c),(null!=a?a.first:void 0)&&(c.selected&&this.is_multiple?this.choice_build(c):c.selected&&!this.is_multiple&&this.single_set_selected_text(c.text));return b},AbstractChosen.prototype.result_add_option=function(a){var b,c;return a.search_match?this.include_option_in_results(a)?(b=[],a.disabled||a.selected&&this.is_multiple||b.push("active-result"),!a.disabled||a.selected&&this.is_multiple||b.push("disabled-result"),a.selected&&b.push("result-selected"),null!=a.group_array_index&&b.push("group-option"),""!==a.classes&&b.push(a.classes),c=""!==a.style.cssText?' style="'+a.style+'"':"",'<li class="'+b.join(" ")+'"'+c+' data-option-array-index="'+a.array_index+'">'+a.search_text+"</li>"):"":""},AbstractChosen.prototype.result_add_group=function(a){return a.search_match||a.group_match?a.active_options>0?'<li class="group-result">'+a.search_text+"</li>":"":""},AbstractChosen.prototype.results_update_field=function(){return this.set_default_text(),this.is_multiple||this.results_reset_cleanup(),this.result_clear_highlight(),this.result_single_selected=null,this.results_build(),this.results_showing?this.winnow_results():void 0},AbstractChosen.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},AbstractChosen.prototype.results_search=function(){return this.results_showing?this.winnow_results():this.results_show()},AbstractChosen.prototype.winnow_results=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;for(this.no_results_clear(),e=0,g=this.get_search_text(),a=g.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),d=this.search_contains?"":"^",c=new RegExp(d+a,"i"),j=new RegExp(a,"i"),m=this.results_data,k=0,l=m.length;l>k;k++)b=m[k],b.search_match=!1,f=null,this.include_option_in_results(b)&&(b.group&&(b.group_match=!1,b.active_options=0),null!=b.group_array_index&&this.results_data[b.group_array_index]&&(f=this.results_data[b.group_array_index],0===f.active_options&&f.search_match&&(e+=1),f.active_options+=1),(!b.group||this.group_search)&&(b.search_text=b.group?b.label:b.html,b.search_match=this.search_string_match(b.search_text,c),b.search_match&&!b.group&&(e+=1),b.search_match?(g.length&&(h=b.search_text.search(j),i=b.search_text.substr(0,h+g.length)+"</em>"+b.search_text.substr(h+g.length),b.search_text=i.substr(0,h)+"<em>"+i.substr(h)),null!=f&&(f.group_match=!0)):null!=b.group_array_index&&this.results_data[b.group_array_index].search_match&&(b.search_match=!0)));return this.result_clear_highlight(),1>e&&g.length?(this.update_results_content(""),this.no_results(g)):(this.update_results_content(this.results_option_build()),this.winnow_results_set_highlight())},AbstractChosen.prototype.search_string_match=function(a,b){var c,d,e,f;if(b.test(a))return!0;if(this.enable_split_word_search&&(a.indexOf(" ")>=0||0===a.indexOf("["))&&(d=a.replace(/\[|\]/g,"").split(" "),d.length))for(e=0,f=d.length;f>e;e++)if(c=d[e],b.test(c))return!0},AbstractChosen.prototype.choices_count=function(){var a,b,c,d;if(null!=this.selected_option_count)return this.selected_option_count;for(this.selected_option_count=0,d=this.form_field.options,b=0,c=d.length;c>b;b++)a=d[b],a.selected&&(this.selected_option_count+=1);return this.selected_option_count},AbstractChosen.prototype.choices_click=function(a){return a.preventDefault(),this.results_showing||this.is_disabled?void 0:this.results_show()},AbstractChosen.prototype.keyup_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),b){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0)return this.keydown_backstroke();if(!this.pending_backstroke)return this.result_clear_highlight(),this.results_search();break;case 13:if(a.preventDefault(),this.results_showing)return this.result_select(a);break;case 27:return this.results_showing&&this.results_hide(),!0;case 9:case 38:case 40:case 16:case 91:case 17:break;default:return this.results_search()}},AbstractChosen.prototype.container_width=function(){return null!=this.options.width?this.options.width:""+this.form_field.offsetWidth+"px"},AbstractChosen.prototype.include_option_in_results=function(a){return this.is_multiple&&!this.display_selected_options&&a.selected?!1:!this.display_disabled_options&&a.disabled?!1:a.empty?!1:!0},AbstractChosen.browser_is_supported=function(){return"Microsoft Internet Explorer"===window.navigator.appName?document.documentMode>=8:/iP(od|hone)/i.test(window.navigator.userAgent)?!1:/Android/i.test(window.navigator.userAgent)&&/Mobile/i.test(window.navigator.userAgent)?!1:!0},AbstractChosen.default_multiple_text="Select Some Options",AbstractChosen.default_single_text="Select an Option",AbstractChosen.default_no_result_text="No results match",AbstractChosen}(),a=jQuery,a.fn.extend({chosen:function(b){return AbstractChosen.browser_is_supported()?this.each(function(){var c,d;c=a(this),d=c.data("chosen"),"destroy"===b&&d?d.destroy():d||c.data("chosen",new Chosen(this,b))}):this}}),Chosen=function(c){function Chosen(){return b=Chosen.__super__.constructor.apply(this,arguments)}return d(Chosen,c),Chosen.prototype.setup=function(){return this.form_field_jq=a(this.form_field),this.current_selectedIndex=this.form_field.selectedIndex,this.is_rtl=this.form_field_jq.hasClass("chosen-rtl")},Chosen.prototype.set_up_html=function(){var b,c;return b=["chosen-container"],b.push("chosen-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&b.push(this.form_field.className),this.is_rtl&&b.push("chosen-rtl"),c={"class":b.join(" "),style:"width: "+this.container_width()+";",title:this.form_field.title},this.form_field.id.length&&(c.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"),this.container=a("<div />",c),this.is_multiple?this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>'):this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'),this.form_field_jq.hide().after(this.container),this.dropdown=this.container.find("div.chosen-drop").first(),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chosen-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chosen-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chosen-search").first(),this.selected_item=this.container.find(".chosen-single").first()),this.results_build(),this.set_tab_index(),this.set_label_behavior(),this.form_field_jq.trigger("chosen:ready",{chosen:this})},Chosen.prototype.register_observers=function(){var a=this;return this.container.bind("mousedown.chosen",function(b){a.container_mousedown(b)}),this.container.bind("mouseup.chosen",function(b){a.container_mouseup(b)}),this.container.bind("mouseenter.chosen",function(b){a.mouse_enter(b)}),this.container.bind("mouseleave.chosen",function(b){a.mouse_leave(b)}),this.search_results.bind("mouseup.chosen",function(b){a.search_results_mouseup(b)}),this.search_results.bind("mouseover.chosen",function(b){a.search_results_mouseover(b)}),this.search_results.bind("mouseout.chosen",function(b){a.search_results_mouseout(b)}),this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen",function(b){a.search_results_mousewheel(b)}),this.form_field_jq.bind("chosen:updated.chosen",function(b){a.results_update_field(b)}),this.form_field_jq.bind("chosen:activate.chosen",function(b){a.activate_field(b)}),this.form_field_jq.bind("chosen:open.chosen",function(b){a.container_mousedown(b)}),this.search_field.bind("blur.chosen",function(b){a.input_blur(b)}),this.search_field.bind("keyup.chosen",function(b){a.keyup_checker(b)}),this.search_field.bind("keydown.chosen",function(b){a.keydown_checker(b)}),this.search_field.bind("focus.chosen",function(b){a.input_focus(b)}),this.is_multiple?this.search_choices.bind("click.chosen",function(b){a.choices_click(b)}):this.container.bind("click.chosen",function(a){a.preventDefault()})},Chosen.prototype.destroy=function(){return a(document).unbind("click.chosen",this.click_test_action),this.search_field[0].tabIndex&&(this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex),this.container.remove(),this.form_field_jq.removeData("chosen"),this.form_field_jq.show()},Chosen.prototype.search_field_disabled=function(){return this.is_disabled=this.form_field_jq[0].disabled,this.is_disabled?(this.container.addClass("chosen-disabled"),this.search_field[0].disabled=!0,this.is_multiple||this.selected_item.unbind("focus.chosen",this.activate_action),this.close_field()):(this.container.removeClass("chosen-disabled"),this.search_field[0].disabled=!1,this.is_multiple?void 0:this.selected_item.bind("focus.chosen",this.activate_action))},Chosen.prototype.container_mousedown=function(b){return this.is_disabled||(b&&"mousedown"===b.type&&!this.results_showing&&b.preventDefault(),null!=b&&a(b.target).hasClass("search-choice-close"))?void 0:(this.active_field?this.is_multiple||!b||a(b.target)[0]!==this.selected_item[0]&&!a(b.target).parents("a.chosen-single").length||(b.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),a(document).bind("click.chosen",this.click_test_action),this.results_show()),this.activate_field())},Chosen.prototype.container_mouseup=function(a){return"ABBR"!==a.target.nodeName||this.is_disabled?void 0:this.results_reset(a)},Chosen.prototype.search_results_mousewheel=function(a){var b,c,d;return b=-(null!=(c=a.originalEvent)?c.wheelDelta:void 0)||(null!=(d=a.originialEvent)?d.detail:void 0),null!=b?(a.preventDefault(),"DOMMouseScroll"===a.type&&(b=40*b),this.search_results.scrollTop(b+this.search_results.scrollTop())):void 0},Chosen.prototype.blur_test=function(){return!this.active_field&&this.container.hasClass("chosen-container-active")?this.close_field():void 0},Chosen.prototype.close_field=function(){return a(document).unbind("click.chosen",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClass("chosen-container-active"),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale()},Chosen.prototype.activate_field=function(){return this.container.addClass("chosen-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val()),this.search_field.focus()},Chosen.prototype.test_active_click=function(b){return this.container.is(a(b.target).closest(".chosen-container"))?this.active_field=!0:this.close_field()},Chosen.prototype.results_build=function(){return this.parsing=!0,this.selected_option_count=null,this.results_data=SelectParser.select_to_array(this.form_field),this.is_multiple?this.search_choices.find("li.search-choice").remove():this.is_multiple||(this.single_set_selected_text(),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?(this.search_field[0].readOnly=!0,this.container.addClass("chosen-container-single-nosearch")):(this.search_field[0].readOnly=!1,this.container.removeClass("chosen-container-single-nosearch"))),this.update_results_content(this.results_option_build({first:!0})),this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.parsing=!1},Chosen.prototype.result_do_highlight=function(a){var b,c,d,e,f;if(a.length){if(this.result_clear_highlight(),this.result_highlight=a,this.result_highlight.addClass("highlighted"),d=parseInt(this.search_results.css("maxHeight"),10),f=this.search_results.scrollTop(),e=d+f,c=this.result_highlight.position().top+this.search_results.scrollTop(),b=c+this.result_highlight.outerHeight(),b>=e)return this.search_results.scrollTop(b-d>0?b-d:0);if(f>c)return this.search_results.scrollTop(c)}},Chosen.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClass("highlighted"),this.result_highlight=null},Chosen.prototype.results_show=function(){return this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.container.addClass("chosen-with-drop"),this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this}),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.search_field.val()),this.winnow_results())},Chosen.prototype.update_results_content=function(a){return this.search_results.html(a)},Chosen.prototype.results_hide=function(){return this.results_showing&&(this.result_clear_highlight(),this.container.removeClass("chosen-with-drop"),this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this})),this.results_showing=!1},Chosen.prototype.set_tab_index=function(){var a;return this.form_field.tabIndex?(a=this.form_field.tabIndex,this.form_field.tabIndex=-1,this.search_field[0].tabIndex=a):void 0},Chosen.prototype.set_label_behavior=function(){var b=this;return this.form_field_label=this.form_field_jq.parents("label"),!this.form_field_label.length&&this.form_field.id.length&&(this.form_field_label=a("label[for='"+this.form_field.id+"']")),this.form_field_label.length>0?this.form_field_label.bind("click.chosen",function(a){return b.is_multiple?b.container_mousedown(a):b.activate_field()}):void 0},Chosen.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.val(this.default_text),this.search_field.addClass("default")):(this.search_field.val(""),this.search_field.removeClass("default"))},Chosen.prototype.search_results_mouseup=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c.length?(this.result_highlight=c,this.result_select(b),this.search_field.focus()):void 0},Chosen.prototype.search_results_mouseover=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c?this.result_do_highlight(c):void 0},Chosen.prototype.search_results_mouseout=function(b){return a(b.target).hasClass("active-result")?this.result_clear_highlight():void 0},Chosen.prototype.choice_build=function(b){var c,d,e=this;return c=a("<li />",{"class":"search-choice"}).html("<span>"+b.html+"</span>"),b.disabled?c.addClass("search-choice-disabled"):(d=a("<a />",{"class":"search-choice-close","data-option-array-index":b.array_index}),d.bind("click.chosen",function(a){return e.choice_destroy_link_click(a)}),c.append(d)),this.search_container.before(c)},Chosen.prototype.choice_destroy_link_click=function(b){return b.preventDefault(),b.stopPropagation(),this.is_disabled?void 0:this.choice_destroy(a(b.target))},Chosen.prototype.choice_destroy=function(a){return this.result_deselect(a[0].getAttribute("data-option-array-index"))?(this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1&&this.results_hide(),a.parents("li").first().remove(),this.search_field_scale()):void 0},Chosen.prototype.results_reset=function(){return this.form_field.options[0].selected=!0,this.selected_option_count=null,this.single_set_selected_text(),this.show_search_field_default(),this.results_reset_cleanup(),this.form_field_jq.trigger("change"),this.active_field?this.results_hide():void 0},Chosen.prototype.results_reset_cleanup=function(){return this.current_selectedIndex=this.form_field.selectedIndex,this.selected_item.find("abbr").remove()},Chosen.prototype.result_select=function(a){var b,c,d;return this.result_highlight?(b=this.result_highlight,this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.is_multiple?b.removeClass("active-result"):(this.result_single_selected&&(this.result_single_selected.removeClass("result-selected"),d=this.result_single_selected[0].getAttribute("data-option-array-index"),this.results_data[d].selected=!1),this.result_single_selected=b),b.addClass("result-selected"),c=this.results_data[b[0].getAttribute("data-option-array-index")],c.selected=!0,this.form_field.options[c.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(c):this.single_set_selected_text(c.text),(a.metaKey||a.ctrlKey)&&this.is_multiple||this.results_hide(),this.search_field.val(""),(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)&&this.form_field_jq.trigger("change",{selected:this.form_field.options[c.options_index].value}),this.current_selectedIndex=this.form_field.selectedIndex,this.search_field_scale())):void 0},Chosen.prototype.single_set_selected_text=function(a){return null==a&&(a=this.default_text),a===this.default_text?this.selected_item.addClass("chosen-default"):(this.single_deselect_control_build(),this.selected_item.removeClass("chosen-default")),this.selected_item.find("span").text(a)},Chosen.prototype.result_deselect=function(a){var b;return b=this.results_data[a],this.form_field.options[b.options_index].disabled?!1:(b.selected=!1,this.form_field.options[b.options_index].selected=!1,this.selected_option_count=null,this.result_clear_highlight(),this.results_showing&&this.winnow_results(),this.form_field_jq.trigger("change",{deselected:this.form_field.options[b.options_index].value}),this.search_field_scale(),!0)},Chosen.prototype.single_deselect_control_build=function(){return this.allow_single_deselect?(this.selected_item.find("abbr").length||this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'),this.selected_item.addClass("chosen-single-with-deselect")):void 0},Chosen.prototype.get_search_text=function(){return this.search_field.val()===this.default_text?"":a("<div/>").text(a.trim(this.search_field.val())).html()},Chosen.prototype.winnow_results_set_highlight=function(){var a,b;return b=this.is_multiple?[]:this.search_results.find(".result-selected.active-result"),a=b.length?b.first():this.search_results.find(".active-result").first(),null!=a?this.result_do_highlight(a):void 0},Chosen.prototype.no_results=function(b){var c;return c=a('<li class="no-results">'+this.results_none_found+' "<span></span>"</li>'),c.find("span").first().html(b),this.search_results.append(c)},Chosen.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},Chosen.prototype.keydown_arrow=function(){var a;return this.results_showing&&this.result_highlight?(a=this.result_highlight.nextAll("li.active-result").first())?this.result_do_highlight(a):void 0:this.results_show()},Chosen.prototype.keyup_arrow=function(){var a;return this.results_showing||this.is_multiple?this.result_highlight?(a=this.result_highlight.prevAll("li.active-result"),a.length?this.result_do_highlight(a.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight())):void 0:this.results_show()},Chosen.prototype.keydown_backstroke=function(){var a;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.find("a").first()),this.clear_backstroke()):(a=this.search_container.siblings("li.search-choice").last(),a.length&&!a.hasClass("search-choice-disabled")?(this.pending_backstroke=a,this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClass("search-choice-focus")):void 0)},Chosen.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus"),this.pending_backstroke=null},Chosen.prototype.keydown_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),8!==b&&this.pending_backstroke&&this.clear_backstroke(),b){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(a),this.mouse_on_container=!1;break;case 13:a.preventDefault();break;case 38:a.preventDefault(),this.keyup_arrow();break;case 40:a.preventDefault(),this.keydown_arrow()}},Chosen.prototype.search_field_scale=function(){var b,c,d,e,f,g,h,i,j;if(this.is_multiple){for(d=0,h=0,f="position:absolute; left: -1000px; top: -1000px; display:none;",g=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"],i=0,j=g.length;j>i;i++)e=g[i],f+=e+":"+this.search_field.css(e)+";";return b=a("<div />",{style:f}),b.text(this.search_field.val()),a("body").append(b),h=b.width()+25,b.remove(),c=this.container.outerWidth(),h>c-10&&(h=c-10),this.search_field.css({width:h+"px"})}},Chosen}(AbstractChosen)}.call(this);;
(function($) {
  Drupal.behaviors.chosen = {
    attach: function(context) {
      $(Drupal.settings.chosen.selector, context).each(function() {
        if ($(this).find('option').size() >= Drupal.settings.chosen.minimum) {
          $(this).chosen();
        }
      }); 
    }
  }
})(jQuery);;
/**
 * @file
 * Helper functions for memcache_admin module.
 */

// Global Killswitch
if (Drupal.jsEnabled) {
  $(document).ready(function() {
    $("body").append($("#memcache-devel"));
  });
}
;
/*  --------------------------------------------------

    Emphasis
    by Michael Donohoe (@donohoe)
    https://github.com/NYTimes/Emphasis
    http://open.blogs.nytimes.com/2011/01/10/emphasis-update-and-source/
    
    - - - - - - - - - -

    jQueryized by Rob Flaherty (@ravelrumba)
    https://github.com/robflaherty/Emphasis

    - - - - - - - - - -

    Copyright (C) 2011 The New York Times (http://www.nytimes.com)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

    -------------------------------------------------- */

(function($) {
    window.Emphasis = {
    init: function() {
        this.config();
        this.pl = false; // Paragraph List
        this.p  = false; // Paragraph Anchor
        this.h  = false; // Highlighted paragraphs
        this.s  = false; // Highlighted sentences
        this.vu = false; // Are paragraph links visible or not
        this.kh = "|";

        this.addCSS();
        this.readHash();
        $(document).bind('keydown', this.keydown);
    },

    config: function() {
    /*
        Eligible Paragraphs
        This uses some common markup for plain and simple paragraphs - those that are not empty, no classes.
        We use PrototypeJS for its css selector awesomeness, but your needs might be simpler (getElementsByTagName('p') etc.)
    */
        this.paraSelctors      = $('#article-content p');

    //  Class names
        this.classReady        = "emReady";
        this.classActive       = "emActive";
        this.classHighlight    = "emHighlight";
        this.classInfo         = "emInfo";
        this.classAnchor       = "emAnchor";
        this.classActiveAnchor = "emActiveAnchor";
    },

    addCSS: function() {
    /*  Inject the minimum styles rules required */
        var st = document.createElement('style');
        st.setAttribute('type', 'text/css');
        /* for validation goodness */
        var stStr = 'p.' + this.classActive + ' span { background-color:#f2f4f5; } p span.' + this.classHighlight + ' { background-color:#fff0b3; } span.' + this.classInfo + ' { position:absolute; margin:-1px 0px 0px -8px; padding:0; font-size:10px; background-color: transparent !important} span.' + this.classInfo + ' a { text-decoration: none; } a.' + this.classActiveAnchor + ' { color: #000; font-size: 11px; }';
        try {
        /* try the sensible way */
          st.innerHTML = stStr;
        } catch(e) {
        /* IE's way */
          st.styleSheet.cssText = stStr;
        }
        document.getElementsByTagName("head")[0].appendChild(st);
    },

    readHash: function() {
    /*  Read and interpret the URL hash */
        var lh = decodeURI(location.hash),
          p  = false,
          h = [],
          s = {},
          a, re, f, r, i, findp, findh, undef, hi, key, pos, b, j;
          

        if (lh.indexOf('[')<0 && lh.indexOf(']')<0) {
        /*  Version 1 Legacy support
            #p20h4s2,6,10,h6s5,1 -> p = 20, h = [ 4, 6 ], s = { "4": [ 2, 6, 10 ] , "6": [ 5, 1 ] }
        */
            re = /[ph][0-9]+|s[0-9,]+|[0-9]/g;
            if (lh) {
                while ((a = re.exec(lh)) !== null) {
                    f = a[0].substring(0, 1);
                    r = a[0].substring(1);
                    if (f === 'p') {
                        p = parseInt(r, 10);
                    } else if (f === 'h') {
                        h.push(parseInt(r, 10));
                    } else {
                        a = r.split(',');
                        for (i = 0; i < a.length; i++) {
                            a[i] = parseInt(a[i], 10);
                        }
                        s[h[h.length - 1]] = a;
                    }
                }
            }
        } else {
        /*  Version 2
            #h[tbsaoa,Sstaoo,2,4],p[FWaadw] -> p = "FWaadw", h = [ "tbsaoa", "Sstaoo" ], s = { "Sstaoo" : [ 2, 4 ] }
        */
            findp = lh.match(/p\[([^[\]]*)\]/);
            findh = lh.match(/h\[([^[\]]*)\]/);

            p  = (findp && findp.length>0) ? findp[1] : false;
            hi = (findh && findh.length>0) ? findh[1] : false;

            if (hi) {
                hi = hi.match(/[a-zA-Z]+(,[0-9]+)*/g);
                for (i = 0; i < hi.length; i++) {
                    a   = hi[i].split(',');
                    key = a[0];
                    pos = this.findKey(key).index;

                    if (pos !== undef) {
                        h.push(parseInt(pos, 10)+1);
                        b = a;
                        b.shift();
                        if (b.length>0) {
                            for (j=1; j<b.length; j++) {
                                b[j] = parseInt(b[j], 10);
                            }
                        }
                        s[h[h.length - 1]] = b;
                    }
                }
            }
        }

        this.p = p; this.h = h; this.s = s;

        this.goAnchor(p);
        this.goHighlight(h, s);
    },

    keydown: function(e){
    /*  Look for double-shift keypress */
        var self = Emphasis,
          kc = e.keyCode;
        
        self.kh  = self.kh + kc + '|';
        if (self.kh.indexOf('|16|16|')>-1) {
            self.vu = (self.vu) ? false : true;
            self.paragraphInfo(self.vu);
        }
        setTimeout(function(){ self.kh = '|'; }, 500);
    },

    paragraphList: function() {
    /*  Build a list of Paragrphs, keys, and add meta-data to each Paragraph in DOM, saves list for later re-use */
        if (this.pl && this.pl.list.length > 0) {
          return this.pl;
        }
        var instance = this,
          list = [],
          keys = [],
          c    = 0,
          len  = this.paraSelctors.length,
          p, pr, k;

        for (p=0; p<len; p++) {
            pr = this.paraSelctors[p];
            if ((pr.innerText || pr.textContent || "").length>0) {
                k = instance.createKey(pr);
                list.push(pr);
                keys.push(k);
                pr.setAttribute("data-key", k); // Unique Key
                pr.setAttribute("data-num", c); // Order

                $(pr).bind('click', function(e) {
                  instance.paragraphClick(e);
                });
                c++;
            }
        }

        this.pl = { list: list, keys: keys };
        return this.pl;
    },

    paragraphClick: function(e) {
    /*  Clicking a Paragrsph has consequences for Highlighting, selecting and changing active Anchor */
        if (!this.vu) { return; }

        var hasChanged = false,
          pr = (e.currentTarget.nodeName === "P") ? e.currentTarget : false, // Paragraph
          $pr = $(pr),
          sp = (e.target.nodeName === "SPAN")     ? e.target        : false, // Span
          an = (e.target.nodeName === "A")        ? e.target        : false, // Anchor
          lines, jLen, j, txt, chr;

        if (an) {
        /*  Click an Anchor link */
            if (!$(an).hasClass(this.classActiveAnchor)) {
                this.updateAnchor(an);
                hasChanged = true;
                e.preventDefault();
            }
        }

        if (!pr && !sp) {
            this.removeClass(this.classActive);
            return;
        }

        if ($pr.hasClass(this.classReady)) {
            if (!$pr.hasClass(this.classActive) && (sp && !$(sp).hasClass(this.classHighlight))) {
            //  If not current Active p tag, clear any others out there and make this the Active p tag
                $(this).removeClass(this.classActive);
                $pr.addClass(this.classActive); // Mark as Active
            } else {
                if (!$pr.hasClass(this.classActive)) {
                    $(this).removeClass(this.classActive);
                    $pr.addClass(this.classActive); // Mark as Active
                }

                if (sp) {
                    $(sp).toggleClass(this.classHighlight);
                    hasChanged = true;
                }
            }
        } else {
        //  Add span tags to all Sentences within Paragraph and mark Paragraph as Ready
            lines = this.getSentences(pr);
            jLen  = lines.length;

            for (j=0; j<jLen; j++) {
                lines[j] = "<span data-num='" + (j+1) + "'>" + this.rtrim(lines[j]) + "</span>";
            }

            txt = lines.join('. ').replace(/__DOT__/g, ".").replace(/<\/span>\./g, ".<\/span>");
            chr = txt.substring(txt.length-8).charCodeAt(0);
            if ("|8221|63|46|41|39|37|34|33|".indexOf(chr) === -1) { txt += "."; }

            pr.innerHTML = txt;
            pr.setAttribute('data-sentences', jLen);

            $(this).removeClass(this.classActive);
            $pr.addClass(this.classActive); // Mark as Active
            $pr.addClass(this.classReady);  // Mark as Ready
            hasChanged = true;
        }

        if (hasChanged) {
            this.updateURLHash();
        }
    },

    paragraphInfo: function(mode) {
    /*  Toggle anchor links next to Paragraphs */
      var hasSpan, pl, len, i, para, key, isActive, spans;
      
        if (mode) {
            hasSpan = $('span.' + this.classInfo);
            if (hasSpan.length === 0) {
                pl  = this.paragraphList();
                len = pl.list.length;
                for (i=0; i<len; i++) {
                    para = pl.list[i] || false;
                    if (para) {
                        key        = pl.keys[i];
                        isActive   = (key===this.p) ? (" " + this.classActiveAnchor) : "";
                        para.innerHTML = "<span class='" + this.classInfo + "'><a class='"+ this.classAnchor + isActive + "' href='#p[" + key + "]' data-key='" + key + "' title='Link to " + this.ordinal(i+1) + " paragraph'>&para;</a></span>" + para.innerHTML;
                    }
                }
            }
        } else {
            spans = $('span.' + this.classInfo);

            len = spans.length;
            for (i=0; i<len; i++) {
                $(spans[i]).remove();
            }
            $(this).removeClass(this.classActive);
        }
    },

    updateAnchor: function(an) {
    /*  Make this A tag the one and only Anchor */
        this.p = an.getAttribute("data-key");
        $(this).removeClass(this.classActiveAnchor);
        $(an).addClass(this.classActiveAnchor);
    },

    updateURLHash: function() {
    /*  Scan the Paragraphs, note selections, highlights and update the URL with the new Hash */
        var h     = "h[",
          paras = $('p.emReady'),
          pLen  = paras.length,
          p, key, spans, sLen, nSent, anchor, hash,s;

        for (p=0; p < pLen; p++) {
            key = paras[p].getAttribute("data-key");
            if ($(paras[p]).hasClass(this.classHighlight)) {
                h += "," + key; // Highlight full paragraph
            } else {
                spans = $('span.' + this.classHighlight, paras[p]);
                sLen  = spans.length;
                nSent = paras[p].getAttribute("data-sentences");

                if (sLen>0) { h += "," + key; }

                if (nSent!==sLen) {
                    for (s=0; s<sLen; s++) {
                        h += "," + spans[s].getAttribute("data-num");
                    }
                }
            }
        }

        anchor    = ((this.p) ? "p[" + this.p + "]," : "");
        hash      = (anchor + (h.replace("h[,", "h[") + "]")).replace(",h[]", "");
        location.hash = hash;
    },

    createKey: function(p) {
    /*  From a Paragraph, generate a Key */
        var key = "",
          len = 6,
          txt = (p.innerText || p.textContent || '').replace(/[^a-z\. ]+/gi, ''),
          lines, first, last, k, max, i;
        
        if (txt && txt.length>1) {

            lines = this.getSentences(txt);
            if (lines.length>0) {
                first = this.cleanArray(lines[0].replace(/[\s\s]+/gi, ' ').split(' ')).slice(0, (len/2));
                last  = this.cleanArray(lines[lines.length-1].replace(/[\s\s]+/gi, ' ').split(' ')).slice(0, (len/2));
                k     = first.concat(last);

                max = (k.length>len) ? len : k.length;
                for (i=0; i<max; i++) {
                    key += k[i].substring(0, 1);
                }
            }
        }
        return key;
    },

    findKey: function(key) {
    /*  From a list of Keys, locate the Key and corresponding Paragraph */
        var pl = this.paragraphList(),
          ln = pl.keys.length,
          ix = false,
          el = false,
          i, ls, le;

        for (i=0;i<ln;i++) {
            if (key===pl.keys[i]) { // Direct Match
                return { index: i, elm: pl.list[i] };
            } else { // Look for 1st closest Match
                if (!ix) {
                      ls = this.lev(key.slice(0, 3), pl.keys[i].slice(0, 3));
                      le = this.lev(key.slice(-3)  , pl.keys[i].slice(-3));
                    if ((ls+le)<3) {
                        ix = i;
                        el = pl.list[i];
                    }
                }
            }
        }
        return { index: ix, elm: el };
    },

    goAnchor: function(p) {
    /*  Move view to top of a given Paragraph */
        if (!p) {
          return; 
        }
        var pg = (isNaN(p)) ? this.findKey(p)['elm'] : (this.paragraphList().list[p-1] || false);
        
        if (pg) {
            setTimeout(function(){
                $(window).scrollTop($(pg).offset().top);
            }, 500);
        }
    },

    goHighlight: function(h, s) {
    /*  Highlight a Paragraph, or specific Sentences within it */
        if (!h) {
          return;
        }
        var hLen = h.length,
          i, para, sntns, multi, lines, jLen, j, k, line;

        for (i=0; i<hLen; i++) {
            para = this.paragraphList().list[h[i]-1] || false;
            if (para) {
                sntns = s[h[i].toString()] || false;
                multi = !sntns || sntns.length===0; // Individual sentences, or whole paragraphy?
                lines = this.getSentences(para);
                jLen  = lines.length;

            /*  First pass. Add SPAN tags to all lines. */
                for (j=0; j<jLen; j++) {
                    k = (multi) ? j : sntns[j]-1;
                    lines[j] = "<span data-num='" + (j+1) + "'>" + lines[j] + "</span>";
                }

            /*  Second pass, update span to Highlight selected lines */
                for (j=0; j<jLen; j++) {
                    k    = (multi) ? j : sntns[j]-1;
                    line = lines[k] || false;
                    if (line) {
                        lines[k] = lines[k].replace("<span", "<span class='" + this.classHighlight + "'");
                    }
                }

                para.setAttribute("data-sentences", jLen);
                para.innerHTML = lines.join('. ').replace(/__DOT__/g, ".").replace(/<\/span>\./g, ".<\/span>");
                $(para).addClass('emReady'); /* Mark the paragraph as having SPANs */
            }
        }
    },

    getSentences: function(el) {
    /*  Break a Paragraph into Sentences, bearing in mind that the "." is not the definitive way to do so */
        var html    = (typeof el==="string") ? el : el.innerHTML,
          mrsList = "Mr,Ms,Mrs,Miss,Msr,Dr,Gov,Pres,Sen,Prof,Gen,Rep,St,Messrs,Col,Sr,Jf,Ph,Sgt,Mgr,Fr,Rev,No,Jr,Snr",
          topList = "A,B,C,D,E,F,G,H,I,J,K,L,M,m,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,etc,oz,cf,viz,sc,ca,Ave,St",
          geoList = "Calif,Mass,Penn,AK,AL,AR,AS,AZ,CA,CO,CT,DC,DE,FL,FM,GA,GU,HI,IA,ID,IL,IN,KS,KY,LA,MA,MD,ME,MH,MI,MN,MO,MP,MS,MT,NC,ND,NE,NH,NJ,NM,NV,NY,OH,OK,OR,PA,PR,PW,RI,SC,SD,TN,TX,UT,VA,VI,VT,WA,WI,WV,WY,AE,AA,AP,NYC,GB,IRL,IE,UK,GB,FR",
          numList = "0,1,2,3,4,5,6,7,8,9",
          webList = "aero,asia,biz,cat,com,coop,edu,gov,info,int,jobs,mil,mobi,museum,name,net,org,pro,tel,travel,xxx",
          extList = "www",
          d       = "__DOT__",

          list = (topList+","+geoList+","+numList+","+extList).split(","),
          len  = list.length,
          i, lines;
        
        for (i=0;i<len;i++) {
            html = html.replace(new RegExp((" "+list[i]+"\\."), "g"), (" "+list[i]+d));
        }

        list = (mrsList+","+numList).split(",");
        len  = list.length;
        for (i=0;i<len;i++) {
            html = html.replace(new RegExp((list[i]+"\\."), "g"), (list[i]+d));
        }

        list = (webList).split(",");
        len  = list.length;
        for (i=0;i<len;i++) {
            html = html.replace(new RegExp(("\\."+list[i]), "g"), (d+list[i]));
        }

        lines = this.cleanArray(html.split('. '));
        return lines;
    },

    ordinal: function(n) {
        var sfx = ["th","st","nd","rd"], 
          val = n%100;
        return n + (sfx[(val-20)%10] || sfx[val] || sfx[0]);
    },

    lev: function(a, b) {
    /*  Get the Levenshtein distance - a measure of difference between two sequences */
        var m = a.length,
          n = b.length,
          r = [],
          c, o, i, j;
          
          r[0] = [];
        
        if (m < n) { c = a; a = b; b = c; o = m; m = n; n = o; }
        for (c = 0; c < n+1; c++) { r[0][c] = c; }
        for (i = 1; i < m+1; i++) {
            r[i] = [];
            r[i][0] = i;
            for (j=1; j<n+1; j++) {
                r[i][j] = this.smallest(r[i-1][j]+1, r[i][j-1]+1, r[i-1][j-1]+((a.charAt(i-1)===b.charAt(j-1))? 0 : 1));
            }
        }
        return r[m][n];
    },

    smallest: function(x,y,z) {
    /*  Return smallest of two values */
        if (x < y && x < z) { return x; }
        if (y < x && y < z) { return y; }
        return z;
    },

    rtrim: function(txt) {
    /*  Trim whitespace from right of string */
        return txt.replace(/\s+$/, "");
    },

    cleanArray: function(a){
    /*  Remove empty items from an array */
        var n = [],
          i;
        for (i = 0; i<a.length; i++){
            if (a[i] && a[i].replace(/ /g,'').length>0){ n.push(a[i]); }
        }
        return n;
    }

};
})(jQuery);;
