// const unit = null
// mini $ 
class Gj {
    constructor(config) {
        this.config = config
    }
    offsetWidth () {

    }
    offsetLeft() {

    }
}
const g$ = (el) => {
    const $ = document.querySelector(el)

    const q = new Gj('el')
    console.log('q',q)
    return $
}

g$('ee')
export {g$}
// export default unit