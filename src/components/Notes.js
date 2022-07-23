import React, {useContext,useEffect,useState} from 'react'
import noteContext from '../context/notes/noteContext'
import Addnote from './Addnote'
import Noteitem from './Noteitem'
import {Modal, Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


const Notes = (props) => {
    const history = useHistory()
    const context = useContext(noteContext)
    const {notes,fetchNote,editNote} = context
    useEffect(() => {
      if(localStorage.getItem('token')){
      fetchNote()
      // eslint-disable-next-line
      }
      else{
        history.push('/login')
      }
      
  }, [])

    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})
    const updateNote = (currentnote) => {
      setShow(true);
      console.log(currentnote)
      setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
      
    }

    
    const handleClick = (e)=>{
       console.log('Updating note',note)
       console.log(note.etitle[0])
        editNote(note.id,note.etitle.toString(),note.edescription.toString(),note.etag.toString())
        props.showAlert("Note updated Successfully","success")
       handleClose()
    }
    const onChange = (e)=>{
        setnote({...note, [e.target.name]:[e.target.value].toString()})/// ...note mean already texts remain there not remove
    }




    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


   
  return (
    <>
 <Addnote showAlert={props.showAlert}/>
    <div className='row my3'> 

    <Button variant="primary"  className="d-none" style={{"display":"none"}}>
        Launch demo modal
      </Button>

      <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>            
          <form>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} minLength={5} required  onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag}  onChange={onChange} />
                </div>               
            </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  className="btn btn-primary" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick}>
            Update 
          </Button>
        </Modal.Footer>
      </Modal>

      
      <div className="row my-3">
                 <h2>You Notes</h2>
                 <div className="container mx-2"> 
                 {notes.length===0 && 'No notes to display'}
                 </div>
                 {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
    
      </div>
      </>)
}

export default Notes

