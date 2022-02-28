// stores/editor.js
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', {
    state: () => ({ 
        elements: null,
        current: null,
        document: null,
        page: null ,
    }),
    actions: {
        _elements ( payload ){
            this.elements = payload
        },
        _current( payload ){
            console.log ( payload , this.current )
            this.current = payload
            console.log ( payload , this.current )
        },
        _document ( payload ){
            this.document = payload
        },
        _page ( payload ){
            this.page = payload
        }
    },
    getters: {
        availableElements ( state ){
            return state.elements
        },
        currentDocument ( state ){
            return state.document
        },
        currentBlock(state) {
            return state.current
        },
    },
})