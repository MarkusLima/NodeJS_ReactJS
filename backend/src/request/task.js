exports.create = async (request, response, next) => {

    if (!request.body.name) {
        return response.status(400).send({
            message: "name required"
        });
    }

    if (!request.body.complete) {
        return response.status(400).send({
            message: "complete required"
        });
    }

    if ((request.body.complete) && ((request.body.complete != 'sim') && (request.body.complete != 'nao'))) {
        return response.status(400).send({
            message: "complete required 'sim || nao'"
        });
    }
    
    next();
};

exports.delete = async (request, response, next) => {

    if (!request.params.id) {
        return response.status(400).send({
            message: "id required"
        });
    }

    next();

};

exports.update = async (request, response, next) => {

    if (!request.params.id) {
        return response.status(400).send({
            message: "id required"
        });
    }

    if (!request.body.name) {
        return response.status(400).send({
            message: "name required"
        });
    }

    if (!request.body.complete) {
        return response.status(400).send({
            message: "complete required"
        });
    }

    if ((request.body.complete) && ((request.body.complete != 'sim') && (request.body.complete != 'nao'))) {
        return response.status(400).send({
            message: "complete required 'sim || nao'"
        });
    }

    next();

};

exports.find_id = async (request, response, next) => {
        if (!request.params.id) {
            return response.status(400).send({
            message: "id required"
        });
    }

    next();
};