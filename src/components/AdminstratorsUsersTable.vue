<template>
  <div class="table">
    <table class="users-table">
      <thead>
        <tr>
          <th>Role</th>
          <th>Minecraft ID</th>
          <th>Group</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in adminstrators" :key="item.id">
          <td>{{ item.role }}</td>
          <td>
            <img
              :src="
                'https://crafatar.com/avatars/' + item.uuid + '?overlay=true'
              "
            />{{ item.id }}
          </td>
          <td>{{ item.group }}</td>
          <td>
            <router-link class="user-btn" :to="{ path: `/${item.uuid}` }" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AdminstratorsUsersTable',
  data() {
    return {
      adminstrators: [
        {
          id: 'X4Z',
          uuid: '5799296a-d1ec-4252-93bd-440bb9caa65c',
          role: 'サーバ管理者',
          group: 'Admin',
        },
        {
          id: 'Hirotaisou2012',
          uuid: '39cf878b-ef0b-44fc-a2c6-de3d540a4728',
          role: 'サーバ副管理者',
          group: 'Admin',
        },
        {
          id: 'mine_book000',
          uuid: '32ff7cdc-a1b4-450a-aa7e-6af75fe8c37c',
          role: 'スタッフ',
          group: 'Admin',
        },
        {
          id: 'X9Z',
          uuid: '7008531a-539b-4dfc-8b81-7b267d18dd0a',
          role: 'スタッフ',
          group: 'Admin',
        },
        {
          id: 'Ekusas83',
          uuid: '22ab15d6-2e88-4fdd-91c0-e459f0f804f8',
          role: 'モデレータ',
          group: 'Moderator',
        },
        {
          id: 'X5Z',
          uuid: '0bdc0219-f3c3-4d73-a4df-1d8bd088f419',
          role: 'モデレータ',
          group: 'Moderator',
        },
        {
          id: 'kohonayoshi',
          uuid: '26728d53-add7-46d1-97c3-0a25bc6607f5',
          role: 'モデレータ',
          group: 'Moderator',
        },
        {
          id: 'Nudonge',
          uuid: '22b69dc2-a8e7-4ffd-a3d0-54023d687d5f',
          role: 'モデレータ',
          group: 'Moderator',
        },
        {
          id: 'MinHero_exp',
          uuid: '0ad34a33-3ca4-4c86-84f3-a4591920b06a',
          role: 'モデレータ',
          group: 'Moderator',
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
@mixin smartphone {
  @media (max-width: 480px) {
    @content;
  }
}

.table {
  display: block;
  overflow-x: auto;
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

  th,
  td {
    text-align: left;
    padding: 0 10px;
  }

  td:last-child {
    text-align: center;
  }

  td img {
    width: 36px;
    margin: 10px 10px 0 0;
  }
}

.user-btn {
  display: inline-block;
  text-decoration: none;
  background: #ffb41d;
  height: 2.5em;
  line-height: 2.5em;
  width: 100px;
  cursor: pointer;

  &:hover {
    transition: 0.5s;
    opacity: 0.5;
  }

  &::before {
    font-family: 'Material Design Icons';
    content: '\f0004';
    color: #fff;
    font-size: 1.5em;
  }
}
</style>
