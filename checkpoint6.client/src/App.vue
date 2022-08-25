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
  background: rgb(74, 78, 105);
  background: linear-gradient(-90deg, rgba(74, 78, 105, 1) 5%, rgba(50, 59, 79) 100%);

  height: 100vh;
}
</style>
