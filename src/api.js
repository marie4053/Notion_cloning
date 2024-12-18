export const API_END_POINT = 'https://kdt-api.fe.dev-cos.com'
export const request = async (url, options = {}) => {
  try{
    const res = await fetch(`${API_END_POINT}${url}`, {
      // 스프레드 연산자활용하여 options 객체 그대로 (복사해) 가져오기
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'Marie',
      }
    })
   
    if (res.ok) {
      console.log(`${API_END_POINT}${url}`);
      return await res.json()
    }
    throw new Error('API 처리중 문제가 생겼습니다!')
  } catch(e) {
    alert(e.message)
  }
}