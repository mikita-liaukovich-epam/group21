import BigPicture from 'bigpicture';
import { $$, inner } from '../../utils';
import template from './list.template';
import templateMain from '../main/main.template';
import './list.css';
import { addPoetsLinks } from '../poets/poets';

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