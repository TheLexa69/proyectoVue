<template>
    <div id="tabla-usuarios">
        <div v-if="!usuarios.length" class="alert alert-info" role="alert">
            No existen usuarios
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Ciudad</th>
                    <th>Numero</th>
                    <th colspan="2">OPERACIONES</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td v-if="editando === usuario.id">
                        {{ usuario.id }}
                    </td>
                    <td v-else>
                        {{ usuario.id }}
                    </td>

                    <td v-if="editando === usuario.id">
                        <input type="text" class="form-control" v-model="usuario.username">
                    </td>
                    <td v-else>
                        {{ usuario.username }}
                    </td>

                    <td v-if="editando === usuario.id">
                        <input type="text" class="form-control" v-model="usuario.name">
                    </td>
                    <td v-else>
                        {{ usuario.name }}
                    </td>

                    <td v-if="editando === usuario.id">
                        <input type="text" class="form-control" v-model="usuario.email">
                    </td>
                    <td v-else>
                        {{ usuario.email }}
                    </td>

                    <td v-if="editando === usuario.id">
                        <input type="text" class="form-control" v-model="usuario.city">
                    </td>
                    <td v-else>
                        {{ usuario.city }}
                    </td>

                    <td v-if="editando === usuario.id">
                        <input type="text" class="form-control" v-model="usuario.phone">
                    </td>
                    <td v-else>
                        {{ usuario.phone }}
                    </td>

                    <td v-if="editando === usuario.id">
                        <button class="btn btn-success btn-sm" @click="guardarusuario(usuario)">💾 Guardar</button>
                        <button class="btn btn-danger btn-sm" @click="cancelaredicion(usuario)">❌ Cancelar</button>
                    </td>
                    <td v-else class="botones">
                        <button class="btn btn-info btn-sm" @click="editarusuario(usuario)">✏️ Editar</button>
                        <button class="btn btn-danger btn-sm" @click="$emit('eliminarusuario', usuario)">🗑️
                            Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'TablaUsuarios',
    props: {
        usuarios: Array,
    },
    data() {
        return {
            editando: null,
        }
    },
    methods: {
        editarusuario(usuario) {
            this.usuarioEditado = Object.assign({}, usuario);
            this.editando = usuario.id;
        },
        cancelaredicion(usuario) {
            Object.assign(usuario, this.usuarioEditado);
            this.editando = null;
        },
        guardarusuario(usuario) {
            if (!usuario.username.length || !usuario.name.length || !usuario.email.length || !usuario.city.length || !usuario.phone.length) {
                return;
            }
            this.$emit('actualizarusuario', usuario);
            this.editando = null;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.botones {
    display: flex;
    justify-content: space-around;
}
</style>
