<template>
  <div>
    <div class="row mt-3">
      <div class="col-xs-6">
        <h4>Listado de Productos</h4>
      </div>
      <div class="col-xs-6 ml-2">
        <b-button variant="primary" href="/productos/nuevo">Nuevo</b-button>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-sm-12">
        <b-table
          responsive
          striped
          hover
          :fields="fields"
          :items="items"
          id="productos"
          :current-page="currentPage"
          :per-page="perPage"
        >
          <template slot="acciones" slot-scope="data">
            <b-button variant="success" :href="`/productos/${data.item.id}`">Editar</b-button>

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
          aria-controls="productos"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import firebase, { db } from "../../services/firebase";

export default {
  asyncData() {
    let perPage = 10;
    return db
      .collection("productos")
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
      fields: [
        {
          key: "image",
          sortable: false
        },
        {
          key: "id",
          sortable: true
        },
        {
          key: "nombre",
          sortable: true
        },
        {
          key: "precio",
          sortable: true
        },
        {
          key: "categorias",
          sortable: true
        },
        {
          key: "cantidad",
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
    eliminar(id, index) {
      if (confirm("Desea eliminar el producto?")) {
        db.collection("productos")
          .doc(id)
          .delete()
          .then(res => {
            this.items.splice(index, 1);

            alert("Producto eliminado");
          });
      } else {
        alert("Una sabia decision.");
      }
    }
  }
};
</script>

