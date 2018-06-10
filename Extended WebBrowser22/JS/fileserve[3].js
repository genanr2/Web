(function(window, undefined) {

	var devicehelper = new function() {

			var MinSize = 40;

			var _port, _pair;
			var _hoverColor = "#fcfcfc";
			var _clickColor = "#f5f5f5";

			this.setPort = function(port) {
				_port = port;
			};

			this.setPair = function(pair) {
				_pair = pair;
			};

			this.setClient = function(client) {
				$('body').addClass(client || "utorrent");

				if (client === "bittorrent") {
					$('#mobilelink').attr('href', 'http://bit.ly/18qNWiH');
					$('#remotelink').attr('href', 'http://bit.ly/1hS6lIj');
					$('#remotebuttontext').text('BitTorrent Remote')
				}
			};

			this.setTextColor = function(color) {
				$('.titletext').css('color', color);
			};

			this.setButtonBorderColor = function(color) {
				$('.background').css('border-color', color);
			};

			this.setButtonHoverColor = function(color) {
				_hoverColor = color;
			};

			this.setButtonClickColor = function(color) {
				_clickColor = color;
			};

			this.setDeviceLabel = function(text) {
				$('#devicetitle').text(text);
			};

			this.setDeviceDescription = function(text) {
				$('#devicetitle2').text(text);
			};

			this.setDeviceMessaage = function(text) {
				$('#message').text(text);
			};

			this.setAddDeviceLabel = function(text) {
				$('#addtitle').text(text);
			};


			// KEYS
			// devicetitle
			// devicetitle2
			// message
			// addtitle
			// androidlabel
			// applelabel
			// gamelabel
			// certifiedlabel
			// promotitle
			// promotitle2
			// mobiletitle
			// mobiledescription
			// remotetitle
			// remotedescription
			// remotebuttontext
			this.setText = function(values) {
				for(var i in values) {
					$('#' + i).text(values[i]);
				}
			};

			this.initialize = function() {

				// Set All category titles to be the width of the largest title
				var fontsize = parseFloat($('.section').css('font-size'));
				var greatestTileWidth = 0;
				$(".categorytitletile").each(function(index, value) {
					if (greatestTileWidth < value.offsetWidth) {
						greatestTileWidth = value.offsetWidth;
					}
				});

				var greatestemwidth = greatestTileWidth / fontsize;

				$(".devicecontainer").css({
					'margin-left': greatestTileWidth + 'px'
				});





				var bodywidth = $('body').width();
				var bodyemwidth = $('body').width() / fontsize;
				bodyemwidth = bodyemwidth >= 40 ? bodyemwidth : 40;

				var minwidth = (greatestemwidth + 22 + 3) * fontsize - 4;
				$('html').css('min-width', minwidth + 'px');
					
				minwidth = (greatestemwidth + 20 + 3) * fontsize - 4;
				$('.bottomsection').css('width', minwidth + 'px');


				// $(window).resize(function(e) {
				// 	if ($(window).width() <= minwidth) {
				// 		html.width(minwidth + 'px');
				// 		return;
				// 	}
				// 	html.css('width', '');
				// });

				$('.categorycontainer.hides').css('display', 'none');

				// Initialize Promo Buttons
				$('.btbutton').on('mousedown', function(e) {
					$(e.target).closest('.btbutton').css({
						'border-bottom-width': '2px',
						'margin-top': '2px'
					});
				})
				.on('mouseup', function(e) {
					$(e.target).closest('.btbutton').css({
						'border-bottom-width': '4px',
						'margin-top': '0px'
					});
				})
				.on('mouseleave', function(e) {
					$(e.target).closest('.btbutton').css({
						'border-bottom-width': '4px',
						'margin-top': '0px'
					});
				});
			};

			function makePairedUrl(path) {
				return 'http://pairing:' + _pair + '@localhost:' + _port + path + '&token=' + _pair + '&pairing=' + _pair;
			}

			this.adddevice = function(selector, img_id, buttonid, label, label2) {
				var section = $('#' + selector);

				if (selector === 'devicesection') {
					// Remove no device message
					$('#message').remove();
				} else {
					// Show Sections with tiles
					section.closest('.categorycontainer.hides').css('display', 'block');
				}

				var imgsrc = makePairedUrl('/fileserve/icon.ico?type=resource&name=' + img_id + '&kind=icon');

				var elementHtml = '<div class="tile"><div id="' + buttonid + '" class="background"></div><div class="tilepadding ignoreclicks"><div class="tileimgcontainer"><img src="' + imgsrc + '"></div><div class="tiletext"><div class="smallfont croptext">' + label + '</div>';
				if (label2) {
					elementHtml += '<div class="xsfont croptext">' + label2 + '</div>';
				}
				elementHtml += '</div></div></div>';

				var element = $(elementHtml);

				// BUG: force background to opacity 0.0
				element.find('.background').css('opacity', '0.0');

				// Events
				element.on('mouseenter', function(e) {
					var target = $(e.target).closest('.tile').find('.background');
					target.stop().css({
						"background": _hoverColor,
						"opacity": '1.0'
					});
					return false;
				});

				element.on('mousedown', function(e) {
					var target = $(e.target).closest('.tile').find('.background');
					target.css('background', _clickColor);
					return false;
				});

				element.on('mouseup', function(e) {
					var target = $(e.target).closest('.tile').find('.background');
					target.css('background', _hoverColor);

					if (window.notify && window.notify.buttonClick) {
						notify.buttonClick(target.attr('id'));
					}
					return false;
				});

				element.on('mouseleave', function(e) {
					var target = $(e.target).closest('.tile').find('.background');
					target.stop().animate({
						'opacity': '0.0'
					}, 300);
					return false;
				});

				section.append(element);
			};
		}();

	window.devicehelper = devicehelper;
})(window);

window.onload = function() {
	if (window.btapp) return;

//	devicehelper.initialize();

	port = window.port;
	pair = window.pair;

	// Set Port & Pair
//	devicehelper.setPort(port);
//	devicehelper.setPair(pair);

	// Set Labels
	// devicehelper.setDeviceLabel("donkey");
	// devicehelper.setDeviceDescription("donkey");
	// devicehelper.setAddDeviceLabel("donkey");

	// Add a Configured Device
//	devicehelper.adddevice("devicesection", 302, "device1", "Samsung Galaxy S3", "disconnected");
	// devicehelper.adddevice("devicesection", 301, "device2", "Google Nexus 4", "disconnected");
	//devicehelper.adddevice("devicesection", 301, "device3", "Motorola Moto X", "disconnected");

	// Add a Device Devices
//	devicehelper.adddevice("androidsection", 302, "android-id", "Android Device");
//	devicehelper.adddevice("applesection", 302, "ipod", "iPods/iPhones");
//	devicehelper.adddevice("applesection", 303, "open-itunes", "iPads/Apple TV");
//	devicehelper.adddevice("gamesection", 301, "ps3", "USB to PS3");
//	devicehelper.adddevice("gamesection", 300, "xbox", "USB to Xbox 360");
//	devicehelper.adddevice("btcsection", 340, "btcertified", "BitTorrent Certified Device");
};
