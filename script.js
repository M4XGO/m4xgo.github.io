const doc = document; 
const myButton = doc.getElementById("myButton");// recuperation du button

myButton.addEventListener('click', function () { // fonction call back qui prends en évenement le click
    fetchPhotos() // quand cliquier alors executon de la fonction
            
            .then(respons => respons.json())// promises
            .then(respons2 => {
                console.log(respons2); // affichage dans la console de ce qui est renvoyé par l'api
                afficheDatas(respons2);// appelle de la fonctiond d'affichage
            });

})
function fetchPhotos() { // appelle de l'api 
    return fetch('https://hp-api.onrender.com/api/characters/');//api HP
}




function afficheDatas(data) {//fonction d'affichage 
                const ici = document.getElementById('ici');// recupération de l'id ou ça va être écrit
                let nomaAfficher= "";// variable qui va être remplie par les info
                const randomPerso = Math.floor(Math.random() * 25);//Choisir un perso random ==> il y a 400 perso mais que 25 on une photo
                console.log(randomPerso);
                
                /*if (data[randomPerso]['image'] === "" && data[randomPerso]['gender'] === "female"){//cas ou c'est une femme sans photo
                    nomaAfficher += "<img src='sorciere.png'><br>";
                }
                if (data[randomPerso]['image'] === "" && data[randomPerso]['gender'] === "male"){//cas ou c'est un homme sans photo
                    nomaAfficher += "<img src='sorcier.png'><br>"
                }*/ // que si il y a les 400 persos 
                nomaAfficher += "<img src='"+data[randomPerso]['image']+"'><br>"+ // remplissage de la variable qui va être envoyé à l'ID ici avec les infos voulus (photo/nom/sorcier ou pas)
                "<div class='containerBis'>"+
                "<h3><b>"+data[randomPerso]['name']+"</b></h3>"+
                "<p class='under'> Anneé de naissance : </p><p>"+data[randomPerso]['yearOfBirth']+"</p>";
                if (data[randomPerso]['wizard'] === true ){ // verification si c'est un sorcier ou non 
                    nomaAfficher+= "<p class='under'>Type : </p><p>Sorcier</p>";
                }
                else {
                    nomaAfficher+= "<p class='under'>Type : </p><p>Moldu</p>";

                }
                nomaAfficher+= "<p class='under'> Maison :</p><p>"+data[randomPerso]['house']+"</p>"+
                "<p class='under' >Acteur/trisse dans le film : </p><p>"+data[randomPerso]['actor']+'</p></div>';
                ici.innerHTML = nomaAfficher; // ajout de la variable remplie au dessus à l'ID "ici"
    
    
                
            }



