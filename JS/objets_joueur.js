var joueur = function(id, couleur, x, y) {
	
	this.id = id;
    this.couleur = couleur;
	this.x = x;
	this.y = y;
	this.angle = 0;
	this.status = 'ok';
	
	this.vitesse_deplacement = vitesse_deplacement_standard;
	this.vitesse_rotation = vitesse_deplacement_standard;
	this.delai_tir = delai_tir_standard;
	
	this.dernier_tir = 0;
	
	this.touche_haut = touche_haut_standard[id];
	this.touche_bas = touche_bas_standard[id];
	this.touche_gauche = touche_gauche_standard[id];
	this.touche_droite = touche_droite_standard[id];
	this.touche_tir = touche_tir_standard[id];

	
	this.rotation_gauche = function() {
		this.angle -= this.vitesse_rotation;
		this.reset_angle();
	};
	
	this.rotation_droite = function() {
		this.angle += this.vitesse_rotation;
		this.reset_angle();
	};
	
	this.avancer = function() {
		
		var nouveau_x = this.x + Math.cos((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement;
		var nouveau_y = this.y + Math.sin((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement;
		
		if(this.test_collision(nouveau_x, nouveau_y)){
			this.x = nouveau_x;
			this.y = nouveau_y;
		}
		
	};
	
	this.reculer = function() {
		
		var nouveau_x = this.x - Math.cos((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement;
		var nouveau_y = this.y - Math.sin((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement;
		
		if(this.test_collision(nouveau_x, nouveau_y)){
			this.x = Math.round(nouveau_x);
			this.y = Math.round(nouveau_y);
		}
		
	};
	
	this.reset_angle = function() {
		
		if(this.angle < 0){
			this.angle += 360;
		}else if(this.angle >= 360){
			this.angle -= 360;
		}
		
	};
	
	this.calcul_hitbox = function(canon) {
		
		var angle_reference = (this.angle - 90);
		var l = longueur_joueur;
		var L = largeur_joueur;

		if(canon === true) {
            l = longueur_joueur/3;
            L = largeur_joueur/3;
        }
		
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
			coins[i].x = this.x + ( Math.cos(angles[i]) * diagonale );
            coins[i].y = this.y + ( Math.sin(angles[i]) * diagonale );
		}
		
		return coins;
		
	};
	
	this.test_collision = function(nouveau_x,nouveau_y) {

		
		for(var i = 0;i < map.length;i++){
			
			for(var j = 0;j < map[i].faces.length;j++){
				
				var face = map[i].faces[j];
				
				/*for(var k = 0;k < coins_joueur.length;k++){
					
					var espace = 2;
					
					if( (face.orientation === "vertical") && (coins_joueur[k]["x"] < (face.debut["x"] + espace)) && (coins_joueur[k]["x"] > (face.debut["x"] - espace)) && (coins_joueur[k]["y"] >= face.debut["y"]) && (coins_joueur[k]["y"] <= face.fin["y"]) ){
						
						return false;
						
					}else if( (face.orientation === "horizontal") && (coins_joueur[k]["y"] < (face.debut["y"] + espace)) && (coins_joueur[k]["y"] > (face.debut["y"] - espace)) && (coins_joueur[k]["x"] >= face.debut["x"]) && (coins_joueur[k]["x"] <= face.fin["x"]) ){
						
						return false;
						
					}
					
				}*/
				
				/*for(var k = 0;k < coins_joueur.length;k++){
					
					if(face.orientation === "vertical"){
						
						if((this.y >= face.debut["y"]) && (this.y <= face.fin["y"])){
							
							if(this.x_precedent < face.debut["x"]){
								
								if(this.x >= face.debut["x"]){
									this.x = face.debut["x"];
									this.rebond(face.orientation);
								}
								
							}else if(this.x_precedent > face.debut["x"]){
								
								if(this.x <= face.debut["x"]){
									this.x = face.debut["x"];
									this.rebond(face.orientation);
								}
								
							}
							
						}
						
					}
					
					if(face.orientation === "horizontal"){
						
						if((this.x >= face.debut["x"]) && (this.x <= face.fin["x"])){
							
							if(this.y_precedent < face.debut["y"]){
								
								if(this.y >= face.debut["y"]){
									this.y = face.debut["y"];
									this.rebond(face.orientation);
								}
								
							}else if(this.y_precedent > face.debut["y"]){
								
								if(this.y <= face.debut["y"]){
									this.y = face.debut["y"];
									this.rebond(face.orientation);
								}
								
							}
							
						}
						
					}
					
				}*/
				
				
				if( (face.orientation === "vertical") && (nouveau_x < (face.debut["x"] + 7)) && (nouveau_x > (face.debut["x"] - 7)) && (nouveau_y >= face.debut["y"]) && (nouveau_y <= face.fin["y"]) ){
					
					
					
					return false;
					
				}else if( (face.orientation === "horizontal") && (nouveau_y < (face.debut["y"] + 7)) && (nouveau_y > (face.debut["y"] - 7)) && (nouveau_x >= face.debut["x"]) && (nouveau_x <= face.fin["x"]) ){
					
					return false;
					
				}
				
			}
			
		}
		
		return true;
		
	};
	
	this.tir = function() {
		
		if(this.dernier_tir <= (Date.now() - (this.delai_tir * 1000))){
			
			var nouveau_x = this.x + Math.cos((this.angle-90)*(Math.PI/180)) * 50;
			var nouveau_y = this.y + Math.sin((this.angle-90)*(Math.PI/180)) * 50;
			
			projectiles.push(new projectile(nouveau_x, nouveau_y, this.angle));
			this.dernier_tir = Date.now();
		}
		
	}
	
};

var projectile = function(x, y, angle) {
	
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
		this.x_precedent = this.x;
		this.y_precedent = this.y;
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
			
			var angles = joueurs[i].calcul_hitbox(false);
			
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
			
			if (0 < AMdotAB && AMdotAB < ABdotAB && 0 < AMdotAD && AMdotAD < ADdotAD) {

                var img = new Image();
                img.src = 'img/explosion.png';
                context.save();
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.translate(joueurs[i].x,joueurs[i].y);
                context.drawImage(img,-100,-100, 200, 200);
                context.restore();
				joueurs[i].status = 'mort';
				setTimeout(function () {
                    clearInterval(run);
                    showMenu();
                    for(var i = 0; i < joueurs.length; i++){
                        if (joueurs[0].status === 'mort' && joueurs[1].status !== 'mort') {
                            joueurs[1].score += 1;
                        } else if (joueurs[1].status === 'mort' && joueurs[0].status !== 'mort'){
                            joueurs[0].score += 1;
                        }
                    }
                }, 3000);

			}
			
		}
		
	};
	
	this.test_collision = function() {
		
		//var erreur = 10;
		
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