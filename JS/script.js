/* variables globales */
var hauteur = 800;
var largeur = 800;
var map = [];

document.getElementById("background").style.height = hauteur+"px";
document.getElementById("background").style.width = largeur+"px";

var vitesse_deplacement_standard = 10;
var vitesse_rotation_standard = 10;
var delai_tir_standard = 0;

var longueur_joueur = 100;
var largeur_joueur = 50;

var nombre_joueurs = 0;
var joueurs = [];
var projectiles = [];


//On prend le contexte 2d du canvas
var canvas = document.getElementById("background"),
    context = canvas.getContext("2d"),
    hCan = parseFloat(canvas.getAttribute('height')),
    wCan = parseFloat(canvas.getAttribute('width'));

//Fonction d'affichage des murs suivant la map
function affichageMurs(array) {
    context.clearRect(0,0,wCan,hCan);
    context.fillStyle = 'black';
    for(var i = 0; i < array.length; i++){
        context.fillRect(array[i].rectX, array[i].rectY, array[i].w, array[i].h);
    }
}

//Action des boutons
document.getElementById('btnMapAlea').onclick = function () {
    creationMapAleatoire();
};
document.getElementById('btnDevMap').onclick = function () {
    affichageMurs(devMap);
    map = devMap;
};


/* liste des codes des touche de jeu par defaut [joueur1,joueur2] */
var touche_haut_standard = [38,90];
var touche_bas_standard = [40,83];
var touche_gauche_standard = [37,81];
var touche_droite_standard = [39,68];
var touche_tir_standard = [18,65];

/* Tableau stockant les touches en cours d'appui */
var touches = [];

/* A l'appui d'une touche, on l'ajoute dans le tableau */
document.addEventListener("keydown", function(event){
	if(touches.indexOf(event.keyCode) < 0){
		touches.push(event.keyCode);
	}
}, false);

/* Au relachement de la touche, on la retire du tableau */
document.addEventListener("keyup", function(event){
	if(touches.indexOf(event.keyCode) >= 0){
		touches.splice(touches.indexOf(event.keyCode), 1);
	}
}, false);

/* Initialisation, a la fin du chargement du DOM */
document.addEventListener("DOMContentLoaded", function() {
	map = devMap;
	affichageMurs(devMap);
	joueurs = [creation_joueur(), creation_joueur()];
	var run = window.setInterval(maj,25);
	
});