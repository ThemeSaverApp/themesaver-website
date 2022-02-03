var r = document.querySelector(':root');
var theme = localStorage.getItem('colorScheme')
console.log(theme)

var setIcon = (iconTheme) => {
    for (img of document.getElementsByClassName("themesaver-logo")) {
        img.src = `/icons/ThemeSaverLogo-${iconTheme}.png`
    }    
    document.getElementById('favicon').setAttribute('href', `/icons/ThemeSaverLogo-${iconTheme}.png`)
}

var nord = () => {
    r.style.setProperty('--bg', '#88C0D0')
    r.style.setProperty('--fg', '#3B4252')
    r.style.setProperty('--text-color', '#D8DEE9')
    setIcon('nord')
}

var gruvbox = () => {
    r.style.setProperty('--bg', '#d79921')
    r.style.setProperty('--fg', '#3c3836')
    r.style.setProperty('--text-color', '#fbf1c7')
    setIcon('gruvbox')

}

var dracula = () => {
    r.style.setProperty('--bg', '#44475a')
    r.style.setProperty('--fg', '#bd93f9')
    r.style.setProperty('--text-color', '#f8f8f2')
    setIcon('dracula')
}

var og = () => {
    r.style.setProperty('--bg', '#ffffff')
    r.style.setProperty('--fg', '#F78914')
    r.style.setProperty('--text-color', '#ffffff')
    setIcon('og')
}


document.getElementById('og-theme').addEventListener('click', function() {
    localStorage.setItem('colorScheme', 'og')
    og()
})

document.getElementById('nord-theme').addEventListener('click', function() {
    localStorage.setItem('colorScheme', 'nord')
    nord()
})

document.getElementById('dracula-theme').addEventListener('click', function() {
    localStorage.setItem('colorScheme', 'dracula')
    dracula()
})

document.getElementById('gruvbox-theme').addEventListener('click', function() {
    localStorage.setItem('colorScheme', 'gruvbox')
    gruvbox()
})


if (theme === 'nord') {
    nord()
}
else if (theme === 'gruvbox') {
    gruvbox()
}
else if (theme === 'dracula') {
    dracula()
}
else if (theme === 'og') {
    og()
}
else {
    og()
}

