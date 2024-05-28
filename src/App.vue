<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { onMounted } from "vue";

const router = useRouter();
const store = useStore();
/**
 * 全局初始化函数，全局初始化单次调用
 */
const doInit = () => {
  console.log("hello，欢迎来到我的OJ项目!");
};

onMounted(() => {
  doInit();
});
router.beforeEach((to, from, next) => {
  //仅管理员可见
  if (to.meta?.access === "Admin") {
    if (store.state.user.loginUser?.userRole !== ACCESS_ENUM.ADMIN) {
      next("/noAuth");
      return;
    }
  }
  next();
});
</script>

<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
