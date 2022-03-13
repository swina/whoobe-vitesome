export function openContextMenu ( e ){
    console.log ( 'open context menu' )
    let ctxMenu = document.querySelector ( '#contextMenu' )
    ctxMenu.classList.remove ( 'hidden' )
    ctxMenu.style.left = `${e.pageX||e.clientX}px`
    ctxMenu.style.top =`${e.pageY||e.clientY}px`
    ctxMenu.style.minHeight = 100
}

export function toggleContext ( e ){
    let ctxMenu = document.querySelector ( '#contextMenu' )
    ctxMenu.classList.add ( 'hidden' )
}
