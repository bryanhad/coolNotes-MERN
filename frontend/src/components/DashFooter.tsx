import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import {useNavigate, useLocation} from 'react-router-dom'
import MainContainer from "./MainContainer"

function DashFooter() {

    const navigate = useNavigate()
    const {pathname} = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null

    if (pathname !== '/dash') {
        goHomeButton = (
            <button title="Home" onClick={onGoHomeClicked}>
                <FontAwesomeIcon icon={faHouse}/>
            </button>
        )
    }

    const content = (
        <footer >
            <MainContainer color="bg-black/30" className="flex gap-4 max-w-max p-2 text-white font-semibold">
            {goHomeButton}
            <p>Current User: </p>
            <p>Status: </p>
            </MainContainer>
        </footer>
    )

  return content
}

export default DashFooter
