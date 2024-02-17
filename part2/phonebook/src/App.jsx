import { useState } from 'react'

const Filter = ({filterValue, handleFilterChange})=>{
  return (
    <div>filter shown with 
    <input onChange={handleFilterChange} value={filterValue}/>
  </div>
  )
}

const PersonForm = (props)=>{
  const {addPhone, newName, handleNameChange, newNumber, handleNumberChange} = props
  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} value={newName}/>
      </div>
      <br/>
      <div>number: <input onChange={handleNumberChange} value={newNumber}/></div>
      <br/>
      <div>
        <button type="submit" onClick={addPhone}>add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow})=>{
  return (
    <div>{personsToShow.map(person=>(<p key={person.name}>{person.name} {person.number}</p>))}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const personsToShow= filterValue===''?persons:persons.filter(person=>person.name.toLowerCase().includes(filterValue.toLowerCase()))

  const addPhone = () => {
    if(newName === ''){
      alert('Name is required')
      return
    }
    if(newNumber === ''){
      alert('Number is required')
      return
    }
    if(persons.some(person=>person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    event.preventDefault(); 
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e)=>{
    setNewName(e.target.value)
  }

  const handleNumberChange = (e)=>{
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e)=>{
    setFilterValue(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addPhone={addPhone} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App