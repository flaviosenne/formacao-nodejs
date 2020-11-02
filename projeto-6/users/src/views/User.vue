<template>
  <div>
    <h1>Painel ADM</h1>
    <table class="table">
      <thead>
        <td>id</td>
        <td>nome</td>
        <td>email</td>
        <td>cargo</td>
        <td>ações</td>
      </thead>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role | proccessRole }}</td>
        <td>
          <button class="button is-success">Editar</button> |
          <button class="button is-danger" @click="showModalUser(user.id)">
            Excluir
          </button>
        </td>
      </tr>
    </table>

    <div :class="{ modal: true, 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Você realmente quer deletar esse usuário?
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">Olá</div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" @click="hideModal()"
              >Cancelar</a
            >
            <a href="#" class="card-footer-item" @click="deleteUser()"
              >Confirmar</a
            >
          </footer>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="hideModal()"
      ></button>
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
      .get("http://localhost:3000/user", req)
      .then((resp) => {
        this.users = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      users: [],
      showModal: false,
      deleteUserId: -1,
    };
  },
  methods: {
    hideModal() {
      this.showModal = false;
    },
    showModalUser(id) {
      this.deleteUserId = id;
      this.showModal = true;
    },
    deleteUser() {
      var req = {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      };
      console.log(this.deleteUserId);
      axios
        .delete("http://localhost:3000/user/" + this.deleteUserId, req)
        .then((res) => {
          
          this.showModal = false;
          axios
            .get("http://localhost:3000/user", req)
            .then((resp) => {
              this.users = resp.data;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);

          this.showModal = false;
        });
    },
  },
  filters: {
    proccessRole: function (value) {
      if (value == 0) {
        return "Usuário Comum";
      }
      if (value == "admin") {
        return "Usuário Admin";
      }
    },
  },
};
</script>

<style scoped>
</style>