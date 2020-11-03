<template>
  <div>
    <h2>Edição de Usuário</h2>
    <hr />

    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <div v-if="error">
          <div class="notification is-danger">
            {{ error }}
          </div>
        </div>
        <p>Nome</p>
        <input
          class="input"
          type="text"
          placeholder="nome do usuario"
          v-model="name"
        />
        <p>Email</p>
        <input
          class="input"
          type="email"
          placeholder="email@email.com"
          v-model="email"
        />
        <hr />
        <button class="button is-success" @click="update()">Atualizar</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  created() {
    var req = {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .get("http://localhost:3000/user/" + this.$route.params.id, req)
      .then((res) => {
        this.id = res.data.id;
        this.name = res.data.name;
        this.email = res.data.email;
      })
      .catch(() => {
        // console.log(err)
        this.$router.push({ name: "User" });
      });
  },
  data() {
    return {
      name: "",
      email: "",
      id: -1,
      error: undefined,
    };
  },
  methods: {
    update() {
      var req = {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      };
      axios
        .put("http://localhost:3000/user/"+this.$route.params.id, {
          name: this.name,
          email: this.email,
          id: this.id,
        }, req)
        .then((res) => {
          console.log(res.request);
          this.$router.push({ name: "User" });
        })
        .catch((err) => {
          var msgError = err.response.data.msg;
          this.error = msgError;
        });
    },
  },
};
</script>


<style scoped>
</style>