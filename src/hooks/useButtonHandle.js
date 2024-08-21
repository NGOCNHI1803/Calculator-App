import { useCallback } from 'react';
import { evaluate } from 'mathjs';

const useButtonHandler = (input, setInput, setResult) => {
  const handleButtonClick = useCallback((type) => {
    switch (type) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '+':
      case '-':
      case '*':
      case '/':
      case '.':
      case '%':
      setInput((prev) => prev + type);
      break;
      case '=':
        try{
          setResult(evaluate(input));
        }catch(error){
          setResult('Error');
        }
        break;
        case 'C':
          setInput('');
          setResult('');
          break;
        case 'CE':
          setInput((prev) => prev.slice(0, -1));
          break;
        default:
          break;
  }
}, [input, setInput, setResult]);
return handleButtonClick;
};

export default useButtonHandler;