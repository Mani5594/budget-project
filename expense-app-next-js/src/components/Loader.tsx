import React from 'react'
import { Dna } from 'react-loader-spinner'

const Loader = () => {
    return (
        <Dna
            visible={true}
            height="140"
            width="140"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
        />
    )
}

export default Loader