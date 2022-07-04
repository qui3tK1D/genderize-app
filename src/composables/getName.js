import { ref } from "@vue/reactivity";
const getName = () => {
  const person = ref(null);
  const error = ref(null);
  const searchTerm = ref("");
  const isLoading = ref(false);

  const requestName = (e) => {
    // if backspace, reset
    if (e.key === "Backspace") {
      person.value = null;
      error.value = null;
    }

    //if enter, request api
    if (e.key !== "Enter" || !searchTerm.value.length) return;

    const getNames = async () => {
      try {
        isLoading.value = true;
        const res = await fetch(
          "https://api.genderize.io?name=" + searchTerm.value
        );

        const { name, gender } = await res.json();

        // if no gender throw error and stop loading
        if (!gender) {
          isLoading.value = false;
          throw Error("no avaiable name");
        }

        // if success save data and stop loading
        person.value = { name, gender };
        isLoading.value = false;
      } catch (err) {
        error.value = err.message;
      }
    };
    getNames();
  };

  return { person, error, searchTerm, isLoading, requestName };
};

export default getName;
