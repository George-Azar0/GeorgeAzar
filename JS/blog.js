const posts = [
  {
    id: "brocode-voortgang",
    title: "wat de BroCode-cursus me tot nu toe leerde",
    date: "2026-09-20",
    category: "programming",
    excerpt: "Een tussenstand van mijn voortgang in de BroCode HTML/CSS-cursus, en welke onderdelen ik direct kon toepassen in mijn eigen portfoliosite"
  },
  {
    id: "responsive-verrassing",
    title: "Waarom een liggende telefoon mijn breekpunten in de war schopte",
    date: "2026-09-14",
    category: "responsive",
    excerpt: "Ik dacht dat responsive design alleen over schermbreedte ging, tot ik mijn site op een liggende telefoon testte en merkte dat dat niet klopte"
  },
  {
    id: "debug-verhaal",
    title: "Een hoofdletter die mijn afbeelding een dag kostte",
    date: "2026-09-12",
    category: "debuggen",
    excerpt: "Een decoratieve afbeelding die lokaal prima laadde, maar op GitHub Pages ineens niet meer — het verschil bleek te zitten in hoofdlettergevoeligheid"
  }
];

// Bouwt ÉÉN blogpost-kaart
function createPostCard(post) {
  const article = document.createElement("article");
  article.className = "card post";

  const title = document.createElement("h3");
  title.textContent = post.title;

  const meta = document.createElement("p");
  meta.className = "meta";
  const time = document.createElement("time");
  time.dateTime = post.date;
  time.textContent = new Date(post.date).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  meta.appendChild(time);

  const excerpt = document.createElement("p");
  excerpt.textContent = post.excerpt;

  article.append(title, meta, excerpt);
  return article;
}

// Rendert een lijst posts in de container
function renderPosts(list) {
  const container = document.getElementById("post-list");
  container.innerHTML = "";
  list.forEach((post) => {
    container.appendChild(createPostCard(post));
  });
}

// Filtert de data op categorie
function filterPostsByCategory(category) {
  if (category === "all") return posts;
  return posts.filter((post) => post.category === category);
}

// Verzamelt unieke categorieën voor de filterknoppen
function getUniqueCategories(list) {
  return [...new Set(list.map((post) => post.category))];
}

// Leesbare labels voor de knoppen 
function formatCategoryLabel(category) {
  const labels = {
    all: "Alle posts",
    programming: "Programming",
    responsive: "Responsive design",
    debuggen: "Debuggen"
  };
  return labels[category] ?? category;
}

// Bouwt de filterknoppen en koppelt de click-events
function renderFilterButtons() {
  const container = document.getElementById("post-filters");
  const categories = ["all", ...getUniqueCategories(posts)];

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = formatCategoryLabel(category);
    button.addEventListener("click", () => {
      renderPosts(filterPostsByCategory(category));
    });
    container.appendChild(button);
  });
}
function initBlogPage() {
  renderFilterButtons();
  renderPosts(posts);
}

initBlogPage();