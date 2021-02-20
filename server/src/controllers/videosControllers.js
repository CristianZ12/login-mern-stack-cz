const videosControllers = {};
const VideosModels = require('../models/Videos');

videosControllers.getVideos = (req, resp) => {
    try {
        VideosModels.find({ userVideos: req.userId }, (err, videos) => {
            if(err) {
                return resp.status(200).json({ message: {
                    msgError: true,
                    msgBody: 'Unable to get Videos.'
                }});
            } else {
                return resp.status(200).json({ videos });
            }
        });
    } catch(err) {
        resp.status(500).json({ msg: err.message });
    }
}

videosControllers.addVideos = (req, resp) => {
    try {
        const { title, description, urlVideos, tag } = req.body;
        if(!title || !description || !urlVideos || !tag) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'Please, insert all the data of form.'
            }});
        } else {
            const addData = {
                title,
                description,
                urlVideos,
                tag,
                userVideos: req.userId
            }
            const newVideos = new VideosModels(addData);
            newVideos.save((err, video) => {
                if(err){
                    return resp.status(200).json({ message: {
                        msgError: true,
                        msgBody: 'Unable to add Video in the Database.'
                    }});
                } else {
                    return resp.status(200).json({ message: {
                        msgError: false,
                        msgBody: 'Successfully Added Video in the Database.'
                    }});
                }
            });
        }
    } catch(err) {
        return resp.status(500).json({ msg: err.message });
    }
}

videosControllers.getVideo = (req, resp) => {
    try {
        const { id } = req.params;
        VideosModels.findOne({ _id: id }, (err, video) => {
            if(err) {
                return resp.status(200).json({ message: {
                    msgError: true,
                    msgBody: 'Unable to get Video.'
                }});
            } else {
                return resp.status(200).json({ video });
            }
        })
    } catch(err) {
        return resp.status(500).json({ msg: err.message });
    }
}

videosControllers.updateVideos = (req, resp) => {
    try {
        const { id } = req.params;
        const { title, description, urlVideos, tag } = req.body;
        if(!title || !description || !urlVideos || !tag) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'Please, insert all the data of form.'
            }});
        } else {
            const updateData = {
                title,
                description,
                urlVideos,
                tag,
                userVideos: req.userId
            }
            VideosModels.findOneAndUpdate({_id: id}, updateData, (err, video) => {
                if(err) {
                    return resp.status(200).json({ message: {
                        msgError: true,
                        msgBody: 'Unable to update Video in the Database.'
                    }});
                } else {
                    return resp.status(200).json({ message: {
                        msgError: false,
                        msgBody: 'Successfully Updated Video in the Database.'
                    }});
                }
            });
        }
    } catch(err) {
        return resp.status(500).json({ msg: err.message });
    }
}

videosControllers.deleteVideos = (req, resp) => {
    try {
        const { id } = req.params;
        VideosModels.findOneAndDelete({_id: id}, (err, video) => {
            if(err) {
                return resp.status(200).json({ message: {
                    msgError: true,
                    msgBody: 'Unable to delete Video in the Database.'
                }});
            } else {
                return resp.status(200).json({ message: {
                    msgError: false,
                    msgBody: 'Successfully Deleted Video in the Database.'
                }});
            }
        })
    } catch(err) {
        return resp.status(500).json({ msg: err.message });
    }
}

module.exports = videosControllers;