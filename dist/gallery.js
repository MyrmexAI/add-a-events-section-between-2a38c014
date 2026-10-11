(function () {
  var box = document.getElementById('lightbox');
  var image = document.getElementById('lightbox-image');
  var caption = document.getElementById('lightbox-caption');
  var closeBtn = document.getElementById('lightbox-close');
  var thumbs = document.querySelectorAll('.gallery-thumb');
  var opener = null;

  function open(thumb) {
    opener = thumb;
    image.className = 'lightbox-image ' + thumb.className.replace('gallery-thumb', '').trim();
    caption.textContent = thumb.parentNode.querySelector('figcaption').textContent;
    box.hidden = false;
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  }

  function close() {
    if (box.hidden) return;
    box.hidden = true;
    document.body.classList.remove('lightbox-open');
    if (opener) opener.focus();
  }

  Array.prototype.forEach.call(thumbs, function (thumb) {
    thumb.addEventListener('click', function () { open(thumb); });
  });

  closeBtn.addEventListener('click', close);
  box.addEventListener('click', function (e) {
    if (e.target === box) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
