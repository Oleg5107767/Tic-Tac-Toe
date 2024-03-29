import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box} from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import {playerWin, playerWinSecond} from '../../actions';



const useStyles = makeStyles({
    
        tic: {
            width: '499px',
            height: '500px',
            backgroundColor: '#44425e',
            '& :first-child' :{
                borderLeftColor: 'transparent',
                borderTopColor: 'transparent'
            },
            '& :nth-child(2)':{
                borderTopColor: 'transparent',
            },
            '& :nth-child(3)':{
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
            },
            '& :nth-child(4)':{
                borderLeftColor: 'transparent',
            },
            '& :nth-child(6)':{
                borderRightColor: 'transparent',
            },
            '& :nth-child(7)':{
                borderLeftColor: 'transparent',
                borderBottomColor: 'transparent'
            },
            '& :nth-child(8)':{
                borderBottomColor: 'transparent'
            },
            '& :last-child' : {
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent'
           },
          },
          square: {
            width: '166px',
            height: '167px',
            border: '2px solid #a855c1',
            float: 'left',
            boxSizing: 'border-box',
            color: 'white',
            fontSize: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },  
  });

const GameBoard = () => {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [countWinPlayer, setCountWinPlayer] = useState(0);
    const [countWinPlayerSecond, setCountWinPlayerSecond] = useState(0);
    const [playerMove, setPlayerMove] = useState(0);

    const {players } = useSelector(state => state);
    const {user, userSecond} = players;

    const classes = useStyles();
    const dispatch = useDispatch();

    const winnerCombination = [

        //gorizont
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        //diagonal
        [0, 4, 8],
        [2, 4, 6]
    ];
  
    useEffect(() => {
        dispatch(playerWin(countWinPlayer))
        dispatch(playerWinSecond(countWinPlayerSecond))
      }, [countWinPlayer,countWinPlayerSecond]);


    const gameWin = () => {
        let playerLine = playerMove % 2 === 0 ? 'X' : 'O';
        
        for(let i = 0; i< 8; i++) {
           let  line = winnerCombination[i]  
           
            if(squares[line[0]] === playerLine &&
               squares[line[1]] === playerLine &&
               squares[line[2]] === playerLine ){
     
                if(playerLine === 'X'){
                   setCountWinPlayer(countWinPlayer + 1) 
                   alert(`Победил ${user}`)
                }else if(playerLine === 'O'){
                   setCountWinPlayerSecond(countWinPlayerSecond + 1)
                   alert(`Победил ${userSecond}`)
                }

                setSquares(Array(9).fill(null))
                setPlayerMove(0)
            }
        }   
    }
 
  
    const handler = (e) => {
      
       let activeSquare = e.target.id;
       let currentSquare = squares;
       
      if(currentSquare[activeSquare] === null ){
           currentSquare[activeSquare] =  playerMove % 2 === 0 ? 'X' : 'O';
           setPlayerMove(player => player + 1)
           setSquares([...currentSquare])
       }else{
           alert('Против правил')
       }
       gameWin();
    }

    return(
        <Box className={classes.tic}>
            {squares.map((el,index ) => {
                return(
                <div
                    id={index}
                    key={index}
                    onClick={(e) => handler(e)} 
                    className={classes.square}
                    >
                    {el}
                </div>)
            })}
        </Box>
    )
} 


export default GameBoard;