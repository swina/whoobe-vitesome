import { useNavigatorStore  } from '/@/stores/navigator'

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

export function getCurrent (  ){
    return JSON.parse ( window.localStorage.getItem ( 'w-current' ) )
}

export function getEditor () {
    return JSON.parse ( window.localStorage.getItem ( 'editor') )
}