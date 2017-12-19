/* variables globales */
var hauteur = 800;
var largeur = 800;
var map = [];
var run;
var son = document.getElementById('son');
document.getElementById("background").style.height = hauteur+"px";
document.getElementById("background").style.width = largeur+"px";

var vitesse_deplacement_standard = 10;
var vitesse_rotation_standard = 10;
var delai_tir_standard = 1;


var largeur_joueur = 40;
var longueur_joueur = largeur_joueur*1.618033;
var diametreProjectile = 5;

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
    newGame();
};
document.getElementById('btnDevMap').onclick = function () {
    map = devMap;
    newGame();
};
document.getElementById('btnDevMap2').onclick = function () {
    map = devMap2;
    newGame();
    joueurs[0].x = 700;
    joueurs[0].y = 100;
    joueurs[1].x = 100;
    joueurs[1].y = 700;
};
document.getElementById('btnNewGame').onclick = function () {
    map = devMap;
    newGame();
};
document.getElementById('btnMenu').onclick = function () {
    showMenu();
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

function newGame() {
    document.getElementById('btnNewGame').setAttribute('hidden', 'true');
    clearInterval(menuLoop);
    clearInterval(autoPilotLoop);
    clearInterval(nbAleaPilotLoop);
    clearInterval(run);
    projectiles = [];
    touches = [];
    joueurs[0].angle = 0;
    joueurs[0].x = 300;
    joueurs[0].y = 300;
    joueurs[1].angle = 0;
    joueurs[1].x = 600;
    joueurs[1].y = 300;
    run = window.setInterval(maj,25);
}
document.addEventListener("DOMContentLoaded", function() {
    map = devMap;
    joueurs = [creation_joueur('orange',300,300), creation_joueur('blue',600,300)];
    showMenu();

});