function Btn(props){
    return (
        <>
        <div className="flex justify-center mt-5">
        <button onClick={props.onClick} className="bg-gray-700 p-3 text-white rounded-lg px-27">{props.btn}</button>
        </div>
        </>
    )
}
export default Btn;