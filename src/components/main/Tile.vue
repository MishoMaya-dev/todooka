<template>
  <div
    class="card"
  >
    <div class="card__header">
      <div>
        <div
          class="card__timer"
          v-if="todo.timer"
        >
          <i
            class="fas fa-clock"
          /> {{ formattedTime }}
        </div>
      </div>
      <div class="card__control">
        <button
          class="card__edit"
          @click="isModalVisible = true"
        >
          <i class="fas fa-pen"></i>
        </button>
        <button
          class="card__check"
          @click="$emit('changeValue')"
        >
          <i
            class="fas fa-check"
            :class="{ 'done' : todo.done }"
          ></i>
        </button>
      </div>
    </div>
    <div class="card__title">
      <img :src="require('@/assets/markers/' + todo.marker)">
      <h1 class="card__name">{{ todo.title }}</h1>
    </div>
    <div class="card__description">
      <p>{{ todo.description }}</p>
    </div>
    <transition name="fade">
      <EditTodo
        v-show="isModalVisible"
        :editableTodo="todo"
        @closeModal="isModalVisible = false"
      />
    </transition>
  </div>
</template>

<script>
  import EditTodo from "./EditTodo";

  export default {
    name: 'Tile',
    components: {
      EditTodo
    },
    props: {
      todo: {
        type: Object
      },
    },
    data: () => ({
      isModalVisible: false,
      time: { h: 0, m: 0, s: 0 },
      timeOutId: null,
    }),
    computed: {
      formattedTime() {
        const {h, m, s} = this.time
        const form = (num) => ('' + num).padStart(2, "0")
        return `${form(h)}:${form(m)}:${form(s)}`
      }
    },
    watch: {
      'todo.time': function () {
        this.clearTimer()
        this.startTimer()
      },
    },
    created() {
      this.startTimer()
    },
    beforeDestroy() {
      this.clearTimer()
    },
    methods: {
      startTimer() {
        if (this.todo.time - Date.now() < 0) return
        const lastTime = this.todo.time - Date.now()
        const hou = Math.floor(lastTime / 36e5)
        const min = Math.floor((lastTime % 36e5) / 6e4)
        const sec = Math.floor((lastTime % 6e4) / 1000)
        this.time.h = hou
        this.time.m = min
        this.time.s = sec
        this.timeOutId = setTimeout(this.startTimer, 1000)
      },
      clearTimer() {
        if (this.timeOutId) {
          clearTimeout(this.timeOutId)
          this.timeOutId = null
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    margin-bottom: 20px;
    padding: 20px 20px 25px;
    background: #FFFFFF;
    box-shadow: 0 25px 50px rgba(57, 59, 70, 0.05);
    border-radius: 10px;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 60px;
    }
    &__timer {
      width: 96px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #F3F5F8;
      box-sizing: border-box;
      border-radius: 50px;
      font-size: 14px;
      color: #BABECB;
    }
    &__time-over {
      color: #ff3f3f;
    }
    &__edit {
      margin-right: 10px;
    }
    &__title {
      margin-bottom: 12px;
      display: flex;
      align-items: center;
    }
    &__name {
      margin-left: 12px;
      font-size: 25px;
      color: #333333;
    }
    &__description {
      color: #BABECB;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .fa-clock {
    margin-right: 10px;
  }
  .done {
    background: -webkit-linear-gradient(90deg, #838BD8 0%, #283BEC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: initial;
  }
  button {
    width: 40px;
    height: 40px;
    border: 2px solid #F3F5F8;
    box-sizing: border-box;
    border-radius: 50px;
    background: #FFFFFF;
    font-size: 12px;
    color: #B3B6C5;
  }

  @media screen and (min-width: 1024px) and (orientation: landscape) {
    .card {
      margin: 0;
    }
  }

</style>