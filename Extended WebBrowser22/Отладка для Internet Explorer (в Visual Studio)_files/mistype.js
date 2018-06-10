
$(document).ready(

function() {

    var selected, selectedNode;
    var isCtrl = false;
    $(document).keyup(function (e) {
        if(e.which == 17) {
			isCtrl=false;
		}

    }).keydown(function (e) {
        if(e.which == 17)  {
		
            isCtrl=true;
			if (document.selection) { //IE & Opera
				var range = document.selection.createRange()
				if (range) {
					selected = range.text;
					selectedNode = range.parentElement()
				}
			} else if (window.getSelection) { // Google Chrome & Safari & FF3 (checked)
				selected = window.getSelection()
	            selectedNode = selected && selected.anchorNode
			} else if (document.getSelection) { //FF (2?)
				selected = document.getSelection()
				selectedNode = selected && selected.anchorNode
			}
			// selectedNode may be text node that's ok
            arguments.callee.selected = (selected+'').replace(/\\/g,"\\\\").replace(/\n/g,"\\n").replace(/"/g,'\\"');
			arguments.callee.selectedNode = selectedNode
        }

        if(e.which == 13 && isCtrl == true) {

            e.cancelBubble = true;
        	e.returnValue = false;
            if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }

            selected = arguments.callee.selected;

            if (selected.length == 0) {
                return;
            }

            if (selected.length > 200) {
                jAlert("Слишком большой участок текста", "Опечатка");
                return;
            }

            if (selected.length < 5) {
                jAlert("Слишком маленький участок текста", "Опечатка");
                return;
            }

			selectedNode = arguments.callee.selectedNode

			var nid = window.nid || 0
			while(selectedNode) {
				var found = (selectedNode.id+'').match(/^node_(\d+)$/)
				if (found) {
					nid = found[1]
					break
				}
				selectedNode = selectedNode.parentNode
			}
            //... спросить - вдруг чел экспериментирует

			var ask = "Отослать извещение об опечатке в <i>&quot;"+selected+"&quot;</i> автору этого материала?<br>Пожалуйста, не присылайте опечатки в комментариях."
			jConfirm( ask, "Отослать?",
				function(yes) {
					if (!yes) return
					Drupal.service('mistype.save',
						{ mistype: selected, url: window.location.href, nid: nid},
						function(success, msg) {
						   // alert(msg)
						}
					)
					jAlert("Извещение отправлено. Спасибо!", "Извещение отправлено");
				}
			)

        }
    });
});
