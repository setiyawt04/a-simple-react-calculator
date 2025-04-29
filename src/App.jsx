import { useState } from 'react'
import { FaMinus, FaRegSun } from 'react-icons/fa'
import { FaRegMoon } from 'react-icons/fa'
import { FaDivide } from 'react-icons/fa'
import { FaPercent } from 'react-icons/fa'
import { FaCircleDot, FaPlusMinus } from 'react-icons/fa6'
import { FaXmark } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa'
import { FaEquals } from 'react-icons/fa'
import { FaRotateLeft } from 'react-icons/fa6'

function App() {
  
  const[num, setNum] = useState('')
  const[operation, setOperation] = useState(null)
  const[prevNum, setPrevNum] = useState('')

  const handleNumber = (value) => {
    if (num === '0') {
      setNum(value)
    } else {
      setNum(num + value)
    }
  }

  const handleDelete = () => {
    const arrNum = num.split('');
    arrNum.pop();
    const arrJoin = arrNum.join('');
  
    if (arrJoin === '') {
      setNum('0');
    } else {
      setNum(arrJoin);
    }
  
    if (operation !== null) {
      setOperation(null);
    }
  }
  

  const handleOperation = (newOperation) => {
    if (num === '' && prevNum !== '') {
      setOperation(newOperation)
      return
    } 

    if (prevNum !== '') {
      const result = calculate(prevNum, num, operation)
      setPrevNum(result.toString())
      setNum('')
    } else {
      setPrevNum(num)
      setNum('')
    }
    setOperation(newOperation)
  }

  const iconValue =  {
    FaPlus: '+',
    FaMinus: '-',
    FaXmark: 'x',
    FaDivide: '÷'

  }

  const calculate = (a, b, operation) => {
    const numA = parseFloat(a)
    const numB = parseFloat(b)

    switch (operation) {
      case '+':
        return numA + numB
      case '-':
        return numA - numB
      case 'x':
        return numA * numB
      case '÷':
        return numA / numB
      default:
        return numB
    }
  }

  const handleEquals= () => {
    if (prevNum !== '' && num !== '' & operation !== null) {
      const result = calculate(prevNum, num, operation)
      const finalResult = result.toPrecision(10).replace(/\.?0+$/, '')
      setNum(finalResult)
      setPrevNum('')
      setOperation(null)
    }
  }

  const handlePlusMinus = () => {
    if (num !== '') {
      setNum((parseFloat(num) * -1).toString())
    }
  }

  const handlePercent = () => {
    setNum((parseFloat(num) * 0.01).toString())
  }

  const handleClear = () => {
    setNum('0')
    setOperation(null)
    setPrevNum('')
  }

  const handleDot = () => {
    if (!num.includes('.')){
      setNum(num + '.')
    }
  }


  //LIGHT MODE
  const [light, setLight] = useState(false)
  const handleLight = () => {
    setLight(false)

  }

  const handleDark = () => {
    setLight(true)
  }


  return (
    <>
    <h1 className='m-5 text-center text-2xl md:text-4xl text-gray-800'>A Simple Calculator</h1>
      <div className={`drop-shadow-xl/25 h-[75vh] w-[80vw] mx-auto rounded-4xl pt-5 ${light ? 'bg-gray-700' : 'bg-white'}`}>
        <div className={`md:w-[20vw] md:h-[5vh] w-[25vw] h-[5vh] rounded-2xl z-20 mx-auto relative ${light ? 'bg-gray-600' : 'bg-white'}`}>
          <div className='flex justify-between items-center absolute top-0 left-0 w-full h-full p-2 md:p-4'>
            
            <FaRegSun className={`text-base ${light ? 'text-gray-400' : 'text-black'}`} onClick={handleLight}/>
              
            <FaRegMoon className={`text-base ${light ? 'text-white' : 'text-gray-400'}`} onClick={handleDark}/>

          </div>
          
        </div>
        <div className={`text-right mt-12 md:mt-20 pl-7 pr-7 pb-3 min-h-[15vh] ${light ? 'text-white' : 'text-black'}`}>
          <div className='text-xl font-medium h-[5vh]'>{prevNum} {operation} {num}</div>
          <div className='text-4xl font-bold'>{num || prevNum || 0} </div>
        </div>
        <div className={`h-[50vh] w-full rounded-4xl p-3 ${light ? 'bg-gray-600' : 'bg-white'}`}>
          <div>
            <div className='flex justify-center items-center h-[9vh] gap-3 text-base md:text-2xl'>
              <button onClick={() => handleClear()} className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className='text-[#00FF9C] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>AC</span>
              </button>
              <button onClick={() => handlePlusMinus()} aria-label='+/-' className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className='text-[#00FF9C] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <FaPlusMinus />
                </span>
              </button>
              <button onClick={() => handlePercent()} aria-label='%' className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className='text-[#00FF9C] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <FaPercent />
                </span>
              </button>
              <button onClick={() => handleOperation(iconValue.FaDivide)} aria-label='/' className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className='text-red-400 font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <FaDivide />
                </span>
              </button>
            </div>
            <div className='flex justify-center items-center h-[9vh] gap-3 text-base md:text-2xl'>
              <button onClick={() => handleNumber('7')} className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${light ? 'text-white' : 'text-black'}`}>7</span>
              </button>
              <button onClick={() => handleNumber('8')} className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${light ? 'text-white' : 'text-black'}`}>8</span>
              </button>
              <button onClick={() => handleNumber('9')} className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${light ? 'text-white' : 'text-black'}`}>9</span>
              </button>
              <button onClick={() => handleOperation(iconValue.FaXmark)} aria-label='x' className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className='text-red-400 font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <FaXmark />
                </span>
              </button>
            </div>
            <div className='flex justify-center items-center h-[9vh] gap-3 text-base md:text-2xl'>
              <button onClick={() => handleNumber('4')} className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${light ? 'text-white' : 'text-black'}`}>4</span>
              </button>
              <button onClick={() => handleNumber('5')} className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${light ? 'text-white' : 'text-black'}`}>5</span>
              </button>
              <button onClick={() => handleNumber('6')} className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${light ? 'text-white' : 'text-black'}`}>6</span>
              </button>
              <button onClick={() => handleOperation(iconValue.FaMinus)} aria-label='-' className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className='text-red-400 font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <FaMinus />
                </span>
              </button>
            </div>
            <div className='flex justify-center items-center h-[9vh] gap-3 text-base md:text-2xl'>
              <button onClick={() => handleNumber('1')} className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${light ? 'text-white' : 'text-black'}`}>1</span>
              </button>
              <button onClick={() => handleNumber('2')} className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${light ? 'text-white' : 'text-black'}`}>2</span>
              </button>
              <button onClick={() => handleNumber('3')} className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${light ? 'text-white' : 'text-black'}`}>3</span>
              </button>
              <button onClick={() => handleOperation(iconValue.FaPlus)} aria-label='+' className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className='text-red-400 font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <FaPlus />
                </span>
              </button>
            </div>
            <div className='flex justify-center items-center h-[9vh] gap-3 text-base md:text-2xl'>
              <button onClick={() => handleDelete()} aria-label='delete' className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${light ? 'text-white' : 'text-black'}`}>
                  <FaRotateLeft />
                </span>
              </button>
              <button onClick={() => handleNumber('0')} className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${light ? 'text-white' : 'text-black'}`}>0</span>
              </button>
              <button onClick={() => handleDot()} className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className={`font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${light ? 'text-white' : 'text-black'}`}>
                  .
                </span>
              </button>
              <button onClick={() => handleEquals()} aria-label='=' className={`h-[7vh] w-[14vw] rounded-xl relative ${light ? 'bg-gray-700' : 'bg-white'}`}>
                <span className='text-red-400 font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <FaEquals />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
