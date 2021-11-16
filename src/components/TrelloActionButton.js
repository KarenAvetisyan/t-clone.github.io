import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { addList, addCard} from '../actions';

const TrelloActionButton = ({ list, dispatch, listID }) => {

    const [formOpen, setFormOpen] = useState(false);
    const [textValue, setTextValue] = useState()

    // FORM SHOW TOGGLE
    const formToggle = () => {
        setFormOpen(true);
    } 

    // FORM HIDE TOGGLE
    const formHide = () => {
        setFormOpen(false);
    } 

    // RENDER BUTTON 
    const renderAddButton = () => {

        const buttonText = list ? "add another list" : "add another card";
        const buttonColor = list ? "#fff" : "#000";
        const bgColor = list ? "#000" : "#fff";
        
        return (
            <div onClick={formToggle} style={{ ...styles.button, color: buttonColor, backgroundColor: bgColor }}>
               <span style={styles.button_span}>+</span> { buttonText }
            </div>
        )
    }

    // FIELD VALUE CHANGE 
    const handleText = (e) => {
        setTextValue(e.target.value)
    }

    // ADD LIST 
    const handleAddList = () => {
        setTextValue('')
        if(textValue) {
            dispatch(addList(textValue))
        }
        return;
    }

    // ADD CARD 
    const handleAddCard = () => {
        setTextValue('')
        if(textValue) {
            dispatch(addCard(listID, textValue))
        }
    }

    // FORM 
    const renderForm = () => {
        const placeholder = list ? "Enter list title..." : "Enter title for card...";
        const buttonTitle = list ? "ADD LIST" : "ADD CARD";
        return (
            <div>
                <TextareaAutosize value={textValue} onChange={handleText} style={styles.textarea} autoFocus onBlur={formHide} placeholder={placeholder}></TextareaAutosize>
                <button onMouseDown={list ? handleAddList : handleAddCard}>{buttonTitle}</button>
            </div>
        )
    }

    return (
        <>
           { formOpen ? renderForm() : renderAddButton() }
        </>
    )
   
}

// QUICK STYLES
const styles = {
    button: {
        cursor: "pointer",
        padding: "10px 10px",
        borderRadius: "10px",
        fontWeight: "bold",
        height: '50px',
        margin: "10px 0",
        display: "flex",
        alignItems: "center"
    },
    button_span: {
        marginRight: "10px",
        fontSize: "16px"
    },
    textarea: {
        resize: "none",
        outline: "none",
        border: "none",
        padding: "10px 10px",
        width: "100%",
        margin: "10px 0",
        paddingBottom: "30px"
    }
}
 
export default connect()(TrelloActionButton);