
import Heading from '../components/Heading.jsx'
import SubHeading from '../components/SubHeading'
import Input from '../components/Input'
import BottomWarning from '../components/BottomWarning.jsx'
import Btn from '../components/Btn.jsx'
function Signin ()  {
return (
    <>
    <div className="flex justify-center mt-50">
      <div className="h-110 w-88 rounded-2xl border-2">
        <Heading title={'Sign In'}/>
        <SubHeading sub1={'Enter your information to create an'} sub2={'account'}/>
        <Input label="email" id="mail" for="mail" type={"text"} placeholder={"enter email"}/>
        <Input label="password" id="pass" for="pass" type={"password"} placeholder={"enter password"}/>
        <Btn btn={"Sign In"}/>
         <BottomWarning href={'./signup'} link={'Sign Up'}/>
      </div>
    </div>
    </>
  )
}
export default Signin