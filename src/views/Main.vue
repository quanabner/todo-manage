<script setup>
import { ref } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";

const collapsed = ref(false);
const onBreakpoint = (broken) => {
  console.log(broken);
};
const selectedKeys = ref(["1"]);
const router = useRouter();
const route = useRoute();
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#00b96b',
      },
    }"
  >
    <a-layout>
      <a-layout-sider
        breakpoint="lg"
        collapsed-width="0"
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        @breakpoint="onBreakpoint"
      >
        <!-- <img class="logo" src="@/assets/logo.svg" /> -->
        <div class="logo"></div>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item key="1">
            <user-outlined />
            <router-link to="/">工作台</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <video-camera-outlined />
            <router-link to="/plan">计划</router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header :style="{ background: '#fff', padding: 0 }">
          <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px 0' }">
          <div :style="{ padding: '24px', background: route.name !== 'Plan' ? '#fff' : '', minHeight: '100vh' }">
            <router-view></router-view>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center"> data report ©2023 Created by Abner </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<style scoped>
.logo {
  height: 32px;
  width: 200px;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout-sub-header-background {
  background: #141414;
}
</style>
