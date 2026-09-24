const galleryViewer = document.querySelector('.gallery-viewer');

if (galleryViewer) {
  const viewerImage = galleryViewer.querySelector('img');
  const viewerCaption = galleryViewer.querySelector('figcaption');

  document.querySelectorAll('.drawing-piece, .artifact, .feature-art').forEach((piece) => {
    const thumbnail = piece.querySelector('img');
    if (!thumbnail) return;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'gallery-open';
    trigger.setAttribute('aria-label', `查看${thumbnail.alt}大图`);
    thumbnail.replaceWith(trigger);
    trigger.appendChild(thumbnail);

    trigger.addEventListener('click', () => {
      viewerImage.src = thumbnail.src;
      viewerImage.alt = thumbnail.alt;
      viewerCaption.textContent = piece.querySelector('h3')?.textContent.trim() || thumbnail.alt;
      galleryViewer.showModal();
    });
  });

  galleryViewer.querySelector('.gallery-viewer-close').addEventListener('click', () => galleryViewer.close());
  galleryViewer.addEventListener('click', (event) => {
    if (event.target === galleryViewer) galleryViewer.close();
  });
}

const drawingsGrid = document.querySelector('.drawings-grid');

if (drawingsGrid) {
  const pieces = [...drawingsGrid.querySelectorAll('.drawing-piece')];
  let layoutFrame = 0;

  const arrangeDrawings = () => {
    layoutFrame = 0;
    drawingsGrid.classList.remove('is-packed');
    pieces.forEach((piece) => { piece.style.gridRowEnd = ''; });

    const heights = pieces.map((piece) => piece.getBoundingClientRect().height);
    pieces.forEach((piece, index) => {
      piece.style.gridRowEnd = `span ${Math.ceil(heights[index] + 18)}`;
    });
    drawingsGrid.classList.add('is-packed');
  };

  const scheduleLayout = () => {
    if (layoutFrame) cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(arrangeDrawings);
  };

  pieces.forEach((piece) => piece.querySelector('img').addEventListener('load', scheduleLayout));
  window.addEventListener('resize', scheduleLayout);
  scheduleLayout();
}
