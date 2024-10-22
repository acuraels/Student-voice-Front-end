import React from 'react';
import FormPageHeader from '../components/HeaderSimple.jsx';
import FormPageMain from '../components/FormPage/FormPageMain.jsx';
import FormPageFooter from '../components/FormPage/FormPageFooter.jsx';

const FormPage = () => {
    return (
        <>
            <FormPageHeader />
            <FormPageMain />
            <FormPageFooter />
        </>
    );
};

export default FormPage;
