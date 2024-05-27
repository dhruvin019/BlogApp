import React from 'react';

const ErrorBoundary extends React.Component {

    state = {
        err = ''
    }

    static getDerivedStateFromError(error){
        return{
            error:error
        }
    }

    componentDidCatch(error,info)
    {
        console.log(error)
    }

    render(){
        if(this.state.error)
        {
            return(
                <div>
                    <h>Some Error Occured</h>
                </div>
            )
        }
        return this.props.choldren
    }

  return (
    <div>
      
    </div>
  )
}

export default ErrorBoundary
