<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-md-12 mt-2">
        <h1>GESTION CLIENTES</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <formulario-usuario @alta-usuario='postUsuario' />
        <tabla-usuarios :usuarios="usuarios" :clients="clients" @eliminarusuario="deleteUsuario"
          @editar-usuario="editarusuario" @cancelar-edicion="cancelaredicion" @actualizarusuario="putusuario" />
      </div>
    </div>
  </div>
</template>


<script>
import TablaUsuarios from '@/components/TablaUsuarios.vue';
import FormularioUsuario from '@/components/FormularioUsuario.vue';
import clients from '@/clients.json';

export default {
  name: 'app',
  components: {
    FormularioUsuario,
    TablaUsuarios,
  },
  data() {
    return {
      usuarios: [],
      clients: clients,
    }
  },
  methods: {
    async postUsuario(usuario) {
      console.log('Enviando usuario al servidor:', usuario);
      try {
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          body: JSON.stringify(usuario),
          headers: { 'Content-type': 'application/json; charset = UTF-8' },
        });
        if (!response.ok) {
          throw new Error('Error al enviar usuario al servidor: ' + response.statusText);
        }
        const usuarioAlta = await response.json();
        this.usuarios = [...this.usuarios, usuarioAlta];
        console.log('Usuario dado de alta correctamente:', usuarioAlta);
      } catch (error) {
        console.log(error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    },
    async getUsuarios() {
      console.log('Recuperando usuarios del servidor...');
      try {
        const response = await fetch('http://localhost:3000/usuarios');
        this.usuarios = await response.json();
        console.log('Usuarios recuperados correctamente:', this.usuarios); // Agrega este console.log para ver los usuarios recuperados del servidor
      } catch (error) {
        console.log('Error al recuperar usuarios del servidor:', error);
      }
    },
    async deleteUsuario(usuario) {
      try {
        await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
          method: 'DELETE'
        });
        this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
      } catch (error) {
        console.error(error);
      }
    },
    async putusuario(usuario) {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
          method: 'PUT',
          body: JSON.stringify(usuario),
          headers: { 'Content-type': 'application/json; charset = UTF-8' },
        });
        const usuarioactualizado = await response.json();
        this.usuarios = this.usuarios.map(u => (u.id === usuario.id ? usuarioactualizado : u));
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getUsuarios();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
