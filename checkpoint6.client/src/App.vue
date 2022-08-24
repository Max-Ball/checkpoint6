<template>
  <!-- <header>
    <Navbar />
  </header> -->
  <div class="container-fluid">
    <div class="row">
      <main class="col-md-11">
        <router-view />
      </main>
      <div class="col-md-1 profile-bar">
        <Login />
      </div>

    </div>

  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';

export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.profile-bar {
  background-color: rgb(28, 24, 28);
  height: 100vh;
}
</style>
