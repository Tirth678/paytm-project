import Heading from '../components/Heading.jsx'
import SubHeading from '../components/SubHeading.jsx'
import Input from '../components/Input.jsx'
import Btn from '../components/Btn.jsx'
import BottomWarning from '../components/BottomWarning.jsx'
function Signup () {
  return (
    <>
    <div className="flex justify-center mt-50">
      <div className="h-140 w-88 rounded-2xl border-2">
        <Heading title={'Sign Up'}/>
        <SubHeading sub1={'Enter your information to create an'} sub2={'account'}/>
        <Input label="email" id="mail" for="mail" type={"text"} placeholder={"enter email"}/>
        <Input label="email" id="mail" for="mail" type={"text"} placeholder={"enter email"}/>
        <Input label="email" id="mail" for="mail" type={"text"} placeholder={"enter email"}/>
        <Input label="email" id="mail" for="mail" type={"text"} placeholder={"enter email"}/>
        <Btn btn={"Sign up"}/>
        <BottomWarning href={'./signin'} link={'Sign In'}/>
      </div>
    </div>
    </>
  )
};

export default Signup
