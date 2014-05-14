$('document').ready(function(){

var topTable;
var correctionTop;
var theadOffset;

function creatCompareTable(){
	$('.original tr>th:first-child, .original tr>td:first-child').not('.original tr.title>td:first-child').each(function()
	{
	  var el = $(this);
	  var sellHeight = el.outerHeight()
	  /*if ($.browser.webkit)
	      {
		    sellHeight = el.height();
		  }*/
	  el.css({'height':sellHeight,'width':el.width()})
	});

	$('.original th').each(function()
	{
	  var el = $(this);
	  el.css({'width':el.width()})
	});
	$('.original tr.title>td:first-child').each(function()
	{
	  var el = $(this);
	  var sellHeight = el.outerHeight()
	  if ($.browser.webkit)
	      {
		    sellHeight = el.height();
		  }
	  el.css({'height':sellHeight})
	});
	
	//создаем первый фиксированный столбец
	$('.table_area').clone().appendTo('#container').removeClass('original').addClass('clone');
	$('.clone tr td, .clone tr th').not(':first-child').remove();
	
	//создаем фиксированную шапку
	$('.original').clone().appendTo('#fixedheader').removeClass('original').addClass('clone_header');
	$('.clone_header tbody').remove();
	
	//создаем неодвижную общую ячейку
	$('.clone_header').clone().prependTo('#fixedheader').removeClass('clone_header').addClass('clone_first_sel');
	$('.clone_first_sel th').not(':first').remove();
	$('.clone_first_sel table').removeAttr('width');

	//$('.original thead tr>th:first-child, .clone_header tr>th:first-child').html('<span style="display:inline-block; width:159px;"></span>');

	$('#container_2').append('<div class="scroll_bar bottom"><div>');
	$('#container_2').prepend('<div class="scroll_bar top"><div>');
	
	var clone_width = $('.clone table').width();
	var scroll_bar_width = $('.original table').outerWidth() - clone_width;

	$('.scroll_bar').css({'margin-left':clone_width});
	$('.scroll_bar div').css({'width':scroll_bar_width});
	$('#container').css({'height':$('.clone').height()});

	$('.scroll_bar').scroll(function()
	{
		var scroll_position = $(this).scrollLeft();

		if($(this).hasClass('top'))
			$('.scroll_bar.bottom, .clone_header').scrollLeft(scroll_position);

		if($(this).hasClass('bottom'))
			$('.scroll_bar.top, .clone_header').scrollLeft(scroll_position);

		$('.original').scrollLeft(scroll_position);
			
	})
	$('.original').scroll(function()
	{
		var scroll_position = $(this).scrollLeft();

		$('.scroll_bar.bottom, .clone_header').scrollLeft(scroll_position);
		$('.scroll_bar.top, .clone_header').scrollLeft(scroll_position);
			
	})
	
	
	
	topTable = $('#fixedheader');
	correctionTop = $('.original th').first().height();
	theadOffset = topTable.offset();
	topTable.css({'width':$('#container_2').outerWidth(), 'overflow':'hidden', 'height':$('.clone_first_sel').height()})
}
	setTimeout(creatCompareTable, 500);
	
	$(window).scroll(function()
	{
		if($(window).scrollTop() > (theadOffset.top + correctionTop))
		{
			topTable.addClass('topFixed');
		}
		else
		{
			topTable.removeClass('topFixed');
		}
		
	})
	$(window).resize(function()
	{
		$('#container').css({'height':$('.clone').height()});
		var clone_width = $('.clone table').width();
		var scroll_bar_width = $('.original table').outerWidth() - clone_width;
	
		$('.scroll_bar').css({'margin-left':clone_width});
		$('.scroll_bar div').css({'width':scroll_bar_width});
		$('#container').css({'height':$('.clone').height()});

		var topTable = $('#fixedheader');
		var correctionTop = $('.original table th').first().height();
		var theadOffset = topTable.offset();

		topTable.css({'width':$('#container_2').outerWidth(), 'overflow':'hidden', 'height':$('.clone_first_sel').height()})
	
	});
	//нужно пересчитать высоту после скрытия равных параметров
	$('#toggle_param').on('click',function(){
		return false;
		/*
		$('.similar_params').toggle();
		$('#container').css({'height':$('.clone').height()});
		$(this).trigger('change');*/
	})
});