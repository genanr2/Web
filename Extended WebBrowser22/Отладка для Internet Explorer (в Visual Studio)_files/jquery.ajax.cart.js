jQuery(document).ready(function(){
	/** get settings **/
	var bText = Drupal.settings.uc_ajax_cart.text ;
	var disabled = Drupal.settings.uc_ajax_cart.disable ;
	var bclass = Drupal.settings.uc_ajax_cart.bclass ;
	var ddSupport = Drupal.settings.uc_ajax_cart.ddSupport;
	var emptyHide = Drupal.settings.uc_ajax_cart.emptyHide;
	if ( ddSupport == true )
	{
		//Activate drag and drop support
		jQuery('#ajaxCartUpdate').droppable({ accept : '.product_image_drag' ,
			hoverClass : 'dropHover',
			activeClass   : 'dropActive',
			tolerance : 'pointer',
			drop : function (ev,ui)
			{
					var i = ev.target.id.split("_").reverse().shift();
					$form = jQuery('#uc-product-add-to-cart-form-' + i);
					var data = jQuery($form).formToArray();
					jQuery.getJSON( Drupal.settings.base_path + 'cart/ajax/update',data,updateAjaxCart);
					return true ;
			}
		});
	}
	jQuery('form.ajax-cart-form').each(function(){
		var $form = jQuery(this);
		if ( ddSupport == true )
		{
			var nid = $form.attr('id').split('-').reverse().shift();
			var $img = jQuery('#product_image_' + nid );
			if ( $img.length > 0 )
			{
				$img.eq(0).draggable({ helper: "clone",
									   appendTo : 'body',
									   zIndex : 10000 ,
									   opacity : 1 });
			}
		}
		jQuery(this).find('input.ajax-submit-form,button.ajax-submit-form').bind('click',function(e){
				var $form = jQuery(this).parents('form').eq(0);
				var data = jQuery($form).formToArray();

				// make pnids object without discount
				var pnids = {}, hasAny = false
				$(data).each(function() {
					var name = this.name
					if (name == 'pnid' && this.value) {
						hasAny=true
						pnids[this.value] = pnids[this.value] || 1
					}

					if (name.substr(0,4) != 'nid-') return
					var nid = +name.substr(4)
					var value = +this.value
					if (this.value == 'on') value = 1 // to handle checkboxes too
					if (value < 0 || value > 99) value=0
					pnids[nid] = pnids[nid]+value || value
					hasAny = true
				})

				if ( !hasAny ) {

					jAlert('На что записываетесь? Выберите, пожалуйста.')
					return false
				}

                                $('#subscribe-form-top').hide()

				if ($form[0] && $form[0].discount_nid) { // no form on node page like http://javascript.ru/node/11134
					// add discount pnid, disctract from mk
					var discountNid = $form[0].discount_nid.value
					var discountCnt = $form[0].discount_cnt.value
					if (discountNid && discountCnt) {
						var itemsCnt = 0
						var minCnt = Infinity
						for(var nid in pnids) {
							minCnt = Math.min(minCnt, pnids[nid])
							itemsCnt++
						}
						if (itemsCnt == discountCnt) {	// found minimal among 4 items
							for(var nid in pnids) {
								pnids[nid] -= minCnt
								if (pnids[nid] == 0) {
									delete pnids[nid]
								}
							}
							pnids[discountNid] = minCnt	 // add discounted nid

						}
					}
				}
				var pnidsQuery = []
				for(var nid in pnids) {
					pnidsQuery.push(nid+'='+pnids[nid])
				}
				pnidsQuery = pnidsQuery.join('&')

				$(data).each(function() {
					if (this.name == 'pnids') {
						this.value = pnidsQuery
						pnidsQuery = null
					}
				})
				if (pnidsQuery !== null) {
					data.push({name:'pnids', value: pnidsQuery})
				}

				data.push({name: 'emptyHide', value: emptyHide});
				data.push({name: 'iCount', value:  Drupal.settings.uc_ajax_cart.itemCount });
				data.push({name: 'callback', value:  $form.find('input[@name=callback]').attr('value') });
				var tagName = this.tagName ;
				var button = jQuery(this);
				if ( bText != false )
				{
					if ( tagName == "BUTTON" )
					{
					 	button.attr('oldTitle',button.html());
					 	button.html(bText);
					}
					else
					{
						 button.attr('oldTitle',button.attr("value"));
						 button.attr('value',bText);
					}
				}
				button.addClass(bclass);
				if ( disabled == 1 )
				{
          var toHide = $(button).parents('form:first').find('.ajax-hide-on-success').add(button);
					toHide.hide();
					button.after('<div class="ajax-cart-msg">' + bText + '</div>');
				}

				$.ajax({
					type: "GET",
					dataType: "json",
					url: Drupal.settings.base_path + 'cart/ajax/update',
					data: data,
					success: updateAjaxCart,
					error: function() {	alert("Произошла ошибка. Попробуйте позднее") }
				});
				return false;
		});
	});
})
function updateAjaxCart(data,responseType)
{
	var $uEle = jQuery('#ajaxCartUpdate').eq(0);
	var form_id = data.form_id.split('_').join('-');
	var bText = Drupal.settings.uc_ajax_cart.text ;
	var bclass = Drupal.settings.uc_ajax_cart.bclass ;
	var effects = Drupal.settings.uc_ajax_cart.effects;
	var emptyHide = Drupal.settings.uc_ajax_cart.emptyHide;
	var iCount = Drupal.settings.uc_ajax_cart.itemCount;
	var aCount = data.itemCount ;
	var $form = jQuery('input.' + data.callback ).parents('form').eq(0) ;
	$form.find('div.ajax-cart-msg').remove();

	var button = $form.find('input.ajax-submit-form,button.ajax-submit-form')

	var after;
	if (responseType == 'success') {
		after = '<span style="color:green;display:block">Готово! Запись добавлена в <a href="#ajaxCartUpdate" class="cart-show-link">корзину</a> (справа-сверху). Вы можете <a href="/cart">внести изменения</a> или <a href="/cart/checkout">завершить оформление</a>.</span>'
	} else {
		after = '<span style="color:green">Произошла ошибка, попробуйте позднее'
	}

	if (!button[0].nextSibling || button[0].nextSibling.className != 'ajax-cart-info') {
		button.after('<div class="ajax-cart-info" style="color:gray;display:inline">'+after+'</div>')
	}
	button.next().find('a.cart-show-link').click(function() {
		if ( !$('#collapseobj_block-uc_ajax_cart-0').is(':visible')) {
			toggle_collapse('block-uc_ajax_cart-0')
		}

		$('#block-uc_ajax_cart-0')[0].scrollIntoView()
		$('#ajaxCartUpdate').effect('highlight',{},1000);
		return false
	})

			/*
	$form.find('input.ajax-submit-form,button.ajax-submit-form').show().removeClass(bclass).removeAttr('disabled').each(function(){
		if ( bText != false )
		{

			if ( this.tagName == "INPUT" ) this.value = jQuery(this).attr('oldTitle');
			else jQuery(this).html(jQuery(this).attr('oldTitle'));

		}
	});*/
	if ( data.renderAll == true )
	{
		$('#ajaxCartUpdate').replaceWith(data.content)
		/*
		$('.cart-block-toggle').unbind('click');
		$uEle.attr('ID','#ajaxCartUpdate2');
		$uEle.parent().hide().after(data.content);
		$uEle.parent().remove();
		$('.cart-block-toggle').click(function() { cart_block_toggle(); } );*/
	} else {
		$uEle.empty().html(data.content);
	}
	Drupal.settings.uc_ajax_cart.itemCount = aCount ;
	if ( typeof collapsed_block != "undefined"
	     && collapsed_block == true )
	{
		isrc = $('#block-cart-title-arrow').attr('src');
		if (isrc.toLowerCase().match("up") != null) {
		    $('#block-cart-title-arrow').attr('src', uc_cart_path + '/images/bullet-arrow-down.gif');
		}
	}
	/*
	if ( effects == true )	{
		jQuery('#ajaxCartUpdate').effect('highlight',{},600);
	}*/
	jQuery('body').css({cursor : 'default'});
	$('#block-uc_ajax_cart-0').show()

}
