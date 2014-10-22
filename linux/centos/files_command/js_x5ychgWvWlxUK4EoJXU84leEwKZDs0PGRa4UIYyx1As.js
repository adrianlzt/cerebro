

ajq(document).ready(function () {
    rewriteContentLockAnchors();
    removeMarkdownUI();
    removeUsersFromGroupBlock();
    enableSubmitEval();
    moveNotificationsElement();
    insertMarkdownInsteadOfHtml();
    hideCommentWhileReply();
    accessStateMessage();
    setupListPageFiltering();
    initPageTemplateRadios();
    if (typeof window["Emphasis"] != "undefined"){
      window.Emphasis.init();
    }
    ifHashInUrl();



    if (ajq('body').hasClass('kcs_external')) {
      removeCommentsPagination();
    }

    /*
    if (ajq('#edit-title').length === 0) {
      ajq('#doc .content div.field-item').each(function() {
          text = ajq(this).html();
          text = text.replace(/<br>/g, "\n");
          var html = render(text);
          ajq(this).html(html);
        });
    }
    */

    /* Make knowledge landing page top section equal */
    ajq('#knowledge-links li').equalHeights();
    /* Make knowledge landing page blocks the same height */
    ajq('.landing-blocks .block-views .block-inner').equalHeights();

    // if we are replying to a private comment, autocheck the "mark as private" checkbox
    if(ajq('.comment').is('.reply.private')){
      ajq('#edit-field-kcs-private-comment-und').attr('checked', true);
    }

    // if we are adding a new solution, hide the dupe of field.
    var a = location.pathname.split("/");
    if ( a[3] == "add" || a[4] == "add" ) {
      ajq('#edit-field-dupe-of').hide();
    }

    /* disable video right-click save */
    ajq('video').bind("contextmenu", function(e) {
      e.preventDefault();
    });

    /* TODO: Needs to be officially moved to sidebar rather than view-header */
    if (ajq('#tax-rss-feed').length > 0) {
      ajq('#tax-rss-feed').detach().prependTo('#main-content');
    }

    ajq('.view-filters .views-submit-button, .list-filter-options .views-submit-button').find('input[type="submit"]').addClass('btn');


    ajq('#sidebar-toggle').click(function() {
      sidebar = ajq('aside#sidebar');
      toggleButton = ajq(this);
      if ( sidebar.hasClass('noshow') ) {
        sidebar.removeClass('noshow');
        toggleButton.addClass('icon-caret-right').removeClass('icon-caret-left').removeClass('noshow'); // >
      } else {
        sidebar.addClass('noshow');
        toggleButton.addClass('icon-caret-left').removeClass('icon-caret-right').addClass('noshow'); // <
      }
      return false;
    });

    /* Temp Page Add Fix */
    ajq('dl.node-type-list > dt > a[href="/node/add/page"]').eq('1').parent().hide().next('dd').hide();
    /* /End Temp Page Add Fix */

    initMomentDates();
    
  Drupal.behaviors.updateMomentJSDates = {
    attach: function(context,settings) {
      initMomentDates();
    }
  };
  Drupal.attachBehaviors('.moment_date');

});

ajq(window).resize(function() {
  /* Re-fire */
  /* Make knowledge landing page top section equal */
  ajq('#knowledge-links li').equalHeights();
  /* Make knowledge landing page blocks the same height */
  ajq('.landing-blocks .block-views .block-inner').equalHeights();
});

function hideCommentWhileReply() {
  if (ajq('#edit-comment-body').length !== 0) {
    var commentForm = ajq('#comment-form');
    var commentHeader = ajq('h2.title.comment-form');

    Drupal.behaviors.changeLinks = {
      attach: function(context,settings) {
        if (ajq('.comment-form:visible').length > 2) {
          commentHeader.hide();
          commentHeader.next('form.comment-form').hide();
          ajq('.comment-form a.ajaxCancel').click(function() {
              ajq('form.comment-form[action*="ajax"]').remove();
              commentHeader.show();
              commentHeader.next('form.comment-form').show();
          });

        } else {
          commentHeader.show();
          commentHeader.next('form.comment-form').show();
        }
      }
    };

    Drupal.attachBehaviors('li.comment-reply');
  }
}

function removeCommentsPagination() {
  var pager = ajq('#comments ul.pager');
  if (pager.length > 0) {
    ajq('#comments ul.pager').remove();
    fetchComments(1, 1);
  }
}

function fetchComments(pageNum, commentCount) {
  ajq('<div>').load('?page='+pageNum+' #comments', function() {
      var tmpDiv = ajq(this);
      var stop = false;

      if (ajq(tmpDiv).find('.pager-next').length === 0) {
        stop = true;
      }

      ajq('#comments h2.element-invisible').before(tmpDiv.find('div.comment').each(function() {
            var comment = ajq(this);
            comment.removeClass('even');
            comment.removeClass('odd');
            if (commentCount % 2) {
              comment.addClass('odd');
            } else {
              comment.addClass('even');
            }
            commentCount++;
      }));
      if (!stop && pageNum < 100) {
        pageNum++;
        fetchComments(pageNum, commentCount);
      }
  });
}

function insertMarkdownInsteadOfHtml() {
  // added check to skip markdown insert for page content type.
  if ((!ajq('form').hasClass('node-page-form') || !ajq('form').hasClass('node-product-form')) && ajq('#edit-field-kcs-img-files-und-ajax-wrapper').length !== 0) {
    setInterval(function() {
        var button = ajq('input.insert-button');
        var text = button.val();
        button.after('<input type="button" class="markdown-insert-button" value="'+text+'" />');
        button.remove();
      }, 250);


    ajq('.markdown-insert-button').live('click', function(e) {
        var insertButton = ajq(this);
        changeInsertButton(insertButton);
        return false;
      });
  }
}

