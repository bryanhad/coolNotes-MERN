import {Link} from 'react-router-dom'
import MainContainer from '../../components/MainContainer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

function Welcome() {

    const date = new Date()
    const today = new Intl.DateTimeFormat('id-ID', {dateStyle: 'full', timeStyle: 'long'}).format(date)

  return (
    <section className='mt-2'>
      <MainContainer className='px-4 py-2 text-slate-500 flex flex-col items-center gap-2'>
          <p className='font-[200]'>{today}</p>

          <h1 className='font-bold text-2xl'>Welcome!</h1>

          <p><Link to={'/dash/notes'} className='flex gap-2 items-center'>
            <FontAwesomeIcon icon={faArrowRight}/>
            View coolNotes</Link></p>

          {/* will not be visible to all users */}
          <p><Link to={'/dash/users'} className='flex gap-2 items-center'>
            <FontAwesomeIcon icon={faArrowRight}/>
            View User Settings</Link></p>
      </MainContainer>
    </section>
  )
}

export default Welcome
