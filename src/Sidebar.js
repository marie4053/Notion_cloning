import { request } from './api.js';
import DocumentList from './DocumentList.js';

export default function Sidebar({
  $target,
  onDocumentClick
}) {
  const $page = document.createElement('div')

  // DocumentList 생성
  const documentList = new DocumentList({
    $target: $page, 
    initialState: [],
    onDocumentClick
  })

  // 새 페이지 버튼 생성
  const $newDocumentButton = document.createElement('button')
  $newDocumentButton.textContent = 'New Post'
  $page.appendChild($newDocumentButton)
  
  this.setState = async () => {
    const posts = await request('/post')
    postList.setState(posts)
    this.render()
  }

  this.render = async () => {
    $target.appendChild($page)
  }

  // const fetchDocuments = async () => {
  //   const documents = await request('/documents')

  //   documentList.setState(documents)
  // }

  // this.render = async () => {
  //   await fetchDocuments()
  //   $target.appendChild($page)
  // }
}