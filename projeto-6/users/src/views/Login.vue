<template>
  <div>
    <h2>Login</h2>
    <hr />
    
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
              <div v-if='error'>
                  <div  class="notification is-danger">
                        {{error}}
                  </div>
              </div>
         <p>Email</p>
        <input class="input" type="email" placeholder="email@email.com" v-model='email'/>
        <p>Senha</p>
        <input class="input" type="password" placeholder="********" v-model='password'/>
        <hr/>
        <button class='button is-success' @click='login()'> Logar </button>
      </div>
    </div>
    

  </div>
</template>


<script>
import axios from 'axios'
export default {
    data(){
        return{
            email:'',
            password:'',
            error: undefined
        }
    },
    methods:{
        login(){
            axios.post('http://localhost:3000/login',
             {
                email: this.email, 
                password: this.password
            })
             .then(res => {
                localStorage.setItem('token', res.data.token)

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