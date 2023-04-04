const fs = require("fs").promises;;
const { readdir } = require('fs');
const path = require('path');
const _dirname = path.resolve();

const read_file = async (file) => {

    try {
        
        var content = await fs.readFile(_dirname+"/src/db/"+file);
        return JSON.parse(content);

    } catch (error) {
        console.log(error)
    }
};

const write_file = (file, tasks) => {

    try {

        fs.writeFile(_dirname+"/src/db/"+file, JSON.stringify(tasks, null, 4), err => {
            if (err) {
              console.log(`Error writing file: ${err}`)
            }
        })

    } catch (error) {
        console.log(error)
    }
};

module.exports = { read_file, write_file };