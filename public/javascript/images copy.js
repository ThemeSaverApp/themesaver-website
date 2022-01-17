const generateCarousel = async (link, ghRepo, carousel) => {
    
    const mainFetch = await fetch(`${link}main?recursive=1`)
    const main = await mainFetch.json()

    for (let folder of main['tree']) {
        if (folder.path === 'Screenshots') {
            screenshotsFetch  = await fetch(`${link}${folder.sha}`)
            screenshots = await screenshotsFetch.json()
        
            screenshots['tree'].forEach((screenshot, count) => {
                console.log(count, screenshot)
                var div = document.createElement('div');
                div.classList.add("carousel-item");
                if (count === 0) {
                    div.classList.add("active");
                }
                var img = document.createElement('img');
                img.src = `https://github.com/${ghRepo}/blob/main/Screenshots/${screenshot.path}?raw=true`
                img.classList.add('d-block')
                img.classList.add('w-100')
                img.classList.add('h-100')
                div.appendChild(img)
                carousel.appendChild(div)  
            });
        }
    }
}

if (single === true) {
    riceJson = JSON.parse(rice)
    const carousel = document.getElementById(`carousel`)
    console.log(`https://api.github.com/repos/${riceJson.url}/git/trees/`)
    generateCarousel(`https://api.github.com/repos/${riceJson.url}/git/trees/`, riceJson.url,  carousel)
}
else {
    JSON.parse(rice).forEach(value => {
        const carousel = document.getElementById(`carousel-${value.name}`)
        console.log(carousel, value.url, `https://api.github.com/repos/${value.url}/git/trees/`)
        generateCarousel(`https://api.github.com/repos/${value.url}/git/trees/`, value.url,  carousel)
        
        
    })
}
