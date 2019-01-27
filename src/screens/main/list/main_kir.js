import { $$, inner } from '../../../utils';
import template from './main_kir.template';
import templateMain from '../main.template';
import './main_kir.css';
import { addPoetsLinks } from '../../poets/poets';

$$('body').addEventListener('click', e => {
  const el = e.target;
  const elClass = el.getAttribute('class');
  if (elClass === 'close') {
    $$('body').innerHTML = '';
    inner($$('body'), templateMain);
  }
  if (elClass === 'list-poets' || elClass === 'main-button left') {
    $$('body').innerHTML = '';
    inner($$('body'), template);
    addPoetsLinks();
  }
});