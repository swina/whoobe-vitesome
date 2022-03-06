export function searchIconify ( search: String ){
    const limit: Number = 100
    const resolve = new Promise ( (resolve,reject ) =>{
        fetch ( 'https://api.iconify.design/search?query=' + search + '&limit=' + limit , { mode: 'cors'})
        .then ( res => res.json() )
        .then ( icons => resolve ( icons ))
        .catch ( err => {
            console.log ( err )
        })
    })
    return resolve
}