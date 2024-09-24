import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from "react";

export interface Props {

    array: string[];
    setArray: Dispatch<SetStateAction<string[]>>;
}

const NewComponent: React.FC<Props> = ({ array, setArray }) => {

    const [editInput, setEditIput] = useState<string>('')
    const [edit, setEdit] = useState<boolean[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    // const [withBooArray,setWithBooArray]=useState<any>(array);

    // useEffect(()=>{
    //     setWithBooArray((prev:any)=> prev.map((item:any)=>({text:item,boo:false})));
    //     console.log(withBooArray);
    // },[])   instead of below 
    const withBooArray = useMemo(() => array.map((arr: string) => ({ text: arr, boo: false })), [array])

    const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditIput(e.target.value);

    }

    const handleDelete = (index: number) => {
        const deleteValue = array.filter((_, i: number) => i !== index);
        return setArray(deleteValue);
    }

    const handleEdit = (index: number) => {
        const arrayEdit = withBooArray.map((item: any, id: number) => index === id ? !item.boo : item.boo);
        setEdit(arrayEdit);
        setEditIndex(index);
        setEditIput(array[index]);
    }

    const handleSave = (id: number) => {
        if (editIndex != null) {
            const updatevalue = array.map((item: string, index: number) => index === editIndex ? editInput : item)
            setArray(updatevalue);
            setEditIndex(null);
            const arrayEdit = withBooArray.map((item: any, index: number) => index === id ? !item.boo : item.boo);
            setEdit(arrayEdit);
        }
    }



    return (

        <div data-testid='ListValue' style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {array.map((input: any, index: number) =>
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                    {edit[index] && editIndex == index ? <>
                        <input
                            data-testid={`input-${index}`} 
                            value={editInput} 
                            onChange={handleEditChange} 
                            className="form_input" />
                        <button onClick={() => handleSave(index)}>Save</button>
                    </> : <>
                        <label style={{ color: '#0decf4' }}>{input}</label>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                    </>}
                    <button onClick={() => handleDelete(index)}>Delete</button>

                </div>
            )}
        </div>
    )
}
export default NewComponent;