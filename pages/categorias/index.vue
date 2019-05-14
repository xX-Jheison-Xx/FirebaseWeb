<template>
  <div>
    <h4 class="text-center">CATEGORIAS:</h4>
    <div class="row mt-3">
      <div class="col-xs-6 ml-2"></div>
    </div>
    <div>
      <b-button v-b-modal.Model-categorias>New Patter</b-button>

      <b-modal
        id="Model-categorias"
        ref="modal"
        title="Nueva Categoria"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        ok-title="Guardar Categoria"
        cancel-title="Cancelar"
      >
        <form ref="form" @submit.prevent="guardarCategoria">
          <b-form-group label="Imagen:" label-for="imagen">
            <b-form-file
              id="imagen"
              accept="image/*"
              v-model="imageProduct"
              placeholder="Cargar Imagen"
              :state="image"
              required
              drop-placeholder="Cargar Imagen"
            />
          </b-form-group>
          <b-form-group
            :state="name"
            label="Nombre"
            label-for="nombre-input"
            invalid-feedback="Nombre is required"
          >
            <b-form-input
              id="categorias"
              placeholder="Ingresa la Categoria"
              :state="name"
              v-model="form.nombre"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>

    <div class="row mt-2">
      <div class="col-sm-12">
        <b-table
          responsive
          striped
          hover
          :fields="fields"
          :items="items"
          id="categorias"
          :current-page="currentPage"
          :per-page="perPage"
        >
          <template slot="acciones" slot-scope="data">
            <b-button variant="success" :href="`/categorias/${data.item.id}`">Editar</b-button>

            <b-button
              variant="danger"
              type="button"
              @click="eliminar(data.item.id, data.index)"
            >Eliminar</b-button>
          </template>

          <template slot="image" slot-scope="data">
            <b-img width="150" :src="data.item.image"></b-img>
          </template>
        </b-table>

        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="categorias"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import firebase, { db, storage } from "../../services/firebase";

export default {
  asyncData() {
    let perPage = 10;
    return db
      .collection("categorias")
      .get()
      .then(async res => {
        let items = [];
        res.forEach(value => {
          items.push({
            id: value.id,

            ...value.data()
          });
        });

        return {
          items,
          currentPage: 1,
          rows: res.docs.length,
          perPage
        };
      });
  },
  data() {
    return {
      form: {
        nombre: ""
      },
      image: null,
      name: null,
      imageProduct: null,
      fields: [
        {
          key: "image",
          sortable: true
        },
        {
          key: "nombre",
          sortable: true
        },
        {
          key: "acciones",
          sortable: false
        }
      ]
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.name = valid ? "valid" : "invalid";
      this.image = valid ? "valid" : "invalid";
      return valid;
    },
    resetModal() {
      this.name = null;
      this.image = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.guardarCategoria();
    },

    guardarCategoria() {
      if (!this.checkFormValidity()) {
        return;
      }
      let imageRef = storage.child(this.imageProduct.name);

      imageRef.put(this.imageProduct).then(async imageRes => {
        this.form.image = await imageRes.ref.getDownloadURL();

        db.collection("categorias")
          .add(this.form)
          .then(res => {
            alert("Categoria Guardada");
            this.$router.push({ path: "/categorias" });
          });
      });
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    eliminar(id, index) {
      if (confirm("Esta seguro de eliminar la siguiente categoria?")) {
        db.collection("categorias")
          .doc(id)
          .delete()
          .then(res => {
            this.items.splice(index, 1);
            alert("Categoria Borrada");
          })
          .catch(function(error) {
            alert.error("Error;", error);
          });
      }
    }
  }
};
</script>