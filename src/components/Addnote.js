// import React ,{useState,useContext} from 'react'
// import noteContext from '../context/notes/noteContext'

// const Addnote = () => {
//     const context = useContext(noteContext)
//     const {addNote} = context

//     const [note, setnote] = useState({title:"",description:"",tag:"default"})
//     const handleClick = (e)=>{
//         e.preventDefault();//So that page will not reload 
//         addNote(note.title,note.description,note.tag)
//     }

//     const onChange = (e)=>{
//         setnote({...note, [e.target.name]:[e.target.value]})/// ...note mean already texts remain there not remove
//     }
//     return (<>
//         <div className='container my-2'>
//             <h2 className='container my-2'>Add Your Note</h2>
//             <form>
//                 <div className="mb-3">
//                     <label htmlFor="title" className="form-label">Title</label>
//                     <input type="text" className="form-control" id="title" name='title' onChange={onChange} />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="description" className="form-label">Description</label>
//                     <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="tag" className="form-label">Tag</label>
//                     <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
//                 </div>
//                 <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
//             </form>
//             <h2 className='container my-2'>You Notes</h2>

//         </div>
//         <div>
            
//         </div>
//     </>
//     )
// }

// export default Addnote



import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Note Added Successfully","success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote