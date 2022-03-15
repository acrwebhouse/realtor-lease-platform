import React from 'react';
import DataContext from './DataContext';
import {ModalShowContext} from './DataContext'

const initialState = {
    SubmitModalVisible: true
}

export const ProviderContext = () => {
    return (
        <ModalShowContext.Provider value={initialState}>
            <DataContext context={ModalShowContext} />
        </ModalShowContext.Provider>
    )
}