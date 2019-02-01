import { poetsSearch } from './main';
const translates = {
  eng: {
    logo: 'Poets of Belarus',
    lang: ['English language', 'Belarussian language', 'Russian language'],
    nav: ['List of Poets', 'About Project', 'Author of the Day', 'Contacts', 'Search'],
    about: 'Welcome to the poets of Belarus. This site is dedicated to cultural figures of Belarus, or rather, to poets. Here you can find biographies of poets, lists of their works, a photo gallery and videos related to their life and time in which they lived. You can also use a map on which the main places of poets are marked. You can view a list of all poets available in our database or use the search. Below is the author of the day of our project. You can contact us on the Contacts page via Vkontakte, Skype or email. We always welcome your wishes and suggestions! This project was implemented as a codejam task for the Rolling Scopes School. All project code is our intellectual property and can be used in other projects only with the personal permission of the authors.',
    author: {
      brovka: '',
      dunin: '',
      korotkevich: `King Stakh's Wild Hunt`,
      kolas: 'Sad songs. Life stories.',
      kupala: 'Indigenous (Tuteyshiya)',
      luchina: 'По поводу 100-л. годовщины дня рождения л.Байрона',
      tank: '',
    },
  },
  rus: {
    logo: 'Поэты Беларуси',
    lang: ['Английский язык', 'Белорусский язык', 'Русский язык'],
    nav: ['Список поэтов', 'О проекте', 'Автор дня', 'Контакты', 'Поиск'],
    about: 'Добро пожаловать на Poets of Belarus. Данный сайт посвящён деятелям культуры Беларуси, а точнее, - поэтам. Здесь вы можете найти биографии поэтов, списки их произведений, фотогалерею и видео, связанные с их жизнью и временем, в котором они жили. Также вы можете воспользоваться картой, на которой отмечены места основной деятельности поэтов. Вы можете просмотреть список всех имеющихся в нашей базе данных поэтов или воспользоваться поиском. Ниже представлен автор дня нашего проекта. Связаться с нами можете на странице Контакты через Вконтакте, скайп или электронную почту. Мы всегда рады вашим пожеланиям и предложениям! Данный проект был выполнен в качестве кодджем таска для the Rolling Scopes School.',
    author: {
      brovka: '',
      dunin: '',
      korotkevich: 'Дикая охота короля Стаха',
      kolas: 'Песни жальбы. Сказки жизни',
      kupala: 'Здешние',
      luchina: 'По поводу 100-л. годовщины дня рождения л.Байрона',
      tank: '',
    },
  },
  bel: {
    logo: 'Паэты Беларусі',
    lang: ['Англійская мова', 'Беларуская мова', 'Руская мова'],
    nav: ['Спіс паэтаў', 'Аб праекце', 'Аўтар дня', 'Кантакты', 'Пошук'],
    about: `Сардэчна запрашаем на Poets of Belarus. Дадзены сайт прысвечаны дзеячам культуры Беларусі, а дакладней, - паэтам. Тут вы можаце знайсці біяграфіі паэтаў, спісы іх твораў, фотагалерэю і відэа, звязаныя з іх жыццём і часам, у якім яны жылі. Таксама вы можаце скарыстацца картай, на якой пазначаныя месцы асноўнай дзейнасці паэтаў. Вы можаце праглядзець спіс усіх наяўных у нашай базе дадзеных паэтаў або скарыстацца пошукам. Ніжэй прадстаўлены аўтар дня нашага праекта. Звязацца з намі можаце на старонцы Кантакты праз Вконтакте, скайп ці электронную пошту. Мы заўсёды рады вашым пажаданням і прапановам! Дадзены праект быў выкананы ў якасці кодджем цягаючы для the Rolling Scopes School.`,
    author: {
      brovka: '',
      dunin: '',
      korotkevich: 'Дзікае паляванне караля Стаха',
      kolas: 'Песні жальбы. Казкі жыцця',
      kupala: 'Тутэйшыя',
      luchina: 'По поводу 100-л. годовщины дня рождения л.Байрона',
      tank: '',
    },
  },
}

