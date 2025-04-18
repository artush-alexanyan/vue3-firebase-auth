<template>
  <div class="relative">
    <button
      @click="emit('toggle-dropdown')"
      :class="[btnClass, btnColors, activeClass]"
      class="flex items-center justify-between border cursor-pointer rounded-lg dark:bg-dark-100 px-5 py-3.5"
      type="button"
    >
      <span class="text-base">{{ label }}</span>
      <PhCaretUp v-if="showDropdownContent" size="22" />
      <PhCaretDown v-else size="22" />
    </button>
    <div
      v-if="showDropdownContent"
      :class="[contentClass, contentPosition]"
      class="absolute z-50 w-full bg-white dark:bg-dark-200 dark:border-gray rounded shadow-2xl border border-gray-200 dark:border-dark-light"
    >
      <div class="" v-if="showSearch">
        <input
          v-model="search"
          :placeholder="'Search...'"
          type="text"
          class="border-b-2 border-b-gray-300 w-full px-3 py-1.5 bg-white dark:bg-dark-100 dark:text-primary-dark-text dark:border-b-primary text-base focus:outline-none placeholder:text-base focus:border-primary"
        />
      </div>
      <div class="items">
        <div
          @click="emit('select-item', item)"
          class="item text-black dark:text-primary-dark-text hover:bg-gray-100 dark:hover:bg-gray dark:text-gray-primary hover:text-primary hover:cursor-pointer transition-all duration-300 p-2.5"
          v-for="item in filteredItems"
          :key="item.id"
        >
          <slot name="dropdownItem" :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'
import { computed } from 'vue'
import { ref } from 'vue'

const emit = defineEmits(['toggle-dropdown', 'select-item'])

const props = defineProps({
  label: {
    type: String,
    default: 'Select item',
  },
  items: {
    type: Array,
    default: [],
  },
  showDropdownContent: {
    type: Boolean,
    default: false,
  },
  btnClass: {
    type: String,
    default: 'w-full',
  },
  btnColors: {
    type: String,
    default: ' bg-white',
  },
  contentClass: {
    type: String,
    default: 'min-h-20',
  },
  showSearch: {
    type: Boolean,
    default: true,
  },
  contentPosition: {
    type: String,
    default: 'top-14',
  },
})

const search = ref('')

const filteredItems = computed(() => {
  const query = search.value.toLowerCase()
  return props.items.filter((item) => {
    if (typeof item === 'string') {
      return item.toLowerCase().includes(query)
    } else if (typeof item === 'object' && item !== null) {
      return Object.values(item).some((value) => String(value).toLowerCase().includes(query))
    }
    return false
  })
})

const activeClass = computed(() =>
  props.showDropdownContent && props.label
    ? 'text-primary border-primary'
    : ' border-gray-300 dark:border-gray dark:text-gray-primary',
)
</script>
