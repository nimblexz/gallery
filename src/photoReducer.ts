import axios from "axios";
import {Dispatch} from "redux";





export type GalleryType={
    photo: {id:string,photoUrl:string,comment:string}
}
export type initialStateType=GalleryType[]
var id = "id" + Math.random().toString(16).slice(2)
const initialState: initialStateType = [
    {photo:
            {id:'1',photoUrl:'https://images.unsplash.com/photo-1677177947814-03e7768d4e9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',comment:'ipsum'}},
    {photo:
            {id:'2',photoUrl:'https://images.unsplash.com/photo-1638186974764-207e0d62de97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',comment:'lorem'}}]
type ActionsType = ReturnType<typeof addNewPhotoAC>
    |ReturnType<typeof updateCommentAC>



export const photoReducer = (state:initialStateType = initialState, action: ActionsType): initialStateType => {
    let copystate=[...state]
    switch (action.type) {
        case "ADD-NEW-PHOTO":
            return [{photo:{id:id,photoUrl:action.photoUrl,comment:action.comment}},...state]
        case "UPDATE-COMMENT":
            copystate.map(c=>c.photo.id===action.id?c.photo.comment=action.comment:c)
            return copystate
        default:
            return state
    }

}
export const addNewPhotoAC = (photoUrl: string,comment:string) => ({
    type: 'ADD-NEW-PHOTO',
    photoUrl,
    comment
} as const)
export const updateCommentAC = (comment:string,id:string) => ({
    type: 'UPDATE-COMMENT',
    comment,
    id
} as const)


export const addNewPhotoTC:any=(photoUrl:string,comment:string)=>(dispatch:Dispatch)=>{
    axios.get(photoUrl!==''?photoUrl:'1').
    then(()=>{
        dispatch(addNewPhotoAC(photoUrl,comment!==''?comment:'comment'))})
        .catch(()=> {
            alert('image address incorrect')
        })
}
export const updateCommentTC:any=(newComment:string,id:string)=>(dispatch:Dispatch)=>{
    dispatch(updateCommentAC(newComment,id))
}
