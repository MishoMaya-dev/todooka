import { v1 as uuid } from 'uuid';

export const todos = [
  {
    marker: 'Blue.svg',
    title: 'Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci culpa cumque dolorum excepturi fugiat placeat.',
    timer: false,
    time: 0,
    done: false,
    id: 1
  },
  {
    marker: 'Green.svg',
    title: 'Design',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    timer: true,
    time: 1602867109876,
    done: false,
    id: 2
  },
  {
    marker: 'Blue.svg',
    title: 'Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci culpa cumque dolorum excepturi fugiat placeat.',
    timer: false,
    time: 0,
    done: true,
    id: 3
  },
  {
    marker: 'Red.svg',
    title: 'Illustration',
    description: 'Adipisci culpa cumque dolorum excepturi fugiat placeat. Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    timer: false,
    time: 0,
    done: false,
    id: 4
  },
]
export default [
  {
    id: uuid(),
    login: 'john',
    email: 'john@mail.ru',
    password: 'john123456',
    token: '123456john123456',
    name: 'John',
    todos: [...todos.map(todo => copyObject(todo))],
  },
  {
    id: uuid(),
    login: 'anna',
    email: 'anna@mail.ru',
    password: 'anna123456',
    token: '123456anna123456',
    name: 'Anna',
    todos: [...todos.map(todo => copyObject(todo))],
  }
]

function copyObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}