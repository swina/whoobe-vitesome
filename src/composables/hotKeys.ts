import { onMounted } from 'vue'
import { useEditorStore } from '/@/stores/editor'
import { useNavigatorStore } from '/@/stores/navigator'
import { removeBlock } from '/@/composables/useActions'

const editor = useEditorStore()
const navigation = useNavigatorStore()
// by convention, composable function names start with "use"
export function hotKeys() {
    onMounted(() => window.addEventListener("keydown", e => {

            //Editor HotKeys
            //
            
            if ( e.altKey ){
                console.log ( e.code )
            }
            // delete block
            if ( e.altKey && e.code === 'KeyR' ){
                if ( editor.current ){
                    removeBlock ( editor.current.id , editor.document.json )
                    navigation._message ( 'Block removed' )
                }
            }
            if ( e.altKey && e.code === 'KeyD' ){
                console.log ( 'Duplicate block' )  
                
            }
            if ( e.altKey && e.code === 'KeyC' ){
                console.log ( 'Copy block' )  
            }
            if ( e.altKey && e.code === 'KeyV' ){
                console.log ( 'Paste block' )  
            }
            if ( e.altKey && e.code === 'KeyB' ){
                if ( editor.current ){
                    editor._tool ( 'snippets' )
                }
            }
            if ( e.altKey && e.code === 'KeyN' ){
                if ( editor.current ){
                    editor._tool ( 'elements' )
                }
            }
            if ( e.altKey && e.code === 'Comma' ){
                if ( editor.current ){
                    editor._tool ( 'css' )
                }
            }
        
        
    }))
}

