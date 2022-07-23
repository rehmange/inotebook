import React ,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'


const Noteitem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context
    const { note,updateNote } = props;
    const deletefun = ()=>{
        deleteNote(note._id)
        props.showAlert("Note Deleted Successfully","danger")
    }
    return (
        <div className='col-md-3 my-3'>
            <div className="card " >
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                    <h5 className="card-title ">{note.title}</h5>
                    <i className="fa-solid fa-trash-can mx-2" onClick={deletefun}></i>
                    <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note);console.log("I am Update")}}></i></div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>

        </div>
    )
}

export default Noteitem