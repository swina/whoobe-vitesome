import { reactive } from 'vue'
const endpoint = import.meta.env.VITE_APP_LOCAL_API
export const SVELTEURL = import.meta.env.VITE_APP_SVELTE_URL

export const paths = { 
    templates : '/templates',
    uikits: '/uikits',
    projects: '/projects',
    current: '/current',
    build: '/build',
    svelte: '/svelte',
    url: import.meta.env.VITE_APP_SVELTE_URL

}

export const currentFolder = reactive({
    path: null
})

export const localData = reactive ( {
    folders: null,
    files: {}
})

export const template = reactive ( {
    json: null
})


export async function Archive ( path:string ) {
    const res = await fetch ( endpoint + paths[path] )
    localData.folders = await res.json()
    console.log ( localData )
}

export async function fileExplorer ( path:string ){
    const res = await fetch ( endpoint + '/tree' + paths[path] )
    return await res.json()
}

export async function openPath ( path:string ) {
    const res = await fetch ( endpoint + '/file?path=' + path )
    try {
        return await res.json()
    } catch ( err ) {
        const body = await res.text()
        return body    
    }
}

export const openFolder = async ( folder )=>{
    const res = await fetch ( endpoint + '/folders/' + folder )
    localData.files[folder] = await res.json()
}

export const openSubFolder = async ( folder , subfolder )=>{
    const res = await fetch ( endpoint + '/folders/' + folder + '?folder=' + subfolder )
    const json = await res.json()
    localData.files[folder][subfolder] = json
    console.log ( localData )
}

export const openFile = async ( folder , name ) => {
    const res = await fetch ( endpoint + '/file/' + folder + '/' + name )
    template.json = await res.json() ?? res
    return 
}

export const saveFile = async ( json:Object ) => {
    let data = { data: json , path: json.path }
    await fetch ( endpoint + '/file/save' ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
}

export const activeProject = async ( json:Object ) => {
    await fetch ( endpoint + '/current' ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json) 
    })
}

export const addFolder = async ( context: String ) => {
    const folder = prompt ( 'Folder name ?')
    const res = await fetch ( endpoint + '/folder/add?name=' + folder + '&context=' + context )
    const ok = await res.json()
    return ok

}

export const saveSveltePage = async ( page: Object ) => {
    await fetch ( endpoint + '/svelte/page' ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(page) 
    })
}