export default function DocumentList({$target, initialState, onDocumentClick}) {
  const $documentList = document.createElement('div')
  $target.appendChild($documentList)

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $documentList.innerHTML = `
    <ul>
      ${this.state.map(post => `
        <li data-id="${document.id}">${document.title}</li>
        `).join('')}
    </ul>
    `
  }
  this.render()

  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('li')

    if ($li) {
      const {id} = $li.dataset

      onDocumentClick(id)()
    }
  })

}