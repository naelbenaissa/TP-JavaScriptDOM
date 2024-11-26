document.addEventListener('DOMContentLoaded', () => {
  chargerDefinitions();
  chargerCdpEtK();

  document.getElementById('calculer-btn').addEventListener('click', calculerCD);
});


let cdpValues = [];
let kValues = [];

async function chargerDefinitions() {
  const response = await fetch("https://simpleeweb.com/a2024/pwd/tp2/definition_forces.php");
  const data = await response.json();
  const forcesList = document.getElementById("forces-list");
  data.definition_forces.forEach(force => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${force.force} :</strong> ${force.definition}`;
    forcesList.appendChild(li);
  });
}

async function chargerCdpEtK() {
  const response = await fetch("https://simpleeweb.com/a2024/pwd/tp2/data_cdp_k.php");
  const data = await response.json();
  cdpValues = data.data_cdp_k.cdp;
  kValues = data.data_cdp_k.k;
}

function calculerCD() {
  const flap = parseInt(document.getElementById("flap").value);
  const mach = parseFloat(document.getElementById("mach").value);
  const cl = parseFloat(document.getElementById("cl").value);
  const resultat = document.getElementById("resultat");

  if (isNaN(flap) || isNaN(mach) || isNaN(cl)) {
    resultat.textContent = "Tous les champs doivent être remplis avec des valeurs valides.";
    return;
  }
  if (mach < 0 || mach > 0.85) {
    resultat.textContent = "Le nombre de Mach doit être entre 0 et 0.85.";
    return;
  }
  if (cl < 0.2 || cl > 1.2) {
    resultat.textContent = "Le coefficient de portance doit être entre 0.2 et 1.2.";
    return;
  }

  const index = flap === 0 ? 0 : flap === 20 ? 1 : 2;
  const CDp = cdpValues[index];
  const K = kValues[index];

  let CDcomp = 0;
  if (mach > 0.6 && mach <= 0.78) {
    CDcomp = (0.0508 - 0.1748 * mach + 0.1504 * mach ** 2) * cl ** 2;
  } else if (mach > 0.78 && mach <= 0.85) {
    CDcomp = (-99.3434 + 380.888 * mach - 486.8 * mach ** 2 + 207.408 * mach ** 3) * cl ** 2;
  }

  const CD = CDp + K * cl ** 2 + CDcomp;
  resultat.textContent = `Le coefficient de traînée (CD) est : ${CD.toFixed(4)}`;
}
