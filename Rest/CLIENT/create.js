function create() {

    const title = document.getElementById('title').value,
    year = document.getElementById('year').value,
    price  = document.getElementById('price').value
    
    axios.post('http://localhost:80', {
        title: title, year: year, price: price
    }).then((res) => console.log(res), alert(title+ ' cadastrado com sucesso')).catch(err => console.log(err))
}

