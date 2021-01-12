import {htmlParse} from './core'
import wgl from './wgl'
/**
 * main gws class
 */
class Gws {
    constructor(config) {
        this.config = config
        this.init()
        this.create()
    }
    init() {
        const {el} = this.config
        const root = document.getElementById(el)
        let three = htmlParse(root)
    }
    create() {
        wgl()
    }
}

export default Gws