import React from 'react';
import { ServiceConsumer } from './service-context';

const withService = () => (Wrapped) => {
    return (props) => {
        return (
            <ServiceConsumer>
            {
                (services) => {
                    return (
                        <Wrapped {...props} services={services}/>
                    );
                }
            }
            </ServiceConsumer>
        );
    }
}

export default withService;