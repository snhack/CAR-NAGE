function creation_joueur() {
	var nouveau_joueur = new joueur(nombre_joueurs);
	nombre_joueurs++;
	return nouveau_joueur;
}

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
        var coins = joueurs[i].calcul_hitbox();
            context.beginPath();
            context.fillStyle = joueurs[i].couleur;
            context.moveTo(coins[0].x, coins[0].y);
            context.lineTo(coins[1].x, coins[1].y);
            context.lineTo(coins[2].x, coins[2].y);
            context.lineTo(coins[3].x, coins[3].y);
            context.lineTo(coins[0].x, coins[0].y);
            context.fill();
    }

}

function deplacements_projectiles(){

    for(var i = 0;i < projectiles.length;i++){

    	projectiles[i].trajectoire();

    }

}


function affichageProjectiles(){
    for(var i = 0; i < projectiles.length; i++) {
        context.beginPath();
        context.fillStyle = 'black';
        context.arc(projectiles[i].x, projectiles[i].y, 5, 0, 2 * Math.PI);
        context.fill();
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