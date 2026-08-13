function BottomWarning(props){
    return(
        <>
        <p className="flex justify-center mt-2">Already have an account?  
            <a className="ml-1 underline underline-offset-1" href={props.href}>{props.link}</a>
        </p>
        </>
    )
}
export default BottomWarning;