import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = () => {
    event.preventDefault(); 
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  const handleNameChange = (e)=>{
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person=>(<p key={person.name}>{person.name}</p>))}</div>
    </div>
  )
}

export default App