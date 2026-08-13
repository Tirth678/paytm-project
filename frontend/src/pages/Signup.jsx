import Heading from '../components/Heading.jsx'
import SubHeading from '../components/SubHeading.jsx'
import Input from '../components/Input.jsx'
import Button from '../components/SingupBtn.jsx'
import BottomWarning from '../components/BottomWarning.jsx'
function Signup () {
  return (
    <>
    <div className="flex justify-center mt-50">
      <div className="h-140 w-88 rounded-2xl border-2">
        <Heading />
        <SubHeading />
        <Input/>
        <Button/>
        <BottomWarning/>
      </div>
    </div>
    </>
  )
};

export default Signup
