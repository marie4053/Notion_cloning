import {request} from './api.js'
import EditPage from './EditPage.js';
import { getItem, removeItem, setItem } from './storage.js';

export default function PostEditPage ({$target, initialState}) {
  const $page = document.createElement('div');

  this.state = initialState;
  
  //   initialState: {
  //     documentId:'new',
  //     documents: {
  //       title: '',
  //       content:'',
  //     }
  //   }

  // localStorage에 임시로 저장한 값이 있는지 확인
  let documentLocalSaveKey = `temp-post-${this.state.documentId}`;

  const documents = getItem(documentLocalSaveKey, {
    title: '',
    content: '',
  });

  let timer = null;
  
  // EditPage(Editor) 생성하기 
  const editPage = new EditPage({
    $target: $page,
    initialState: documents,
    // 수정을 할 때마다 onEditing이 발생함
    onEditing: (documents) => {
      // 디바운싱
      if (timer !== null) {
        clearTimeout(timer) // timer에 값이 들어오면 취소시켜줌 (즉, 1초 이내에 작업이 계속되면 이벤트를 계속 미루어 작동하지 않게 됨)
      }
      timer = setTimeout(async() => {
        setItem(documentLocalSaveKey, {
          ...documents,
          tempSaveDate: new Date() // 이건 필요 없을 수도?
        })

        const isNew = this.state.documentId === 'new'
        if (isNew){
          const createdDocument = await request('/posts', {
            method: 'POST',
            body: JSON.stringify(documents)
          })
          history.replaceState(null, null, `/documents/${createdDocument.id}`)
          removeItem(documentLocalSaveKey)

          // 상태 업데이트 해줘야 함
          this.setState ({
            documentId: createdDocument.id,
          })
        } else {
          await request(`/documents/${documents.id}`,{
            method: 'PUT',
            body: JSON.stringify(post)
          })
          removeItem(documentLocalSaveKey)
        }
      }, 1000)
    }
  })

  this.setState = async nextState => {
    
    // 무한루프 방지를 위한 if문 방어코드
    if (this.state.documentId !== nextState.documentId) {
      documentLocalSaveKey = `temp-post-${nextState.documentId}`;
      this.state = nextState;
      
      if (this.state.documentId === 'new') {
        const documents = getItem(documentLocalSaveKey, {
          title: '',
          content: '',
        })
        this.render()
        editPage.setState(documents)
      } else {
        await fetchDocument();
      }
      return;
    }

    this.state = nextState;
    this.render();

    editPage.setState(this.state.documents || {
      title: '',
      content: '',
    }
    )
  }

  this.render = () => {
    $target.appendChild($page)
  };
  
  const fetchDocument = async () => {
    const {documentId} = this.state;

    if (documentId !== 'new') {
      const documents = await request(`/documents/${documentId}`)
      
      // 가장 최신 버전 비교해서 제안하는 코드
      const tempDocuments = getItem(documentLocalSaveKey, {
        title: '',
        content: '',
      });

      if (tempDocuments.tempSaveDate && tempDocuments.tempSaveDate > documents.updatedAt) {
        if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
          this.setState({
            ...this.state,
            documents: tempDocuments
          })
          return 
        }
      }
      // 여기까지인듯?
      this.setState({
        ...this.state,
        documents
      })
    }
  }
}