/* Variables */

var largeurMur = 10,
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