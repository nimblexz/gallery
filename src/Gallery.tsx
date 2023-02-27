import {useState} from "react";
import {AppRootStateType} from "./store";
import {useDispatch, useSelector} from "react-redux";
import {addNewPhotoTC, updateCommentTC} from "./photoReducer";
import s from './Gallery.module.css'
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Box, Button, Modal} from "@mui/material";

export const Gallery: React.FC = () => {

    const dispatch = useDispatch()
    let [imgAddress, setImgAddress] = useState<any>('')
    let [isOpen, setIsOpen] = useState<boolean>(false)
    let [url, setUrl] = useState<string>('')
    let [comment, setComment] = useState<any>('')
    const photos: any = useSelector<AppRootStateType>((state) => (state.photos))


    const addPhoto = (photoUrl: string, comment: string) => {
        dispatch(addNewPhotoTC(photoUrl, comment))
        setImgAddress('')
        setComment('')

    }
    const onTitleChangeHandler = (newValue: string, id: string) => {
        dispatch(updateCommentTC(newValue, id))
    }

    const handleOpen = () => {
        debugger
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <div className={s.gallery}>
            <input placeholder={'Type image address'}
                   value={imgAddress}
                   onChange={e => setImgAddress(e.currentTarget.value)}/>
            <input placeholder={'Type comment'}
                   value={comment}
                   onChange={e => setComment(e.currentTarget.value)}/>
            <button onClick={() => addPhoto(imgAddress, comment)}>Add image
            </button>
            <div className={s.photos}>{photos.map((p: any) => <div key={p.photo.id} className={s.photo}>
                    <Button onClick={handleOpen} id={p.photo.id}>
                        <img onClick={() => setUrl(p.photo.photoUrl)}
                             src={p.photo.photoUrl}
                             style={{width: '80px'}}/>
                    </Button>
                    <Modal className={s.modal}
                           open={isOpen}
                           onClose={handleClose}
                    >
                        <Box className={s.box}>
                            <img id={p.photo.id}
                                 className={s.img} src={url}/>
                        </Box>
                    </Modal>
                    <EditableSpan
                        value={p.photo.comment} onChange={(newValue) => onTitleChangeHandler(newValue, p.photo.id)}/>
                </div>
            )
            }
            </div>

        </div>
    )

}