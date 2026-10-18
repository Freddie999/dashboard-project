// These buttons only control the layout. Map and data loading come next.
const panelButtons = document.querySelectorAll('[data-panel]');
const panels = document.querySelectorAll('.floating-panel');

function closePanels() {
  panels.forEach((panel) => {
    panel.hidden = true;
  });
  panelButtons.forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
  });
}

function openPanel(button) {
  closePanels();
  const panel = document.getElementById(button.dataset.panel);
  panel.hidden = false;
  button.setAttribute('aria-expanded', 'true');
  panel.querySelector('h2').focus();
}

panelButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    closePanels();
    if (!isOpen) openPanel(button);
  });
});

function closePanelAndReturnFocus(panel) {
  const trigger = document.querySelector(`[data-panel="${panel.id}"]`);
  closePanels();
  trigger.focus();
}

panels.forEach((panel) => {
  panel.querySelector('.close-panel').addEventListener('click', () => {
    closePanelAndReturnFocus(panel);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const visiblePanel = document.querySelector('.floating-panel:not([hidden])');
    if (visiblePanel) closePanelAndReturnFocus(visiblePanel);
  }
});

document.querySelector('.skip-link').addEventListener('click', (event) => {
  event.preventDefault();
  openPanel(document.querySelector('[data-panel="explore-panel"]'));
});
