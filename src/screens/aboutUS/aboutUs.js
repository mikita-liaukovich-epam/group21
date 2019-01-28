import { $$, addClass, inner, sleep } from '../../utils';
import template from './about.template';
import './aboutUs.css';

$$('body').addEventListener('click', e => {
  const el = e.target;
  const elClass = el.getAttribute('class');
  if (elClass === 'aboutUs') {
    addClass($$('.logo'), 'logo-anim-to-top');
    sleep(200).then(() => {
      $$('body').innerHTML = '';
      inner($$('body'), template[localStorage.getItem('currLang')]);
    });
  }
});