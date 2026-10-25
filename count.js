(function () {
  var NS = 'linkstyle84-lin-dps';
  function live() {
    return location.hostname === 'linkstyle84-sketch.github.io';
  }
  function url(kind, key) {
    return 'https://abacus.jasoncameron.dev/' + kind + '/' + NS + '/' + key;
  }
  function hit(key, once) {
    if (!live()) return;
    var mark = 'lin-dps-user-' + key;
    try {
      if (once && localStorage.getItem(mark)) return;
    } catch (e) {}
    fetch(url('hit', key), { cache: 'no-store', keepalive: true }).then(function (res) {
      if (!once || !res.ok) return;
      try { localStorage.setItem(mark, '1'); } catch (e) {}
    }).catch(function () {});
  }
  function read(key) {
    return fetch(url('get', key), { cache: 'no-store' }).then(function (res) {
      if (res.status === 404) return 0;
      if (!res.ok) return null;
      return res.json().then(function (data) {
        return typeof data.value === 'number' ? data.value : null;
      });
    }).catch(function () { return null; });
  }
  window.LinCount = { hit: hit, read: read };
})();
