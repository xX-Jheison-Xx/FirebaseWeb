<template>
  <div style="width: 80%">
    <div class="jumbotron">
      <span
        id="hs_cos_wrapper_module_1478627933288398597"
        class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_rich_text"
        style
        data-hs-cos-general-type="widget"
        data-hs-cos-type="rich_text"
      >
      <h1 class="text-center">{{ msg }}</h1>
      <br>
      <br>

        <p>{{ msg1 }}</p>

      </span>
      <img
      src="https://cdn.pixabay.com/photo/2017/01/16/20/22/bubbles-1985152_960_720.png"
      class="card-img-top"
        alt="..."
        
      >
      
    </div>
  </div>


</template>

<script>
export default {
  data() {
    return {
      msg: "INICIO",
      msg1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nostrum expedita esse facere exercitationem quaerat libero reprehenderit rerum ipsum. Numquam quidem nisi, accusantium earum eius repellendus explicabo reiciendis perferendis deleniti."
    };
  }
};
</script>

<style>
</style>