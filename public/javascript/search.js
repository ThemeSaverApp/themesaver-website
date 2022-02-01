var updatedRice = []

const generateRice = () => {
    updatedRice = []
    for (const r of document.getElementById('AllRice').children) {
        if (r.classList.contains('visually-hidden') !== true) {
            updatedRice.push(r.id)
        }
        
    }
    // console.log(updatedRice)
}

const filterBySearch = () => {
    console.log(updatedRice)
    const searchTerm = document.getElementById('search-text').value
    for (const r of updatedRice) {
        var hideRice = document.getElementById(r)
        console.log(hideRice, hideRice.classList.contains('visually-hidden'))
        if (r.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1){
            hideRice.classList.add('visually-hidden');
        }
        else {
            hideRice.classList.remove('visually-hidden');
        }       
    }
}


const filterByDE = () => {
    for (const r of JSON.parse(rice)) {
        document.getElementById('wm').value = 'none'
        document.getElementById('search-text').value = ''        
        var hideRice = document.getElementById(r.name)
        console.log(hideRice)
        if (r.desktopEnvironment !== document.getElementById('de').value && document.getElementById('de').value !== 'none') {
            hideRice.classList.add('visually-hidden');    
            console.log(hideRice) 
        }
        else {
            hideRice.classList.remove('visually-hidden');
        }        
    }
    generateRice()
}

const filterByWM = () => {
    document.getElementById('de').value = 'none'
    document.getElementById('search-text').value = ''        
    for (const r of JSON.parse(rice)) {
        console.log(r.windowManager, document.getElementById('wm').value)
        var hideRice = document.getElementById(r.name)
        if (r.windowManager !== document.getElementById('wm').value && document.getElementById('wm').value !== 'none') {
            hideRice.classList.add('visually-hidden');          
        }
        else {
            hideRice.classList.remove('visually-hidden');
        }        
    }
    generateRice()
}    

document.getElementById('search-text').addEventListener('input', filterBySearch)
document.getElementById('de').addEventListener('change', filterByDE)
document.getElementById('wm').addEventListener('change', filterByWM)
generateRice()