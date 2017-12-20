/*
##########################################################################################
#                                                                                        #
#	Fichier contenant les constructeurs d'objets dynamiques (joueurs,projectiles)        #
#                                                                                        #
##########################################################################################
*/


var joueur = function(id, couleur, x, y) {
	
	//propriétés basiques
	this.id = id;
	this.x = x;
	this.y = y;
	this.angle = 0;
	this.status = 'ok';
	this.score = 0;
	
	//Les vitesses sont des "pas" en pixels
	this.vitesse_deplacement = vitesse_deplacement_standard;
	this.vitesse_rotation = vitesse_deplacement_standard;
	
	//temps en seconde entre 2 tirs
	this.delai_tir = delai_tir_standard;
	
	//timestamp du dernier tir
	this.dernier_tir = 0;
	
	//codes des touches pour ce joueur
	this.touche_haut = touche_haut_standard[id];
	this.touche_bas = touche_bas_standard[id];
	this.touche_gauche = touche_gauche_standard[id];
	this.touche_droite = touche_droite_standard[id];
	this.touche_tir = touche_tir_standard[id];

	
	this.rotation_gauche = function() {
		
		var nouveau_angle = this.angle - this.vitesse_rotation;
		
		//application de la rotation uniquement si le test de collision retourne true (pas de collision)
		if(this.test_collision(this.x, this.y, nouveau_angle)){
			this.angle = nouveau_angle;
			this.reset_angle();
		}
		
	};
	
	this.rotation_droite = function() {
		
		var nouveau_angle = this.angle + this.vitesse_rotation;
		
		//application de la rotation uniquement si le test de collision retourne true (pas de collision)
		if(this.test_collision(this.x, this.y, nouveau_angle)){
			this.angle = nouveau_angle;
			this.reset_angle();
		}
		
	};
	
	this.avancer = function() {
		
		//calcul de la nouvelle position (x & y) par trigonometrie à partir de l'angle et de la vitesse
		var nouveau_x = this.x + Math.cos((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement;
		var nouveau_y = this.y + Math.sin((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement;
		
		//application du mouvement uniquement si le test de collision retourne true (pas de collision)
		if(this.test_collision(nouveau_x, nouveau_y, this.angle)){
			this.x = nouveau_x;
			this.y = nouveau_y;
		}
		
	};
	
	this.reculer = function() {
		
		//calcul de la nouvelle position (x & y) par trigonometrie à partir de l'angle et de la vitesse
		var nouveau_x = this.x - Math.cos((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement;
		var nouveau_y = this.y - Math.sin((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement;
		
		//application du mouvement uniquement si le test de collision retourne true (pas de collision)
		if(this.test_collision(nouveau_x, nouveau_y, this.angle)){
			this.x = Math.round(nouveau_x);
			this.y = Math.round(nouveau_y);
		}
		
	};
	
	this.reset_angle = function() {
		
		//cette fonction permet de garder la valeure de l'angle dans une fouchette acceptable (0 à 360)
		if(this.angle < 0){
			this.angle += 360;
		}else if(this.angle >= 360){
			this.angle -= 360;
		}
		
	};
	
	this.calcul_hitbox = function(x,y,angle) {
		
		//Calul les cordonnées X & Y des quatre coins du joueur via des formules de trigonometrie
		
		var angle_reference = (angle - 90);
		var l = longueur_joueur;
		var L = largeur_joueur;
		
		var angle_coin = (90 - (Math.atan((l / 2) / (L / 2)) * 180 / Math.PI));
		var diagonale = Math.sqrt( Math.pow((l / 2), 2) + Math.pow((L / 2), 2) );
		
		var angles = [];
		
		angles[0] = (angle_reference - angle_coin) * Math.PI / 180;
		angles[1] = (angle_reference + angle_coin) * Math.PI / 180;
		angles[2] = (angle_reference + 180 - angle_coin) * Math.PI / 180;
		angles[3] = (angle_reference + 180 + angle_coin) * Math.PI / 180;
		
		var coins = [];
		
		
		for(var i = 0;i < angles.length;i++){
            coins[i] = {};
			coins[i].x = x + ( Math.cos(angles[i]) * diagonale );
            coins[i].y = y + ( Math.sin(angles[i]) * diagonale );
		}
		
		return coins;
		
	};
	
	//fonction qui test une eventuelle collision entre un joueur et les murs, à partir de sa futur position (centre)
	this.test_collision = function(nouveau_x, nouveau_y, nouveau_angle) {
		
		//calcul de la position de 4 coins du joueur (actuelle et future)
		var coins_joueur = this.calcul_hitbox(this.x,this.y,this.angle);
		var nouveau_coins_joueur = this.calcul_hitbox(nouveau_x, nouveau_y, nouveau_angle);
		
		//pour chaque mur
		for(var i = 0;i < map.length;i++){
			
			//pour chaque face de chaque mur
			for(var j = 0;j < map[i].faces.length;j++){
				
				var face = map[i].faces[j];
				
				//pour chaque coin du joueur, sur chaque face de chaque mur
				for(var k = 0;k < coins_joueur.length;k++){
					
					if(face.orientation === "vertical"){
						
						//test si le point est au niveau du mur
						if((nouveau_coins_joueur[k]["y"] >= face.debut["y"]) && (nouveau_coins_joueur[k]["y"] <= face.fin["y"])){
							
							if(coins_joueur[k]["x"] < face.debut["x"]){
								
								if(nouveau_coins_joueur[k]["x"] >= face.debut["x"]){
									return false;
								}
								
							}else if(coins_joueur[k]["x"] > face.debut["x"]){
								
								if(nouveau_coins_joueur[k]["x"] <= face.debut["x"]){
									return false;
								}
								
							}
							
						}
						
					}
					
					if(face.orientation === "horizontal"){
						
						//test si le point est au niveau du mur
						if((nouveau_coins_joueur[k]["x"] >= face.debut["x"]) && (nouveau_coins_joueur[k]["x"] <= face.fin["x"])){
							
							if(coins_joueur[k]["y"] < face.debut["y"]){
								
								if(nouveau_coins_joueur[k]["y"] >= face.debut["y"]){
									return false;
								}
								
							}else if(coins_joueur[k]["y"] > face.debut["y"]){
								
								if(nouveau_coins_joueur[k]["y"] <= face.debut["y"]){
									return false;
								}
								
							}
							
						}
						
					}
					
				}
				
				
				//Ancien systeme de collision
				/*if( (face.orientation === "vertical") && (nouveau_x < (face.debut["x"] + 7)) && (nouveau_x > (face.debut["x"] - 7)) && (nouveau_y >= face.debut["y"]) && (nouveau_y <= face.fin["y"]) ){
					
					return false;
					
				}else if( (face.orientation === "horizontal") && (nouveau_y < (face.debut["y"] + 7)) && (nouveau_y > (face.debut["y"] - 7)) && (nouveau_x >= face.debut["x"]) && (nouveau_x <= face.fin["x"]) ){
					
					return false;
					
				}*/
				
			}
			
		}
		
		//si une collision est detectée, le return false arretera la fonction
		//sinon on return true
		return true;
		
	};
	
	//function qui genere les projectiles
	this.tir = function() {
		
		//si le joueur est vivant et qu'il n'a pas depasé son ratio de tir
		if(this.dernier_tir <= (Date.now() - (this.delai_tir * 1000)) && this.status !== 'mort'){
			
			var nouveau_x = this.x + Math.cos((this.angle-90)*(Math.PI/180)) * 50;
			var nouveau_y = this.y + Math.sin((this.angle-90)*(Math.PI/180)) * 50;
			
			projectiles.push(new projectile(nouveau_x, nouveau_y, this.angle));
			this.dernier_tir = Date.now();
		}
		
	}
	
};

var projectile = function(x, y, angle) {
	
	//propriétés basiques
	this.id = projectiles.length;
	this.x_precedent = x;
	this.y_precedent = y;
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.vitesse_deplacement = vitesse_deplacement_standard;
	this.nombre_rebond = 0;
	this.diametre = diametreProjectile;
	
	this.trajectoire = function() {
		
		//memorisation des anciennes coordonnées
		this.x_precedent = this.x;
		this.y_precedent = this.y;
		
		//calcul de la nouvelle position (x & y) par trigonometrie à partir de l'angle et de la vitesse
		this.x += Math.round(Math.cos((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement);
		this.y += Math.round(Math.sin((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement);
		
		this.test_collision();
		this.test_collision_joueur();
		
	};
	
	this.rebond = function(sens) {
		
		switch(sens){
			case "vertical": this.angle = (270) - (this.angle - 90);break;
			case "horizontal": this.angle = 180 - this.angle;break;
		}
		
		if(this.angle < 0){
			this.angle += 360;
		}else if(this.angle >= 360){
			this.angle -= 360;
		}
		
		this.nombre_rebond++;
		
	};
	
	this.test_collision_joueur = function() {
		
		for(var i = 0;i < joueurs.length;i++){
			
			var angles = joueurs[i].calcul_hitbox(joueurs[i].x,joueurs[i].y,joueurs[i].angle);
			
			//calcul utilisant des vecteurs pour verifier la presence d'un projectile dans la hitbox du joueur
			var AMx = this.x - angles[0].x;
			var AMy = this.y - angles[0].y;
			var ABx = angles[1].x - angles[0].x;
			var ABy = angles[1].y - angles[0].y;
			var ADx = angles[3].x - angles[0].x;
			var ADy = angles[3].y - angles[0].y;
			
			var AMdotAB = AMx * ABx + AMy * ABy;
			var ABdotAB = ABx * ABx + ABy * ABy;
			var AMdotAD = AMx * ADx + AMy * ADy;
			var ADdotAD = ADx * ADx + ADy * ADy;
			
			if (0 < AMdotAB && AMdotAB < ABdotAB && 0 < AMdotAD && AMdotAD < ADdotAD && joueurs[i].status !== 'mort') {
				
                explosion(joueurs[i].x,joueurs[i].y);
				joueurs[i].status = 'mort';
                projectiles.splice(this.id, 0, 'explosé');
                projectiles.splice(this.id+1, 1);
				
				//delai d'attente pour verifier que le joueur ne va pas mourir
				setTimeout(function () {
                    clearInterval(run);
                    if (joueurs[0].status === 'mort' && joueurs[1].status !== 'mort') {
                        joueurs[1].score += 1;
                        console.log('joueur 2 scored');
                    } else if (joueurs[1].status === 'mort' && joueurs[0].status !== 'mort'){
                        joueurs[0].score += 1;
                        console.log('joueur 1 scored');
                    }
                    showMenu();
                }, 3000);
				
			}
			
		}
		
	};
	
	this.test_collision = function() {
		
		for(var i = 0;i < map.length;i++){
			
			for(var j = 0;j < map[i].faces.length;j++){
				
				var face = map[i].faces[j];
				
				
				//Ancien systeme de colision
				//if( /*(face.orientation === "vertical") &&*/ (this.x <= (face.debut["x"] + erreur)) && (this.x >= (face.debut["x"] - erreur)) && (this.y >= face.debut["y"]) && (this.y <= face.fin["y"]) ){
				//	
				//	this.rebond(face.orientation);
				//	
				//	/*if(this.y > face.debut["y"]){
				//		this.y = face.debut["y"] + 1;
				//	}else if(this.y < face.debut["y"]){
				//		this.y = face.debut["y"] - 1;
				//	}*/
				//	
				//}
				//
				//if( /*(face.orientation === "horizontal") &&*/ (this.y <= (face.debut["y"] + erreur)) && (this.y >= (face.debut["y"] - erreur)) && (this.x >= face.debut["x"]) && (this.x <= face.fin["x"]) ){
				//	
				//	this.rebond(face.orientation);
				//	
				//	/*if(this.y > face.debut["y"]){
				//		this.y = face.debut["y"] + 1;
				//	}else if(this.y < face.debut["y"]){
				//		this.y = face.debut["y"] - 1;
				//	}*/
				//	
				//}
				
				if(face.orientation === "vertical"){
					
					if((this.y >= face.debut["y"]) && (this.y <= face.fin["y"])){
						
						if(this.x_precedent < face.debut["x"]){
							
							if(this.x >= face.debut["x"]){
								this.x = face.debut["x"] - 5;
								this.rebond(face.orientation);
							}
							
						}else if(this.x_precedent > face.debut["x"]){
							
							if(this.x <= face.debut["x"]){
								this.x = face.debut["x"] + 5;
								this.rebond(face.orientation);
							}
							
						}
						
					}
					
				}
				
				if(face.orientation === "horizontal"){
					
					if((this.x >= face.debut["x"]) && (this.x <= face.fin["x"])){
						
						if(this.y_precedent < face.debut["y"]){
							
							if(this.y >= face.debut["y"]){
								this.y = face.debut["y"] - 5;
								this.rebond(face.orientation);
							}
							
						}else if(this.y_precedent > face.debut["y"]){
							
							if(this.y <= face.debut["y"]){
								this.y = face.debut["y"] + 5;
								this.rebond(face.orientation);
							}
							
						}
						
					}
					
				}
				
			}
			
		}
		
	};
};

