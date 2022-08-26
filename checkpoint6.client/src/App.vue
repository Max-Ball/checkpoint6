<template>
  <!-- <header>
    <Navbar />
  </header> -->
  <div class="container-fluid">
    <div class="row">
      <main class="col-md-11">
        <router-view />
      </main>
      <div class="col-md-1 profile-bar text-center">
        <Login />
        <ProfileBar />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';
import ProfileBar from './components/ProfileBar.vue';

export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState)
    };
  },
  components: { ProfileBar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.profile-bar {
  background: rgb(240, 192, 0);

  height: 100vh;
}
</style>
