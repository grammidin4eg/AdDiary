import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log('error!!!', error)
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('!!!!Error', error, errorInfo );
    }

    render() {
        if (this.state.hasError) {
            return [
                <h1>Что-то пошло не так.</h1>,
                this.props.children
            ];
        }

        return this.props.children;
    }
}