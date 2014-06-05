function OnlyDigitsInput(event){
    if (!(event.keyCode > 47 && event.keyCode < 58) && !(event.keyCode > 95  && event.keyCode < 106) &&  !(event.keyCode == 13 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39))
        return false;

    return true;
}

function onlyDigits(str){
    str = String(str).replace(/[^\d\.]/g, '');
    str = parseFloat(str);
    str = Math.round(str*100)/100;
    return str;
}

function formatPrice(str){
    str+='';
    return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

function changeCheckboxAction(){
    $('.js_ch_box').each( function(){ changeCheckStart($(this)) });

    $('.js_ch_box').on({
        mousedown: function(){ changeCheck($(this)) },
        mouseover: function(){ $(this).closest('.js_ch_box_area').addClass('hovered'); },
        mouseleave: function(){ $(this).closest('.js_ch_box_area').removeClass('hovered'); }
    });

    $('.js_ch_box_area label').on({
        click: function(event){ changeCheck($(this).closest('.js_ch_box_area').find('.js_ch_box')); },
        mouseover: function(){ $(this).closest('.js_ch_box_area').addClass('hovered'); },
        mouseleave: function(){ $(this).closest('.js_ch_box_area').removeClass('hovered'); }
    });
}

function changeCheck(el){
    var input = el.find("input").eq(0);

    if (input.prop("disabled")) return false;

    if (!input.prop("checked")){
        el.addClass("checked");
        input.prop("checked", true);
    }
    else{
        el.removeClass("checked");
        input.prop("checked",false);
    }

    el.trigger('change');
    input.trigger('change');
    return true;
}

function changeCheckStart(el){
    var input = el.find("input").eq(0);

    if(input.prop("disabled")){ el.addClass("disabled"); }
    else if(input.prop("checked")){ el.addClass("checked"); }
    else{ el.removeClass("checked"); }
    return true;
}

function changeRadioboxAction(){
    $('input[type="radio"]').each( function(){ changeRadioStart($(this)); });

    $('.js_radio_box_area label').on({
        click: function(){ changeRadio($(this).closest('.js_radio_box_area').find('.js_radio_box')); },
        mouseover: function(){ $(this).closest('.js_radio_box_area').addClass('hovered'); },
        mouseleave: function(){ $(this).closest('.js_radio_box_area').removeClass('hovered'); }
    });
}

function changeRadio(el){
    var input = el.find("input"),
        nm = input.attr("name");

    if (el.attr("class").indexOf("disabled") == -1){
        $(".js_radio_box input").each( function(){
            var tInpt = $(this);

            if (tInpt.attr("name") == nm){
                tInpt.parent().removeClass("checked");
                tInpt.removeAttr("checked");
            }
        });

        el.addClass("checked");
        input.attr("checked",true);

        $('input[name='+ nm +']').first().trigger('change');
    }
    return true;
}

function changeVisualRadio(input){
    var wrapInput = input.parent(),
        nm = input.attr("name");

    $(".js_radio_box input").each( function(){
        if ($(this).attr("name") == nm)
            $(this).parent().removeClass("checked");
    });

    if(input.attr("checked")){ wrapInput.addClass("checked"); }
}

function changeRadioStart(el){
    var radioChecked = el.attr("checked"),
        radioDisabled = el.attr("disabled");

    if (radioChecked){ el.closest('.js_radio_box').addClass('checked'); }
    if (radioDisabled){ el.closest('.js_radio_box').addClass('disabled'); }

    el.on("change", function(e){ changeVisualRadio($(this).closest('.js_radio_box')) });
    el.closest('.js_radio_box').on("mousedown", function(e){ changeRadio($(this)) });
}

function customSelect(celector){
    $(celector).each(function(){
        var $this = $(this),
            selVal = $this.find('option:selected').text()||' ',
            selWrap = $('<span />',{'class':'select'}).addClass($this.attr('class')),
            customSelVal = $('<span>',{'class':'select_val','text':selVal});

        if ($this.prop('disabled')){
            selWrap.addClass('disabled');
        }

        $this.wrap(selWrap);
        customSelVal.prependTo($this.parent());
    })

    $('select').on('change', function(){
        customSelectChange(this);
    })
}

function customSelectChange(el){
    var tSelVal = $(el).find('option:selected').text();
    $(el).closest('.select').find('.select_val').text(tSelVal);
}

function showLoader(container){
    container.addClass('ajax_preloader');
}

function hideLoader(container){
    container.removeClass('ajax_preloader');
}

$('document').ready(function(){

    $(document).on('click','.popup_mask', function(){
        $('.popup_mask').hide();
    })

    $('input[placeholder]').placeholder();

});


/*Libs
************/
/*
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);

/*! http://mths.be/placeholder v2.0.7 by @mathias */
(function(m,g,d){function r(b){var a={},c=/^jQuery\d+$/;d.each(b.attributes,function(b,d){d.specified&&!c.test(d.name)&&(a[d.name]=d.value)});return a}function h(b,a){var c=d(this);if(this.value==c.attr("placeholder")&&c.hasClass("placeholder"))if(c.data("placeholder-password")){c=c.hide().next().show().attr("id",c.removeAttr("id").data("placeholder-id"));if(!0===b)return c[0].value=a;c.focus()}else this.value="",c.removeClass("placeholder"),this==n()&&this.select()}function l(){var b,a=d(this),c=this.id;if(""==this.value){if("password"==this.type){if(!a.data("placeholder-textinput")){try{b=a.clone().attr({type:"text"})}catch(e){b=d("<input>").attr(d.extend(r(this),{type:"text"}))}b.removeAttr("name").data({"placeholder-password":a,"placeholder-id":c}).bind("focus.placeholder",h);a.data({"placeholder-textinput":b,"placeholder-id":c}).before(b)}a=a.removeAttr("id").hide().prev().attr("id",c).show()}a.addClass("placeholder");a[0].value=a.attr("placeholder")}else a.removeClass("placeholder")}function n(){try{return g.activeElement}catch(b){}}var f="[object OperaMini]"==Object.prototype.toString.call(m.operamini),k="placeholder"in g.createElement("input")&&!f,f="placeholder"in g.createElement("textarea")&&!f,e=d.fn,p=d.valHooks,q=d.propHooks;k&&f?(e=e.placeholder=function(){return this},e.input=e.textarea=!0):(e=e.placeholder=function(){this.filter((k?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":h,"blur.placeholder":l}).data("placeholder-enabled",!0).trigger("blur.placeholder");return this},e.input=k,e.textarea=f,e={get:function(b){var a=d(b),c=a.data("placeholder-password");return c?c[0].value:a.data("placeholder-enabled")&&a.hasClass("placeholder")?"":b.value},set:function(b,a){var c=d(b),e=c.data("placeholder-password");if(e)return e[0].value=a;if(!c.data("placeholder-enabled"))return b.value=a;""==a?(b.value=a,b!=n()&&l.call(b)):c.hasClass("placeholder")?h.call(b,!0,a)||(b.value=a):b.value=a;return c}},k||(p.input=e,q.value=e),f||(p.textarea=e,q.value=e),d(function(){d(g).delegate("form","submit.placeholder",function(){var b=d(".placeholder",this).each(h);setTimeout(function(){b.each(l)},10)})}),d(m).bind("beforeunload.placeholder",function(){d(".placeholder").each(function(){this.value=""})}))})(this,document,jQuery);