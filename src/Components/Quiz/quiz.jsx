import { useState, useRef } from 'react';
import './quiz.css';
import {data} from '../../assets/data';
const Quiz = ()=>{

    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [lockAns, setLockAns] = useState(false);

    const option1Ref = useRef(null);
    const option2Ref = useRef(null);
    const option3Ref = useRef(null);
    const option4Ref = useRef(null);

    const optionArr = [ option1Ref, option2Ref, option3Ref, option4Ref];

    if (index >= data.length) {
        return (
            <div className="container">
                <h1>Quiz Completed!</h1>
                <h2>Your Score: {score} / {data.length}</h2>
                <button onClick={() => window.location.reload()}>Restart Quiz</button>
            </div>
        );
    }

    const {question, option1, option2, option3, option4, ans} = data[index];
    const handleNextClick = ()=>{
        if(lockAns == false){ alert("Select an option"); return;}
        setIndex(prev => prev+1);
        setLockAns(false);
        optionArr.forEach((option)=>{
            option.current.classList.remove("wrong");
            option.current.classList.remove("correct");
        })
    }

    const checkAns = (e,option)=>{
        if(lockAns==true) return;
        if(option === ans){
            e.target.classList.add("correct");
            setScore(prev=>prev+1);
        }
        else {
            e.target.classList.add("wrong");
            optionArr[ans-1].current.classList.add("correct");
        }
        setLockAns(true);
    }
    
    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr/>
            <h2>Question {index+1} : {question}</h2>
            <ul>
                <li ref={option1Ref} onClick={(e)=>checkAns(e,1)}>{option1}</li>
                <li ref={option2Ref} onClick={(e)=>checkAns(e,2)}>{option2}</li>
                <li ref={option3Ref} onClick={(e)=>checkAns(e,3)}>{option3}</li>
                <li ref={option4Ref} onClick={(e)=>checkAns(e,4)}>{option4}</li>
            </ul>
            <button onClick={handleNextClick}>
                {
                    index<data.length-1 ? 'Next' : 'Submit'
                }
            </button>
            <div className='index'>{index+1} of {data.length}</div>
        </div>
    )
}

export default Quiz;