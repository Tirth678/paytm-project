function Input(){
    return (
        <>
        <div className="flex justify-center flex-col mt-5">
            <label className="ml-4" htmlFor="name">First Name</label>
            <input id="name" type="text" placeholder="enter your first name" className="border-2 rounded-1xl w-75 ml-5"/>
            
            <label className="ml-4 mt-5" htmlFor="last">Last Name</label>
            <input id="last" type="text" placeholder="enter your last name" className="border-2 rounded-1xl w-75 ml-5"/>
            
            <label className="ml-4 mt-5" htmlFor="mail">Email</label>
            <input id="mail" type="text" placeholder="enter your email" className="border-2 rounded-1xl w-75 ml-5 placeholder:text-gray-500 placeholder:italic after:ml-0.5 after:text-red-500 after:content-['*']"/>

            <label className="ml-4 mt-5" htmlFor="password">Passowrd</label>
            <input id="password" type="password" placeholder="Password" className="border-2 rounded-1xl w-75 ml-5"/>
        </div>
        </>
    )
}
export default Input;