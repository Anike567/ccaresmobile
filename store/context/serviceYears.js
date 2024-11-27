import { createContext, useState } from "react";

export const YearsOfServiceContext = createContext({
    pfDisplayyear: '',
    authToken:'',
    loginId: '',
    showPFsubsections: false,
    yearsOfService:[],
    clearYears: () => {},
    getYears: (obj) => {},
    toggleSubsectionsPf: () => {},
    setLoginId: (accno) => {},
    setAuthToken: (at) => {},
    setPFdisplayYear: (Y) => {},
    getPFdisplayYear: () => {}
});

function YearsContextProvider({children}) {

    const [years, setYears] = useState([]);
    const [subsectionVisibility, setsubsectionVisibility] = useState(false);
    const [loginId, setLogin] = useState('');
    const [authtoken, setauthtoken] = useState('');
    const [pfYear, setPfYear] = useState('');

    // function setPFdisplayYear(y){
    //     setPfYear(y)
    // }

    // function getPFdisplayYear(y){
    //     return pfYear;
    // }

    // function setLoginId(accno){
    //     setLogin(accno);
    // }

    // function setAuthToken(at){
    //     setauthtoken(at);
    // }

    // function toggleSubsectionsPf(){
    //     setsubsectionVisibility(!subsectionVisibility);
    // }

    // function getYears(obj)
    // {
    //     setYears(obj)
    // }

    // function clearYears(accno)
    // {
    //     setYears([])
    // }

    const value = {
        pfDisplayyear: pfYear,
        authToken: authtoken,
        loginId: loginId,
        showPFsubsections: subsectionVisibility,
        yearsOfService: years,
        clearYears: setYears,
        getYears: setYears,
        toggleSubsectionsPf:setsubsectionVisibility,
        setLoginId: setLogin,
        setAuthToken: setauthtoken,
        setPFdisplayYear: setPfYear
    }

    return (
    <YearsOfServiceContext.Provider value={value}>{children}</YearsOfServiceContext.Provider>
    );
}

export default YearsContextProvider;
 