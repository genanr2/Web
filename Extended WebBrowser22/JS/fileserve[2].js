function _buttonCallback(res) {
        var head = document.getElementsByTagName('head')[0];
	for (var i = 0; i < head.childNodes.length; i++) {
		var node = head.childNodes[i];
		if (node.nodeType == node.ELEMENT_NODE && node.getAttribute('t')) {
			head.removeChild(node);
		}
        }
}

function makePairedUrl(pair,port,path) {
	return 'http://pairing:' + pair + '@localhost:' + port + path + '&token=' + pair + '&pairing=' + pair;
}

notify = {
	"pair":"",
	"port":10000,
	"configure":function(port,pair) { this.port = port; this.pair = pair; },
	"buttonClick":function(id) {
		var s = document.createElement('script');
		s.setAttribute('src', makePairedUrl(this.pair,this.port,'/fileserve?type=devaddpane&action=click&button=' + id + '&callback=_buttonCallback&_=' + (new Date()).getTime()));
		s.setAttribute('t','1');
		document.getElementsByTagName('head')[0].appendChild(s);
	}
};
