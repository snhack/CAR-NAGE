function creation_joueur(couleur, x, y) {
	var nouveau_joueur = new joueur(nombre_joueurs, couleur, x, y);
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
            /*
            var coins = joueurs[i].calcul_hitbox(false);
            context.beginPath();
            context.lineWidth = 5;
            context.fillStyle = joueurs[i].couleur;
            context.strokeStyle = 'black';
            context.moveTo(coins[0].x, coins[0].y);
            context.lineTo(coins[1].x, coins[1].y);
            context.lineTo(coins[2].x, coins[2].y);
            context.lineTo(coins[3].x, coins[3].y);
            context.lineTo(coins[0].x, coins[0].y);
            context.fill();
            context.lineJoin="bevel";
            context.stroke();
			
            var canon = joueurs[i].calcul_hitbox(true);
            context.beginPath();
            var grd = context.createLinearGradient(canon[0].x, canon[0].y, canon[3].x, canon[3].y);
            grd.addColorStop(0, "black");
            grd.addColorStop(1, joueurs[i].couleur);
            context.fillStyle = grd;
            context.moveTo(canon[0].x, canon[0].y);
            context.lineTo(canon[1].x, canon[1].y);
            context.lineTo(canon[2].x, canon[2].y);
            context.lineTo(canon[3].x, canon[3].y);
            context.lineTo(canon[0].x, canon[0].y);
            context.fill();
			*/
	}
	
}

function deplacements_projectiles(){

    for(var i = 0;i < projectiles.length;i++){

    	projectiles[i].trajectoire();

    }

}


function affichageProjectiles(){
    for(var i = 0; i < projectiles.length; i++) {
    	/*
        context.beginPath();
        context.fillStyle = 'black';
        context.arc(projectiles[i].x, projectiles[i].y, projectiles[i].diametre, 0, 2 * Math.PI);
        context.fill();
        */
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