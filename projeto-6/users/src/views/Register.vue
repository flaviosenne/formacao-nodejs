<template>
  <div>
    <h2>Registro de Usuário</h2>
    <hr />
    
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
              <div v-if='error'>
                  <div  class="notification is-danger">
                        {{error}}
                  </div>
              </div>
          <p>Nome</p>
        <input class="input" type="text" placeholder="nome do usuario" v-model='name' />
         <p>Email</p>
        <input class="input" type="email" placeholder="email@email.com" v-model='email'/>
        <p>Senha</p>
        <input class="input" type="password" placeholder="********" v-model='password'/>
        <hr/>
        <button class='button is-success' @click='register()'> Cadastrar </button>
      </div>
    </div>
    

  </div>
</template>


<script>
import axios from 'axios'
export default {
    data(){
        return{
            name:'',
            email:'',
            password:'',
            error: undefined
        }
    },
    methods:{
        register(){
            axios.post('http://localhost:3000/user',
             {
                name: this.name,
                email: this.email, 
                password: this.password
            })
             .then(res => {
                 console.log(res.request)
                 this.$router.push({name: 'Home'})
             })
             .catch(err => {
                 var msgError = err.response.data.msg 
                 this.error =msgError

             })
        }
    }
};
</script>


<style scoped>
</style>