var menuMap = [];
var menuLoop;
var nbAleaPilotLoop;
var autoPilotLoop;
var tempo = [];
bordureMap(menuMap);

function showMenu() {
    clearInterval(menuLoop);
    clearInterval(autoPilotLoop);
    clearInterval(nbAleaPilotLoop);
    clearInterval(run);
    document.getElementById('btnNewGame').removeAttribute('hidden');
    joueurs[0].x = 500;
    joueurs[0].y = 700;
    joueurs[1].x = 300;
    joueurs[1].y = 700;
    menuLoop = setInterval(frameMenu, 25);
    nbAleaPilotLoop = setInterval(nbAleaPilot, 1000);
    autoPilotLoop = setInterval(autoPilot, 25);
}
function frameMenu() {
    affichageMurs(menuMap);
    affichageJoueurs();
    context.font = '50px Verdana';
    context.fillText('CAR TROUBLE', 100, 300);
}
function autoPilot() {
    for(var i = 0;i < joueurs.length;i++){
        if(tempo[i] < 99) {
            joueurs[i].avancer();
        }
        else {
            joueurs[i].reculer();
        }
    }
    for(var i = 0;i < joueurs.length;i++){
        if(tempo[i] > 90) {
            joueurs[i].rotation_droite();
        }
        else if(tempo[i] < 10){
            joueurs[i].rotation_gauche();
        }
    }
}
function nbAleaPilot() {
    for(var i = 0; i < joueurs.length; i++){
        tempo[i] = nbAlea(0,100);

    }
}