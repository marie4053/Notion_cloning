
// EditPage 의 {...this} = render, setState, state
export default function EditPage({$target, initialState = {
  title: '',
  content: '',
}, onEditing}) {
  const $editPage = document.createElement('div')

  let isInitialize = false

  this.state = initialState

  $target.appendChild($editPage)

  // setState 메서드는 매개변수로 nextState가 들오면 현재 상태를 변경하고, 렌더해준다.
  this.setState = (nextState) => {
    // console.log(nextState); // 변경사항 확인하기
    this.state = nextState
    $editPage.querySelector('[name=title]').value = this.state.title
    $editPage.querySelector('[name=content]').value = this.state.content
    this.render()
  }
  this.render = () => {
    if (!isInitialize) {
      $editPage.innerHTML = `
      <input type="text" name="title" value="${this.state.title}" style="width:600px;" />
      <textarea name="content" style="width:600px;height:400px;">${this.state.content}</textarea>`
      isInitialize = true
    }
  }
  this.render()

  // editPage의 state는 계속 변화하는 상태를 따라감
  $editPage.addEventListener('keyup', e=> {
    // 버블링 활용
    const {target} = e // 이렇게 하면 <textarea name="content" style= ~ 이런게 뜸

    const name = target.getAttribute('name')

    // 빈 문자열이 들어와도 작동하게 undefined일 경우만 제외하도록 명시
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value
      }
      this.setState(nextState)
      onEditing(this.state)
    }
  })
}