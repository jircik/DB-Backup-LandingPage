import './styles.css';

type TabActivator = (chosen: string) => void;

function activate(
  tabs: NodeListOf<HTMLElement>,
  panels: NodeListOf<HTMLElement>,
  attr: string,
  valueKey: string,
): TabActivator {
  return (chosen) => {
    tabs.forEach((t) => {
      const isActive = t.dataset[attr] === chosen;
      t.classList.toggle('tab-active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    panels.forEach((p) => p.classList.toggle('hidden', p.dataset[valueKey] !== chosen));
  };
}

const osTabs = document.querySelectorAll<HTMLElement>('[data-os-tab]');
const osPanels = document.querySelectorAll<HTMLElement>('[data-os-panel]');
const setOs = activate(osTabs, osPanels, 'osTab', 'osPanel');
osTabs.forEach((tab) =>
  tab.addEventListener('click', () => {
    if (tab.dataset.osTab) setOs(tab.dataset.osTab);
  }),
);

const methodTabs = document.querySelectorAll<HTMLElement>('[data-method-tab]');
const methodPanels = document.querySelectorAll<HTMLElement>('[data-method-panel]');
const setMethod = activate(methodTabs, methodPanels, 'methodTab', 'methodPanel');
methodTabs.forEach((tab) =>
  tab.addEventListener('click', () => {
    if (tab.dataset.methodTab) setMethod(tab.dataset.methodTab);
  }),
);

document.querySelectorAll<HTMLElement>('[data-method-tab-link]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = link.dataset.methodTabLink;
    if (!target) return;
    setMethod(target);
    document.getElementById('install')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const srLive = document.getElementById('sr-live');
document.querySelectorAll<HTMLButtonElement>('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const targetId = btn.dataset.copy;
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    const text = target.innerText.trim();
    try {
      await navigator.clipboard.writeText(text);
      const old = btn.textContent;
      btn.textContent = 'Copied ✓';
      btn.classList.add('text-accent');
      if (srLive) srLive.textContent = 'Command copied to clipboard';
      setTimeout(() => {
        btn.textContent = old;
        btn.classList.remove('text-accent');
        if (srLive) srLive.textContent = '';
      }, 1400);
    } catch {
      /* clipboard write failed — silently ignore */
    }
  });
});
