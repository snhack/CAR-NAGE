/* Fonction bordures de la map */

function bordureMap(array) {
    array[0] = new Mur('vertical', largeurMur/2, 0, hCan);
    array[1] = new Mur('horizontal', 0, largeurMur/2, wCan);
    array[2] = new Mur('vertical', hCan-(largeurMur/2), 0, hCan);
    array[3] = new Mur('horizontal', 0, wCan-(largeurMur/2), wCan);
}

/* Map de développement */

var devMap = [];
bordureMap(devMap);

//Labyrinthe de la map
devMap[4] = new Mur('vertical', prct(50,'x'), 0, prct(50,'y'));
devMap[5] = new Mur('horizontal', 0, prct(25,'y'), prct(25,'x'));
devMap[6] = new Mur('horizontal', prct(20,'x'), prct(70, 'y'), prct(80,'x'));

/* Générateur de map aléatoire */

/*
TODO : améliorer les règles pour les murs aléatoires
*/

//D'abord les règles (taille couloirs...), et les variables
var mapAleatoire = [],
    nbMurs = {min:10,max:20},
    tailleCouloirs = prct(10, 'x'),
    aleaHorizontal = {x:[],y:[],orientation:'horizontal'},
    aleaVertical = {x:[],y:[],orientation:'vertical'};


function coordoPossibles(object) {
    var temp = prct(0,'x');
    if(object.orientation === 'vertical') {
        for(var i = 0; i < 10; i++){
            temp = tailleCouloirs * i;
            object.x.push(temp);
            object.y.push(temp);
        }
    } else if (object.orientation === 'horizontal'){
        for(var j = 0; j < 10; j++){
            temp = tailleCouloirs * j;
            object.x.push(temp);
            object.y.push(temp);
        }
    }
}
//La fonction de création de la map aléatoire V1
function creationMapAleatoire() {
    console.log('***Génération de la map aléatoire***');
    mapAleatoire = [];
    coordoPossibles(aleaHorizontal);
    coordoPossibles(aleaVertical);
    bordureMap(mapAleatoire);
    for (var i = 4; i < nbAlea(nbMurs.min+4, nbMurs.max+4); i++) {
        var z = nbAlea(1, 2),
                orientation,
                x,
                y,
                l;
        if (z === 1) {
            orientation = 'vertical';
            x = aleaVertical.x[nbAlea(0,aleaVertical.x.length)];
            y = aleaVertical.y[nbAlea(0,aleaVertical.y.length)];
            l = nbAlea(prct(10,'y'), prct(70,'y'));
        } else if (z === 2) {
            orientation = 'horizontal';
            x = aleaHorizontal.x[nbAlea(0,aleaHorizontal.x.length)];
            y = aleaHorizontal.y[nbAlea(0,aleaHorizontal.y.length)];
            l = nbAlea(prct(10,'x'), prct(70,'x'));
        }
        mapAleatoire[i] = new Mur(orientation,x,y,l);
    }
    map = mapAleatoire;
}

//Pourcentage des longueurs en fonction de l'axe
function prct(x,axe){
    if(axe === 'x'){return wCan/100 * x;}
    else if(axe === 'y'){return hCan/100 * x;}
}
//Random entier dans une intervalle donnée
function nbAlea(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

//Console log
console.log(devMap);



