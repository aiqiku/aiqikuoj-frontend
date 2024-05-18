<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();
// 默认主页
const selectKeys = ref(["/"]);

const store = useStore();

//获取当前登录用户
//展示的路由页面
const visibleRotes = routes.filter((item, index) => {
  if (item.meta?.hideInMenu) {
    return false;
  }

  //权限校验
  return true;
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
router.afterEach((to, from, failure) => {
  selectKeys.value = [to.path];
});
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "lulu",
    role: "admin",
  });
}, 3000);
</script>
<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <div>
        <a-menu
          mode="horizontal"
          theme="light"
          :selected-keys="selectKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../assets/logo.png" />
              <div class="title">路OJ</div>
            </div>
          </a-menu-item>

          <a-menu-item v-for="item in visibleRotes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
