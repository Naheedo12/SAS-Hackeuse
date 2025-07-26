const btn1 = document.getElementById("Ajouter");
const champSaisie = document.getElementById("champSaisie");
const ul = document.getElementById("liste");

btn1.addEventListener("click", function () {
  if (champSaisie.value != "") {
    const li = document.createElement("li");
    
    const textDiv = document.createElement("span"); // texte de la tâche
    textDiv.textContent = champSaisie.value;

    textDiv.addEventListener("click", function () {     // barrer au clic
      textDiv.classList.toggle("completed");
    });

    const btn2 = document.createElement("button");     // boutton supprimer
    btn2.textContent = "Supprimer";
    btn2.classList.add("delete-btn");
    btn2.addEventListener("click", function () {
      li.remove();
    });

    li.append(textDiv);
    li.append(btn2);

    ul.append(li);

    champSaisie.value = "";
  }
});

