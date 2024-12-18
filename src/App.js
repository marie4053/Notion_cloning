import Sidebar from './Sidebar.js';
import PostEditPage from './PostEditPage.js';

// url 규칙
// 루트: postPage 그리기

// /document/{documentId} - id에 해당하는 document 생성
// /document/new - 새 post 생성

// App.js에서는 컴포넌트들을 합친다.
export default function App({$target}) {
  // Sidebar 생성
  const sidebar = new Sidebar({
    $target,
    onDocumentClick: (id) => {
      history.pushState(null, null, `/posts/${id}`)
      this.route()
    }
  })

  // EditPage 생성
  const postEditPage = new PostEditPage({
    $target, 
    initialState: {
      documentId:'new',
      documents: {
        title: '',
        content:'',
      }
    }
  })

  this.route = () => {
    $target.innerHTML = ''
    const {pathname} = window.location

    // pathname === '/' => 비어 있는경우? root?
    if (pathname === '/') {
      sidebar.render()
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/')
      postEditPage.setState({documentId}) 
    }
  }

  this.route()

  // initRouter(() => this.route())

  // 커스텀 이벤트
  // window.addEventListener('route-change', (nestUrl) => {
  //   history.pushState(null, null, nextUrl)
  //   this.route()
  // })
}