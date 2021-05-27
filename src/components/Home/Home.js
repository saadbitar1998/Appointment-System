import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Modal from 'react-modal';
import Cookie from "js-cookie";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Home.css';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

Modal.setAppElement('#root');

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
    }
};

const Home = (props) => {

    const classes = useStyles();
    const [modalIsOpen,setIsOpen] = useState(false);
    const [startTime, setStartTime] = useState('07:30');
    const [endTime, setEndTime] = useState('08:30');
    

    const [seller, setSeller] = useState();
    const [availableSlots, setAvailableSlots] = useState([]);
    const [userAddedSlots, setUserAddedSlots] = useState([]);
    const [isChanged, setIsChanged] = useState(false);

    const afterOpenModal = () => {

    }
    
    const closeModal = () => {
        setIsOpen(false);
    }

    // save changes that are made to the timeslots
    const handleSave = () => {

        const userId = Cookie.get("userId");
        const token = Cookie.get("token"); 
        fetch('http://localhost:8080/slots/' + userId, {
            method: 'PUT',
            headers: { 
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                addedSlots: userAddedSlots,
            })
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Creating or editing a post failed!');
            }
            return res.json();
        })
        .then(resData => {
            setIsChanged(false);
            setAvailableSlots(resData.slots);
        })
    

    }


    const getSellerAvailableTimes = () => {
        const token = Cookie.get("token"); 
        const userId = Cookie.get("userId");
        console.log(userId); 
        fetch('http://localhost:8080/sellers/' + userId, {
            method: 'GET',
            headers: { 
                Authorization: 'Bearer ' + token,
            }
        })
        .then(res => {
            if (res.status !== 200) {
              throw new Error('Failed to fetch posts.');
            }
            return res.json();
          })
        .then(resData => {
            console.log(resData);
            setSeller(resData.seller._doc);
            setAvailableSlots(resData.seller._doc.available_slots);
        })
        .catch(error => {
            console.log(error);
        });
    
      
    }

    useEffect(() => {
        const userId = Cookie.get("userId");
        console.log(userId); 
        getSellerAvailableTimes();
    }, [])


    if(seller){
        return (
            <div className="container">
                <Navbar {...props}/>
                <header className="header">
                    <h1 className="title">{seller.name}</h1>

                    <p className="text-center">Description:</p>
                    <p className="description">{seller.description}</p>

                    {/* <h5>Set Avaliable slots</h5> */}
                    
                
                    <h3 className="text-center">Available Timeslots</h3>
                    <div className="button-wrapper">
                        <button
                            className="addTime-button" 
                            onClick={() => setIsOpen(true)}
                        >
                            Add time
                        </button>
                    </div>
                    <div className="timeslots">
                        {
                            availableSlots.length > 0 ?
                            availableSlots.map((slot, index) => {
                                    return (
                                        <div className="timeslot" key={index}>
                                            <p>{slot.start_time}</p>
                                            <p> {'->'} </p>
                                            <p>{slot.end_time}</p>
                                        </div>
                                    )
                                })

                            :
                            <p className="no-slots">No available Slots, Please Add</p>
                        }
                    </div>
                    {
                        isChanged ?
                            <div className="changes">
                                <p>Changes Where made to your Available timeslots. Do you want to save ?</p>
                                <button
                                    className="save-btn"
                                    onClick={() => handleSave()}
                                >
                                    Save
                                </button>
                            </div>
                        :
                        null
                    }
                </header>



                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="modal-container">
                        <form className={classes.container} noValidate>
                            <TextField
                                id="time"
                                label="StartTime"
                                type="time"
                                defaultValue={startTime}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event) => {
                                    setStartTime(event.target.value);
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </form>
                        <form className={classes.container} noValidate>
                            <TextField
                                id="time"
                                label="EndTime"
                                type="time"
                                defaultValue={endTime}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event) => {
                                    setEndTime(event.target.value);
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </form>
                        <button
                            className='modal-save'
                            onClick={() => {
                                const slot = {
                                    start_time: startTime,
                                    end_time: endTime
                                }
                                const uAS = [...userAddedSlots];
                                uAS.push(slot)
                                setUserAddedSlots(uAS);

                                const aS = [...availableSlots];
                                aS.push(slot);
                                setAvailableSlots(aS);
                                setIsChanged(true);
                                setIsOpen(false);
                            }}
                        >
                            Save
                        </button>
                    </div>
                </Modal>
            </div>
        ) 
    } else {
        return (
            <div className="loading-container">
                <div class="loader">Loading...</div>
                <p>Loading...</p>
            </div>
        )
    }


}

export default Home;