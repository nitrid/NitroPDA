var Service = require('node-windows').Service;
const path = require('path');

var svc = new Service
({
    name:'Nitrojen',
    description: 'Nitrojen Web Server.',
    script: path.join(process.cwd(), '..\\server.js'),
    env: 
    [
        {
            name: 'APP_DIR_PATH',
            value: process.cwd()
        }
    ]
});

svc.on('install',function()
{
    svc.start();
});

svc.install();