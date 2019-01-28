import { $$, inner, remove, sleep } from '../../utils';
import template from './main.template';
import { addPoetsLinks, showPoet } from '../poets/poets';
import './main.css';

const poetsSearch = [['Петрусь Бровка', 'brovka'], ['Викентий Дунин-Марцинкевич', 'dunin'], ['Владимир Короткевич', 'korotkevich'], ['Якуб Колас', 'kolas'], ['Янка Купала', 'kupala'], ['Янка Лучина', 'luchina'], ['Максим Танк', 'tank']]

inner($$('body'), template);

const populateDropdown = function () {
  $$('.autocomplite ul').innerHTML = '';
  poetsSearch.forEach(element => {
    if (element[0].toUpperCase().includes($$('.search-string').value.toUpperCase())) {
      inner($$('.autocomplite ul'), `<li><div class="search-poets-name" data-name="${element[1]}" >${element[0]}</div></li>`)
      }
    });
  const links = document.querySelectorAll('.search-poets-name');
  links.forEach(elem => {
    elem.addEventListener('click', () => { showPoet(elem.dataset.name) })
  })
}


$$('body').addEventListener('click', e => {
  const el = e.target;
  const elClass = el.getAttribute('class');
  
  if (elClass === 'poets-name') {
    addClass($$('.logo'), 'logo-anim-to-top');
    sleep(200).then(() => {
      $$('body').innerHTML = '';
      inner($$('body'), template);
      addPoetsLinks();
    });
  }
});

document.addEventListener('click', event => {
  if (event.target === $$('.search-string')) {
    $$('.search-string').classList.add('focused');
    $$('.search-pic').style.opacity = '1';
    $$('.search-pic').style.zIndex = '0';
    populateDropdown();
  }
});
localStorage.setItem('currLang', 'eng');


$$('.search-string').onblur = () => {
  sleep(100).then(() => {
    $$('.search-pic').style.zIndex = '-8';
    $$('.search-pic').style.opacity = '0';
    $$('.search-string').classList.remove('focused');
    $$('.search-string').value = '';
  })
}

$$('.active-lang').onclick = () => {
  $$('.languages').style.display = 'block';
};

$$('.eng').onclick = event => {
  const target = event.target;
  remove($$('.languages'), $$('.eng'));
  $$('.languages').insertBefore(target, $$('.languages img'));
  $$('.active-lang').src = './assets/ENG.png';
  $$('.languages').style.display = 'none';
  localStorage.setItem('currLang', 'eng');
};

$$('.bel').onclick = event => {
  const target = event.target;
  remove($$('.languages'), $$('.bel'));
  $$('.languages').insertBefore(target, $$('.languages img'));
  $$('.active-lang').src = './assets/BEL.png';
  $$('.languages').style.display = 'none';
  localStorage.setItem('currLang', 'bel');
};

$$('.rus').onclick = event => {
  const target = event.target;
  remove($$('.languages'), $$('.rus'));
  $$('.languages').insertBefore(target, $$('.languages img'));
  $$('.active-lang').src = './assets/RUS.png';
  $$('.languages').style.display = 'none';
  localStorage.setItem('currLang', 'rus');
};
$$('.languages').onclick = event => {
  if (event.target.src !== $$('.active-lang').src) {
    remove($$('.languages'), event.target);
    $$('.languages').insertBefore(event.target, $$('.languages img'));
    $$('.active-lang').src = event.target.src;
    $$('.languages').style.display = 'none';
  } else $$('.languages').style.display = 'none';
};