function changeInsertButton(insertButton) {
  var tr = insertButton.parentsUntil('tr').parent();
  var link = tr.find('div.image-widget-data a');
  var i = tr.parent().children().index(tr);

  var alt = ajq('#edit-field-kcs-img-files-und-'+i+'-alt').val();
  if (alt === null || alt === "") {
    alt = link.html();
  }

  var title = ajq('#edit-field-kcs-img-files-und-'+i+'-title').val();
  if (title === null || title === "") {
    title = link.html();
  }

  var size = tr.find('select.insert-style option:selected').first().val();
  size = size.replace(/image_/, '');

  var path = link.attr('href');
  path = path.replace(/http.*?\/k/, '/k');
  if (size !== null && size !== '') {
    var newpath = path.replace(/\/sites\/default\/files\/images\//, '/sites/default/files/styles/'+size+'/public/images/');
    if (newpath !== null && newpath !== '') {
      path = newpath;
    }
  }

  Drupal.insert.insertIntoActiveEditor('!['+alt+']('+path+' "'+title+'")');
  return false;
}

function replaceImgTag(text) {
  text = text.replace(/&lt;img.*?href="(.*?)(&quot;)*".*?class="image-(.*?)".*?&gt;/g, "<img src=\"$1\" class=\"image-$3\" />");
  return text;
}

function render(text) {
  "use strict";
  var MarkEditShowDown, html, lineBreakInP, lineBreaksRemaining;
  MarkEditShowDown = new Attacklab.showdown.converter();
  if (typeof (text) !== 'undefined') {
    html =  MarkEditShowDown.makeHtml(text);
    html = html.replace(/\r/g, '');

    // Convert newlines to <br/> inside a <p>
    lineBreakInP = /(<p>(?:[\S\s](?!<\/p>))*)\n([\S\s]*?<\/p>)/g;
    lineBreaksRemaining = lineBreakInP.exec(html);

    while (lineBreaksRemaining !== null) {
      html = html.replace(lineBreakInP, '$1<br />$2');
      lineBreaksRemaining = lineBreakInP.exec(html);
    }
  }
  return html;
}

function moveNotificationsElement() {
  var move = ajq('.node-form #edit-notifications .fieldset-wrapper');
  ajq('.node-form #edit-notifications').remove();
  ajq('.node-form #edit-actions').before(move);

}

function enableSubmitEval() {
  ajq('.sqiEvaluationForm').click(function() {
    var checks = 0;
    ajq('.sqiEvaluationForm > div > div').each(function() {
        var inputs = ajq(this).find('input');
        checks += inputs.filter(':checked').length;
    });
    if(checks == 6) {
      ajq('.sqiEvaluationForm').find('input:submit').removeAttr('disabled');
    }
  });
}

function removeMarkdownUI() {
  var commentSelect = ajq('#edit-comment-body .form-type-select select');
  commentSelect.addClass('noDelete');
  //page content type - custom class (noHide) to show text format select
  var page_type = ajq('#page-node-form, #product-node-form .text-format-wrapper .form-type-select select');
  page_type.addClass('noHide');
  ajq('.form-type-select').each(function() {
      var wrapping_div = ajq(this);
      if (wrapping_div.find('select').length > 0) {
        var select = wrapping_div.find('select');
        if (select.find('option[value="markdown"]').length > 0) {
          if (select.hasClass('noDelete')) {
            wrapping_div.hide();
          }
          else if (select.hasClass('noHide')) {
            wrapping_div.hide();
            page_type.val('full_html');
          }
          else {
            wrapping_div.remove();
          }
        }
      }
    });
}

function removeUsersFromGroupBlock() {
  ajq("div#block-og-extras-group-info div.content div a.username").each(function(index) {
    if (index != 0) {
      ajq(this).parent().remove();
    }
  });
}

function rewriteContentLockAnchors() {
  var warning_div = ajq(".messages.warning");
  var anchors = warning_div.find('a');
  anchors.each(function() {
      var anchor = ajq(this);
      var href = anchor.attr('href');
      if (href.indexOf("content_lock/release") != -1) {
        anchor.attr('href', '#');
        anchor.click(function() {
            ajq.get(href);
            anchor.parent().remove();
            if (warning_div.find('a').length === 0) {
              warning_div.remove();
            }
          });
      }
    });
}

function setupListPageFiltering() {
  if (ajq('.list-page-view').length > 0) {

    var optionsDiv = ajq('#more-filter-options');
    var optionsToggleButton = ajq('#filter-options-toggle');
    optionsDiv.slideUp();
    optionsToggleButton.find('.less').hide();

    optionsToggleButton.find('span').bind('click', function() {
      if (ajq(this).hasClass('less')) {
        optionsDiv.slideUp('fast');
        optionsToggleButton.find('.less').hide();
        optionsToggleButton.find('.more').show();
      } else {
        optionsDiv.slideDown('fast');
        optionsToggleButton.find('.more').hide();
        optionsToggleButton.find('.less').show();
      }
    });

    var titleInput = ajq('#sidebar .list-filter-options #edit-title');
    setupInput(titleInput, false);

  }
}

/* SetupInput from Umbra Chrome */
function setupInput(element, activatable) {
  // Remove browsers autocomplete
  element.attr("autocomplete", "off");

  element.keyup(function(){
      if (element.val() === '') {
        // ensure that the close <a> is not visible when element is empty
        close.addClass('nodisplay');
      } else {
        // remove the display blocking class when a user starts typing
        close.removeClass('nodisplay');
      }
    });

  // Put the X/close anchor after the global search <input>
  var closeID = 'searchClose_' + element.attr('id');
  element.after('<a id="'+ closeID  +'" class="close nodisplay">Close</a>');

  var close = ajq('#' + closeID.replace(':', '\\:'));
  // close the autocomplete flyout when the user clicks close
  close.mousedown(function() {
      element.autocomplete("close");
      element.val('');
      close.addClass('nodisplay');
      element.focus();
    });

  element.focus(function() {
      // on focus add the active class and remove the input value (if it is Search)
      if (activatable) {
        element.addClass("active");
        if (element.val() == searchLabel) {
          element.val('');
        }
      }
    }).blur(function() {
        // on blur remove the active class and set an empty input value to Search
        if (element.val() === '') {
          if (activatable) {
            element.removeClass("active");
            element.val(searchLabel);
          }
          close.addClass('nodisplay');
        }
      });
}

function accessStateMessage() {
  if (ajq('#access-state-widget').length > 0) {
    var current = ajq('#access-state-widget input:radio[checked=checked]').val();
    // show the default message based on current set state
    ajq('#access-messages span.'+current).css("display", "block");
    // show hide messages based on which one's clicked
    ajq('input:radio').click(function() {
      var clicked = ajq(this).val();
      ajq('#access-messages span').css("display", "none");
      ajq('#access-messages span.'+clicked).css("display", "block");
    });
  }
}

function initPageTemplateRadios() {
  pageTemplateRadios = ajq('#edit-field-page-template div.form-type-radio');
    pageTemplateRadios.children('input:radio').each( function () {
      ajq(this).hide();
      if ( ajq(this).attr('checked') != 'undefined' && ajq(this).attr('checked') == 'checked' ) {
        ajq(this).siblings('label').addClass('selected');
        ajq(this).after('<span class="icon-check-alt" aria-hidden="true"></span>');
      }
    });
    pageTemplateRadios.children('label').click(function () {
      pageTemplateRadios.children('label').removeClass('selected');
      pageTemplateRadios.find('span.icon-check-alt').remove();
      ajq(this).addClass('selected');
      ajq(this).after('<span class="icon-check-alt" aria-hidden="true"></span>');
    });
}

function ifHashInUrl() {
    // if there's a hash at the end of the url
  if(window.location.hash) {
    var jump = window.location.hash;
    // Check to see if this has the "emphasis pattern"
    var emphasis = "#h[";
    if(jump.indexOf(emphasis) != -1){
      var ele = jump.substr(3).split(',')[0];
      // element is passed to jumpToElement function.
      jumpToElement(ele);
    }
    // Safari screws up the characters in the url
    // so we have to do a separate check
    if(ajq.browser.safari == true) {
      var emphasis = "#h%";
      if(jump.indexOf(emphasis) != -1){
        var ele = jump.substr(5).split(',')[0];
        // element is passed to jumpToElement function.
        jumpToElement(ele);
      }
    }
  }
}

function jumpToElement(ele) {
  // Cheap if check, could be better
  if(ele.length == 6) {
    // Determine the offset and jump the document to the element
    var pos = ajq('p[data-key="'+ele+'"]').offset();
    ajq(window).scrollTop(pos.top - 10);
  }
}

function initMomentDates() {
  var momentDates = ajq('.moment_date');
  if (momentDates.length > 0){
    chrometwo_require(['moment'], function(momentjs){
      defineMomentTranslations();
      var locale = getCookieValue('rh_locale');
      if (locale == '' || locale == 'undefined') {
        locale = 'en';
      }
      moment.lang(locale);
      momentDates.each(function() {
        var date_string = ajq(this).text();
        var momentDate = moment(date_string, "YYYY-MM-DDTHH:mm:ssZ");

        if (momentDate.isValid()){
          var date = new Date(date_string);

          var now = new Date();

          var date_text = '';

          //call setHours to take the time out of the comparison
          if(date.setHours(0,0,0,0) == now.setHours(0,0,0,0)) {
            //Date equals today's date
            date_text = momentDate.fromNow();
          }
          else {
            date_text = momentDate.zone(date_string).calendar();
          }
          
          var full_text = momentDate.format(momentDate.lang().calendar('sameElse', momentDate));

          ajq(this).prop('title', full_text);
          ajq(this).text(date_text);
        }
      });
    });
  }
}

function defineMomentTranslations(){
  moment.lang('ja', {
      relativeTime : {
          future: '%s に',
          past:   '%s 前に',
          s:  '秒',
          m:  '1 分',
          mm: '%d 分',
          h:  '1 時間',
          hh: '%d 時間',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[昨日の時刻:]HH:mm',
          sameDay : '[本日の時刻:]HH:mm',
          nextDay : '[明日の時刻:]HH:mm',
          lastWeek : 'dddd [時刻:]HH:mm',
          nextWeek : 'dddd [時刻:]HH:mm',
          sameElse : 'YYYY[年]MMMMD[日]Ah[時]mm[分に]'
      },
      weekdays : [
          '日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'
      ],
      months : [
          '1月', '2月', '3月', '4月', '5月', '6月', '7月',
          '8月', '9月', '10月', '11月', '12月'
      ],
      meridiem : function (hour, minute, isLowercase) {
          if (hour < 12) {
              return "午 前";
          } else {
              return "午 後";
          }
      }
  });

  moment.lang('de', {
      relativeTime : {
          future: 'In %s',
          past:   'Vor %s',
          s:  'Sekunden',
          m:  'eine Minute',
          mm: '%d Minuten',
          h:  'eine Stunde',
          hh: '%d Stunden',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[Gestern um] HH:mm',
          sameDay : '[Heute um] HH:mm',
          nextDay : '[Morgen um] HH:mm',
          lastWeek : 'dddd [um] HH:mm',
          nextWeek : 'dddd [um] HH:mm',
          sameElse : 'D. MMMM YYYY [um] HH:mm'
      },
      weekdays : [
          'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
      ],
      months : [
          'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli',
          'August', 'September', 'Oktober', 'November', 'Dezember'
      ]
  });

  moment.lang('es', {
      relativeTime : {
          future: 'en %s',
          past:   'hace %s',
          s:  'segundos',
          m:  'un minuto',
          mm: '%d minutos',
          h:  'una hora',
          hh: '%d horas',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[Ayer a las] HH:mm',
          sameDay : '[Hoy a las] HH:mm',
          nextDay : '[Mañana a las] HH:mm',
          lastWeek : 'dddd [a las] HH:mm',
          nextWeek : 'dddd [a las] HH:mm',
          sameElse : 'D [de] MMMM [de] YYYY [a las] HH:mm'
      },
      weekdays : [
          'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
      ],
      months : [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
          'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ]
  });

  moment.lang('fr', {
      relativeTime : {
          future: 'dans %s',
          past:   '%s auparavant',
          s:  'secondes',
          m:  'une minute',
          mm: '%d minutes',
          h:  'une heure',
          hh: '%d heures',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[Hier à] HH:mm',
          sameDay : '[Aujourd\'hui à] HH:mm',
          nextDay : '[Demain à] HH:mm',
          lastWeek : 'dddd [à] HH:mm',
          nextWeek : 'dddd [à] HH:mm',
          sameElse : 'D MMMM YYYY [à] HH[h]mm'
      },
      weekdays : [
          'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
      ],
      months : [
          'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
          'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ]
  });

  moment.lang('it', {
      relativeTime : {
          future: 'tra %s',
          past:   '%s fa',
          s:  'secondi',
          m:  'un minuto',
          mm: '%d minuti',
          h:  'un\'ora',
          hh: '%d ore',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[Ieri alle] HH:mm',
          sameDay : '[Oggi alle] HH:mm',
          nextDay : '[Domani alle] HH:mm',
          lastWeek : 'dddd [alle] HH:mm',
          nextWeek : 'dddd [alle] HH:mm',
          sameElse : 'D MMMM YYYY [alle] HH:mm'
      },
      weekdays : [
          'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'
      ],
      months : [
          'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio',
          'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
      ]
  });

  moment.lang('pt', {
      relativeTime : {
          future: 'em %s',
          past:   'em %s',
          s:  'segundos',
          m:  'um minuto',
          mm: '%d minutos',
          h:  'uma hora',
          hh: '%d horas',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[Ontem às] HH:mm',
          sameDay : '[Hoje às] HH:mm',
          nextDay : '[Amanhã às] HH:mm',
          lastWeek : 'dddd [às] HH:mm',
          nextWeek : 'dddd [às] HH:mm',
          sameElse : 'D [de] MMMM [de] YYYY [às] HH:mm'
      },
      weekdays : [
          'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
      ],
      months : [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
          'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ]
  });

  moment.lang('ko', {
      relativeTime : {
          future: '%s 후',
          past:   '%s 전',
          s:  '초',
          m:  '1분',
          mm: '%d분',
          h:  '1시간',
          hh: '%d시간',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : 'HH[시] mm[분] [어제]',
          sameDay : 'HH[시] mm[분] [오늘]',
          nextDay : 'HH[시] mm[분] [내일]',
          lastWeek : 'HH[시] mm[분] dddd',
          nextWeek : 'HH[시] mm[분] dddd',
          sameElse : 'HH[시] mm[분] YYYY[년] MMMM D[일]'
      },
      weekdays : [
          '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'
      ],
      months : [
          '1월', '2월', '3월', '4월', '5월', '6월', '7월',
          '8월', '9월', '10월', '11월', '12월'
      ]
  });

  moment.lang('zh_CN', {
      relativeTime : {
          future: '%s',
          past:   '%s 前',
          s:  '秒',
          m:  '1 分钟',
          mm: '%d 分钟',
          h:  '1 小时',
          hh: '%d 小时',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[昨天]HH:mm',
          sameDay : '[今天] LT',
          nextDay : '[明天] LT',
          lastWeek : 'dddd [在] LT',
          nextWeek : 'dddd [在] LT',
          sameElse : 'YYYY[年]MMMMD[日]HH:mm'
      },
      weekdays : [
          '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
      ],
      months : [
          '一月', '二月', '三月', '四月', '五月', '六月', '七月',
          '八月', '九月', '十月', '十一月', '十二月'
      ]
  });

  moment.lang('en', {
      relativeTime : {
          future: 'in %s',
          past:   '%s ago',
          s:  'seconds',
          m:  'a minute',
          mm: '%d minutes',
          h:  'an hour',
          hh: '%d hours',
          d:  'a day',
          dd: '%d days',
          M:  'a month',
          MM: '%d months',
          y:  'a year',
          yy: '%d years'
      },
      calendar : {
          lastDay : '[Yesterday at] LT',
          sameDay : '[Today at] LT',
          nextDay : '[Tomorrow at] LT',
          lastWeek : 'dddd [at] LT',
          nextWeek : 'dddd [at] LT',
          sameElse : 'MMMM D YYYY [at] h:mm A'
      },
      weekdays : [
          'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ],
      months : [
          'January', 'February', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October', 'November', 'December'
      ]
  });
}
;
//
// showdown.js -- A javascript port of Markdown.
//
// Copyright (c) 2007 John Fraser.
//
// Original Markdown Copyright (c) 2004-2005 John Gruber
//   <http://daringfireball.net/projects/markdown/>
//
// The full source distribution is at:
//
//				A A L
//				T C A
//				T K B
//
//   <http://www.attacklab.net/>
//

//
// Wherever possible, Showdown is a straight, line-by-line port
// of the Perl version of Markdown.
//
// This is not a normal parser design; it's basically just a
// series of string substitutions.  It's hard to read and
// maintain this way,  but keeping Showdown close to the original
// design makes it easier to port new features.
//
// More importantly, Showdown behaves like markdown.pl in most
// edge cases.  So web applications can do client-side preview
// in Javascript, and then build identical HTML on the server.
//
// This port needs the new RegExp functionality of ECMA 262,
// 3rd Edition (i.e. Javascript 1.5).  Most modern web browsers
// should do fine.  Even with the new regular expression features,
// We do a lot of work to emulate Perl's regex functionality.
// The tricky changes in this file mostly have the "attacklab:"
// label.  Major or self-explanatory changes don't.
//
// Smart diff tools like Araxis Merge will be able to match up
// this file with markdown.pl in a useful way.  A little tweaking
// helps: in a copy of markdown.pl, replace "#" with "//" and
// replace "$text" with "text".  Be sure to ignore whitespace
// and line endings.
//


//
// Showdown usage:
//
//   var text = "Markdown *rocks*.";
//
//   var converter = new Attacklab.showdown.converter();
//   var html = converter.makeHtml(text);
//
//   alert(html);
//
// Note: move the sample code to the bottom of this
// file before uncommenting it.
//


//
// Attacklab namespace
//
var Attacklab = Attacklab || {}

//
// Showdown namespace
//
Attacklab.showdown = Attacklab.showdown || {}

//
// converter
//
// Wraps all "globals" so that the only thing
// exposed is makeHtml().
//
Attacklab.showdown.converter = function() {

//
// Globals:
//

// Global hashes, used by various utility routines
var g_urls;
var g_titles;
var g_html_blocks;

// Used to track when we're inside an ordered or unordered list
// (see _ProcessListItems() for details):
var g_list_level = 0;


this.makeHtml = function(text) {
//
// Main function. The order in which other subs are called here is
// essential. Link and image substitutions need to happen before
// _EscapeSpecialCharsWithinTagAttributes(), so that any *'s or _'s in the <a>
// and <img> tags get encoded.
//

	// Clear the global hashes. If we don't clear these, you get conflicts
	// from other articles when generating a page which contains more than
	// one article (e.g. an index page that shows the N most recent
	// articles):
	g_urls = new Array();
	g_titles = new Array();
	g_html_blocks = new Array();

	// attacklab: Replace ~ with ~T
	// This lets us use tilde as an escape char to avoid md5 hashes
	// The choice of character is arbitray; anything that isn't
    // magic in Markdown will work.
	text = text.replace(/~/g,"~T");

	// attacklab: Replace $ with ~D
	// RegExp interprets $ as a special character
	// when it's in a replacement string
	text = text.replace(/\$/g,"~D");

	// Standardize line endings
	text = text.replace(/\r\n/g,"\n"); // DOS to Unix
	text = text.replace(/\r/g,"\n"); // Mac to Unix

	// Make sure text begins and ends with a couple of newlines:
	text = "\n\n" + text + "\n\n";

	// Convert all tabs to spaces.
	text = _Detab(text);

	// Strip any lines consisting only of spaces and tabs.
	// This makes subsequent regexen easier to write, because we can
	// match consecutive blank lines with /\n+/ instead of something
	// contorted like /[ \t]*\n+/ .
	text = text.replace(/^[ \t]+$/mg,"");

	// Turn block-level HTML blocks into hash entries
	text = _HashHTMLBlocks(text);

	// Strip link definitions, store in hashes.
	text = _StripLinkDefinitions(text);

	text = _RunBlockGamut(text);

	text = _UnescapeSpecialChars(text);

	// attacklab: Restore dollar signs
	text = text.replace(/~D/g,"$$");

	// attacklab: Restore tildes
	text = text.replace(/~T/g,"~");

	return text;
}

var _StripLinkDefinitions = function(text) {
//
// Strips link definitions from text, stores the URLs and titles in
// hash references.
//

	// Link defs are in the form: ^[id]: url "optional title"

	/*
		var text = text.replace(/
				^[ ]{0,3}\[(.+)\]:  // id = $1  attacklab: g_tab_width - 1
				  [ \t]*
				  \n?				// maybe *one* newline
				  [ \t]*
				<?(\S+?)>?			// url = $2
				  [ \t]*
				  \n?				// maybe one newline
				  [ \t]*
				(?:
				  (\n*)				// any lines skipped = $3 attacklab: lookbehind removed
				  ["(]
				  (.+?)				// title = $4
				  [")]
				  [ \t]*
				)?					// title is optional
				(?:\n+|$)
			  /gm,
			  function(){...});
	*/
	var text = text.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm,
		function (wholeMatch,m1,m2,m3,m4) {
			m1 = m1.toLowerCase();
			g_urls[m1] = _EncodeAmpsAndAngles(m2);  // Link IDs are case-insensitive
			if (m3) {
				// Oops, found blank lines, so it's not a title.
				// Put back the parenthetical statement we stole.
				return m3+m4;
			} else if (m4) {
				g_titles[m1] = m4.replace(/"/g,"&quot;");
			}
			
			// Completely remove the definition from the text
			return "";
		}
	);

	return text;
}

var _HashHTMLBlocks = function(text) {
	// attacklab: Double up blank lines to reduce lookaround
	text = text.replace(/\n/g,"\n\n");

	// Hashify HTML blocks:
	// We only want to do this for block-level HTML tags, such as headers,
	// lists, and tables. That's because we still want to wrap <p>s around
	// "paragraphs" that are wrapped in non-block-level tags, such as anchors,
	// phrase emphasis, and spans. The list of tags we're looking for is
	// hard-coded:
	var block_tags_a = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del"
	var block_tags_b = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math"

	// First, look for nested blocks, e.g.:
	//   <div>
	//     <div>
	//     tags for inner block must be indented.
	//     </div>
	//   </div>
	//
	// The outermost tags must start at the left margin for this to match, and
	// the inner nested divs must be indented.
	// We need to do this before the next, more liberal match, because the next
	// match will start at the first `<div>` and stop at the first `</div>`.

	// attacklab: This regex can be expensive when it fails.
	/*
		var text = text.replace(/
		(						// save in $1
			^					// start of line  (with /m)
			<($block_tags_a)	// start tag = $2
			\b					// word break
								// attacklab: hack around khtml/pcre bug...
			[^\r]*?\n			// any number of lines, minimally matching
			</\2>				// the matching end tag
			[ \t]*				// trailing spaces/tabs
			(?=\n+)				// followed by a newline
		)						// attacklab: there are sentinel newlines at end of document
		/gm,function(){...}};
	*/
	text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,hashElement);

	//
	// Now match more liberally, simply from `\n<tag>` to `</tag>\n`
	//

	/*
		var text = text.replace(/
		(						// save in $1
			^					// start of line  (with /m)
			<($block_tags_b)	// start tag = $2
			\b					// word break
								// attacklab: hack around khtml/pcre bug...
			[^\r]*?				// any number of lines, minimally matching
			.*</\2>				// the matching end tag
			[ \t]*				// trailing spaces/tabs
			(?=\n+)				// followed by a newline
		)						// attacklab: there are sentinel newlines at end of document
		/gm,function(){...}};
	*/
	text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,hashElement);

	// Special case just for <hr />. It was easier to make a special case than
	// to make the other regex more complicated.  

	/*
		text = text.replace(/
		(						// save in $1
			\n\n				// Starting after a blank line
			[ ]{0,3}
			(<(hr)				// start tag = $2
			\b					// word break
			([^<>])*?			// 
			\/?>)				// the matching end tag
			[ \t]*
			(?=\n{2,})			// followed by a blank line
		)
		/g,hashElement);
	*/
	text = text.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,hashElement);

	// Special case for standalone HTML comments:

	/*
		text = text.replace(/
		(						// save in $1
			\n\n				// Starting after a blank line
			[ ]{0,3}			// attacklab: g_tab_width - 1
			<!
			(--[^\r]*?--\s*)+
			>
			[ \t]*
			(?=\n{2,})			// followed by a blank line
		)
		/g,hashElement);
	*/
	text = text.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,hashElement);

	// PHP and ASP-style processor instructions (<?...?> and <%...%>)

	/*
		text = text.replace(/
		(?:
			\n\n				// Starting after a blank line
		)
		(						// save in $1
			[ ]{0,3}			// attacklab: g_tab_width - 1
			(?:
				<([?%])			// $2
				[^\r]*?
				\2>
			)
			[ \t]*
			(?=\n{2,})			// followed by a blank line
		)
		/g,hashElement);
	*/
	text = text.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,hashElement);

	// attacklab: Undo double lines (see comment at top of this function)
	text = text.replace(/\n\n/g,"\n");
	return text;
}

var hashElement = function(wholeMatch,m1) {
	var blockText = m1;

	// Undo double lines
	blockText = blockText.replace(/\n\n/g,"\n");
	blockText = blockText.replace(/^\n/,"");
	
	// strip trailing blank lines
	blockText = blockText.replace(/\n+$/g,"");
	
	// Replace the element text with a marker ("~KxK" where x is its key)
	blockText = "\n\n~K" + (g_html_blocks.push(blockText)-1) + "K\n\n";
	
	return blockText;
};

var _RunBlockGamut = function(text) {
//
// These are all the transformations that form block-level
// tags like paragraphs, headers, and list items.
//
	text = _DoHeaders(text);

	// Do Horizontal Rules:
	var key = hashBlock("<hr />");
	text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,key);
	text = text.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm,key);
	text = text.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm,key);

	text = _DoLists(text);
	text = _DoCodeBlocks(text);
	text = _DoBlockQuotes(text);

	// We already ran _HashHTMLBlocks() before, in Markdown(), but that
	// was to escape raw HTML in the original Markdown source. This time,
	// we're escaping the markup we've just created, so that we don't wrap
	// <p> tags around block-level tags.
	text = _HashHTMLBlocks(text);
	text = _FormParagraphs(text);

	return text;
}


