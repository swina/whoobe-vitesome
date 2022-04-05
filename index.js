const express = require('express')
const app = express()
const port = 9000
const fs = require('fs')
const path = require('path')
const bodyParser = require("body-parser");
var cors = require('cors')

const dree = require('dree')

const options = {
    followLinks: true,
    depth: 5
};

const current   = "./server/data/current/" 
const projects  = "./server/data/projects";
const templates = "./server/data/templates";
const uikits    = "./server/data/uikits";
const build     = "/app/sveltekit/src/lib/pages";
const svelte    = "/app/sveltekit/src/routes";
const sveltekit = "/app/sveltekit/src/lib";
const local     = "./server/data";

const paths = {
    current: current,
    projects: projects,
    templates: templates,
    uikits: uikits,
    build: build,
    svelte: svelte,
    local: local
}
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(cors())

//var config = require ( path.resolve ( current ) + '/config.json' )
// return templates 
// app.get ( '/templates' , ( req , res ) => {
//     const tree = dree.scan ( path.resolve ( templates) )
//     const files = dree.parseTree ( tree , options )
//     res.json ( tree )
// })

app.get ( '/tree/:name' , ( req , res ) => {
    let dirToScan = paths[req.params.name]
    const tree = dree.scan ( path.resolve ( dirToScan ) )
    res.json ( tree )
})

app.get('/file' , ( req , res ) => {
    if ( req.query.path ){
        const rawdata = fs.readFileSync ( path.resolve ( req.query.path ) )
        try {
            res.json ( JSON.parse(rawdata) )
        } catch ( err ){
            res.json ( { data: rawdata.toString() } )
        }
    } else {
        res.json ( {} )
    }
})

app.get('/' , ( req, res ) => {
    const rawdata = require( path.resolve ( current ) + '/config.json' )
    res.json ( rawdata )
})

// app.get('/projects', (req, res) => {
//     const files = fs.readdirSync ( path.resolve ( projects ) )
//     res.json ( files )
// })


// app.get('/projects/:name', (req, res) => {
//     const rawdata = fs.readFileSync ( path.resolve ( projects ) + '/' + req.params.name )
//     res.json ( JSON.parse(rawdata) )
// })

// app.get('/templates', (req, res) => {
//     const files = fs.readdirSync ( path.resolve ( templates ) )
//     console.log ( files )
//     res.json ( files )
// })

// app.get('/templates/:name', (req, res) => {
//     const rawdata = fs.readFileSync ( path.resolve ( templates ) + '/' + req.params.name )
//     res.json ( JSON.parse(rawdata) )
// })

// app.get('/uikits', (req, res) => {
//     const files = fs.readdirSync ( path.resolve ( uikits ) )
//     res.json ( files )
// })

// app.get('/uikits/:name', (req, res) => {
//     const rawdata = fs.readFileSync ( path.resolve ( uikits ) + '/' + req.params.name )
//     res.json ( JSON.parse(rawdata) )
// })


app.post('/template/:name' , (req, res) => {
    let stream = fs.createWriteStream( path.resolve ( templates ) + '/' + req.params.name + '.json' )
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body));
        stream.end();
    });
    res.send ( req.body )
})

// save file
// @body.path = file full path (required)
app.post('/file/save' , (req, res) => {
    let stream = fs.createWriteStream( path.resolve ( req.body.path ) )
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body.data));
        stream.end();
    });
    console.log ( 'save file => ' , req.body.path   )
    res.send ( req.body )
})


// save svelte page
// @body.path = file full path (required)
app.post('/svelte/page' , (req, res) => {
    let stream = fs.createWriteStream( path.resolve ( paths['svelte'] ) + '/' + req.body.slug + '.svelte' )
    stream.once('open', function(fd) {
        stream.write(req.body.html);
        stream.end();
    });
    res.send ( req.body )
})

// add folder to path root
// @body.path = file full path (required)
app.get('/folder/add' , (req, res) => {
    console.log ( req.query.context , req.query.name )
    let dir = paths[req.query.context] + '/' + req.query.name 
    console.log ( dir )

    if ( !fs.existsSync( path.resolve(dir) )){
        fs.mkdirSync(dir);
        res.json(true)
    }
    res.json(false)
})



//set the active project
// @body.data = json data (required)
app.post('/current' , (req, res) => {
    let stream = fs.createWriteStream( path.resolve ( current ) + '/config.json' )
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body.data));
        stream.end();
    });
    res.send ( req.body )
})

// set the svelte project
// @body.data = json data (required)
app.post('/sveltekit' , (req, res) => {
    let stream = fs.createWriteStream( path.resolve ( sveltekit ) + '/config.json' )
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body.data));
        stream.end();
    });
    res.send ( req.body )
})


app.listen(port,'0.0.0.0',(err)=>{
    if ( err ){
        console.log ( err )
    } else {
        console.log("server is listening on port " , port );
    }
})