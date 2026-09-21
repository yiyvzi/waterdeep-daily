document.querySelectorAll('a[href="#read"]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});

document.addEventListener('click', (event) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!link || link.getAttribute('href') === '#read') return;
  link.classList.remove('is-link-activating');
  void link.offsetWidth;
  link.classList.add('is-link-activating');
  window.setTimeout(() => link.classList.remove('is-link-activating'), 400);
}, true);

document.querySelectorAll('a[href]').forEach((link) => {
  if (!/^[\w-]+\.html(?:#.*)?$/.test(link.getAttribute('href'))) return;
  link.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const destination = link.getAttribute('href').split('#')[0];
    const isArchivePage = ['archive.html', 'tailor.html', 'people.html', 'people-volume-two.html', 'people-volume-three.html', 'places.html', 'places-volume-two.html', 'places-volume-three.html', 'factions.html', 'factions-guilds.html', 'factions-secret-societies.html', 'factions-criminal-networks.html', 'events.html', 'events-volume-two.html', 'events-volume-three.html'].includes(destination);
    const isDossierPage = ['people.html', 'people-volume-two.html', 'people-volume-three.html', 'places.html', 'places-volume-two.html', 'places-volume-three.html', 'factions.html', 'factions-guilds.html', 'factions-secret-societies.html', 'factions-criminal-networks.html', 'events.html', 'events-volume-two.html', 'events-volume-three.html'].includes(destination);
    const isArchiveToPaper = destination === 'index.html' && document.querySelector('.archive-shell');
    const isPaperToArchive = destination === 'archive.html' && document.querySelector('.masthead');
    if (isArchivePage) sessionStorage.setItem('archive-transition', 'archive-entry');
    if (isArchiveToPaper) sessionStorage.setItem('archive-transition', 'paper-entry');
    document.body.classList.add('is-page-leaving');
    document.body.classList.add('is-link-page-leaving');
    if (isDossierPage) document.body.classList.add('is-person-page-leaving');
    if (isArchiveToPaper) document.body.classList.add('is-archive-to-paper-leaving');
    if (isPaperToArchive) document.body.classList.add('is-paper-to-archive-leaving');
    const hasArchivePaperTransition = isArchiveToPaper || isPaperToArchive;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const departureDuration = reducedMotion ? 1 : hasArchivePaperTransition ? 430 : 440;
    window.setTimeout(() => { window.location.href = link.href; }, departureDuration);
  });
});

const archiveTransition = sessionStorage.getItem('archive-transition');

if (archiveTransition === 'archive-entry') {
  document.body.classList.add('is-archive-link-arrival');
  if (document.body.classList.contains('people-page')) document.body.classList.add('is-person-dossier-arrival');
  if (document.body.classList.contains('places-page')) document.body.classList.add('is-place-dossier-arrival');
  if (document.body.classList.contains('factions-page')) document.body.classList.add('is-faction-dossier-arrival');
  if (document.body.classList.contains('events-page')) document.body.classList.add('is-event-dossier-arrival');
  if (document.querySelector('.archive-shell')) document.body.classList.add('is-archive-arrival');
  sessionStorage.removeItem('archive-transition');
}

if (archiveTransition === 'paper-entry') {
  document.body.classList.add('is-newspaper-arrival');
  document.documentElement.classList.remove('is-newspaper-entry-pending');
  sessionStorage.removeItem('archive-transition');
}

document.querySelectorAll('.person-drawer, .place-drawer, .faction-drawer, .event-drawer').forEach((drawer) => {
  const summary = drawer.querySelector('summary');
  const toggle = drawer.querySelector('.drawer-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const openingDuration = reducedMotion ? 1 : 680;
  const closingDuration = reducedMotion ? 1 : 440;

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
      }, closingDuration);
      return;
    }

    drawer.open = true;
    drawer.classList.add('is-opening');
    setToggleLabel('收起档案 −');
    window.setTimeout(() => drawer.classList.remove('is-opening'), openingDuration);
  });
});

const openLinkedDrawer = () => {
  const drawer = document.getElementById(window.location.hash.slice(1));
  if (!drawer || !drawer.matches('.person-drawer, .place-drawer, .faction-drawer, .event-drawer')) return;
  drawer.open = true;
  const toggle = drawer.querySelector('.drawer-toggle');
  if (toggle) toggle.textContent = '收起档案 −';
  drawer.classList.remove('is-linked-target');
  void drawer.offsetWidth;
  drawer.classList.add('is-linked-target');
  window.setTimeout(() => drawer.classList.remove('is-linked-target'), 680);
};

openLinkedDrawer();
window.addEventListener('hashchange', openLinkedDrawer);
