import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';

import ReactPlayer from 'react-player';

const VideosList = () => {
    
    const [videos, setVideos] = React.useState([]);

    const URI:string = 'https://contact-mern-stack-cjzr-1.herokuapp.com/api/videos';

    const getVideos = async () => {
        const headersConfig = {
            headers: {
                'Authorization': localStorage.getItem('userLogin')
            }
        }

        const dataVideos = await axios.get(URI, headersConfig);
        setVideos(dataVideos.data.videos);
    }

    const videos1 = () => {
        if(videos.length > 0) {
            return(
                <div className="row">
                    {
                        videos.map((video:any) => {
                            return(
                                <div className="col-sm-12 col-md-12 col-xl-6" key={video._id}>
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title text-center">{video.title}</h3>
                                        </div>
                                        <div className="card-body">
                                            <ReactPlayer url={video.urlVideos} width="100%" controls={true} />
                                            <p className="card-text mt-3 text-center">{video.description}</p>
                                            <p className="card-text mt-3 text-center">{video.tag}</p>
                                            <Link className="mt-3 btn btn-info btn-block" to={`/video/${video._id}`}>Edit</Link>
                                            <button type="button" className="btn btn-danger btn-block" onClick={() => deleteVideo(video._id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            );
        } else {
            return(
                <div className="row">
                    <div className="col-sm-10 col-md-10 col-xl-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-title">If you want to add Videos in this page, please give click in the link that be down.</p>
                                <div className="d-flex justify-content-center" style={{width:'100%'}}>
                                    <Link className="btn btn-primary" to="/addVideos">Click Here!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    const deleteVideo = async (id:string) => {
        const headersConfig = {
            headers: {
                'Authorization': localStorage.getItem('userLogin')
            }
        }
        const deleteData = await axios.delete(`${URI}/${id}`, headersConfig);
        const message = deleteData.data.message;
        if(message.msgError){
            toast(message.msgBody, {
                type: 'error'
            });
        } else {
            toast(message.msgBody, {
                type: 'success'
            });
            getVideos();
        }
    }

    React.useEffect(() => {
        getVideos();
    }, []);

    return(
        videos1()
    );
}

export default VideosList;