var _RunSpanGamut = function(text) {
//
// These are all the transformations that occur *within* block-level
// tags like paragraphs, headers, and list items.
//

	text = _DoCodeSpans(text);
	text = _EscapeSpecialCharsWithinTagAttributes(text);
	text = _EncodeBackslashEscapes(text);

	// Process anchor and image tags. Images must come first,
	// because ![foo][f] looks like an anchor.
	text = _DoImages(text);
	text = _DoAnchors(text);

	// Make links out of things like `<http://example.com/>`
	// Must come after _DoAnchors(), because you can use < and >
	// delimiters in inline links like [this](<url>).
	text = _DoAutoLinks(text);
	text = _EncodeAmpsAndAngles(text);
	text = _DoItalicsAndBold(text);

	// Do hard breaks:
	text = text.replace(/  +\n/g," <br />\n");

	return text;
}

var _EscapeSpecialCharsWithinTagAttributes = function(text) {
//
// Within tags -- meaning between < and > -- encode [\ ` * _] so they
// don't conflict with their use in Markdown for code, italics and strong.
//

	// Build a regex to find HTML tags and comments.  See Friedl's 
	// "Mastering Regular Expressions", 2nd Ed., pp. 200-201.
	var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;

	text = text.replace(regex, function(wholeMatch) {
		var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g,"$1`");
		tag = escapeCharacters(tag,"\\`*_");
		return tag;
	});

	return text;
}

