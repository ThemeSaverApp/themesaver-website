const generateCarousel = async (rice, carousel) => {
    console.log(rice)       
    rice.Screenshots.forEach((screenshot, count) => {
        console.log(count, screenshot)
        var div = document.createElement('div');
        div.classList.add("carousel-item");
        if (count === 0) {
            div.classList.add("active");
        }
        var img = document.createElement('img');
        img.src = `https://github.com/${rice.url}/blob/${rice.branch}/Screenshots/${screenshot}?raw=true`
        img.classList.add('d-block')
        img.classList.add('w-100')
        img.classList.add('h-100')
        div.appendChild(img)
        carousel.appendChild(div)  
    });
        
    
}

if (single === true) {
    generateCarousel(JSON.parse(rice),  document.getElementById(`carousel`))
}
else {
    JSON.parse(rice).forEach(value => {
        generateCarousel(value,  document.getElementById(`carousel-${value.name}`))
        
        
    })
}
