import { useNavigatorStore  } from '/@/stores/navigator'
import { useEditorStore } from '/@/stores/editor'
import Block from '/@/composables/useBlock'
import Element from '/@/composables/useElementClass'
import sift from 'sift'

const editor = useEditorStore();
const navigation = useNavigatorStore();
// by convention, composable function names start with "use"
export function action( action: string , params: any) {
    let navigation: any = useNavigatorStore();
    console.log ( navigation )
    if ( action === 'addTab' ){
        navigation.tabs.push (  {
            label: params.label,
            component: params.component
        })
        navigation.tab = navigation.tabs.length - 1
    }
   
}

export function dispatch( action: string , data: any ){
    return false
}

export function dispatchEditorTool( data: any ){
    let editor: any = useEditorStore()
    editor._tool ( data )
    return false
}


export function selectBlock ( block: object , event: object ){
    event.stopPropagation()
    console.log ( 'Selected Block => '  , block.tag , block.id )
    editor._current ( block )
    return true
}

export function removeBlock(id:string,currentNode){
    if (id == currentNode.id) {
        return currentNode;
    } else {
        var node = null
        for(var index in currentNode.blocks){
            
            node = currentNode.blocks[index];
            
            if(node.id === id){
                currentNode.blocks.splice(index,1)
                node.parent = currentNode
                return node;
            }
            removeBlock(id, node );
        }
        return node

    }
}


export function createElement ( name: string , options: object ){
    let element = new Element().createElement ( name )
    if ( editor.current?.blocks && editor.current.type === 'container' ){
        editor.current.blocks.push ( element )
        return true
    }
    return false
}

export function createGrid ( cols: number , layout:any ){
    if ( editor.current?.blocks && editor.current.type === 'container' ){
        let grid = new Element().Grid().Cols(this.cols)
        for ( var n=0 ; n < layout.length ; n++ ){
            let el = new Element()
                .Flexbox({
                    direction:'col',
                    colspan:layout[n]
                })
                .setIcon('highlight_alt')
            grid.blocks.push ( el )
        }
        editor.current.blocks.push ( grid )
        editor._helper ( '' )
        return true
    }
    return false
}

export function blockCoords ( e ){
    //if ( e  ) e.stopPropagation()
    let el: any = document.querySelector ( '#' + editor.current.id )
    let coords: object = el.getBoundingClientRect()
    if ( e ){
        coords.mouseX = e.clientX
        coords.mouseY = e.clientY
    }
    return coords
}

export function floatingCoords(){
    try {
        let el: any = document.querySelector ( '.editor-floating' )
        let coords: object = el.getBoundingClientRect()
        let main = document.querySelector ( '.editor-document' )
        let limits: object = main.getBoundingClientRect()
        el.classList.remove ( 'hidden' )
        const position = {
            top: parseInt(limits.top),
            left: parseInt(limits.left),
            right: parseInt(coords.right),
            limit: parseInt(limits.right),
            width: parseInt( coords.width )
        }
        console.log ( 'off screen' , limits.right , coords.right )
        if ( (coords.left + coords.width ) > limits.right ){
            position.left = parseInt(limits.right - coords.width)
        }
        return position
    } catch ( err ) {
        return null
    }
}

export async function blockPosition(){
        let offsetY = 0
        let offsetX = 0
        if ( editor.current.type != 'container' ){
            offsetY = 40
        }
        let coords = await blockCoords(event)
        let floating = await floatingCoords()

        let left = coords.left
        if ( ( left + floating.width ) > floating.limit ){
            left = coords.right - floating.width
        }

        return `position:fixed;top:${coords.top - offsetY}px;left:${left}px;` 
  
}

export function updateCSS ( arr:object , classe:string , valore:string ){
    let css = classe.split(' ').filter ( cl => cl != '')
    arr.forEach ( a => {
        css = css.filter ( cl => { return cl != a && classe != ' ' } )
    })
    console.log ( css )
    return css.join(' ') + ' ' + valore
}

export function matchCSS ( arr:object , classe:string ){
    let css = ''
    arr.forEach ( a => {
        classe.includes ( a ) ?
            css = a : null
    })
    return css
}

export function updateColorCSS ( arr:object , classe:string , valore:string , prefix:string ){
    let css = classe.split(' ').filter ( cl => cl != '')
    Object.keys(arr).forEach ( c => {
        arr[c].forEach ( a => {
            css = css.filter ( cl => { return cl != a.replace('bg',prefix) && classe != ' ' } )
        })
    })
    return css.join(' ') + ' ' + valore.replace('bg',prefix)
}

export function matchColorCSS ( arr:object , classe:string , prefix: string ){
    let css = ''
    Object.keys (arr).forEach ( c => {
        arr[c].forEach ( a => {
            classe.includes ( a.replace('bg',prefix) ) ?
                css = a : null
        })
    })
    return css
}



export function initColors(){
    let element = document.querySelector ( '#setupColors' )
    Object.keys ( editor.colors ).forEach ( cl => { 
        editor.colors[cl].forEach ( color => {
            element.classList.add ( color )
            setTimeout ( () => {
                element.classList.remove ( color )
            }, 2000 )
        })
        console.log ( 'adding colors for =>' , cl )
    })
    console.log ( 'colors loaded !')
    //element.remove()
    navigation._message ( 'Colors loaded !')
}


export function getCurrent (  ){
    return JSON.parse ( window.localStorage.getItem ( 'w-current' ) )
}

export function getEditor () {
    return JSON.parse ( window.localStorage.getItem ( 'editor') )
}