var _DoAnchors = function(text) {
//
// Turn Markdown link shortcuts into XHTML <a> tags.
//
	//
	// First, handle reference-style links: [link text] [id]
	//

	/*
		text = text.replace(/
		(							// wrap whole match in $1
			\[
			(
				(?:
					\[[^\]]*\]		// allow brackets nested one level
					|
					[^\[]			// or anything else
				)*
			)
			\]

			[ ]?					// one optional space
			(?:\n[ ]*)?				// one optional newline followed by spaces

			\[
			(.*?)					// id = $3
			\]
		)()()()()					// pad remaining backreferences
		/g,_DoAnchors_callback);
	*/
	text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,writeAnchorTag);

	//
	// Next, inline-style links: [link text](url "optional title")
	//

	/*
		text = text.replace(/
			(						// wrap whole match in $1
				\[
				(
					(?:
						\[[^\]]*\]	// allow brackets nested one level
					|
					[^\[\]]			// or anything else
				)
			)
			\]
			\(						// literal paren
			[ \t]*
			()						// no id, so leave $3 empty
			<?(.*?)>?				// href = $4
			[ \t]*
			(						// $5
				(['"])				// quote char = $6
				(.*?)				// Title = $7
				\6					// matching quote
				[ \t]*				// ignore any spaces/tabs between closing quote and )
			)?						// title is optional
			\)
		)
		/g,writeAnchorTag);
	*/
	text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,writeAnchorTag);

	//
	// Last, handle reference-style shortcuts: [link text]
	// These must come last in case you've also got [link test][1]
	// or [link test](/foo)
	//

	/*
		text = text.replace(/
		(		 					// wrap whole match in $1
			\[
			([^\[\]]+)				// link text = $2; can't contain '[' or ']'
			\]
		)()()()()()					// pad rest of backreferences
		/g, writeAnchorTag);
	*/
	text = text.replace(/(\[([^\[\]]+)\])()()()()()/g, writeAnchorTag);

	return text;
}

