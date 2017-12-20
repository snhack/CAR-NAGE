/*
################################################
#                                              #
#	Fichier contenant les fonctions globales   #
#                                              #
#	Par exemple les fonctions d'affichage      #
#                                              #
################################################
*/


function creation_joueur(couleur, x, y) {
	var nouveau_joueur = new joueur(nombre_joueurs, couleur, x, y);
	nombre_joueurs++;
	return nouveau_joueur;
}


//Fonction qui verifie les touches actuellement utilsées (presente dans le tableau "touches")
//et execution de la fonction correspondante
function deplacements_joueurs(){
	
	for(var i = 0;i < joueurs.length;i++){
		
		if(touches.indexOf(joueurs[i].touche_gauche) >= 0){
			joueurs[i].rotation_gauche();
		}
		
		if(touches.indexOf(joueurs[i].touche_droite) >= 0){
			joueurs[i].rotation_droite();
		}
		
		if(touches.indexOf(joueurs[i].touche_haut) >= 0){
			joueurs[i].avancer();
		}
		
		if(touches.indexOf(joueurs[i].touche_bas) >= 0){
			joueurs[i].reculer();
		}
		
		if(touches.indexOf(joueurs[i].touche_tir) >= 0){
			joueurs[i].tir();
		}
		
	}
	
}


function affichageJoueurs(){
	
	for(var i = 0;i < joueurs.length;i++) {
		
		if(joueurs[i].status !== 'mort') {
            var img = new Image();
            img.src = 'img/voiture' + (i + 1) + '.png';
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.translate(joueurs[i].x, joueurs[i].y);
            context.rotate(joueurs[i].angle * Math.PI / 180);
            context.drawImage(img, -25, -50, 50, 100);
            context.restore();
        }
        
	}
	
}

function deplacements_projectiles(){

    for(var i = 0;i < projectiles.length;i++){
        if(projectiles[i] !== 'explosé') {
            projectiles[i].trajectoire();
        }
    }

}


function affichageProjectiles(){
    for(var i = 0; i < projectiles.length; i++) {
		
        var imgBall = new Image();
        imgBall.src = 'img/ball.png';
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(projectiles[i].x,projectiles[i].y);
        context.drawImage(imgBall,-15,-15, 15, 15);
        context.restore();
    }
}



function maj(){
    context.clearRect(0,0,wCan,hCan);
    affichageMurs(map);
    affichageJoueurs();
	deplacements_joueurs();
	deplacements_projectiles();
	affichageProjectiles();
}

function explosion(x,y) {
    var test;
    test = setInterval(function () {
        var img = new Image();
        img.src = 'img/explosion.png';
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(x,y);
        context.drawImage(img,-100,-100, 200, 200);
        context.restore();
    },10);
    var temp = nbAlea(0,2);
    if(temp === 1) {
        son.setAttribute('src', 'son/explosion.wav');
    }else if(temp === 2){
        son.setAttribute('src', 'son/explosion1.wav');
    }else{
        son.setAttribute('src', 'son/explosion2.wav');
    }
    son.play();
    setTimeout(function(){clearInterval(test)}, 400);
}