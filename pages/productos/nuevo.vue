<template>
  <b-form @submit.prevent="guardarProducto">
    <div class="row mt-3">
      <div class="col-xs-6 col-sm-5 col-md-6">
        <h4>Nuevo Producto</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <b-form-group label="Imagen:" label-for="imagen">
          <b-form-file
            id="imagen"
            accept="image/*"
            v-model="imageProduct"
            required
            placeholder="Cargar Imagen"
            drop-placeholder="Cargar Imagen"
          />
        </b-form-group>
        <b-form-group label="Nombre:" label-for="nombre">
          <b-form-input
            id="nombre"
            type="text"
            required
            v-model="form.nombre"
            placeholder="Ingresa el nombre del producto"
          />
        </b-form-group>

        <b-form-group label="Precio:" label-for="precio">
          <b-form-input
            id="precio"
            type="number"
            required
            v-model="form.precio"
            placeholder="Ingresa el precio del producto"
          />
        </b-form-group>

        <b-form-group label="Cantidad:" label-for="cantidad">
          <b-form-input
            id="cantidad"
            type="number"
            required
            v-model="form.cantidad"
            placeholder="Ingresa la cantidad disponible del producto"
          />
        </b-form-group>

        <b-form-group label="Categoria:" label-for="categoria">
          <b-form-select
            type="text"
            v-model="form.categorias"
            :options="categorias"
            placeholder="Ingresa la cantidad disponible del producto"
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
            <b-button href="/productos">Volver</b-button>
            <b-button variant="primary" type="submit" :disabled="guardando">Guardar</b-button>
          </b-button-group>
        </b-button-toolbar>
      </div>
    </div>
  </b-form>
</template>

<script>
import { db, storage } from "../../services/firebase";

export default {
  asyncData() {
    return db
      .collection("categorias")
      .get()
      .then(categoriasSnap => {
        let categorias = [];
        categoriasSnap.forEach(value => {
          categorias.push(value.data().nombre);
        });
        return { categorias };
      });
  },

  data() {
    return {
      form: {
        nombre: "",
        cantidad: "",
        precio: "",
        categorias: ""
      },
      guardando: false,
      imageProduct: null
    };
  },
  methods: {
    guardarProducto() {
      this.guardando = true;

      let imageRef = storage.child(this.imageProduct.name);
      imageRef.put(this.imageProduct).then(async imageRes => {
        this.form.image = await imageRes.ref.getDownloadURL();

        db.collection("productos")
          .add(this.form)
          .then(res => {
            this.$router.push({ path: "/productos" });
          });
      });
    }
  }
};
</script>