var writeAnchorTag = function(wholeMatch,m1,m2,m3,m4,m5,m6,m7) {
	if (m7 == undefined) m7 = "";
	var whole_match = m1;
	var link_text   = m2;
	var link_id	 = m3.toLowerCase();
	var url		= m4;
	var title	= m7;
	
	if (url == "") {
		if (link_id == "") {
			// lower-case and turn embedded newlines into spaces
			link_id = link_text.toLowerCase().replace(/ ?\n/g," ");
		}
		url = "#"+link_id;
		
		if (g_urls[link_id] != undefined) {
			url = g_urls[link_id];
			if (g_titles[link_id] != undefined) {
				title = g_titles[link_id];
			}
		}
		else {
			if (whole_match.search(/\(\s*\)$/m)>-1) {
				// Special case for explicit empty url
				url = "";
			} else {
				return whole_match;
			}
		}
	}	
	
	url = escapeCharacters(url,"*_");
	var result = "<a href=\"" + url + "\"";
	
	if (title != "") {
		title = title.replace(/"/g,"&quot;");
		title = escapeCharacters(title,"*_");
		result +=  " title=\"" + title + "\"";
	}
	
	result += ">" + link_text + "</a>";
	
	return result;
}


var _DoImages = function(text) {
//
// Turn Markdown image shortcuts into <img> tags.
//

	//
	// First, handle reference-style labeled images: ![alt text][id]
	//

	/*
		text = text.replace(/
		(						// wrap whole match in $1
			!\[
			(.*?)				// alt text = $2
			\]

			[ ]?				// one optional space
			(?:\n[ ]*)?			// one optional newline followed by spaces

			\[
			(.*?)				// id = $3
			\]
		)()()()()				// pad rest of backreferences
		/g,writeImageTag);
	*/
	text = text.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,writeImageTag);

	//
	// Next, handle inline images:  ![alt text](url "optional title")
	// Don't forget: encode * and _

	/*
		text = text.replace(/
		(						// wrap whole match in $1
			!\[
			(.*?)				// alt text = $2
			\]
			\s?					// One optional whitespace character
			\(					// literal paren
			[ \t]*
			()					// no id, so leave $3 empty
			<?(\S+?)>?			// src url = $4
			[ \t]*
			(					// $5
				(['"])			// quote char = $6
				(.*?)			// title = $7
				\6				// matching quote
				[ \t]*
			)?					// title is optional
		\)
		)
		/g,writeImageTag);
	*/
	text = text.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,writeImageTag);

	return text;
}

