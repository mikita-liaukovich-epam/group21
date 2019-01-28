import poets from "./poets.json";

// export function showModalVideo(poet){
//   let modal = document.body.querySelector('.modal');
//   modal.style.display = "flex";
//   modal.innerHTML = `
//     <div class="close_modal" onclick="this.parentNode.style.display='none';this.parentNode.innerHTML=''"></div>
//     <iframe src="${poets[poet].video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//   `
// }

export function getTemplate(poet){
  let lang = localStorage.getItem('currLang') || 'rus';
  return `<nav class="header__menu-container">
  <ul class="header__menu">
    <li> <a> ${poets[poet].menu[lang][0]}  </a> </li>
    <li> <a href="#biography"> ${poets[poet].menu[lang][1]}  </a> </li>
    <li> <a href="#gallery"> ${poets[poet].menu[lang][2]}</a> </li>
    <li> <a href="#works"> ${poets[poet].menu[lang][3]}</a> </li>
    <li> <a href="#video"> ${poets[poet].menu[lang][4]}</a> </li>
  </ul>
</nav>

<header class="header__poet">
  <div class="header__poet-inform">
  <div class="header__photo">
  <img src="assets/${poet}/${poets[poet].photo[0]}">
  </div>  
  <span class="header__poet-name">${poets[poet].name[lang]}</span>
  <span class="header__poet-quote">
    "${poets[poet].quote[lang]}"
  </span>
  </div>
</header>

<main> 
  <section class="main__timeline"> <a name="biography"></a>
  <div class=main__timeline-container>
      <div class="main__timeline-block">
          <div class="timeline-block-year">${poets[poet].biography.firstData}</div>
          <div class="timeline-block-text"> 
          ${poets[poet].biography.firstText[lang]}
          </div>
          <div class="timeline-block-emblem">
              <img src="assets/emblem_village.png"> </img>
          </div>
      </div>
      <div class="main__timeline-block">
          <div class="timeline-block-year">${poets[poet].biography.secondData}</div>
          <div class="timeline-block-text">
          ${poets[poet].biography.secondText[lang]}
          </div>
          <div class="timeline-block-emblem">
              <img src="assets/emblem_education.png"> </img>
          </div>
      </div>
      <div class="main__timeline-block">
          <div class="timeline-block-year">${poets[poet].biography.thirdData}</div>
          <div class="timeline-block-text">
          ${poets[poet].biography.thirdText[lang]}
          </div>
          <div class="timeline-block-emblem three">
              <img src="assets/emblem_work.png"> </img>
          </div>
      </div>
      <div class="main__timeline-block">
          <div class="timeline-block-year">${poets[poet].biography.fourthData}</div>
          <div class="timeline-block-text">
          ${poets[poet].biography.fourthText[lang]}
          </div>
          <div class="timeline-block-emblem">
              <img src="assets/emblem_awards.png"> </img>
          </div>
      </div>
      <div class="main__timeline-block">
          <div class="timeline-block-year">${poets[poet].biography.fivethData}</div>
          <div class="timeline-block-text">
          ${poets[poet].biography.fivethText[lang]}
              </div>
          <div class="timeline-block-emblem">
              <img src="assets/emblem_family.png"> </img>
          </div>
      </div>
  </div>
  </section>

  <a name="gallery"></a>
  <section id="image_container" class="image_container"> 
    <img src="assets/${poet}/${poets[poet].images[0]}" data-bp="assets/${poet}/${poets[poet].images[0]}" class="image_container_item">
  
    <img src="assets/${poet}/${poets[poet].images[1]}" data-bp="assets/${poet}/${poets[poet].images[1]}" class="image_container_item">
  
  <img src="assets/${poet}/${poets[poet].images[2]}" data-bp="assets/${poet}/${poets[poet].images[2]}" class="image_container_item">
 
  <img src="assets/${poet}/${poets[poet].images[3]}" data-bp="assets/${poet}/${poets[poet].images[3]}" class="image_container_item">

  <img src="assets/${poet}/${poets[poet].images[4]}" data-bp="assets/${poet}/${poets[poet].images[4]}" class="image_container_item">
 
  <img src="assets/${poet}/${poets[poet].images[5]}" data-bp="assets/${poet}/${poets[poet].images[5]}" class="image_container_item">
 
  <img src="assets/${poet}/${poets[poet].images[6]}" data-bp="assets/${poet}/${poets[poet].images[6]}" class="image_container_item">

  <img src="assets/${poet}/${poets[poet].images[7]}" data-bp="assets/${poet}/${poets[poet].images[7]}" class="image_container_item">

  <img src="assets/${poet}/${poets[poet].images[8]}" data-bp="assets/${poet}/${poets[poet].images[8]}" class="image_container_item">

  <img src="assets/${poet}/${poets[poet].images[9]}" data-bp="assets/${poet}/${poets[poet].images[9]}" class="image_container_item">

  </section>

  <section class="main__books">
    <a name="works"></a> 
    <div>
    ${poets[poet].works.firstBlock}
    </div>

    <div>
    ${poets[poet].works.secondBlock}
    </div>

    <div>
    ${poets[poet].works.thirdBlock}
    </div>

    <div>
    ${poets[poet].works.fourthBlock}
    </div>
    </section>

  <section class="main__video">
  <a name="video"></a>
    <img class="youtube" src="assets/${poet}/${poets[poet].images[8]}" ytsrc="${poets[poet].video}">
    
  </section>

  <section class="main__map">
  <div class="mapouter">
      <div class="gmap_canvas">
          <iframe height="500" id="gmap_canvas" src=" ${poets[poet].map}"></iframe>
      </div>
  </div>
  </section>

  <div class="modal">
  </div>

</main>`
}
