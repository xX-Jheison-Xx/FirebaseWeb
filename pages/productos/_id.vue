<template>
  <div>
    <b-form @submit.prevent="editarProducto">
      <div class="row mt-3">
        <div class="col-xs-6 col-sm-5 col-md-6">
          <h4>EDICION DE PRODUCTOS</h4>
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
              v-model="producto.nombre"
              placeholder="Ingresa el nombre del producto"
            />
          </b-form-group>

          <b-form-group label="Precio:" label-for="precio">
            <b-form-input
              id="precio"
              type="number"
              required
              v-model="producto.precio"
              placeholder="Ingresa el precio del producto"
            />
          </b-form-group>

          <b-form-group label="Cantidad:" label-for="cantidad">
            <b-form-input
              id="cantidad"
              type="number"
              required
              v-model="producto.cantidad"
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
  </div>
</template>

<script>
import { db, storage } from "../../services/firebase";
import { async } from "q";

export default {
  asyncData({ params }) {
    return db
      .collection("productos")
      .doc(params.id)
      .get()
      .then(res => {
        return {
          producto: res.data(),
          imageProduct: res.data(),
          id: params.id
        };
      });
  },
  data() {
    return {
      form: {
        nombre: "",
        cantidad: "",
        precio: ""
      },
      imageProduct: null,
      guardando: false
    };
  },
  methods: {
    editarProducto() {
      this.guardando = true;
      let imageRef = storage.child(this.imageProduct.name);
      imageRef.put(this.imageProduct).then(async imageRes => {
        this.producto.image = await imageRes.ref.getDownloadURL();
        db.collection("productos")
          .doc(this.$route.params.id)
          .set(this.producto)
          .then(res => {
            this.producto.image = producto.image;
            this.key = key;
            this.producto.nombre = producto.nombre;
            this.producto.cantidad = producto.cantidad;
            this.producto.precio = producto.precio;
          })
          .catch(rs => {
            alert("EDITADO");
            this.$router.push({ path: "/productos" });
          });
      });
    }
  }
};
</script>