var writeImageTag = function(wholeMatch,m1,m2,m3,m4,m5,m6,m7) {
	var whole_match = m1;
	var alt_text   = m2;
	var link_id	 = m3.toLowerCase();
	var url		= m4;
	var title	= m7;

	if (!title) title = "";
	
	if (url == "") {
		if (link_id == "") {
			// lower-case and turn embedded newlines into spaces
			link_id = alt_text.toLowerCase().replace(/ ?\n/g," ");
		}
		url = "#"+link_id;
		
		if (g_urls[link_id] != undefined) {
			url = g_urls[link_id];
			if (g_titles[link_id] != undefined) {
				title = g_titles[link_id];
			}
		}
		else {
			return whole_match;
		}
	}	
	
	alt_text = alt_text.replace(/"/g,"&quot;");
	url = escapeCharacters(url,"*_");
	var result = "<img src=\"" + url + "\" alt=\"" + alt_text + "\"";

	// attacklab: Markdown.pl adds empty title attributes to images.
	// Replicate this bug.

	//if (title != "") {
		title = title.replace(/"/g,"&quot;");
		title = escapeCharacters(title,"*_");
		result +=  " title=\"" + title + "\"";
	//}
	
	result += " />";
	
	return result;
}


var _DoHeaders = function(text) {

	// Setext-style headers:
	//	Header 1
	//	========
	//  
	//	Header 2
	//	--------
	//
	text = text.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,
		function(wholeMatch,m1){return hashBlock("<h1>" + _RunSpanGamut(m1) + "</h1>");});

	text = text.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,
		function(matchFound,m1){return hashBlock("<h2>" + _RunSpanGamut(m1) + "</h2>");});

	// atx-style headers:
	//  # Header 1
	//  ## Header 2
	//  ## Header 2 with closing hashes ##
	//  ...
	//  ###### Header 6
	//

	/*
		text = text.replace(/
			^(\#{1,6})				// $1 = string of #'s
			[ \t]*
			(.+?)					// $2 = Header text
			[ \t]*
			\#*						// optional closing #'s (not counted)
			\n+
		/gm, function() {...});
	*/

	text = text.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,
		function(wholeMatch,m1,m2) {
			var h_level = m1.length;
			if (m2.indexOf('{#') != -1) {
				var id = m2.replace(/.*?\{#(.*?)\}/gm, '$1');
				var inner = m2.replace(/(.*?)##*.*/, '$1');
				return hashBlock("<h" + h_level + " id=\""+id+"\">" + _RunSpanGamut(inner) + "</h" + h_level + ">");
			}
			return hashBlock("<h" + h_level + ">" + _RunSpanGamut(m2) + "</h" + h_level + ">");
		});

	return text;
}

// This declaration keeps Dojo compressor from outputting garbage:
var _ProcessListItems;

var _DoLists = function(text) {
//
// Form HTML ordered (numbered) and unordered (bulleted) lists.
//

	// attacklab: add sentinel to hack around khtml/safari bug:
	// http://bugs.webkit.org/show_bug.cgi?id=11231
	text += "~0";

	// Re-usable pattern to match any entirel ul or ol list:

	/*
		var whole_list = /
		(									// $1 = whole list
			(								// $2
				[ ]{0,3}					// attacklab: g_tab_width - 1
				([*+-]|\d+[.])				// $3 = first list item marker
				[ \t]+
			)
			[^\r]+?
			(								// $4
				~0							// sentinel for workaround; should be $
			|
				\n{2,}
				(?=\S)
				(?!							// Negative lookahead for another list item marker
					[ \t]*
					(?:[*+-]|\d+[.])[ \t]+
				)
			)
		)/g
	*/
	var whole_list = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;

	if (g_list_level) {
		text = text.replace(whole_list,function(wholeMatch,m1,m2) {
			var list = m1;
			var list_type = (m2.search(/[*+-]/g)>-1) ? "ul" : "ol";

			// Turn double returns into triple returns, so that we can make a
			// paragraph for the last item in a list, if necessary:
			list = list.replace(/\n{2,}/g,"\n\n\n");;
			var result = _ProcessListItems(list);
	
			// Trim any trailing whitespace, to put the closing `</$list_type>`
			// up on the preceding line, to get it past the current stupid
			// HTML block parser. This is a hack to work around the terrible
			// hack that is the HTML block parser.
			result = result.replace(/\s+$/,"");
			result = "<"+list_type+">" + result + "</"+list_type+">\n";
			return result;
		});
	} else {
		whole_list = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;
		text = text.replace(whole_list,function(wholeMatch,m1,m2,m3) {
			var runup = m1;
			var list = m2;

			var list_type = (m3.search(/[*+-]/g)>-1) ? "ul" : "ol";
			// Turn double returns into triple returns, so that we can make a
			// paragraph for the last item in a list, if necessary:
			var list = list.replace(/\n{2,}/g,"\n\n\n");;
			var result = _ProcessListItems(list);
			result = runup + "<"+list_type+">\n" + result + "</"+list_type+">\n";	
			return result;
		});
	}

	// attacklab: strip sentinel
	text = text.replace(/~0/,"");

	return text;
}

_ProcessListItems = function(list_str) {
//
//  Process the contents of a single ordered or unordered list, splitting it
//  into individual list items.
//
	// The $g_list_level global keeps track of when we're inside a list.
	// Each time we enter a list, we increment it; when we leave a list,
	// we decrement. If it's zero, we're not in a list anymore.
	//
	// We do this because when we're not inside a list, we want to treat
	// something like this:
	//
	//    I recommend upgrading to version
	//    8. Oops, now this line is treated
	//    as a sub-list.
	//
	// As a single paragraph, despite the fact that the second line starts
	// with a digit-period-space sequence.
	//
	// Whereas when we're inside a list (or sub-list), that line will be
	// treated as the start of a sub-list. What a kludge, huh? This is
	// an aspect of Markdown's syntax that's hard to parse perfectly
	// without resorting to mind-reading. Perhaps the solution is to
	// change the syntax rules such that sub-lists must start with a
	// starting cardinal number; e.g. "1." or "a.".

	g_list_level++;

	// trim trailing blank lines:
	list_str = list_str.replace(/\n{2,}$/,"\n");

	// attacklab: add sentinel to emulate \z
	list_str += "~0";

	/*
		list_str = list_str.replace(/
			(\n)?							// leading line = $1
			(^[ \t]*)						// leading whitespace = $2
			([*+-]|\d+[.]) [ \t]+			// list marker = $3
			([^\r]+?						// list item text   = $4
			(\n{1,2}))
			(?= \n* (~0 | \2 ([*+-]|\d+[.]) [ \t]+))
		/gm, function(){...});
	*/
	list_str = list_str.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,
		function(wholeMatch,m1,m2,m3,m4){
			var item = m4;
			var leading_line = m1;
			var leading_space = m2;

			if (leading_line || (item.search(/\n{2,}/)>-1)) {
				item = _RunBlockGamut(_Outdent(item));
			}
			else {
				// Recursion for sub-lists:
				item = _DoLists(_Outdent(item));
				item = item.replace(/\n$/,""); // chomp(item)
				item = _RunSpanGamut(item);
			}

			return  "<li>" + item + "</li>\n";
		}
	);

	// attacklab: strip sentinel
	list_str = list_str.replace(/~0/g,"");

	g_list_level--;
	return list_str;
}


var _DoCodeBlocks = function(text) {
//
//  Process Markdown `<pre><code>` blocks.
//  

	/*
		text = text.replace(text,
			/(?:\n\n|^)
			(								// $1 = the code block -- one or more lines, starting with a space/tab
				(?:
					(?:[ ]{4}|\t)			// Lines must start with a tab or a tab-width of spaces - attacklab: g_tab_width
					.*\n+
				)+
			)
			(\n*[ ]{0,3}[^ \t\n]|(?=~0))	// attacklab: g_tab_width
		/g,function(){...});
	*/

	// attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
	text += "~0";
	
	text = text.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,
		function(wholeMatch,m1,m2) {
			var codeblock = m1;
			var nextChar = m2;
		
			codeblock = _EncodeCode( _Outdent(codeblock));
			codeblock = _Detab(codeblock);
			codeblock = codeblock.replace(/^\n+/g,""); // trim leading newlines
			codeblock = codeblock.replace(/\n+$/g,""); // trim trailing whitespace

			codeblock = "<pre><code>" + codeblock + "\n</code></pre>";

			return hashBlock(codeblock) + nextChar;
		}
	);

	// attacklab: strip sentinel
	text = text.replace(/~0/,"");

	return text;
}

