document.addEventListener('DOMContentLoaded', function () {
    fetch('https://simpleeweb.com/a2024/pwd/tp2/params_grille_nombres.php')
        .then(reponse => reponse.json())
        .then(donnees => {
            const params = donnees.parametres_tableau;
            const nombreColonnes = params.nombre_colonnes;
            const nombreLignes = params.nombre_lignes;
            const plageMin = params.plage_nombres_aleatoires.nombre_minimum;
            const plageMax = params.plage_nombres_aleatoires.nombre_maximum;
            const nombreBase = params.nombre_base;
            const couleurFondCellule = params.couleur_fond_cellule;
            const couleurTexteCellule = params.couleur_texte_cellule;

            function obtenirEntierAleatoire(min, max) {
                return _.random(min, max);
            }

            const conteneur = document.createElement('div');
            conteneur.style.alignItems = 'center';
            document.body.appendChild(conteneur);

            const titre = document.createElement('h1');
            titre.textContent = 'Tableau de nombres';
            conteneur.appendChild(titre);

            const tableau = document.createElement('table');
            tableau.style.borderCollapse = 'collapse';
            conteneur.appendChild(tableau);

            let compteurSup80 = 0;

            for (let indexLigne = 0; indexLigne < nombreLignes; indexLigne++) {
                const ligneTableau = tableau.insertRow();

                for (let indexColonne = 0; indexColonne < nombreColonnes; indexColonne++) {
                    const cellule = ligneTableau.insertCell();
                    const nombreAleatoire = obtenirEntierAleatoire(plageMin, plageMax);

                    cellule.textContent = nombreAleatoire;

                    cellule.style.border = '1px solid black';
                    cellule.style.paddingRight = '10px';
                    cellule.style.paddingLeft = '10px';
                    cellule.style.textAlign = 'center';

                    if (nombreAleatoire > nombreBase) {
                        cellule.style.backgroundColor = couleurFondCellule;
                        cellule.style.color = couleurTexteCellule;
                        compteurSup80++;
                    }
                }
            }

            const paragrapheBas = document.createElement('p');
            paragrapheBas.innerHTML = `Nombre de cellules avec un nombre supérieur à ${nombreBase} : <strong>${compteurSup80}</strong>`;
            conteneur.appendChild(paragrapheBas);
        })
        .catch(erreur => {
            console.error('Erreur :', erreur);
        });
});
