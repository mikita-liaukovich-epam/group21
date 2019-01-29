import { $$, inner, sleep } from '../../utils';
import { mainBody } from './main.template';
import { addPoetsLinks, showPoet } from '../poets/poets';
import './main.css';
window.onload = () => localStorage.setItem('currLang', 'eng');

export const poetsSearch = {
  rus: [['Петрусь Бровка', 'brovka'], ['Викентий Дунин-Марцинкевич', 'dunin'], ['Владимир Короткевич', 'korotkevich'], ['Якуб Колас', 'kolas'], ['Янка Купала', 'kupala'], ['Янка Лучина', 'luchina'], ['Максим Танк', 'tank']],
  eng: [['Petrus Brovka', 'brovka'], ['Vintsent Dunin-Martsinkyevich', 'dunin'], ['Vladimir Korotkevich', 'korotkevich'], ['Yakub Kolas', 'kolas'], ['Yanka Kupala', 'kupala'], ['Yanka Luchina', 'luchina'], ['Maksim Tank', 'tank']],
  bel: [['Пятрусь Броўка', 'brovka'], ['Вінцэнт Дунін-Марцінкевіч', 'dunin'], ['Уладзімір Караткевіч', 'korotkevich'], ['Якуб Колас', 'kolas'], ['Янка Купала', 'kupala'], ['Янка Лучына', 'luchina'], ['Максім Танк', 'tank']],
};

inner($$('body'), mainBody());

const populateDropdown = function () {
  $$('.autocomplite ul').innerHTML = '';
  poetsSearch[localStorage.getItem('currLang')].forEach(element => {
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
    $$('.search-string').addEventListener('keyup', populateDropdown);
    populateDropdown();
  }
});


$$('.search-string').onblur = () => {
  sleep(100).then(() => {
    $$('.search-pic').style.zIndex = '-8';
    $$('.search-pic').style.opacity = '0';
    $$('.search-string').removeEventlistener('keyup', populateDropdown);
    $$('.search-string').classList.remove('focused');
    $$('.search-string').value = '';
  })
}

document.addEventListener('click', event => {
  if (event.target === $$('.active-lang')) {
    $$('.languages').style.display = 'block';
  }
  if ($$('.languages').contains(event.target) && (event.target.classList !== localStorage.getItem('currLang'))) {
    localStorage.setItem('currLang', `${event.target.classList}`);
    $$('body').innerHTML = mainBody();
    $$('.active-lang').src = event.target.src;
    $$('.languages').style.display = 'none';

    /*
     * remove($$('.languages'), event.target);
     *$$('.languages').insertBefore(event.target, $$('.languages img'));
     */
  }
});
