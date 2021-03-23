import React, {Fragment} from 'react'
import {Header, Main, Footer} from '../../components'
import './style.css'

const App = ()=>{
    const setDemension = React.useState({
        width: window.innerWidth,
        height: window.innerHeight
    })[1];
    React.useEffect(()=>{
        const debouncedHandleResize = debounce(function handleResize(){
            setDemension({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }, 0)
        window.addEventListener('resize', debouncedHandleResize);
        return ()=>{
            window.removeEventListener('resize', debouncedHandleResize);
        }
    })
    return (
    <Fragment> 
        <Header><p>{window.innerWidth}, {window.innerHeight}</p></Header>
        <Main/>
        <Footer/>
    </Fragment>
)};

function debounce(fn, ms){
    let timer;
    return ()=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            timer = null;
            fn.apply(this, arguments);
        }, ms);
    }
}
export { App }