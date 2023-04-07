const navbar = document.createElement('nav');
navbar.className = 'navbar navbar-expand-sm navbar-light bg-light';

const container = document.createElement('div');
container.className = 'container-fluid';
navbar.appendChild(container);

const logo = document.createElement('div');
logo.className = 'logo';
container.appendChild(logo);

const logoLink = document.createElement('a');
logoLink.className = 'navbar-brand';
logoLink.href = 'index.html';
logo.appendChild(logoLink);

const logoImg = document.createElement('img');
logoImg.src = 'assets/Logo.png';
logoImg.alt = 'Logo';
logoLink.appendChild(logoImg);

const button = document.createElement('button');
button.className = 'navbar-toggler';
button.type = 'button';
button.dataset.bsToggle = 'collapse';
button.dataset.bsTarget = '#navbarNav';
button.ariaControls = 'navbarNav';
button.ariaExpanded = 'false';
button.ariaLabel = 'Toggle navigation';
container.appendChild(button);

const buttonIcon = document.createElement('span');
buttonIcon.className = 'navbar-toggler-icon';
button.appendChild(buttonIcon);

const navList = document.createElement('div');
navList.className = 'collapse navbar-collapse';
navList.id = 'navbarNav';
container.appendChild(navList);

const ul = document.createElement('ul');
ul.className = 'navbar-nav';
navList.appendChild(ul);

const pages = [
  { title: 'Home', link: 'index.html' },
  { title: 'Upcoming Events', link: 'upcoming.html' },
  { title: 'Past Event', link: 'past_event.html' },
  { title: 'Contact', link: 'contact.html' },
  { title: 'Details', link: 'details.html' },
  { title: 'Stats', link: 'stats.html' },
];

pages.forEach(page => {
  const li = document.createElement('li');
  li.className = 'nav-item';
  ul.appendChild(li);

  const link = document.createElement('a');
  link.className = 'nav-link';
  link.href = page.link;
  link.textContent = page.title;
  li.appendChild(link);
});

// Insert the navbar into the DOM
const navContainer = document.querySelector('#nav-container');
navContainer.appendChild(navbar);
