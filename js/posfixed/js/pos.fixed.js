//******************************
// Position fixed v:1.0.1, 2013, jQuery plugin
// Creater: Egor Podgaiski, http://gorik.name/
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html
// I Am ...
//******************************
(function($){
    $.fn.fixeditem = function(args){

        var settings = $.extend({
            position : 'top', // Vertical position: 'top', 'bottom';
            correctY : 0, // Vertical correction (int, px): '10';
            fixedClass : 'state_fixed', // Class ws 'position:fixed': 'some_class';
            container : '', // Parent or similar continer (jQuery object): $('#someId/.some_class');
            rightSide : false, // If current element is on right side in the parent: true, false;
            wrapper : true, // Wrap current element to <div>: true, false;
            parentWidth : true // Sets the width of the parent element: true, false;
        }, args);

        return this.each(function(){

            var el = $(this),
                elWrap = el.parent(),
                offsetTop = elWrap.offset().top,
                pos = settings.position,
                correctY = parseInt(settings.correctY),
                fixedClass = settings.fixedClass,
                container = settings.container,
                rightSide = settings.rightSide,
                wrapper = settings.wrapper,
                parentWidth = settings.parentWidth,
                winScroll = $(window).scrollTop();

            function getClientWidth(){
                return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientWidth : document.body.clientWidth;
            };
            

            function getClientHeight(){
                return $(window).height();
            };

            function getElWidth(obj){
                var width = obj.width(),
                    decimalwidth =  window.getComputedStyle(obj.get(0)).width; //ie9 decimal width*/

                if (1 > (decimalwidth - width) <= 0)
                    width = decimalwidth;

                return width;
            };

            function clearStyles(el, elWrap){
                el.removeClass(fixedClass).css({'position':'', 'top':'', 'bottom':'', 'width':'', 'margin-left':''});
                elWrap.css('height', '');
            };

            function elTopPosition(el, elWrap, offsetTop, winScroll){
                if (el.outerHeight() < getClientHeight()) {
                    if ( (container.first().length) && ((winScroll + el.outerHeight() + correctY) > (container.offset().top + container.height())) ){
                        var pTop = (container.offset().top + container.height()) - (offsetTop + el.outerHeight());

                        el.removeClass(fixedClass).css({'top':pTop, 'position':'relative'});
                    }
                    else if ((offsetTop - correctY) < winScroll){
                        elWrap.css('height', el.outerHeight());
                        el.css('width', getElWidth(el));
                        el.addClass(fixedClass).css({'top':correctY, 'position':'fixed'});
                        if (rightSide)
                            el.css('margin-left', -el.outerWidth());
                    }
                    else{
                        clearStyles(el, elWrap);
                    }
                }
                else {
                    clearStyles(el, elWrap);
                }
            };

            function elBottomPosition(el, elWrap, offsetTop, winScroll){
                if ( (container.first().length) && ((winScroll + getClientHeight() - el.outerHeight() - correctY) <= (container.offset().top))){
                    var pBottom = (container.outerHeight() - el.outerHeight() - correctY);

                    el.removeClass(fixedClass).css({'bottom':pBottom, 'position':'relative'});
                }
                else if ((offsetTop + el.outerHeight() + correctY) >= (getClientHeight() + winScroll)){
                    elWrap.css('height', el.outerHeight());
                    el.css('width', getElWidth(el));
                    el.addClass(fixedClass).css({'bottom':correctY, 'position':'fixed'});
                    if (rightSide)
                        el.css('margin-left', -el.outerWidth());
                }
                else{
                    clearStyles(el, elWrap);
                }
            };

            // on load
            if (wrapper)
                el.wrap('<div/>');
            
            if(pos == 'top'){
                if (winScroll > 0){
                    elTopPosition(el, elWrap, offsetTop, winScroll);
                }
                else{
                    clearStyles(el, elWrap);
                };
            }
            else if(pos == 'bottom'){
                elBottomPosition(el, elWrap, offsetTop, winScroll);
            }

            // on scroll
            $(window).on('scroll', function (){

                var offsetTop = el.parent().offset().top,
                    winScroll = $(window).scrollTop();

                if(pos == 'top'){
                    elTopPosition(el, elWrap, offsetTop, winScroll);
                }
                else if(pos == 'bottom'){
                    elBottomPosition(el, elWrap, offsetTop, winScroll)
                };
            });

            $(window).on('resize', function (){

                var offsetTop = el.parent().offset().top,
                    winScroll = $(window).scrollTop();

                if (parentWidth)
                    el.css({'position':'', 'width':''})

                if(pos == 'top'){
                    if (winScroll > 0){
                        elTopPosition(el, elWrap, offsetTop, winScroll);
                    }
                    else{
                        clearStyles(el, elWrap);
                    };
                }
                else if(pos == 'bottom'){
                    elBottomPosition(el, elWrap, offsetTop, winScroll);
                }
            });

        });
    };
})(jQuery);