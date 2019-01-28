import BigPicture from 'bigpicture';
import { $$, addClass, inner, sleep } from '../../utils';
import template from './list.template';
import templateMain from '../main/main.template';
import './list.css';
import { addPoetsLinks } from '../poets/poets';

$$('body').addEventListener('click', e => {
  const el = e.target;
  const elClass = el.getAttribute('class');
  if (elClass === 'close') {
    addClass($$('.logotype'), 'logo-anim-to-bottom');
    sleep(200).then(() => {
      $$('body').innerHTML = '';
      inner($$('body'), templateMain);
    });
  }
  if (elClass === 'list-poets' || elClass === 'main-button left') {
    addClass($$('.logo'), 'logo-anim-to-top');
    sleep(200).then(() => {
      $$('body').innerHTML = '';
      inner($$('body'), template[localStorage.getItem('currLang')]);
      addPoetsLinks();
    });
  }
  if (elClass === 'youtube') {
    BigPicture({
      el: e.target,
      ytSrc: e.target.getAttribute('ytsrc'),
    });
  }

  if (elClass === 'image_container_item') {
    BigPicture({
      el: e.target,
      gallery: '#image_container',
    })
  }
});