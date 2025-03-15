import express from 'express';
import fs from 'fs';
import fileUpload from 'express-fileupload';

const server = express();

server.listen(3200, () => {
  console.log('Server is running on port 3200');
});

server.get('/', (req, res) => {
  return res.status(200).send("Hello World");
});

server.use(fileUpload({
    createParentPath: true
}));

server.post('/', (req, res) => {
    const { files } = req;
    const { fabio } = files;

    const expectedFileName = '3162883.png';

    if (fabio.name !== expectedFileName) {
        return res.status(400).send(`Error: El nombre del archivo debe ser "${expectedFileName}"`);
    }

    fabio.mv('./name/' + fabio.name, (err) => {
        if (err) {
            return res.status(500).send('Error al guardar el archivo');
        }
        return res.status(200).send(`Archivo "${fabio.name}" guardado correctamente`);
    });
});

export default server;

