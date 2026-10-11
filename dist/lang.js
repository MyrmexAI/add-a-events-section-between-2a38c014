(function () {
  var STORAGE_KEY = 'paperboat-lang';
  var DEFAULT = 'en';

  var T = {
    en: {
      title: 'Paper Boat — Bookshop & Café in Lisbon',
      description: 'Paper Boat is a small bookshop café in Lisbon. Good books, good coffee, unhurried afternoons.',
      lang_group: 'Language',
      eyebrow: 'Bookshop & Café · Lisbon',
      tagline: 'Find a book, pour a coffee, and let the afternoon drift.',
      cta: 'Visit us',
      books_title: 'On our shelf this month',
      b1_title: 'The Book of Disquiet',
      b1_desc: 'A Lisbon classic to read slowly, one fragment per coffee.',
      b2_title: 'Blindness',
      b2_desc: 'A gripping, unforgettable parable that you will finish in one sitting.',
      b3_title: 'Night Train to Lisbon',
      b3_desc: 'A quiet adventure for anyone who has ever dreamed of starting over.',
      events_title: 'Events',
      e1_date: 'Thu 22 Oct',
      e1_title: 'Pessoa Reading Night',
      e1_desc: 'Fragments read aloud in Portuguese and English, with a pot of coffee for every table.',
      e2_date: 'Sat 31 Oct',
      e2_title: 'Secondhand Book Swap',
      e2_desc: 'Bring a book you have loved, take home one someone else did.',
      e3_date: 'Thu 12 Nov',
      e3_title: 'Meet the Author: Lisbon in Letters',
      e3_desc: 'A relaxed afternoon talk and signing with a local writer.',
      gallery_title: 'Gallery',
      cap1: 'Reading corner by the window',
      cap2: 'Fresh pastries on the counter',
      cap3: 'The back shelves of secondhand books',
      cap4: 'An evening reading night',
      cap5: 'Our stubborn espresso machine',
      cap6: 'A rainy afternoon at Paper Boat',
      open_photo: 'Open photo: {0}',
      viewer: 'Photo viewer',
      close: 'Close',
      story_title: 'Our story',
      story1: 'Paper Boat began with a small room, a few crates of secondhand books and a very stubborn espresso machine. We wanted a place where nobody rushes you: where you can browse, sit by the window and stay for as long as the chapter takes.',
      story2: 'Today we stock new and used books in Portuguese, English and a few other languages, and bake something fresh every morning. Come in out of the rain, or the sun, and stay a while.',
      visit_title: 'Visit us',
      hours_title: 'Opening hours',
      mon: 'Monday',
      tue_fri: 'Tuesday – Friday',
      sat: 'Saturday',
      sun: 'Sunday',
      closed: 'Closed',
      address_title: 'Address',
      footer: '© 2026 Paper Boat · Lisbon',
      instagram: 'Follow us on Instagram'
    },
    pt: {
      title: 'Paper Boat — Livraria e Café em Lisboa',
      description: 'O Paper Boat é uma pequena livraria com café em Lisboa. Bons livros, bom café, tardes sem pressa.',
      lang_group: 'Idioma',
      eyebrow: 'Livraria e Café · Lisboa',
      tagline: 'Encontre um livro, sirva um café e deixe a tarde passar.',
      cta: 'Visite-nos',
      books_title: 'Na nossa estante este mês',
      b1_title: 'Livro do Desassossego',
      b1_desc: 'Um clássico de Lisboa para ler devagar, um fragmento por café.',
      b2_title: 'Ensaio sobre a Cegueira',
      b2_desc: 'Uma parábola envolvente e inesquecível que vai ler de uma assentada.',
      b3_title: 'Comboio Noturno para Lisboa',
      b3_desc: 'Uma aventura tranquila para quem alguma vez sonhou recomeçar do zero.',
      events_title: 'Eventos',
      e1_date: 'Qui 22 out',
      e1_title: 'Noite de Leitura de Pessoa',
      e1_desc: 'Fragmentos lidos em voz alta em português e inglês, com um bule de café em cada mesa.',
      e2_date: 'Sáb 31 out',
      e2_title: 'Troca de Livros Usados',
      e2_desc: 'Traga um livro de que gostou e leve para casa um de que outra pessoa gostou.',
      e3_date: 'Qui 12 nov',
      e3_title: 'Conheça o Autor: Lisboa em Cartas',
      e3_desc: 'Uma conversa descontraída de tarde e sessão de autógrafos com um escritor local.',
      gallery_title: 'Galeria',
      cap1: 'Cantinho de leitura junto à janela',
      cap2: 'Pastéis fresquinhos no balcão',
      cap3: 'As estantes do fundo com livros usados',
      cap4: 'Uma noite de leitura ao serão',
      cap5: 'A nossa teimosa máquina de café',
      cap6: 'Uma tarde de chuva no Paper Boat',
      open_photo: 'Abrir foto: {0}',
      viewer: 'Visualizador de fotos',
      close: 'Fechar',
      story_title: 'A nossa história',
      story1: 'O Paper Boat começou com uma pequena sala, algumas caixas de livros usados e uma máquina de café muito teimosa. Queríamos um lugar onde ninguém o apressa: onde pode folhear, sentar-se à janela e ficar o tempo que o capítulo durar.',
      story2: 'Hoje temos livros novos e usados em português, inglês e algumas outras línguas, e cozemos algo fresco todas as manhãs. Entre para fugir da chuva, ou do sol, e fique um bocadinho.',
      visit_title: 'Visite-nos',
      hours_title: 'Horário de funcionamento',
      mon: 'Segunda-feira',
      tue_fri: 'Terça a sexta-feira',
      sat: 'Sábado',
      sun: 'Domingo',
      closed: 'Fechado',
      address_title: 'Morada',
      footer: '© 2026 Paper Boat · Lisboa',
      instagram: 'Siga-nos no Instagram'
    }
  };

  var current = DEFAULT;

  function t(key) {
    return (T[current] && T[current][key]) || T[DEFAULT][key] || key;
  }

  function readStored() {
    try {
      var v = window.localStorage.getItem(STORAGE_KEY);
      return T[v] ? v : null;
    } catch (e) {
      return null;
    }
  }

  function store(lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function apply(lang) {
    current = T[lang] ? lang : DEFAULT;
    document.documentElement.lang = current;
    document.title = t('title');
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('description'));

    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-aria-label]'), function (el) {
      var text = t(el.getAttribute('data-i18n-aria-label'));
      var argKey = el.getAttribute('data-i18n-arg');
      el.setAttribute('aria-label', argKey ? text.replace('{0}', t(argKey)) : text);
    });

    Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === current ? 'true' : 'false');
    });

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: current } }));
  }

  function set(lang) {
    if (!T[lang]) return;
    store(lang);
    apply(lang);
  }

  Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (btn) {
    btn.addEventListener('click', function () { set(btn.getAttribute('data-lang')); });
  });

  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY && T[e.newValue]) apply(e.newValue);
  });

  apply(readStored() || DEFAULT);
})();
