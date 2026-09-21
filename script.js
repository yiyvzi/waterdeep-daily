document.querySelectorAll('a[href="#read"]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});

document.querySelectorAll('a[href="index.html"], a[href="archive.html"], a[href="people.html"], a[href="people-volume-two.html"], a[href="places.html"], a[href^="factions"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const destination = link.getAttribute('href').split('#')[0];
    const isArchivePage = ['archive.html', 'people.html', 'people-volume-two.html', 'places.html', 'factions.html', 'factions-guilds.html', 'factions-secret-societies.html', 'factions-criminal-networks.html'].includes(destination);
    const isDossierPage = ['people.html', 'people-volume-two.html', 'places.html', 'factions.html', 'factions-guilds.html', 'factions-secret-societies.html', 'factions-criminal-networks.html'].includes(destination);
    const isArchiveToPaper = destination === 'index.html' && document.querySelector('.archive-shell');
    const isPaperToArchive = destination === 'archive.html' && document.querySelector('.masthead');
    if (isArchivePage) sessionStorage.setItem('archive-transition', 'archive-entry');
    if (isArchiveToPaper) sessionStorage.setItem('archive-transition', 'paper-entry');
    document.body.classList.add('is-page-leaving');
    if (isDossierPage) document.body.classList.add('is-person-page-leaving');
    if (isArchiveToPaper) document.body.classList.add('is-archive-to-paper-leaving');
    if (isPaperToArchive) document.body.classList.add('is-paper-to-archive-leaving');
    const hasArchivePaperTransition = isArchiveToPaper || isPaperToArchive;
    const departureDuration = hasArchivePaperTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 430 : 170;
    window.setTimeout(() => { window.location.href = link.href; }, departureDuration);
  });
});

const archiveTransition = sessionStorage.getItem('archive-transition');

if (archiveTransition === 'archive-entry') {
  if (document.body.classList.contains('people-page')) document.body.classList.add('is-person-dossier-arrival');
  if (document.body.classList.contains('places-page')) document.body.classList.add('is-place-dossier-arrival');
  if (document.body.classList.contains('factions-page')) document.body.classList.add('is-faction-dossier-arrival');
  if (document.querySelector('.archive-shell')) document.body.classList.add('is-archive-arrival');
  sessionStorage.removeItem('archive-transition');
}

if (archiveTransition === 'paper-entry') {
  document.body.classList.add('is-newspaper-arrival');
  document.documentElement.classList.remove('is-newspaper-entry-pending');
  sessionStorage.removeItem('archive-transition');
}

document.querySelectorAll('.person-drawer, .place-drawer, .faction-drawer').forEach((drawer) => {
  const summary = drawer.querySelector('summary');
  const toggle = drawer.querySelector('.drawer-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reducedMotion ? 1 : 540;

  const setToggleLabel = (label) => {
    if (toggle) toggle.textContent = label;
  };

  setToggleLabel(drawer.open ? '收起档案 −' : '抽出档案 +');

  summary.addEventListener('click', (event) => {
    event.preventDefault();
    if (drawer.classList.contains('is-closing')) return;

    if (drawer.open) {
      drawer.classList.add('is-closing');
      setToggleLabel('收纳档案 ···');
      window.setTimeout(() => {
        drawer.open = false;
        drawer.classList.remove('is-closing');
        setToggleLabel('抽出档案 +');
      }, duration);
      return;
    }

    drawer.open = true;
    drawer.classList.add('is-opening');
    setToggleLabel('收起档案 −');
    window.setTimeout(() => drawer.classList.remove('is-opening'), duration);
  });
});
