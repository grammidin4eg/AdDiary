import React, {useState} from 'react';

export const ErrorPanelContext = React.createContext('');

const ErrorPanel = ({children}) => {
    const [value, setValue] = useState('');

    /**
     * Показать панель с ошибкой
     * @param error {Object} объект ошибки
     */
    function showError(error) {
        setValue(error.message);
    }

    /**
     * Скрыть панель с ошибкой
     */
    function hideError() {
        setValue('');
    }
    const errorPanel = (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {value}
            <button onClick={hideError} type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
return (
    <ErrorPanelContext.Provider value={{showError, hideError}}>
        {value && errorPanel}
        {children}
    </ErrorPanelContext.Provider>
    );
}

export default ErrorPanel;