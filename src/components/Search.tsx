/* eslint-disable @typescript-eslint/no-misused-promises */
import classes from './Search.module.css';

type SearchProps = {
    loadUser: (userName: string) => Promise<void> // the function loadUser receives the userName and returns a Promise<void> (awaits)
}

import { useState, KeyboardEvent } from 'react'
import {BsSearch} from 'react-icons/bs'

function Search({loadUser}: SearchProps) {

  const [userName, setUserName] = useState('')

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      loadUser(userName)
    }
  }

  return (
    <div className={classes.search}>
        <h2>Busque por um usuário:</h2>
        <p>Conheça seus melhores repositórios</p>

        <div className={classes.search_container}>
            <input type="text" placeholder='Digite o nome do usuário' onKeyDown={handleKeyDown} onChange={(e) => setUserName(e.target.value) } /> {/*get user typed value */}
            
            <button onClick={() => loadUser(userName)}><BsSearch /></button> {/* when click the button, run the function loadUser (request to the api) with the input value that I got on the input with the useState and returns all api user info */}
        </div>
    </div>
  )
}

export default Search