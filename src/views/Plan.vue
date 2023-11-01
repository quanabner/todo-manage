<script setup>
import { ref, computed } from "vue";
import { DownOutlined, PlusCircleOutlined, SmileOutlined, SyncOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import TodoItem from "@/components/plan/TodoItem.vue";
import draggable from "vuedraggable";
import { unStartSortList, processingSortList, completedSortList } from "@/const/map.js";

const notStartList = ref([
  {
    id: 1,
    name: "11111",
    status: 0,
  },
  {
    id: 2,
    name: "22222",
    status: 0,
  },
  {
    id: 3,
    name: "33333",
    status: 0,
  },
  {
    id: 4,
    name: "44444",
    status: 0,
  },
]);
const processingList = ref([
  {
    id: 1,
    name: "11111",
    status: 1,
  },
  {
    id: 2,
    name: "22222",
    status: 1,
  },
  {
    id: 3,
    name: "33333",
    status: 1,
  },
  {
    id: 4,
    name: "44444",
    status: 1,
  },
]);
const completedList = ref([
  {
    id: 1,
    name: "11111",
    status: 2,
  },
  {
    id: 2,
    name: "22222",
    status: 2,
  },
  {
    id: 3,
    name: "33333",
    status: 2,
  },
  {
    id: 4,
    name: "44444",
    status: 2,
  },
]);

const drag = ref(false);

const sort = ref({
  notStartSortKeys: [
    unStartSortList.filter((item) => {
      return item.default;
    })[0].key,
  ],
  processingSortKeys: [
    processingSortList.filter((item) => {
      return item.default;
    })[0].key,
  ],
  completedSortKeys: [
    completedSortList.filter((item) => {
      return item.default;
    })[0].key,
  ],
});

const unStartSortMap = computed(() => {
  let map = {};
  unStartSortList.forEach((item) => {
    map[item.key] = item.label;
  });
  return map;
});
const processingSortMap = computed(() => {
  let map = {};
  processingSortList.forEach((item) => {
    map[item.key] = item.label;
  });
  return map;
});
const completedSortMap = computed(() => {
  let map = {};
  completedSortList.forEach((item) => {
    map[item.key] = item.label;
  });
  return map;
});
</script>

<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="未开始" :bordered="false" :headStyle="{ color: '#ccc' }" :loading="false" hoverable>
          <template #extra>
            <a-space>
              <template #split>
                <a-divider type="vertical" />
              </template>
              <div class="plus">
                <PlusCircleOutlined />
                新增计划
              </div>
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  {{ unStartSortMap[sort.notStartSortKeys[0]] }}
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu selectable v-model:selectedKeys="sort.notStartSortKeys">
                    <a-menu-item v-for="item in unStartSortList" :key="item.key">
                      <span>{{ item.label }}</span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </template>
          <draggable v-model="notStartList" group="todo" @start="drag = true" @end="drag = false" itemKey="id">
            <template #item="{ element }">
              <TodoItem :todoItem="element"></TodoItem>
            </template>
          </draggable>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="进行中" :bordered="false" :headStyle="{ color: '#eaed34' }" :loading="false" hoverable>
          <template #extra
            ><a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                {{ processingSortMap[sort.processingSortKeys[0]] }}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu selectable v-model:selectedKeys="sort.processingSortKeys">
                  <a-menu-item v-for="item in processingSortList" :key="item.key">
                    <span>{{ item.label }}</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown></template
          >
          <draggable v-model="processingList" group="todo" @start="drag = true" @end="drag = false" itemKey="id">
            <template #item="{ element }">
              <TodoItem :todoItem="element"></TodoItem>
            </template>
          </draggable>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="已完成" :bordered="false" :headStyle="{ color: '#18d237' }" :loading="false" hoverable>
          <template #extra
            ><a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                {{ completedSortMap[sort.completedSortKeys[0]] }}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu selectable v-model:selectedKeys="sort.completedSortKeys">
                  <a-menu-item v-for="item in completedSortList" :key="item.key">
                    <span>{{ item.label }}</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown></template
          >
          <draggable v-model="completedList" group="todo" @start="drag = true" @end="drag = false" itemKey="id">
            <template #item="{ element }">
              <TodoItem :todoItem="element"></TodoItem>
            </template>
          </draggable>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<style scoped>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

.plus {
  font-size: 14px;
  color: #1677ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #69b1ff;
  }
}
</style>
