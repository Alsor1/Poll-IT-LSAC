import close from '../../assets/X.png'
import './createPoll'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left:'50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#04395E',
  padding: '50px',
  zIndex:1000,
  borderRadius:"25px",
  color:"#FFF"
  
}

const OVERLAY_STYLES = {
  position:'fixed',
  top:0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)' ,
  zIndex: 1000
}


export default function CreatePoll({open, onClose}) {
  if(!open) return null
  return (
    <>
    <div style={OVERLAY_STYLES} onClick={onClose}/>
      <div style={MODAL_STYLES}>

        <form className="form-createPoll">
          {/* buton de inchis */}
          <img onClick={onClose} src={close} ></img>

          {/* Titlu */}
          <h2>Create a Poll</h2>

          {/* input de pus nume poll */}
          <label for='pollTitle'>Title</label><br></br>
          <input type="text" id='pollTitle' name='pollTitle' placeholder='Type your question here'></input>

          {/* selectare tip de */}
          <p>Voting type</p>
          <label>
          <input type="radio" value="singleType" name="pollType" /> Single Choice 
          </label><br></br>

          <label>
          <input type="radio" value="multipelType" name="pollType" /> Multiple choice
          </label>

          {/* Raspunsuri la poll */}
          <p>Answer Options</p>
          
          <input type="text" id='option1' name='option1' placeholder='Option 1'></input><br></br>
          <input type="text" id='option2' name='option2' placeholder='Option 2'></input><br></br>
          <input type="text" id='option3' name='option3' placeholder='Option 3'></input><br></br>

          <button>Create Poll</button>
        </form>
      </div>
    </>
  )
}
