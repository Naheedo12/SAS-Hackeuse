const form = document.querySelector("form");
const inputTitle = document.querySelectorAll(".prjt_desc")[0];
const inputDesc = document.querySelectorAll(".prjt_desc")[1];
const inputUrl = document.getElementById("url_img");

const projectsContainer = document.createElement("div");  // Créer dynamiquement un div
projectsContainer.classList.add("projects-container");
document.querySelector("section").appendChild(projectsContainer);

function afficherProjects() {   // Fct d'aff des prjts
  axios.get("http://localhost:4000/projets")
    .then(res => {
      projectsContainer.innerHTML = ""; // Vider avant d’ajouter
      res.data.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("card-item");
        card.innerHTML = `
          <img src="${project.url}" alt="${project.title}" style="width:100%; border-radius:8px; max-height:200px; object-fit:cover;">
          <h3>${project.title}</h3>
          <p>${project.desc}</p>
          <button class="btn-delete" data-id="${project.id}">Supprimer</button>
          

        `;
        projectsContainer.appendChild(card);
      });

      // add event to all btns delete
      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          supprimerProject(id);
        });
      });
    })
    .catch(err => console.error("Erreur lors de l'affichage :", err));
}

form.addEventListener("submit", (e) => {    // Fct to add prjts
  e.preventDefault();

  const newProject = {
    title: inputTitle.value,
    desc: inputDesc.value,
    url: inputUrl.value
  };

  axios.post("http://localhost:4000/projets", newProject)
    .then(() => {
      form.reset();
      afficherProjects();
    })
    .catch(err => console.error("Erreur lors de l'ajout :", err));
});

function supprimerProject(id) {   // Fct to delete prjcts
  axios.delete(`http://localhost:4000/projets/${id}`)
    .then(() => afficherProjects())
    .catch(err => console.error("Erreur lors de la suppression :", err));
}

// Aff les prjts deja existants
afficherProjects();
