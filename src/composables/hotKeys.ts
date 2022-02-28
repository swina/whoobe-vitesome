import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function hotKeys() {
    onMounted(() => window.addEventListener("keydown", e => {

            //Editor HotKeys
            //
            
            // delete block
            if ( e.altKey && e.code === 'KeyR' ){
                console.log ( 'Remove block' )  
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
        
        
    }))
}
