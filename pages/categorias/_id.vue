<template>
  <b-form @submit.prevent="edicion">
    <div class="row mt-3">
      <div class="col-xs-6 col-sm-5 col-md-6">
        <h4>Editar Categoria</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <b-form-group label="Imagen:" label-for="imagen">
          <b-form-file
            id="imagen"
            accept="image/*"
            v-model="imageProduct"
            placeholder="Cargar Imagen"
            required
            drop-placeholder="Cargar Imagen"
          />
        </b-form-group>
        <b-form-group label="Nombre Categoria:" label-for="nombre">
          <b-form-input
            id="nombre"
            type="text"
            required
            v-model="categoria.nombre"
            placeholder="Ingresa la Categoria"
          />
        </b-form-group>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 offset-sm-5">
        <b-spinner variant="primary" v-if="guardando"></b-spinner>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 offset-sm-5">
        <b-button-toolbar>
          <b-button-group right class="mx-2">
            <b-button href="/categorias">Volver</b-button>
            <b-button variant="primary" type="submit">Guardar</b-button>
          </b-button-group>
        </b-button-toolbar>
      </div>
    </div>
  </b-form>
</template>

<script>
import { async } from "q";
import { db, storage } from "../../services/firebase";

export default {
  asyncData({ params }) {
    return db
      .collection("categorias")
      .doc(params.id)
      .get()
      .then(res => {
        return {
          categoria: res.data(),
          id: params.id
        };
      });
  },
  data() {
    return {
      form: {
        nombre: ""
      },
      guardando: false,
      imageProduct: null
    };
  },

  methods: {
    edicion() {
      this.guardando = true;
      let imageRef = storage.child(this.imageProduct.name);
      imageRef.put(this.imageProduct).then(async imageRes => {
        this.categoria.image = await imageRes.ref.getDownloadURL();
        db.collection("categorias")
          .doc(this.$route.params.id)
          .set(this.categoria)
          .then(res => {
            this.categoria.image = categoria.image;
            this.categoria.nombre = categoria.nombre;
          })
          .catch(rs => {
            alert("Se han guardado los cambios.");
            this.$router.push({ path: "/categorias" });
          });
      });
    }
  }
};
</script>

