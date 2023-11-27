<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { DeleteOutlined, MoreOutlined, SmileOutlined, SyncOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import eventBus from "@/utils/eventBus";

const callback = (data) => {
  console.log("Component A received event data:", data);
};

onMounted(() => {
  // 订阅事件
  eventBus.on("custom-event1", callback);
});
onUnmounted(() => {
  // 取消订阅事件
  eventBus.off("custom-event1", callback);
})
// 发布事件
function handleMenuClick() {
  console.log('sasasasa')
  eventBus.emit("custom-event2", "Hello from Component TodoItem")
}

const props = defineProps({
  todoItem: {
    type: Object,
    required: true,
    default() {
      return {};
    },
  },
});

const ItemClass = computed(() => {
  if (props.todoItem.status === 0) {
    return "item item-not-start";
  } else if (props.todoItem.status === 1) {
    return "item item-processing";
  } else {
    return "item item-completed";
  }
});

const showNextStep = computed(() => {
  if (props.todoItem.status === 0) {
    return true;
  } else if (props.todoItem.status === 1) {
    return true;
  } else {
    return false;
  }
});

const showPrevStep = computed(() => {
  if (props.todoItem.status === 0) {
    return false;
  } else if (props.todoItem.status === 1) {
    return true;
  } else {
    return true;
  }
});
</script>

<template>
  <div :class="ItemClass">
    <div class="content">{{ props.todoItem.content }}</div>
    <a-dropdown placement="bottom">
      <MoreOutlined style="font-size: 24px" />
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1" v-if="showPrevStep"> 上一步 </a-menu-item>
          <a-menu-item key="2" v-if="showNextStep"> 下一步 </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3" style="color: red"> 删除 </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<style scoped>
.item {
  margin: 8px 0px;
  border-radius: 4px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.item-not-start {
  background-color: #ececec;
  &:hover {
    background-color: #ccc;
  }
}

.item-processing {
  background-color: #eeea9e;
  &:hover {
    background-color: #eaed34;
  }
}

.item-completed {
  background-color: #b5ebb9;
  &:hover {
    background-color: #18d237;
  }
}

.content {
  margin-left: 8px;
}
</style>
