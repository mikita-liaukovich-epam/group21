import { $$, inner } from '../../../utils';
import template from './main_kir.template';
import templateMain from '../main.template';
import './main_kir.css';

$$('body').addEventListener('click', e => {
  const el = e.target;
  const elClass = el.getAttribute('class');
  if (elClass === 'main-button left') {
    $$('body').innerHTML = '';
    inner($$('body'), template);
  }
  if (elClass === 'close') {
    $$('body').innerHTML = '';
    inner($$('body'), templateMain);
  }
  if (elClass === 'list-poets') {
    $$('body').innerHTML = '';
    inner($$('body'), template);
  }
});