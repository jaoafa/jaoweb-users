<template>
  <div class="vtable">
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="{
              asc: sortKey == column.key && sortAsc,
              desc: sortKey == column.key && !sortAsc,
            }"
            @click="setSortKey(column.key)"
          >
            {{ column.value }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in getLists()" :key="item.id">
          <td v-for="column in columns" :key="column.key">
            {{ item[column.key] }}{{ column.unit }}
          </td>
        </tr>
        <tr v-if="getLists() == 0">
          <td :colspan="columns.length">No matching data exists.</td>
        </tr>
      </tbody>
      <tfoot>
        <td :colspan="columns.length">
          <paginate
            v-model="currentPage"
            :page-count="getPageCount()"
            :initial-page="4"
            :page-range="3"
            :margin-pages="1"
            :prev-text="'<'"
            :next-text="'>'"
            :container-class="'pagination'"
            :page-class="'page-item'"
          />
        </td>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line import/named
import Vue, { PropType } from 'vue'
// @ts-ignore
import Paginate from 'vuejs-paginate'

export interface Column {
  key: string
  value: string
  unit: string
}

export default Vue.extend({
  name: 'VTable',
  components: {
    Paginate,
  },
  props: {
    columns: {
      type: Array as PropType<Column[]>,
      default: () => [],
      required: true,
    },
    items: {
      type: Array as PropType<any[]>,
      default: () => [],
      required: true,
    },
    defaultSortKey: {
      type: String,
      default: '',
      required: false,
    },
    defaultSortAsc: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data(): {
    loading: boolean
    parPage: number
    currentPage: number
    sortKey: string
    sortAsc: boolean
  } {
    return {
      loading: true,
      parPage: 10,
      currentPage: 1,
      sortKey: this.defaultSortKey,
      sortAsc: this.defaultSortAsc,
    }
  },
  methods: {
    getItems() {
      if (this.sortKey !== '') {
        const set = this.sortAsc ? 1 : -1
        const items = [...this.items]
        items.sort((a, b) => {
          if ((a as any)[this.sortKey] < (b as any)[this.sortKey])
            return -1 * set
          if ((a as any)[this.sortKey] > (b as any)[this.sortKey])
            return 1 * set
          return 0
        })
        return items
      } else {
        return this.items
      }
    },
    getLists() {
      const current = this.currentPage * this.parPage
      const start = current - this.parPage
      return this.getItems().slice(start, current)
    },
    getPageCount() {
      return Math.ceil(this.getItems().length / this.parPage)
    },
    setSortKey(key: string) {
      this.sortKey === key
        ? (this.sortAsc = !this.sortAsc)
        : (this.sortAsc = true)
      this.sortKey = key
    },
  },
})
</script>

<style lang="scss">
.vtable {
  display: block;
  overflow-x: auto;
  overflow-y: hidden;

  .pagination {
    width: 100%;
    margin: 10px auto 0;
    text-align: center;
    display: flex;
    list-style: none;
    justify-content: center;
    box-sizing: border-box;
    align-items: baseline;

    li a {
      padding: 0.5em;
    }

    .page-item {
      font-size: 1.5em;
      line-height: 1.5em;

      &.active {
        font-weight: bold;
        font-size: 1.7em;
      }

      &:hover {
        border: 1px solid #eee;
      }

      &.disabled a {
        font-size: 1em;
        cursor: default;
      }
    }
  }

  table {
    width: 100%;
    min-width: 100%;
    white-space: nowrap;
    border-collapse: collapse;
    text-align: center;

    tbody tr {
      border-top: solid 1px #eee;
    }

    tbody tr:hover {
      background-color: #ffeecb;
    }

    th {
      background: #eee;

      &.asc::after {
        content: '▼';
      }
      &.desc::after {
        content: '▲';
      }
    }

    th,
    td {
      padding: 4px 16px;
      border: solid 1px #ddd;
    }

    td:last-child {
      text-align: center;
    }
  }
}
</style>
