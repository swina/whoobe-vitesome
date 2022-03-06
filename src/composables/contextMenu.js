export function ctxMenu () { 
        items:[
        
        {
            template:"<a href='#'>Github</a>",
            onClick:function(item,index){
                console.log("you have clicked on github link !!!!!!")
            }
        },
        {
            template:"<a href='#'>Facebook</a>",
            onClick:function(item,index){
                console.log("you have clicked on Facebook link !!!!!!")
            },
        },
        
        {
            template:"<a href='#'>Youtube</a>",
            onClick:function(item,index){
                console.log("you have clicked on Youtube link !!!!!!")
            }
        }
        ]
}

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
