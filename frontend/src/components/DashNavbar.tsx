import {Link} from 'react-router-dom'
import Title from './Title'

function DashNavbar() {
  return (
    <nav>
      <Link to='/dash'>
        <Title>coolNotes</Title>
      </Link>
    </nav>
  )
}

export default DashNavbar