var hashBlock = function(text) {
	text = text.replace(/(^\n+|\n+$)/g,"");
	return "\n\n~K" + (g_html_blocks.push(text)-1) + "K\n\n";
}


var _DoCodeSpans = function(text) {
//
//   *  Backtick quotes are used for <code></code> spans.
// 
//   *  You can use multiple backticks as the delimiters if you want to
//	 include literal backticks in the code span. So, this input:
//	 
//		 Just type ``foo `bar` baz`` at the prompt.
//	 
//	   Will translate to:
//	 
//		 <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
//	 
//	There's no arbitrary limit to the number of backticks you
//	can use as delimters. If you need three consecutive backticks
//	in your code, use four for delimiters, etc.
//
//  *  You can use spaces to get literal backticks at the edges:
//	 
//		 ... type `` `bar` `` ...
//	 
//	   Turns to:
//	 
//		 ... type <code>`bar`</code> ...
//

	/*
		text = text.replace(/
			(^|[^\\])					// Character before opening ` can't be a backslash
			(`+)						// $2 = Opening run of `
			(							// $3 = The code block
				[^\r]*?
				[^`]					// attacklab: work around lack of lookbehind
			)
			\2							// Matching closer
			(?!`)
		/gm, function(){...});
	*/

	text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
		function(wholeMatch,m1,m2,m3,m4) {
			var c = m3;
			c = c.replace(/^([ \t]*)/g,"");	// leading whitespace
			c = c.replace(/[ \t]*$/g,"");	// trailing whitespace
			c = _EncodeCode(c);
			return m1+"<code>"+c+"</code>";
		});

	return text;
}


var _EncodeCode = function(text) {
//
// Encode/escape certain characters inside Markdown code runs.
// The point is that in code, these characters are literals,
// and lose their special Markdown meanings.
//
	// Encode all ampersands; HTML entities are not
	// entities within a Markdown code span.
	text = text.replace(/&/g,"&amp;");

	// Do the angle bracket song and dance:
	text = text.replace(/</g,"&lt;");
	text = text.replace(/>/g,"&gt;");

	// Now, escape characters that are magic in Markdown:
	text = escapeCharacters(text,"\*_{}[]\\",false);

// jj the line above breaks this:
//---

//* Item

//   1. Subitem

//            special char: *
//---

	return text;
}


var _DoItalicsAndBold = function(text) {

	// <strong> must go first:
	text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\1/g,
		"<strong>$2</strong>");

	text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,
		"<em>$2</em>");

	return text;
}


var _DoBlockQuotes = function(text) {

	/*
		text = text.replace(/
		(								// Wrap whole match in $1
			(
				^[ \t]*>[ \t]?			// '>' at the start of a line
				.+\n					// rest of the first line
				(.+\n)*					// subsequent consecutive lines
				\n*						// blanks
			)+
		)
		/gm, function(){...});
	*/

	text = text.replace(/((^[ \t]*&gt;[ \t]?.+\n(.+\n)*\n*)+)/gm,
		function(wholeMatch,m1) {
			var bq = m1;

			// attacklab: hack around Konqueror 3.5.4 bug:
			// "----------bug".replace(/^-/g,"") == "bug"

			bq = bq.replace(/^[ \t]*&gt;[ \t]?/gm,"~0");	// trim one level of quoting

			// attacklab: clean up hack
			bq = bq.replace(/~0/g,"");

			bq = bq.replace(/^[ \t]+$/gm,"");		// trim whitespace-only lines
			bq = _RunBlockGamut(bq);				// recurse
			
			bq = bq.replace(/(^|\n)/g,"$1  ");
			// These leading spaces screw with <pre> content, so we need to fix that:
			bq = bq.replace(
					/(\s*<pre>[^\r]+?<\/pre>)/gm,
				function(wholeMatch,m1) {
					var pre = m1;
					// attacklab: hack around Konqueror 3.5.4 bug:
					pre = pre.replace(/^  /mg,"~0");
					pre = pre.replace(/~0/g,"");
					return pre;
				});
			
			return hashBlock("<blockquote>\n" + bq + "\n</blockquote>");
		});
	return text;
}


var _FormParagraphs = function(text) {
//
//  Params:
//    $text - string to process with html <p> tags
//

	// Strip leading and trailing lines:
	text = text.replace(/^\n+/g,"");
	text = text.replace(/\n+$/g,"");

	var grafs = text.split(/\n{2,}/g);
	var grafsOut = new Array();

	//
	// Wrap <p> tags.
	//
	var end = grafs.length;
	for (var i=0; i<end; i++) {
		var str = grafs[i];

		// if this is an HTML marker, copy it
		if (str.search(/~K(\d+)K/g) >= 0) {
			grafsOut.push(str);
		}
		else if (str.search(/\S/) >= 0) {
			str = _RunSpanGamut(str);
			str = str.replace(/^([ \t]*)/g,"<p>");
			str += "</p>"
			grafsOut.push(str);
		}

	}

	//
	// Unhashify HTML blocks
	//
	end = grafsOut.length;
	for (var i=0; i<end; i++) {
		// if this is a marker for an html block...
		while (grafsOut[i].search(/~K(\d+)K/) >= 0) {
			var blockText = g_html_blocks[RegExp.$1];
			blockText = blockText.replace(/\$/g,"$$$$"); // Escape any dollar signs
			grafsOut[i] = grafsOut[i].replace(/~K\d+K/,blockText);
		}
	}

	return grafsOut.join("\n\n");
}


var _EncodeAmpsAndAngles = function(text) {
// Smart processing for ampersands and angle brackets that need to be encoded.
	
	// Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
	//   http://bumppo.net/projects/amputator/
	text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;");
	
	// Encode naked <'s
	text = text.replace(/<(?![a-z\/?\$!])/gi,"&lt;");
	
	return text;
}


