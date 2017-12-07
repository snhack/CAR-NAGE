function creation_joueur() {
	document.getElementById("map").innerHTML += "<div class='joueur' id='joueur_"+nombre_joueurs+"'></div>";
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


//affichage temporaire pour dev
function affichage_joueurs(){
	
	for(var i = 0;i < joueurs.length;i++){
		
		joueurs[i].css().style.top = joueurs[i].y + "px";
		joueurs[i].css().style.left = joueurs[i].x + "px";
		joueurs[i].css().style.transform = "translate(-50%, -50%) rotate("+joueurs[i].angle+"deg)";
		
	}
	
}

function affichageJoueursCanvas(){
    for(var i = 0;i < joueurs.length;i++) {
            context.moveTo(joueurs[i].calcul_hitbox[0].x, joueurs[i].calcul_hitbox[0].y);
            context.lineTo(joueurs[i].calcul_hitbox[1].x, joueurs[i].calcul_hitbox[1].y);
            context.lineTo(joueurs[i].calcul_hitbox[2].x, joueurs[i].calcul_hitbox[2].y);
            context.lineTo(joueurs[i].calcul_hitbox[3].x, joueurs[i].calcul_hitbox[3].y);
            context.lineTo(joueurs[i].calcul_hitbox[0].x, joueurs[i].calcul_hitbox[0].y);
            context.stroke();
    }

}

function deplacements_projectiles(){
    
    for(var i = 0;i < projectiles.length;i++){
    	
    	projectiles[i].trajectoire();
    	
    }
    
}

//affichage temporaire pour dev
function affichage_projectiles(){
	
	for(var i = 0;i < projectiles.length;i++){
		
		projectiles[i].css().style.top = projectiles[i].y + "px";
		projectiles[i].css().style.left = projectiles[i].x + "px";
		
	}
	
}

function affichageProjectilesCanvas(){
    for(var i = 0; i < projectiles.length; i++) {
        context.beginPath();
        context.arc(projectiles[i].x, projectiles[i].y, 5, 0, 2 * Math.PI);
        context.fill();
    }
}



function maj(){
    context.clearRect(0,0,wCan,hCan);
    affichageMurs(map);
    affichageJoueursCanvas();
	deplacements_joueurs();
	affichage_joueurs();
	deplacements_projectiles();
	affichageProjectilesCanvas();
}