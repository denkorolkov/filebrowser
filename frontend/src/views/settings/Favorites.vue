<template>
      <form class="card" @submit="updateFavorites">
        <div class="card-title">
          <h2>{{ t("settings.favoritesSettings") }}</h2>
        </div>

        <div class="card-content">
          <p>{{ t("settings.favoritesHint") }}</p>
          <textarea name="input input--block" v-model="favorites" class="input input--block" rows="8"></textarea>
        </div>

        <div class="card-action">
          <input
            class="button button--flat"
            type="submit"
            name="submitProfile"
            :value="t('buttons.update')"
          />
        </div>
      </form>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useLayoutStore } from "@/stores/layout";
import { users as api } from "@/api";
import Languages from "@/components/settings/Languages.vue";
import { computed, inject, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const layoutStore = useLayoutStore();
const authStore = useAuthStore();
const { t } = useI18n();

const $showSuccess = inject<IToastSuccess>("$showSuccess")!;
const $showError = inject<IToastError>("$showError")!;

const favorites = ref<string>("");

onMounted(() => {
  layoutStore.loading = true;
  if (authStore.user === null) return false;
  favorites.value = authStore.user.favorites === null ? "" : authStore.user.favorites.join("\n");
  layoutStore.loading = false;
  return true;
});

const updateFavorites = async (event: Event) => {
  event.preventDefault();

  try {
    if (authStore.user === null) throw new Error("User is not set!");

    const data = {
      ...authStore.user,
      id: authStore.user.id,
      favorites: favorites.value === "" ? [] : favorites.value.split("\n"),
    };

    await api.update(data, [
      "favorites",
    ]);
    authStore.updateUser(data);
    $showSuccess(t("settings.settingsUpdated"));
  } catch (err) {
    if (err instanceof Error) {
      $showError(err);
    }
  }
};
</script>
