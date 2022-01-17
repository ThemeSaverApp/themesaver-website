document.getElementById('de').addEventListener('change', function() {
    const de_wm = {
        'xfce': 'xfwm4',
        'kde': 'kwin',
        'gnome': 'mutter',
        'WM': 'qtile',
    }

    document.getElementById('wm').value = de_wm[this.value]

});    