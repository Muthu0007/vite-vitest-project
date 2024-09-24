import { useMemo } from 'react';
import '../App.css'
import { Props } from './NewComponent.tsx';
const SliderText: React.FC<Props> = ({ array }) => {
  const idArray = useMemo(()=>array.map((arr:any,index:number)=> ({text:arr,id:index + 1})),[array]);
  return (
    <div className="scroll-container">
      {idArray.map((text:any, index: number) =>
        <div key={index} className="text left-to-right">{text.id}  :  {text.text}</div>

      )
      }
    </div>
  );
};

export default SliderText;
