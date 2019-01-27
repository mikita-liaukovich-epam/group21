
export default `
<nav class="header__menu-container">
  <ul class="header__menu">
    <li> <a> Главная  </a> </li>
    <li> <a href="#biography"> Биография  </a> </li>
    <li> <a href="#gallery"> Галерея</a> </li>
    <li> <a href="#works"> Творчество </a> </li>
    <li> <a href="#video"> Видео </a> </li>
  </ul>
</nav>

<header class="header__poet">
  <div class="header__poet-inform">
  <div class="header__photo"> </div>  
  <span class="header__poet-name">Якуб Колас </span>
  <span class="header__poet-quote">
      "Няма ў чалавека нічога прыгажэй і даражэй за радзіму. Чалавек без радзімы ‒ бедны чалавек"
  </span>
  </div>
</header>

<main> 
  <section class="main__timeline"> <a name="biography"></a>
  <div class=main__timeline-container>
      <div class="main__timeline-block">
          <div class="timeline-block-year">1882-1906</div>
          <div class="timeline-block-text"> 
              Родился 22 октября 
              1882 года в деревне Акинчицы 
              в семье лесника Михася Мицкевича.
              Окончил народную школу, в 1902 году — Несвижскую учительскую семинарию.
              Работал учителем на Пинщине (1902—1906). 
          </div>
          <div class="timeline-block-emblem">
              <img src="img/emblem_village.png"> </img>
          </div>
      </div>
      <div class="main__timeline-block">
          <div class="timeline-block-year">1906-1914</div>
          <div class="timeline-block-text">
              В 1906 году первая публикация
              — стихотворение «Край родимый» в белорусской газете «Наша доля». За участие
              в организации нелегального учительского съезда был приговорён к заключению,
              которое отбывал в минской тюрьме (1908—1911). В 1912—1914 годах учительствовал
              в Пинске, здесь у него родился его старший сын Даниил, который впоследствии стал
              создателем и первым директором музея своего отца.
          </div>
          <div class="timeline-block-emblem">
              <img src="img/emblem_education.png"> </img>
          </div>
      </div>
      <div class="main__timeline-block">
          <div class="timeline-block-year">1915-1918</div>
          <div class="timeline-block-text">
              В 1915 году эвакуировался вместе с семьёй в Подмосковье, работал учителем в Дмитровском
              уезде. В этом же году мобилизован в армию. Окончил Александровское военное училище
              (Москва, 1916) и служил в запасном полку в Перми. В это время его семья переехала в Обоянь
              (Курская губерния). В звании подпоручика летом 1917 года был отправлен на Румынский фронт.
              После демобилизации (1918) работал учителем в городе Обоянь.
          </div>
          <div class="timeline-block-emblem three">
              <img src="img/emblem_work.png"> </img>
          </div>
      </div>
      <div class="main__timeline-block">
          <div class="timeline-block-year">1921-1944</div>
          <div class="timeline-block-text">
              В мае 1921 года переехал в Минск. В дальнейшем занимался творческой и научной деятельностью.
              Академик (1928), с 1929 года — вице-президент Академии наук БССР, депутат ВС БССР (1938—1956).
              В годы Великой Отечественной войны в эвакуации в Подмосковье, Ташкенте, Москве. 
          </div>
          <div class="timeline-block-emblem">
              <img src="img/emblem_awards.png"> </img>
          </div>
      </div>
      <div class="main__timeline-block">
          <div class="timeline-block-year">1945-1956</div>
          <div class="timeline-block-text">
                  В 1944 году вернулся в Минск.
                  Депутат ВС СССР (1946—1956), председатель Белорусского республиканского комитета защиты мира.
                  Один из редакторов академического «Русско-белорусского словаря» (1953).
                  В конце жизни много и часто болел, в частности, перенёс 26 воспалений легких.
                  Якуб Колас скоропостижно скончался 13 августа 1956 года. Похоронен на Военном кладбище в Минске[3].
              </div>
          <div class="timeline-block-emblem">
              <img src="img/emblem_family.png"> </img>
          </div>
      </div>
  </div>
  </section>

  <section class="main__slider-container"> 
  <a name="gallery"></a>
  <div class="main__slider one"> </div>
  <div class="main__slider two"> </div>
  <div class="main__slider three"> </div>
  <div class="main__slider four"> </div>
  <div class="main__slider five"> </div>
  <div class="main__slider six"> </div>
  <div class="main__slider seven"> </div>
  <div class="main__slider eight"> </div>
  <div class="main__slider nine"> </div>
  <div class="main__slider ten"> </div>
  </section>

  <section class="main__books">
  <a name="works"></a> 
  <div>
      <span>Зборнікі вершаў </span>
      «Песьні жальбы» (1910)<br>
      «Водгульле» (1922)<br>
      «Нашы дні» (1937)<br>
      «Адпомсьцім» (1942)<br>
      «Голас зямлі» (1943)<br>
      «Мой дом» (1946)<br>
      «Жыве між нас геній» (1952)
  </div>

  <div>
      <span>Паэмы </span>
      «Прапаў чалавек» (1913)<br>
      «Новая зямля» (1923)<br>
      «Сымон-музыка» (1925)<br>
      «Суд у лесе» (1943)<br>
      «Адплата» (1946)<br>
      «Рыбакова хата» (1947)<br>
  </div>

  <div>
      <span>Зборнікі апавяданьняў </span>
      Апаведаньня. (1912)<br>
      «Тоўстае палена» (1913)<br>
      «Нёманаў дар» (1913)<br>
      «Казкі жыцьця» (1921)<br>
      «У ціхай вадзе» (1925)<br>
      «Крок за крокам» (1925)<br>
      «На рубяжы» (1925)<br>
      
  </div>

  <div>
      <span>Аповесьці </span>
      «У палескай глушы» (1923)<br>
      «На прасторах жыцьця» (1926)<br>
      «У глыбі Палесься» (1927)<br>
      «Адшчапенец» (1932)<br>
      «Дрыгва» (1934)<br>
  </div>

  </section>

  <section class="main__video">
  <a name="video"></a> 
  <iframe  src="https://www.youtube.com/embed/FRfHUhw9KkI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </section>

  <section class="main__map">
  <div class="mapouter">
      <div class="gmap_canvas">
          <iframe height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=stolbcy&t=&z=9&ie=UTF8&iwloc=&output=embed"></iframe>
      </div>
  </div>
  </section>

</main>
`