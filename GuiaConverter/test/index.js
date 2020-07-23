const fs = require('fs')

function modificarUsuario(nome, curso, categoria){
    
    fs.readFile('./usuario.json', {encoding: 'utf-8'},(err, data)=> {
        
        if(err){
            console.log('Deu erro')
        }else{
            var conteudo = JSON.parse(data)
            
            conteudo[0].nome = nome
            conteudo[0].curso= curso
            conteudo[0].categoria = categoria
            fs.writeFile('./usuario.json', JSON.stringify(conteudo), err => err ? console.log('deu erro'): console.log('tudo legal'))
            
        }
        
    })
    
    fs.writeFile('./joao.txt', 'Nome: João, Idade: 21, Casado: sim', (err)=>{
        if(err){
            console.log('deu ruim')
        }
    })
}

modificarUsuario('Joazinho', 'React legal', 'react')