
import App from './App.js';
// import EditPage from './EditPage.js';
// import { getItem, setItem } from './storage.js';
// import PostEditPage from './PostEditPage.js';

// const DUMMY_DATA = [
//   {
//     id: 1,
//     title: '테스트1'
//   },
//   {
//     id: 2,
//     title: '테스트2'
//   },
//   {
//     id: 3,
//     title: '테스트3'
//   },
//   {
//     id: 4,
//     title: '테스트4'
//   }

// ]


// index.html에 <main>태그임

const $target = document.querySelector('#app');

new App({$target})

// const postEditPage = new PostEditPage({
//   $target,
//   initialState: {
//     documentId: 'new'
//   }
// });

// postEditPage.setState({
//   documentId: 1
// });