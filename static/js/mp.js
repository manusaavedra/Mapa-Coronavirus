'use strict'

async function getData() {
            
    const data = await fetch('https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/latest')
    const response = await data.json()

    return response;
}

function renderPopup(item) {
    return `
        <h2>${item.countryregion} ${item.provincestate} </h2>
        <p><b>casos confirmados:</b> ${item.confirmed.toLocaleString()} </p>
        <p><b>muertes:</b> ${item.deaths.toLocaleString()} </p>
        <p><b>recuperados:</b> ${item.recovered ? item.recovered.toLocaleString() : 0} </p>
    `
}

async function render() {
    
    document.getElementById("map").innerHTML = `
        <div class="loading"><span>cargando datos desde que inició la pandemia...</span></div>
    `
    const data = await getData()
    
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFudXNhYXYzZHJhIiwiYSI6ImNramxpam8xdzBvcnkycnMyM2tqb3U1YnUifQ.sgrb1Z5zBCkoI85LUyn2lA';
    
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        zoom: 2
    });

    const Icon = {
        'url': './static/img/marker-icon.png',
        'size': {
            'width': 20,
            'height': 20
        }
    }

    data.map((item) => {

        const MarkerElement = document.createElement('div')
        MarkerElement.className = 'marker__icon'
        MarkerElement.style.backgroundImage = `url('${Icon.url}')`
        MarkerElement.style.backgroundSize = Icon.size.width + 'px'
        MarkerElement.style.width = Icon.size.width + 'px'
        MarkerElement.style.height = Icon.size.height + 'px'

        let latitud = item.location.lat
        let longitud = item.location.lng

               
        const marker = new mapboxgl.Marker(MarkerElement)
            .setLngLat([longitud, latitud])
            .setPopup(new mapboxgl.Popup().setHTML(renderPopup(item)))
            .addTo(map);
        
    })
}

render()

