export default `
  <h1>Poets of Belarus</h1>
  <section class="first-page">
    <div class="container">
      <img src="./assets/ENG.png" alt="Language" class="active-lang">
      <div class="languages">
        <img src="./assets/ENG.png" alt="English language" class="eng">
        <img src="./assets/BEL.png" alt="Belarussian language" class="bel">
        <img src="./assets/RUS.png" alt="Russian language" class="rus">
      </div>
      <nav>
          <a class='list-poets'>List of poets</a>
          <a href="#about">About Us</a>
          <a href="#author-of-the-day">Author of the Day</a>
          <a href="#">Contacts</a>
        </nav>
      <img src="./assets/logo.png" alt="Poets of Belarus" class="logo">
      <div class="buttons-wrapper">
        <button class='main-button left'>List of poets</button>
        <input type="text" class='main-button search-string' placeholder="Search">
      </div>
    </div>
  </section>
  <section class="second-page">
    <div class="container">
      <div class="backg-decor"><img src="./assets/decor.png"><img src="./assets/decor.png"></div>
      <div class="about-us">
        <h2 id="about-us">About Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</p>
      </div>
      <div class="author-of-the-day">
        <h2 id="author-of-the-day">Author of the Day</h2>
        <img src="./assets/author-of-the-day.png" alt="Jan Barszczewski">
        <blockquote>«Чалавек, які нязменна ідзе да мэты, не толькі зямлю, але і атмасферу можа змяніць»</blockquote>
        <cite><b>Jan Barzczewski</b><br> Nobleman Zawalnia, or Belarus in Fantastic Stories</cite>
      </div>
    </div>
  </section>
  <footer>
    <div class="container">
      <hr>
      <img src="./assets/logo-rsschool-4.svg" alt="the Rolling Scopes School" class="RSS-logo" height="87">
      <img src="./assets/logo_rs_text.svg" alt="the Rolling Scopes" class="RS-logo" height="87">
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