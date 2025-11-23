import '@nullambs/shtml';

const page = document.getElementById('page');

const getCurrentSection = () => {
  const hash = window.location.hash;
  return hash.length ? hash : '#home';
}

const popout = async () => {
  await new Promise(r => setTimeout(r, 500));
  const popouts = document.querySelectorAll(`${getCurrentSection()} .popout`);
  popouts.forEach((popout, i) => {
    setTimeout(() => {
      popout.classList.add('pop')
    }, 50 * i)
  })
};

const showHeaderIfNeeded = () => {
  const header = document.getElementById('header');
  if (getCurrentSection() == '#home') {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
}

const showKeyloggerPlacholderIfNeeded = () => {
  const placeholder = document.querySelector('#keylogger .placeholder');
  if (getCurrentSection() != "#keylogger") placeholder.style.opacity = '1';
}

page.addEventListener('scrollend', () => {
  popout();
  showHeaderIfNeeded();
  showKeyloggerPlacholderIfNeeded();
});

(function() {
  document.addEventListener('keydown', (e) => {
    if (getCurrentSection() != '#keylogger') return;
    const placeholder = document.querySelector('#keylogger .placeholder');
    placeholder.style.opacity = '0';

    const h2 = document.querySelector("#keylogger h2");

    const span = document.createElement('span');
    span.classList.add('logged-key');
    span.innerText = e.key;
    h2.prepend(span);
    setTimeout(() => h2.removeChild(span), 3000);
  })
})()

await (async function() {
  await new Promise(r => setTimeout(r, 500));
  const cover = document.getElementById("cover");
  cover.classList.add('hidden');
})();

await (async function() {
  await new Promise(r => setTimeout(r, 800));
  popout();
})()

await (async function() {
  await new Promise(r => setTimeout(r, 100));

  window.addEventListener('resize', () => {
    document.querySelector(getCurrentSection()).scrollIntoView();
  })

  document.addEventListener('mousemove', event => {
    const footer = document.getElementById('footer');
    if (window.innerHeight - event.clientY < 100) {
      footer.classList.remove('hidden');
    } else {
      footer.classList.add('hidden');
    }
  })

  page.addEventListener('scroll', () => {
    const poped = document.querySelectorAll('.popout.pop');
    poped.forEach(p => p.classList.remove('pop'));
  });
  document.querySelector(getCurrentSection()).scrollIntoView();
  showHeaderIfNeeded();
})();
