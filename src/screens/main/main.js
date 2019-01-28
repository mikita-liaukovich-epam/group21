import { $$, inner, remove } from '../../utils';
import template from './main.template';
import './main.css';

inner($$('body'), template);

$$('.search-string').onblur = () => {
  $$('.search-string').value = '';
}

$$('.active-lang').onclick = () => {
  $$('.languages').style.display = 'block';
};

$$('.languages').onclick = event => {
  if (event.target.src !== $$('.active-lang').src) {
    remove($$('.languages'), event.target);
    $$('.languages').insertBefore(event.target, $$('.languages img'));
    $$('.active-lang').src = event.target.src;
    $$('.languages').style.display = 'none';
  } else $$('.languages').style.display = 'none';
};
