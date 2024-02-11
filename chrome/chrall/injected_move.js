"use strict";
/* TODO: les injected_xxx.js contiennent du code qui est exécuté directement, or ce n'est pas systématiquement pertinent, à nettoyer */
// code injecté et exécuté lorsque l'on affiche le formulaire de mouvement dans la frame d'action

(function(chrall){

	function ch_check(name, required){
		var radios = document.getElementsByName(name);
		for (var i in radios) {
			if (radios[i].value == required) radios[i].checked = true;
		}
	}

	chrall.injectMove = function(){

		// TODO: pick a proper name for the args
		// TODO: check if we still need to pass through local storage now that the handling of the extension is different
		// TODO: rename file
		var todoArgs = localStorage['todo_args'];
		if (todoArgs) {
			localStorage.removeItem('todo_args');
			var xyz = todoArgs.split(' ');
			if (xyz.length == 3) {

				ch_check('depl_x', xyz[0]);
				ch_check('depl_y', xyz[1]);
				ch_check('depl_n', xyz[2]);
			}
		}
	};

	chrall.updatePosition = function(){
		// Update position if move was successful
		let mhPlay = $("#mhPlay").text();
		if (mhPlay.indexOf('Vous avez RÉUSSI') >= 0) {
			let position = $('#datajet').next().text();
			chrall.player().x = parseInt(/X = (-?\d+)/g.exec(position)[1]);
			chrall.player().y = parseInt(/Y = (-?\d+)/g.exec(position)[1]);
			chrall.player().z = parseInt(/N\s+= (-?\d+)/g.exec(position)[1]);
			chrall.player().pa = parseInt(/il vous en reste (\d+)/g.exec(mhPlay)[1]);
			chrall.updateTroll();
		}
	}

})(window.chrall = window.chrall || {});
