// const unit = null
// mini $ 
class Gj {
    constructor(eldom) {
        this.el = document.querySelector(eldom)
    }
    offsetWidth () {

    }
    offsetLeft() {

    }
}
const g$ = (el) => {
    const $ = new Gj(el)
    return $
}

export {g$}
// export default unit