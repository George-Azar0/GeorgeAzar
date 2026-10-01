const projects = [
  {
    id: "eduklok",
    title: "Eduklok",
    tech: ["HTML5", "CSS3"],
    category: "team",
    image: "images/project-eduklok.png",
    alt: "Interface van Eduklok met een overzicht van studietijd per opdracht",
    description:
      "Dit project heb ik gemaakt met behulp van drie andere teamgenoten, dit is een applicatie die een student en docent kunnen gebruiken, de leerling kan kiezen wanneer ze gaan studeren en de app logt de tijd zelf bij elke opdracht, en een leerling kan met de tijdlog en bewijs een feedbackmoment met de docent vragen."
  },
  {
    id: "hotelsimulator",
    title: "Hotelsimulator",
    tech: ["Java"],
    category: "solo",
    image: "images/project-hotelsimulator.png",
    alt: "Kamerindeling-scherm van Hotelsimulator met een plattegrond van hotelkamers",
    description:
      "Dit project is bedoeld voor hotelowners, je kan hotelkamer layouts regelen en toepassen, het simuleert een echte hotel omgeving."
  }
];

// Bouwt een projectkaart 
function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "card project";

  const title = document.createElement("h2");
  title.textContent = project.title;

  const img = document.createElement("img");
  img.src = project.image;
  img.alt = project.alt;
  img.width = 320;
  img.height = 180;

  const desc = document.createElement("p");
  desc.textContent = project.description;

  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = project.tech.join(" · ");

  article.append(title, img, desc, meta);
  return article;
}

// Rendert een LIJST projecten in de container 
function renderProjects(list) {
  const container = document.getElementById("project-list");
  container.innerHTML = ""; // eerst leegmaken
  list.forEach((project) => {
    container.appendChild(createProjectCard(project));
  });
}

// Filtert de data 
function filterProjectsByTech(tech) {
  if (tech === "all") return projects;
  return projects.filter((project) => project.tech.includes(tech));
}

// Verzamelt alle unieke techs voor de filterknoppen 
function getUniqueTechs(list) {
  const alleTechs = list.flatMap((project) => project.tech);
  return [...new Set(alleTechs)];
}

// Bouwt de filterknoppen EN koppelt de click-events
function renderFilterButtons() {
  const container = document.getElementById("project-filters");
  const techs = ["all", ...getUniqueTechs(projects)];

  techs.forEach((tech) => {
    const button = document.createElement("button");
    button.textContent = tech === "all" ? "Alle projecten" : tech;
    button.addEventListener("click", () => {
      renderProjects(filterProjectsByTech(tech));
    });
    container.appendChild(button);
  });
}

function initProjectsPage() {
  renderFilterButtons();
  renderProjects(projects);
}

initProjectsPage();

