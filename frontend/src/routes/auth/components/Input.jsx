import React from 'react'

export const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className='auth-input'>
        <div>
            <Icon />
        </div>
        <input {...props} />
    </div>
  )
}
