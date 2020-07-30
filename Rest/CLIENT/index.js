var axiosConfig = {
    headers: {
        Authorization: "Bearer "+ localStorage.getItem("token")
    }
}
function get(){  

    axios.get('http://localhost:80/game', axiosConfig).then(response => {
    var games = response.data.games
    var list = document.getElementById('games')
    
    games.forEach(game => {
        
        var col1 = document.createElement('td')   
        var col2 = document.createElement('td')   
        var col3 = document.createElement('td')   
        var col4 = document.createElement('td')
        var col5 = document.createElement('td')
        var col6 = document.createElement('td')
        
        var tr = document.createElement('tr')
        
        col1.innerHTML = game.id
        col2.innerHTML = game.title
        col3.innerHTML = game.year
        col4.innerHTML = game.price
        col5.innerHTML = `<button onClick = 'update(${JSON.stringify(game)})'class = 'btn btn-info'> Editar</button>`
        col6.innerHTML = `<button onClick = 'remove(${game.id})'class = 'btn btn-danger'> Excluir</button>`
        

        tr.appendChild(col1)
        tr.appendChild(col2)
        tr.appendChild(col3)
        tr.appendChild(col4)
        tr.appendChild(col5)
        tr.appendChild(col6)
        
        list.appendChild(tr)
        
    })
}).catch(err => console.log(err))
}

function remove(id){
    axios.delete('http://localhost:80/game/'+id, axiosConfig).then(() => location.reload()).catch(err => console.log(err))
}

function update({id, title, year, price}){
    
    console.log(id, title, year, price)
    const title2 = document.getElementById('title').value = title,
    year2 = document.getElementById('year').value = year,
    price2 = document.getElementById('price').value = price

    axios.update('http://localhost:80/game'+id,{
        title: title2,
        year: year2,
        price: price2
    }, axiosConfig).then(() => location.reload()).catch(err => console.log(err))
}
