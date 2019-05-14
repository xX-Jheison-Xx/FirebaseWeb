<template>
  <b-navbar variant="primary" type="light" toggleable="lg">
    <b-navbar-brand class="c5e-logo-lockup" href="/">
      <img
        class="c5e-logo-lockup-icon"
        fb-logo
        fb-size="10"
        alt
        style=" display: block;
  margin-left: 50px;
  margin-right: 50px;
;max-width: 5%;"
        src="https://www.pngkey.com/png/full/16-161280_deadpool-logo-pixel-pixel-art-deadpool-logo.png"
        role="presentation"
      >
    </b-navbar-brand>
    <b-navbar-toggle target="menu"/>

    <b-collapse is-nav id="menu">
      <b-navbar-nav>
        <b-nav-item href="/productos">Productos</b-nav-item>
        <b-nav-item href="/categorias">Categoria</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>
