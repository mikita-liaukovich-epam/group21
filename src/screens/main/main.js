import { $$, inner, remove, sleep } from '../../utils';
import template from './main.template';
import './main.css';

const poetsSearch = ['Петрусь Бровка', 'Максим Богданович', 'Владимир Короткевич', 'Якуб Колас', 'Янка Купала', 'Янка Лучина', 'Максим Танк']

inner($$('body'), template);

const repeat = function repeat() {
  sleep(200).then(() => {
  $$('.autocomplite ul').innerHTML = '';
  poetsSearch.forEach(element => {
    if (element.toUpperCase().includes($$('.search-string').value.toUpperCase())) {
      inner($$('.autocomplite ul'), `<li><a href='#'>${element}</a></li>`)
    }
  });
  });
}

let checkingInterval = null;
$$('.search-string').onfocus = () => {
  $$('.search-pic').style.opacity = '1';
  $$('.search-pic').style.zIndex = '0';
  sleep(800).then(() => {
    checkingInterval = setInterval(repeat, 100);
    $$('.autocomplite').style.display = 'block';
  });
}
localStorage.setItem('currLang', 'eng');


$$('.search-string').onblur = () => {
  $$('.search-pic').style.zIndex = '-8';
  $$('.search-pic').style.opacity = '0';
  $$('.search-string').value = '';
  $$('.autocomplite').style.display = 'none';
  clearInterval(checkingInterval);
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
