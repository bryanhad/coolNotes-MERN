import { Link } from 'react-router-dom'
import MainContainer from './MainContainer'
import Title from './Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

function Public() {
   return (
      <div className="flex-[1] flex flex-col w-full">
         <header className="text-center">
            <Title>Welcome to Cool Notes!</Title>
         </header>
         <section className="flex-[1] pt-4">
            <MainContainer className="flex flex-col gap-4 max-w-[80%] mx-auto px-4 py-2 text-lg">
               <p>
                  We're located somewhere out there. We provide highly
                  experienced staffs ready tto meet your needs!
               </p>
               <p>
                  CoolNotes
                  <br />
                  Somewhere Around The Rainbow
                  <br />
                  123-123-123
               </p>
               <p>Owner: Bryan </p>
            </MainContainer>
         </section>
         <footer>
            <MainContainer color="bg-black/20" className="max-w-max">
               <Link
                  to={'login'}
                  className="text-white font-semibold text-xl flex gap-3 items-center p-2  "
               >
                  <FontAwesomeIcon icon={faRightToBracket} />
                  Employee Login
               </Link>
            </MainContainer>
         </footer>
      </div>
   )
}

export default Public
