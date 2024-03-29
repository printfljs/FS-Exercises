import { useState,useEffect } from 'react'
import phonebook from './services/phonebook'  
import {SuccessNotify, ErrorNotify} from './components/notification'

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

const Persons = ({personsToShow,deletePerson})=>{
  const personList=personsToShow.map(person=>(
    <div key={person.id}>
    <span key={person.name}>{person.name} {person.number}</span>
    <button onClick={()=>deletePerson(person)}>delete</button>
    </div>
  ))
  return (
    <div>{personList}</div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(()=>{
    phonebook.getAll().then(response=>{
      setPersons(response)
    })
  },[])

  const personsToShow= filterValue===''?persons:persons.filter(person=>person.name.toLowerCase().includes(filterValue.toLowerCase()))

  const deletePerson = (person)=>{
    console.log(person)
    event.preventDefault(); 
    const result = window.confirm(`Are you sure you want to delete ${person.name} ?`);
    if (result === false) {
      return
    }
    phonebook.deletePerson(person.id).then(response=>{
      console.log(response)
      phonebook.getAll().then(response=>{
        setPersons(response)
      })
    }).catch(error=>{
      console.log(error)
    })
  }

  const addPhone = () => {
    if(newName === ''){
      alert('Name is required')
      return
    }
    if(newNumber === ''){
      alert('Number is required')
      return
    }
    event.preventDefault(); 
    if(persons.some(person=>person.name === newName)){
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (result) {
        const person=persons.find(person=>person.name===newName)
        const newPerson={...person, number: newNumber}
        phonebook.update(person.id, newPerson).then(response=>{
          setSuccessMsg(
            `Updated '${response.name}'`
          )
          setTimeout(() => {
            setSuccessMsg(null)
            setPersons(persons.map(p=>p.id!==person.id?p:response))
          }, 5000)
        }).catch(error=>{
          console.log(error)
          if(error.response.status===404){
            setErrorMsg(
              `Information of '${person.name}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMsg(null)
            }, 5000)
          }
        })
      }
      return
    }
    const param={
      name: newName,
      number: newNumber
    }
    phonebook.create(param).then(response=>{
      setPersons(persons.concat(response))
      setSuccessMsg(
        `Added '${response.name}'`
      )
      setTimeout(() => {
        setSuccessMsg(null)
      }, 5000)
    }).catch(error=>{
      console.log(error)
    })
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
      <SuccessNotify message={successMsg} />
      <ErrorNotify message={errorMsg} />
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addPhone={addPhone} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App