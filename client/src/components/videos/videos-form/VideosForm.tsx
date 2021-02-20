import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory, useParams} from 'react-router-dom';

import VideosI from '../../models/VideosI';

interface paramsId {
    id: string;
}

type changeInputOrTextArea = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
type formEvent1 = React.FormEvent<HTMLFormElement>

const VideosForm = () => {
    
    const history = useHistory();
    const params:paramsId = useParams();
    const URI:string = 'https://contact-mern-stack-cjzr-1.herokuapp.com/api/videos';

    const initialValuesVideo:VideosI = {
        title: '',
        description: '',
        urlVideos: '',
        tag: ''
    }

    const [video, setVideo] = React.useState(initialValuesVideo);
    const [edit, setEdit] = React.useState(false);

    const getVideo = async () => {
        if(params.id) {
            const headersConfig = {
                headers: {
                    'Authorization': localStorage.getItem('userLogin')
                }
            }
            const dataVideo = await axios.get(`${URI}/${params.id}`, headersConfig);
            const videos2:VideosI = {
                title: dataVideo.data.video.title,
                description: dataVideo.data.video.description,
                urlVideos: dataVideo.data.video.urlVideos,
                tag: dataVideo.data.video.tag
            } 
            setVideo(videos2);
            setEdit(true);
        } else {
            setVideo(initialValuesVideo);
            setEdit(false);
        }
    }

    const onChangeInput = (e:changeInputOrTextArea) => {
        const { name, value } = e.target;
        setVideo({...video, [name]:value});
    }

    const handleSubmit = async (e:formEvent1) => {
        e.preventDefault();
        if(edit) {
            const headersConfig = {
                headers: {
                    'Authorization': localStorage.getItem('userLogin')
                }
            }
            const dataPost:VideosI = {
                title: video.title,
                description: video.description,
                urlVideos: video.urlVideos,
                tag: video.tag
            }
            const postData = await axios.put(`${URI}/${params.id}`, dataPost, headersConfig);
            const message = postData.data.message;
            if(message.msgError) {
                toast(message.msgBody, {
                    type:'error'
                });
            } else {
                toast(message.msgBody, {
                    type:'success'
                });
                history.push('/videos');
                return;
            }
        } else {
            const headersConfig = {
                headers: {
                    'Authorization': localStorage.getItem('userLogin')
                }
            }

            const dataPost:VideosI = {
                title: video.title,
                description: video.description,
                urlVideos: video.urlVideos,
                tag: video.tag
            }

            const postData = await axios.post(`${URI}`, dataPost, headersConfig);
            const message = postData.data.message;
            if(message.msgError) {
                toast(message.msgBody, {
                    type:'error'
                });
            } else {
                toast(message.msgBody, {
                    type:'success'
                });
                history.push('/videos');
                return;
            }
        }
    } 

    React.useEffect(() => {
        getVideo();
        // eslint-disable-next-line
    }, [params.id]);

    return(
        <div className="row">
            <div className="col-sm-10 col-md-10 col-xl-7 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title text-center">{edit ? 'Update Videos' : 'Add Videos'}</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" name="title" placeholder="Title" onChange={onChangeInput} value={video.title} />
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" name="description" rows={4} placeholder="Description" onChange={onChangeInput} value={video.description}></textarea>
                            </div>
                            <div className="form-group">
                                <input type="url" className="form-control" name="urlVideos" placeholder="URL Videos" onChange={onChangeInput} value={video.urlVideos} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="tag" placeholder="Tag" onChange={onChangeInput} value={video.tag} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">{edit ? 'Update Video' : 'Add Video'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideosForm;