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


//close an active panel

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


