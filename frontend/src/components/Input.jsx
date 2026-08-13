function Input(props){
    return (
        <>
        <div className="flex justify-center flex-col mt-5">
            <label className="ml-4" htmlFor={props.for}>{props.label}</label>
            <input onChange={props.onChange} id={props.id} type={props.type} placeholder={props.placeholder} className="border-2 rounded-1xl w-75 ml-5"/>
        </div>
        </>
    )
}
export default Input;