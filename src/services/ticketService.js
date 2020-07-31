export default {
  update : ()=>{
    return fetch('/api')
        .then(res =>res.json())
        .then(data=>data)
  }
}