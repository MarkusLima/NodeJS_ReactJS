const { read_file, write_file } = require("../functions/readWritefiles.js");
const { v4: uuidv4 } = require('uuid');


exports.all = async(request, response) => {

    var tasks = await read_file("tasks.json");
    await response.json(tasks);

}


exports.create = async (request, response) => {
    const { name, complete } = request.body;
    const id = new Date().valueOf();
    const list = {};

    var tasks = await read_file("tasks.json");

    if (name && complete) {

        list.id = uuidv4();
        list.name = name;
        list.complete = complete;
        list.created_at = new Date();
        list.updated_at = new Date();

        tasks.push(list);

        await write_file("tasks.json", tasks);

        response.send(list);

    } else {

        response.status(400).send({
            message: "Bad request"
        });

    };
};

exports.delete = async (request, response) => {
    const id = request.params.id;

    if (id) {

        var tasks = await read_file("tasks.json");
        var new_list = tasks.filter(value => value.id != id);
        await write_file("tasks.json", new_list);

        response.json({msg: true});

    } else {
        response.status(400).send({
            message: "Bad request"
        });
    }
};

exports.update = async (request, response) => {
    const id = request.params.id;
    const { name, complete } = request.body;

    if (id) {

        var tasks = await read_file("tasks.json");
        var task = tasks.filter(value => value.id == id);
        
        if (task[0]) {
            
            var new_list = {};
            
            new_list.id = id;
            new_list.name = name;
            new_list.complete = complete;
            new_list.created_at = task[0].created_at;
            new_list.updated_at = new Date();
            
            var all_tasks = tasks.filter(value => value.id != id);
            all_tasks.push(new_list);

            await write_file("tasks.json", all_tasks);

            response.json(new_list);

        } else {
            response.status(404).send({
                message: "Not found"
            });
        }

    } else {
        response.status(400).send({
            message: "Bad request"
        });
    }
};

exports.find_id = async (request, response) => {
    const id = request.params.id;

    if (id) {

        var tasks = await read_file("tasks.json");
        var task = tasks.filter(value => value.id == id);

        if (task[0]) {

            response.json(task);

        } else {

            response.status(404).send({
                message: "Not Found"
            }); 
            
        }

    } else {
        response.status(400).send({
            message: "Bad request"
        });
    }
};