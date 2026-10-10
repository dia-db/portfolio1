(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('open', open);
      toggle.innerHTML = open ? 'CLOSE <span>−</span>' : 'MENU <span>＋</span>';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = 'MENU <span>＋</span>';
    }));
  }

  const filters = document.querySelectorAll('.project-filters button');
  const projects = document.querySelectorAll('[data-category]');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    projects.forEach(project => {
      project.hidden = filter !== 'all' && project.dataset.category !== filter;
    });
  }));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section-label, .about-layout, .strengths article, .process-list article, .project, .minor-project, .experience-list article, .skill-column, .education-list article, .recognition li, .contact-inner > div').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });

  // Keep motion understated and functional; no decorative loading sequence.
  const skillObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); skillObserver.unobserve(entry.target); }
  }), { threshold: 0.25 });
  document.querySelectorAll('.skill-row').forEach(row => skillObserver.observe(row));
})();