var _EncodeBackslashEscapes = function(text) {
//
//   Parameter:  String.
//   Returns:	The string, with after processing the following backslash
//			   escape sequences.
//

	// attacklab: The polite way to do this is with the new
	// escapeCharacters() function:
	//
	// 	text = escapeCharacters(text,"\\",true);
	// 	text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);
	//
	// ...but we're sidestepping its use of the (slow) RegExp constructor
	// as an optimization for Firefox.  This function gets called a LOT.

	text = text.replace(/\\(\\)/g,escapeCharacters_callback);
	text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g,escapeCharacters_callback);
	return text;
}


var _DoAutoLinks = function(text) {

	text = text.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,"<a href=\"$1\">$1</a>");

	// Email addresses: <address@domain.foo>

	/*
		text = text.replace(/
			<
			(?:mailto:)?
			(
				[-.\w]+
				\@
				[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+
			)
			>
		/gi, _DoAutoLinks_callback());
	*/
	text = text.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,
		function(wholeMatch,m1) {
			return _EncodeEmailAddress( _UnescapeSpecialChars(m1) );
		}
	);

	return text;
}


var _EncodeEmailAddress = function(addr) {
//
//  Input: an email address, e.g. "foo@example.com"
//
//  Output: the email address as a mailto link, with each character
//	of the address encoded as either a decimal or hex entity, in
//	the hopes of foiling most address harvesting spam bots. E.g.:
//
//	<a href="&#x6D;&#97;&#105;&#108;&#x74;&#111;:&#102;&#111;&#111;&#64;&#101;
//	   x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;">&#102;&#111;&#111;
//	   &#64;&#101;x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;</a>
//
//  Based on a filter by Matthew Wickline, posted to the BBEdit-Talk
//  mailing list: <http://tinyurl.com/yu7ue>
//

	// attacklab: why can't javascript speak hex?
	function char2hex(ch) {
		var hexDigits = '0123456789ABCDEF';
		var dec = ch.charCodeAt(0);
		return(hexDigits.charAt(dec>>4) + hexDigits.charAt(dec&15));
	}

	var encode = [
		function(ch){return "&#"+ch.charCodeAt(0)+";";},
		function(ch){return "&#x"+char2hex(ch)+";";},
		function(ch){return ch;}
	];

	addr = "mailto:" + addr;

	addr = addr.replace(/./g, function(ch) {
		if (ch == "@") {
		   	// this *must* be encoded. I insist.
			ch = encode[Math.floor(Math.random()*2)](ch);
		} else if (ch !=":") {
			// leave ':' alone (to spot mailto: later)
			var r = Math.random();
			// roughly 10% raw, 45% hex, 45% dec
			ch =  (
					r > .9  ?	encode[2](ch)   :
					r > .45 ?	encode[1](ch)   :
								encode[0](ch)
				);
		}
		return ch;
	});

	addr = "<a href=\"" + addr + "\">" + addr + "</a>";
	addr = addr.replace(/">.+:/g,"\">"); // strip the mailto: from the visible part

	return addr;
}


var _UnescapeSpecialChars = function(text) {
//
// Swap back in all the special characters we've hidden.
//
	text = text.replace(/~E(\d+)E/g,
		function(wholeMatch,m1) {
			var charCodeToReplace = parseInt(m1);
			return String.fromCharCode(charCodeToReplace);
		}
	);
	return text;
}


var _Outdent = function(text) {
//
// Remove one level of line-leading tabs or spaces
//

	// attacklab: hack around Konqueror 3.5.4 bug:
	// "----------bug".replace(/^-/g,"") == "bug"

	text = text.replace(/^(\t|[ ]{1,4})/gm,"~0"); // attacklab: g_tab_width

	// attacklab: clean up hack
	text = text.replace(/~0/g,"")

	return text;
}

var _Detab = function(text) {
// attacklab: Detab's completely rewritten for speed.
// In perl we could fix it by anchoring the regexp with \G.
// In javascript we're less fortunate.

	// expand first n-1 tabs
	text = text.replace(/\t(?=\t)/g,"    "); // attacklab: g_tab_width

	// replace the nth with two sentinels
	text = text.replace(/\t/g,"~A~B");

	// use the sentinel to anchor our regex so it doesn't explode
	text = text.replace(/~B(.+?)~A/g,
		function(wholeMatch,m1,m2) {
			var leadingText = m1;
			var numSpaces = 4 - leadingText.length % 4;  // attacklab: g_tab_width

			// there *must* be a better way to do this:
			for (var i=0; i<numSpaces; i++) leadingText+=" ";

			return leadingText;
		}
	);

	// clean up sentinels
	text = text.replace(/~A/g,"    ");  // attacklab: g_tab_width
	text = text.replace(/~B/g,"");

	return text;
}


//
//  attacklab: Utility functions
//


var escapeCharacters = function(text, charsToEscape, afterBackslash) {
	// First we have to escape the escape characters so that
	// we can build a character class out of them
	var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g,"\\$1") + "])";

	if (afterBackslash) {
		regexString = "\\\\" + regexString;
	}

	var regex = new RegExp(regexString,"g");
	text = text.replace(regex,escapeCharacters_callback);

	return text;
}


var escapeCharacters_callback = function(wholeMatch,m1) {
	var charCodeToEscape = m1.charCodeAt(0);
	return "~E"+charCodeToEscape+"E";
}

} // end of Attacklab.showdown.converter


// Version 0.9 used the Showdown namespace instead of Attacklab.showdown
// The old namespace is deprecated, but we'll support it for now:
var Showdown = Attacklab.showdown;

// If anyone's interested, tell the world that this file's been loaded
if (Attacklab.fileLoaded) {
	Attacklab.fileLoaded("showdown.js");
}
;
ajq(document).ready(function () {
	// this should be bullet proof, but I will try/catch just for _extra_ safety... thinking of etowns
	try {
		if (Drupal.portal.currentUser.isInternal) {
				do_it();
		}
	} catch (err) {
	}
});

function do_it() {
	// short circut as to not display on edit pages
	if (document.location.href.indexOf("edit") != -1) {
		return;
	}

	var host = 'https://metrics.gss.redhat.com/';
	var URL = host + '/app/kbase/tickets_connected_to_this_solution.pl';
	var nodeHref = ajq('link[rel="canonical"]').attr('href');
	var nid = null;
	if (nodeHref !== null) {
		if (nodeHref.indexOf('solution') != -1) {
			nid = nodeHref.split('/')[3];
			if (nid === 'solutions' || nid === 'node') {
				nid = nodeHref.split('/')[4];
			}
		}
	}


	if (nid != null) {
		ajq.getJSON(URL + '?jsoncallback=?', {
			doc_id: nid
		}, function(data) {
			var sideBar = ajq('#sidebar div.region-sidebar-second div.section');
			if (data.system_id_array.length > 0) {
				var content = '<ul id="solutionCaseLinks">';

				for (var i = 0; i < data.system_id_array.length; i++) {
					content += '<li>';
					content += '<a href="'+data.ticket_url_array[i]+'">';
					content += data.system_id_array[i];
					content += '</a>';
					content += ' - ' + data.linked_by_array[i];
					content += '</li>';
				}

				content += '</ul>';
				sideBar.append('<div id="case-links" class="block"><h2 class="block-title">Case links (Internal)</h2><p class="caseLinksNote">Note: this information is only visible to Red Hat associates</p><div class="content">'+content+'</div></div>');
			}
		});
	}
}
;
