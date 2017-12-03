/* Variables */

var largeurMur = 5,
    Murs = [];

/* Constructeur */

var Mur = function(orientation, x, y, l) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    if (orientation === 'vertical'){
        this.w = largeurMur;
        this.h = l;
        this.rectX = x - (largeurMur/2);
        this.rectY = y;
    } else if (orientation === 'horizontal') {
        this.w = l;
        this.h = largeurMur;
        this.rectX = x;
        this.rectY = y - (largeurMur/2);
    }
    this.faces = [];
    for(var i = 0; i < 4; i++){
        if(this.orientation === 'vertical') {
            var face;
            if(i === 0){ face = new Face(this.rectX, this.rectY, this.rectX+largeurMur, this.rectY, 'horizontal')}
            else if(i === 1){ face = new Face(this.rectX+largeurMur, this.rectY, this.rectX+largeurMur, this.rectY+l, 'vertical')}
            else if(i === 2){ face = new Face(this.rectX, this.rectY+l, this.rectX+largeurMur, this.rectY+l, 'horizontal')}
            else if(i === 3){ face = new Face(this.rectX, this.rectY, this.rectX, this.rectY+l, 'vertical')}
        } else if (this.orientation === 'horizontal'){
            if(i === 0){ face = new Face(this.rectX, this.rectY, this.rectX+l, this.rectY, 'horizontal')}
            else if(i === 1){ face = new Face(this.rectX+l, this.rectY, this.rectX+l, this.rectY+largeurMur, 'vertical')}
            else if(i === 2){ face = new Face(this.rectX, this.rectY+largeurMur, this.rectX+l, this.rectY+largeurMur, 'horizontal')}
            else if(i === 3){ face = new Face(this.rectX, this.rectY, this.rectX, this.rectY+largeurMur, 'vertical')}
        }
        this.faces.push(face);
    }
    Murs.push(this);
};

var Face = function (x1, y1, x2, y2, orientation) {
    this.debut = {x:x1,y:y1};
    this.fin = {x:x2,y:y2};
    this.orientation = orientation;
};

var joueur = function(id) {
	
	this.id = id;
	this.x = 300;
	this.y = 300;
	this.angle = 0;
	this.vitesse_deplacement = vitesse_deplacement_standard;
	this.vitesse_rotation = vitesse_deplacement_standard;
	this.delai_tir = delai_tir_standard;
	
	this.dernier_tir = 0;
	
	this.touche_haut = touche_haut_standard[id];
	this.touche_bas = touche_bas_standard[id];
	this.touche_gauche = touche_gauche_standard[id];
	this.touche_droite = touche_droite_standard[id];
	this.touche_tir = touche_tir_standard[id];
	
	this.css = function() {
		return document.getElementById("joueur_"+this.id.toString());
	};
	
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
		
		var test = this.test_collision(nouveau_x, nouveau_y);
		document.getElementById("btnMapAlea").innerHTML = test;
		
		if(test){
			this.x = nouveau_x;
			this.y = nouveau_y;
		}
		
	};
	
	this.reculer = function() {
		
		var nouveau_x = this.x - Math.cos((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement;
		var nouveau_y = this.y - Math.sin((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement;
		
		if(this.test_collision(nouveau_x, nouveau_y)){
			this.x = nouveau_x;
			this.y = nouveau_y;
		}
		
	};
	
	this.reset_angle = function() {
		
		if(this.angle < 0){
			this.angle += 360;
		}else if(this.angle >= 360){
			this.angle -= 360;
		}
		
	};
	
	this.test_collision = function(nouveau_x,nouveau_y) {
		
		for(var i = 0;i < map.length;i++){
			
			for(var j = 0;j < map[i].faces.length;j++){
				
				var face = map[i].faces[j];
				
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
			document.getElementById("map").innerHTML += "<div class='balle' id='balle_"+projectiles.length+"'></div>";
			projectiles.push(new projectile(this.x, this.y, this.angle));
			this.dernier_tir = Date.now();
		}
		
	}
	
};

var projectile = function(x, y, angle) {
	
	this.id = projectiles.length;
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.vitesse_deplacement = vitesse_deplacement_standard;
	this.nombre_rebond = 0;
	
	this.trajectoire = function() {
		this.x += Math.cos((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement;
		this.y += Math.sin((this.angle-90)*(Math.PI/180)) * this.vitesse_deplacement;
		this.test_collision();
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
	
	this.test_collision = function() {
		
		for(var i = 0;i < map.length;i++){
			
			for(var j = 0;j < map[i].faces.length;j++){
				
				var face = map[i].faces[j];
				
				if( (face.orientation === "vertical") && (this.x < (face.debut["x"] + 7)) && (this.x > (face.debut["x"] - 7)) && (this.y >= face.debut["y"]) && (this.y <= face.fin["y"]) ){
					
					this.rebond(face.orientation);
					
					/*if(this.y > face.debut["y"]){
						this.y = face.debut["y"] + 1;
					}else if(this.y < face.debut["y"]){
						this.y = face.debut["y"] - 1;
					}*/
					
				}
				
				if( (face.orientation === "horizontal") && (this.y < (face.debut["y"] + 7)) && (this.y > (face.debut["y"] - 7)) && (this.x >= face.debut["x"]) && (this.x <= face.fin["x"]) ){
					
					this.rebond(face.orientation);
					
					/*if(this.y > face.debut["y"]){
						this.y = face.debut["y"] + 1;
					}else if(this.y < face.debut["y"]){
						this.y = face.debut["y"] - 1;
					}*/
					
				}
				
			}
			
		}
		
	};
	
	this.css = function() {
		return document.getElementById("balle_"+this.id.toString());
	}
	
};