const randomAuthor = function randomAuthor() {
  const lang = localStorage.getItem('currLang');
  const date = new Date();
  const day = date.getDate();
  if ((day > 0) && (day <= 5)) {
 return `<img src="./assets/brovka/brovka.jpg" alt="${poetsSearch[lang][0][0]}">
  <blockquote>«Ну, з чым, скажы, з якой каханкай магу я кніжку параўнаць?»</blockquote>
  <cite><b>${poetsSearch[lang][0][0]}</b><br>${translates[lang].author.brovka}</cite>`;
 } else if ((day > 5) && (day <= 10)) {
return `<img src="./assets/dunin/two.jpg" alt="${poetsSearch[lang][1][0]}">
  <blockquote>«Звяртайце ўвагу не на багацце, але на сэрца, навуку і славу ў людзей»</blockquote>
  <cite><b>${poetsSearch[lang][1][0]}</b><br>${translates[lang].author.dunin}</cite>`;
} else if ((day > 10) && (day <= 15)) {
return `<img src="./assets/korotkevich/korotkevich.jpg" alt="${poetsSearch[lang][2][0]}">
  <blockquote>«Кажуць, што доугiя гады лёс дае звычайна дурням, каб яны папоунiлi разумовы недахоп багатым вопытам.»</blockquote>
  <cite><b>${poetsSearch[lang][2][0]}</b><br>${translates[lang].author.korotkevich}</cite>`;
 } else if ((day > 15) && (day <= 20)) {
return `<img src="./assets/kolas/seven.jpg" alt="${poetsSearch[lang][3][0]}">
  <blockquote>«...часта бывае так, што самая ясная праўда пазнаецца цаной вялікай пакуты - надта цяжкая дарога прыводзіць да такога пазнання.»</blockquote>
  <cite><b>${poetsSearch[lang][3][0]}</b><br>${translates[lang].author.kolas}</cite>`;
} else if ((day > 20) && (day <= 25)) {
  return `<img src="./assets/luchina/one.jpg" alt="${poetsSearch[lang][5][0]}">
    <blockquote>«Прошло сто лет, как гордый гений
    На Божий появился свет,
    С тех пор средь наших поколений
    Таких умов, ни песен нет.»</blockquote>
    <cite><b>${poetsSearch[lang][5][0]}</b><br>${translates[lang].author.luchina}</cite>`;
} else if ((day > 25) && (day <= 31)) {
 return `<img src="./assets/kupala/one.jpg" alt="${poetsSearch[lang][4][0]}">
  <blockquote>«Перакуліцца з нічога ў нішто — не вялікая мэтаморфоза.»</blockquote>
  <cite><b>${poetsSearch[lang][4][0]}</b><br>${translates[lang].author.kupala}</cite>`;
 }
}

export const mainBody = function mainBody() {
  const lang = localStorage.getItem('currLang');
  return `
  <h1>Poets of Belarus</h1>
  <section class="first-page">
  <img src="./assets/lang/${lang}.png" alt="Language" class="active-lang">
      <div class="languages">
        <img src="./assets/lang/eng.png" alt="${translates[lang].lang[0]}" class="eng">
        <img src="./assets/lang/bel.png" alt="${translates[lang].lang[1]}" class="bel">
        <img src="./assets/lang/rus.png" alt="${translates[lang].lang[2]}" class="rus">
      </div>
      <nav>
          <a class='list-poets'>${translates[lang].nav[0]}</a>
          <a href="#about-us">${translates[lang].nav[1]}</a>
          <a href="#author-of-the-day">${translates[lang].nav[2]}</a>
          <a class="aboutUs">${translates[lang].nav[3]}</a>
        </nav>
    <div class="container">
      <img src="./assets/logo/logo.png" alt="${translates[lang].logo}" class="logo">
      <div class="buttons-wrapper">
        <button class='main-button left'>${translates[lang].nav[0]}</button>
        <input type="text" class='main-button search-string' placeholder="${translates[lang].nav[4]}">
        <img src="./assets/search.png" alt="${translates[lang].nav[4]}" class="search-pic">
        <div class="autocomplite">
          <ul></ul>
        </div>
      </div>
    </div>
  </section>
  <section class="second-page">
    <div class="container">
      <div class="backg-decor"><img src="./assets/backgrounds/decor.png"><img src="./assets/backgrounds/decor.png"></div>
      <div class="about-us">
        <h2 id="about-us">${translates[lang].nav[1]}</h2>
        <p>${translates[lang].about}</p>
      </div>
      <div class="author-of-the-day">
        <h2 id="author-of-the-day">${translates[lang].nav[2]}</h2>
       ${randomAuthor()}
      </div>
    </div>
  </section>
  <footer>
    <div class="container">
      <hr>
      <img src="./assets/footer/logo-rsschool-4.svg" alt="the Rolling Scopes School" class="RSS-logo" height="87">
      <img src="./assets/footer/logo_rs_text.svg" alt="the Rolling Scopes" class="RS-logo" height="87">
      <p>
        <b>made by</b><br>
        Nick Levkovich<br>
        Katsiaryna Makarenka<br>
        Kiryl Kireyeu<br><br>
        Minsk, 2019
      </p>
    </div>
  </footer>
`
};
