<template>
  <div class="container">
    <h3 class="mt-5">Predict the gender</h3>
    <div class="row justify-content-center mt-3">
      <div class="col-lg-6">
        <input
          class="form-control w-50 mx-auto"
          type="text"
          v-model="searchTerm"
          @keyup="requestName"
          placeholder="Search a name"
        />

        <div v-if="person" class="mt-4">
          <h5>Name - {{ person.name }}</h5>
          <p>Gender - {{ person.gender }}</p>
        </div>

        <div v-if="isLoading && !error">
          <div class="spinner-border m-5" role="status"></div>
        </div>

        <div v-if="error" class="text-danger mt-4">{{ error }}!!</div>
      </div>
    </div>
  </div>
</template>

<script>
import getName from "../composables/getName";
export default {
  name: "HomeView",
  setup() {
    const { person, error, searchTerm, isLoading, requestName } = getName();

    return { person, error, searchTerm, isLoading, requestName };
  },
};
</script>
