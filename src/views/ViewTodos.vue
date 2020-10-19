<template>
 <div class="todos">
   <TodosHeader
       :is-tile="isTile"
       @showModal="isModalVisible = true"
       @tileView="isTile = $event"
   />
   <div>
     <div
         v-if="isTile"
         class="todos__elements-tile"
     >
       <Tile
           v-for="todo in todos"
           :key="todo.id"
           :todo="todo"
           @changeValue="editDone(todo.id)"
       />
     </div>
     <div
         v-else
         class="todos__elements-list"
     >
       <List
           v-for="todo in todos"
           :key="todo.id"
           :todo="todo"
           @changeValue="editDone(todo.id)"
       />
     </div>
   </div>
   <transition name="fade">
     <CreateTodo
         v-show="isModalVisible"
         @closeModal="closeModal"
     />
   </transition>
 </div>
</template>

<script>
import Tile from "../components/main/Tile";
import List from "../components/main/List";
import CreateTodo from "../components/main/CreateTodo";
import TodosHeader from "@/components/main/TodosHeader";
export default {
  name: 'ViewsTodos',
  data: () => ({
    isTile: true,
    isModalVisible: false,
  }),
  components: {
    TodosHeader,
    Tile,
    List,
    CreateTodo
  },
  computed: {
    todos() {
      return this.$store.getters.todos
    }
  },
  methods: {
    toLogin() {
      this.$store.dispatch('logout')
    },
    closeModal() {
      this.isModalVisible = false
    },
    tileView() {
      this.isTile = true
    },
    editDone(id) {
      this.$store.dispatch('editDone', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.todos {
  &__view-type {
    font-size: 25px;
    color: #B3B6C5;
    margin-right: 20px;
  }
}

@media screen and (min-width: 1024px) and (orientation: landscape) {
  .todos {
    &__elements-tile {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(335px, 1fr));
      grid-gap: 40px;
    }
  }
}
</style>