const doc = document; 
const myButton = doc.getElementById("myButton");// recuperation du button

myButton.addEventListener('click', function () { // fonction call back qui prends en évenement le click
    
    fetchPhotos() // quand cliquier alors executon de la fonction
            
            .then(respons => respons.json())// promises
            .then(respons2 => {
               
                afficheDatas(respons2);// appelle de la fonctiond d'affichage

            });
    
})
function fetchPhotos() { // appelle de l'api 
    return fetch('https://hp-api.onrender.com/api/characters/');//api HP
}



// FONCTION POUR SELECTIONNER LE PERSO
function personnage(data2) {
    let elts = doc.querySelectorAll("input"); 
    let nombrePerso = 25; 
    const personneVar = []
    let personnagesSpe = []


    
    
    //recup des infos du formulaire
    for (let index = 0; index < elts.length; index++) {
        if (elts[index].checked){
        personneVar.push(elts[index].value); 
        }

    }    
    console.log("Var du user :", personneVar);

    if (personneVar.length !== 4){
        alert("Remplissez tous les champs ! "); 
    }

    //recup des infos sur les 25 premiers perso
    for (let index2 = 0; index2 < 25 ; index2++) {
        personnagesSpe.push(data2[index2]);
    }
    console.log("Valeurs de tous les perso ", personnagesSpe);

    //création des listes qui vont être remplie par les personnages correspondants aux champs
    let persoGenre = [];
    let persoYeux = [];
    let persoCheveux = [];
    let persoMaison = [];


    //boucle pour trouver LE/LES persos
    while (persoYeux.length !== 1 || persoCheveux.length !== 1 || persoMaison.length !==1) {
        console.log(persoYeux.length);
        /* pb rencontré avec la méthode slice(), je voulais supprimer de la liste personnageSpe les persos qui ne correspondaient
        pas aux if, le problème est que ça supprimait des perso random... Donc je créer une liste pour chaques if, ce qui est plus
        groumand en mémoir, mais fonctionnel*/

        //choix maison
        for (let indexYeux = 0; indexYeux < personnagesSpe.length; indexYeux++) {
            if (personnagesSpe[indexYeux]['house'] === personneVar[3]){
                persoMaison.push(personnagesSpe[indexYeux]); // push dans un tab les personnes qui correspondent                
            }

            
        }  
        console.log("apres maison", persoMaison);
       
        // homme ou femme
        for (let indexYeux = 0; indexYeux < persoMaison.length; indexYeux++) {

        
            if (persoMaison[indexYeux]['gender'] === personneVar[2]){
                persoGenre.push(persoMaison[indexYeux]);
                
                
            }

        }  
        //cas ou il n'y a aucune personnes du genre voulu dans dans la maison 
        console.log("APRES GENRE", persoGenre)
        if (persoGenre.length === 0){
            return persoMaison;
        }

         //choisir les cheveux
        for (let indexYeux = 0; indexYeux < persoGenre.length; indexYeux++) {
            
            if (persoGenre[indexYeux]['hairColour'] === personneVar[1]){
                persoCheveux.push(persoGenre[indexYeux]);
                
                
            }
        }  
        console.log("apres cheveux", persoCheveux);
        if (persoCheveux.length === 0){
            return persoGenre;
        }
        //choix de la couleur des yeux 
        for (let indexYeux = 0; indexYeux < persoCheveux.length; indexYeux++) {
            
            //cas ou s'est voldemord (le seul aux yeux rouge)
            if (personneVar[0]=== 'red'){
                persoYeux.push(personnagesSpe[16]);
                return persoYeux; 
                
            }
            if (persoCheveux[indexYeux]['eyeColour'] === personneVar[0]){
                persoYeux.push(persoCheveux[indexYeux]);
                console.log("YEUX COULEUR",persoCheveux[indexYeux]['eyeColour']);
               

            }
 
        } 
        console.log("apres yeux", persoYeux);

        //cas ou il n'y aucune personnes avec les yeux choisi qui correspond à tous les arguments d'avant
        if (persoYeux.length === 0){
            return persoCheveux;
        }

        //si à passer tous les if alors dans tous les cas renvoie la liste + arrête le while
        return persoYeux;
       
    }
    
   

}


function sorcierOuPas(sorcier) {
    
}


/// FONCTIOND d'AFFICHAGE DANS LE MODAL 
function afficheDatas(dataEntre) {//fonction d'affichage 
                const ici = document.getElementById('ici');// recupération de l'id ou ça va être écrit
                let nomaAfficher= "";// variable qui va être remplie par les info
                const data = personnage(dataEntre); // liste des persos restant après le formulaire
                const randomPerso = Math.floor(Math.random() * data.length);//Choisir un perso random si il y en a pls dans la liste
                
                //stockage du html dans une variable qui va être renvoyé avec un innerHtml par la suite.

                nomaAfficher += "<img src='"+data[randomPerso]['image']+"'>"+ // remplissage de la variable qui va être envoyé à l'ID ici avec les infos voulus (photo/nom/sorcier ou pas)
                "<div class='containerBis'>"+
                "<h3><b>"+data[randomPerso]['name']+"</b></h3>"+
                "<p class='under'> Anneé de naissance : </p><p>"+data[randomPerso]['yearOfBirth']+"</p>";
                if (data[randomPerso]['wizard'] === true ){ // verification si c'est un sorcier ou non 
                    nomaAfficher+= "<p class='under'>Type : </p><p>Sorcier</p>";
                }
                else {
                    nomaAfficher+= "<p class='under'>Type : </p><p>Moldu</p>";

                }

                if (data[randomPerso]['house'] === "Gryffindor") {
                    
                    doc.getElementById("ici").style.backgroundColor='rgba(254, 73, 73, 1)';
                    nomaAfficher+= "<p class='under'> Maison :</p><p>Gryffondor<img src='Blason_Gryffondor.svg.png' alt='Blason_Gryffondor'></p>"; 
                }
                else if (data[randomPerso]['house']=== "Hufflepuff") {
                    doc.getElementById("ici").style.backgroundColor='#fceb00';
                    nomaAfficher+= "<p class='under'> Maison :</p><p>Poufsouffle<img src='Hufflepuff.svg.png' alt='Blason_Poufsouffle'></p>"; 
                }
                else if (data[randomPerso]['house']=== "Ravenclaw") {
                    doc.getElementById("ici").style.backgroundColor='#3a6efe';
                    nomaAfficher+= "<p class='under'> Maison :</p><p>Serdaigle<img src='Blason_Serdaigle.svg.png' alt='Blason_Serdaigle'></p>"; 
                }
                else {
                    doc.getElementById("ici").style.backgroundColor='#1e9400';
                    nomaAfficher+= "<p class='under'> Maison :</p><p>Serpentard<img src='Blason_Serpentard.svg.png' alt='Blason_Serpentard'></p>"; 
                }
                nomaAfficher+= "<p class='under' >Acteur/trisse dans le film : </p><p>"+data[randomPerso]['actor']+'</p></div>';
                ici.innerHTML = nomaAfficher; // ajout de la variable remplie au dessus à l'ID "ici"
                
               
    
                
            }



/// FONCTION MODAL 
//MODAL
let modal = document.getElementById("myModal");
let btnModal = document.getElementById("myButton"); // l'ouvrir
let spanModal = document.getElementsByClassName("close")[0];//le fermer


// When the user clicks the button, open the modal 
btnModal.onclick = function() {

    setTimeout(() => {   modal.style.display = "block"; }, 500);
   
  }

// When the user clicks on <span> (x), close the modal
spanModal.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
