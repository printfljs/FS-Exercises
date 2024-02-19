import '../index.css'

const SuccessNotify = ({ message }) => {
        if (message === null) {
            return null
        }
    
        return (
            <div className='success'>
                {message}
            </div>
        )
}

const ErrorNotify = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
}



export {SuccessNotify, ErrorNotify}