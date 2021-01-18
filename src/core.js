/**
 *  parse html to object
 */

// import  acorn from "acorn"
import {g$} from './unit'
//递归
const tree =[]
const recursion = (root) => {
    tree.push(root)
    if(root.children) {
        Array.from(root.children).forEach(element => {
            recursion(element)
        });
    }
}
// 获取dom属性
const getDomProperty=(el)=>{
    const ddel = g$(el)
    console.log('el',ddel)
}

const htmlParse = (root) => {
    recursion(root)
    tree.map(item => {
        getDomProperty()
        console.log('offsetLeft',item.offsetLeft)
        console.log('offsetWidth',item.offsetWidth)
    })
    return '123'
}


export  {htmlParse}