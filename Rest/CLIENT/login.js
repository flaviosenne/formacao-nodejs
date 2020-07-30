const login = ()=>{
    const email = document.getElementById('email').value
    const pass = document.getElementById('pass').value

    
    axios.post('http://localhost:80/auth', {
        email, pass
    }).then((res) => {
        var token = res.data.token
        
        // armazenar dados como os cockies
        localStorage.setItem("token", token)
        alert(email, ' logado com sucesso')
        location.reload()
        
    }).catch(err => alert('não foi possivel fazer o login'))
}