<script lang="ts">
import {defineComponent} from 'vue'
import router from "@/router";
import {mapActions} from "vuex";

export default defineComponent({
  name: "LogoutView",
  methods: {
    ...mapActions(["logout"])
  },
  async created() {
    await this.logout();
    await router.push({ path: "/login" });
  }
})
</script>
