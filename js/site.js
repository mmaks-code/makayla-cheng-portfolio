(function () {
  const data = window.PORTFOLIO;
  if (!data) return;

  const page = document.body.dataset.page || "";
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const nav = document.getElementById("primary-nav");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    if (!toggle.getAttribute("aria-label")) {
      toggle.setAttribute("aria-label", "Open menu");
    }

    function setNavOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setNavOpen(false);
    });
  }

  if (page === "project" && nav) {
    const projectsLink = nav.querySelector('a[href="projects.html"]');
    if (projectsLink) projectsLink.setAttribute("aria-current", "page");
  }

  if (page === "projects") renderProjects();
  if (page === "project") renderProjectPage();
  if (page === "resume") initResume();

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function encodePath(path) {
    return String(path)
      .split("/")
      .map(function (part) {
        return encodeURIComponent(part);
      })
      .join("/");
  }

  function renderProjects() {
    const root = document.getElementById("project-categories");
    if (!root) return;

    root.innerHTML = data.categories
      .map(function (category) {
        const items = data.projects
          .filter(function (project) {
            return project.category === category.id;
          })
          .slice()
          .sort(function (a, b) {
            return (a.order || 0) - (b.order || 0);
          });
        const cards = items
          .map(function (project) {
            const thumb = project.thumbnail
              ? '<img src="' +
                escapeHtml(encodePath(project.thumbnail)) +
                '" alt="' +
                escapeHtml(project.title) +
                ' cover image"' +
                (project.thumbnailFit === "contain" ? ' class="is-contain"' : "") +
                ">"
              : '<div class="thumb-placeholder">Image coming soon</div>';
            return (
              '<a class="project-card" href="' +
              encodeURIComponent(project.slug) +
              '.html">' +
              '<div class="project-thumb">' +
              thumb +
              "</div>" +
              "<h3>" +
              escapeHtml(project.title) +
              "</h3>" +
              "</a>"
            );
          })
          .join("");

        return (
          '<section class="category-block" aria-labelledby="' +
          escapeHtml(category.id) +
          '-heading">' +
          '<h2 id="' +
          escapeHtml(category.id) +
          '-heading">' +
          escapeHtml(category.name) +
          "</h2>" +
          '<div class="thumb-grid">' +
          cards +
          "</div>" +
          "</section>"
        );
      })
      .join("");
  }

  function renderProjectPage() {
    const root = document.getElementById("project-detail");
    if (!root) return;

    const slug =
      document.body.dataset.project ||
      new URLSearchParams(window.location.search).get("id");
    const project = data.projects.find(function (item) {
      return item.slug === slug;
    });

    if (!project) {
      root.innerHTML =
        '<p class="lede">This project could not be found.</p>' +
        '<p><a class="back-link" href="projects.html">Back to Projects</a></p>';
      document.title = "Project not found | Makayla Cheng";
      return;
    }

    const category = data.categories.find(function (item) {
      return item.id === project.category;
    });

    document.title = project.title + " | Makayla Cheng";

    const sections = (project.sections || [])
      .map(function (section) {
        const items = (section.items || [])
          .map(function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
          })
          .join("");
        return (
          '<section class="project-section" id="' +
          escapeHtml(section.id) +
          '">' +
          "<h2>" +
          escapeHtml(section.title) +
          "</h2>" +
          (section.body ? "<p>" + escapeHtml(section.body) + "</p>" : "") +
          (items
            ? "<ul" + (section.id === "skills" ? ' class="skill-list"' : "") + ">" + items + "</ul>"
            : "") +
          "</section>"
        );
      })
      .join("");

    const gallery = project.gallery || [];
    const galleryItems = gallery
      .map(function (image) {
        const caption = image.caption || "Caption: add a description of this image.";
        return (
          "<figure>" +
          '<img src="' +
          escapeHtml(encodePath(image.src)) +
          '" alt="' +
          escapeHtml(image.caption || "Additional image for " + project.title) +
          '">' +
          "<figcaption>" +
          escapeHtml(caption) +
          "</figcaption>" +
          "</figure>"
        );
      })
      .join("");

    const docs = (project.documentation || [])
      .map(function (doc) {
        return (
          '<li><a href="' +
          escapeHtml(doc.href) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(doc.label) +
          "</a></li>"
        );
      })
      .join("");

    const hero = project.hero
      ? '<figure class="project-hero"><img src="' +
        escapeHtml(encodePath(project.hero)) +
        '" alt="' +
        escapeHtml(project.heroCaption || "Cover image for " + project.title) +
        '">' +
        (project.heroCaption
          ? "<figcaption>" + escapeHtml(project.heroCaption) + "</figcaption>"
          : "") +
        "</figure>"
      : '<div class="project-hero-placeholder">Cover image coming soon</div>';

    const video = project.video
      ? '<video class="project-video" controls preload="metadata" src="' +
        escapeHtml(encodePath(project.video)) +
        '"><a href="' +
        escapeHtml(encodePath(project.video)) +
        '">Open the project video</a></video>'
      : "";

    root.innerHTML =
      '<p><a class="back-link" href="projects.html">Back to Projects</a></p>' +
      (category ? '<p class="project-kicker">' + escapeHtml(category.name) + "</p>" : "") +
      "<h1>" +
      escapeHtml(project.title) +
      "</h1>" +
      (project.subtitle ? '<p class="project-subtitle">' + escapeHtml(project.subtitle) + "</p>" : "") +
      hero +
      sections +
      (galleryItems
        ? '<section class="project-section project-gallery-section" id="gallery"><h2>Project Gallery</h2><div class="project-gallery">' +
          galleryItems +
          "</div></section>"
        : "") +
      (video
        ? '<section class="project-section" id="video"><h2>Project Video</h2>' + video + "</section>"
        : "") +
      (docs
        ? '<section class="project-section" id="documentation"><h2>Supporting Documentation</h2><ul>' +
          docs +
          "</ul></section>"
        : "") +
      '<p><a class="back-link project-back-end" href="projects.html">Back to Projects</a></p>';
  }

  function initResume() {
    const frame = document.getElementById("resume-frame");
    const missing = document.getElementById("resume-missing");
    const path = (frame && frame.getAttribute("src")) || (data.person && data.person.resumePdf);
    if (!frame || !missing || !path) return;

    fetch(path, { method: "GET" })
      .then(function (response) {
        if (!response.ok) throw new Error("missing");
        frame.src = path;
        frame.hidden = false;
        missing.hidden = true;
      })
      .catch(function () {
        frame.removeAttribute("src");
        frame.hidden = true;
        missing.hidden = false;
      });
  }
})();
