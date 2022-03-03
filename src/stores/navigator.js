// stores/navigator.js
import { defineStore } from 'pinia'

export const useNavigatorStore = defineStore('navigation', {
    state: () => ({ 
        sidebar: true,
        tabs:[],
        tab: -1,
        message: ''
    }),
    actions: {
        _sidebar(){
            this.sidebar = !this.sidebar
        },
        _tabs( payload ){
            this.tabs = payload
        },
        _addTab ( payload ){
            this.tabs.push ( payload )
            this.tab = this.tabs.length - 1
        },
        _selectTab ( payload ){
            this.tab = payload
        },
        _removeTab ( payload ){
            this.tabs.splice(payload,1)
            this.tab = this.tabs.length - 1
        },
        _message ( payload ){
            this.message = payload
        }
    },
    getters: {
        // getters receive the state as first parameter
        isSidebarActive(state) {
            return state.sidebar
        },
        getTabs(state){
            return state.tabs
        },
        currentTab(state){
            return state.tab
        },
    },
})