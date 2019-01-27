import { $$, inner, remove } from '../../utils';
import poets from "./poets.json";
import { getTemplate , showModalVideo } from './poets.template';
import './poets.css';


function showPoet(name){
  $$('body').innerHTML = getTemplate(name);
  $$('#video_button').addEventListener('click', ()=>{showModalVideo(name)})
}

export function addPoetsLinks(){
  $$('.content').addEventListener('click', (e) => {showPoet(e.target.dataset.name)})
}