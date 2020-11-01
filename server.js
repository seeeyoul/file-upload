const http = require('http');
const path = require('path');
const fse = require('fs-extra');
const multiparty = require('mutiparty');

const server = http.createServer();

const UPLOAD_DIR = path.resolve(__dirname, '..', 'target');


server.on('request', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS');
    res.status = 200;
    res.end('111');
    return;
})

const multipart = new multipart.Form();

multipart.parse(req, async (err, field, files) => {
    if(err){
        return;
    }
    const [chunk] = files.chunk;
    const [hash] = field.hash;
    const [filename] = field.filename;
    const chunkDir = path.resolve(UPLOAD_DIR, filename);

    // 切片目录不存在，创建切片目录
    if(!fse.existsSync(chunkDir)) {
        await fse.mkdir(chunkDir);
    }

    await fse.move(chunk.path, `${chunkDir}/${hash}`);

    res.end('received');
})

server.listen(3001, () => console.log('zhengzai jianting 3001'))
