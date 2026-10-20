import * as maplibregl from 'https://unpkg.com/maplibre-gl@6.15.0/dist/maplibre-gl.mjs';
import { Protocol } from 'https://esm.sh/pmtiles@4.5.0';

const panelButtons = document.querySelectorAll('[data-panel]');
const panels = document.querySelectorAll('.floating-panel');
const closeButtons = document.querySelectorAll('.close-panel');

console.log('Navigation buttons:', panelButtons);
console.log('Panels:', panels);

function closePanels() {
  for (const panel of panels) {
    panel.hidden = true;
  }

  for (const button of panelButtons) {
    button.setAttribute('aria-expanded', 'false');
  }
}

// closePanels();

function openPanel(button) {
  closePanels();

  const panelId = button.dataset.panel;
  const panel = document.getElementById(panelId);

  panel.hidden = false;
  button.setAttribute('aria-expanded', 'true');
  panel.querySelector('h2').focus();
}

// close an active panel

function closeActivePanel() {
  const activeButton = document.querySelector('[data-panel][aria-expanded="true"]',
  );
  closePanels();

  if (activeButton) {
    activeButton.focus();
  }
}

for (const button of closeButtons) {
  button.addEventListener('click', closeActivePanel);
}

for (const button of panelButtons) {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      closePanels();
    } else {
      openPanel(button);
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeActivePanel();
  }
});

const skipLink = document.querySelector('.skip-link');

skipLink.addEventListener('click', (event) => {
  event.preventDefault();

  const exploreButton = document.querySelector('[data-panel="explore-panel"]',

  );
  openPanel(exploreButton);
});

const protocol = new Protocol();

maplibregl.addProtocol('pmtiles', protocol.tile);

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [30.122091, -1.924965],
  zoom: 7,
  minZoom: 6,
});

map.on('load', () => {
  const archiveUrl = new URL('./data/rwanda-healthcare.pmtiles', document.baseURI,
  ).href;

  map.addSource('rwanda', {
    type: 'vector',
    url: `pmtiles://${archiveUrl}`,
    promoteId: 'h3_index',
    attribution: '<a href="https://fikadigital.org/saipoc">Fika</a>',
  });

  map.addLayer({
    'id': 'healthcare-hexagons',
    'type': 'fill',
    'source': 'rwanda',
    'source-layer': 'rwanda_healthcare',
    'paint': {
      'fill-color': '#287d70',
      'fill-opacity': 0.65,
      'fill-outline-color': '#18594f',
    },
  });
});
