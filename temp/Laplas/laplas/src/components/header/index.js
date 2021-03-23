import React, {Component} from 'react'
import './style.css'
import bird from './bird.svg'

class Navigation extends Component {
    constructor(props){
        super(props)
        this.curNavRef = React.createRef();
        this.curNav = null;
        this.timer = null;
        this.state = {elem: null};
        this.navElements = [
            { title: "Главная", key: "main" },
            { title: "Курсы", key: "course" },
            { title: "Индивидуальные занятия", key: "lessons" },
            { title: "Услуги", key: "services" },
            { title: "Контакты", key: "contacts" },
        ]
        this.currentKey = "main";
    }
    handleMouseOut(){
        this.timer = setTimeout(()=>{
            this.timer = null;
            this.setState({elem: this.curNav});
        }, 500)
    }
    handleMouseOver(event){
        clearTimeout(this.timer);
        this.setState({elem:event.target});
    }
    componentDidMount() {
        this.curNav = this.curNavRef.current.liRef.current;
        this.setState({elem: this.curNav});
    }
    render(){
        let style = {}
        if(this.state.elem){
            style = {
                left: this.state.elem.getBoundingClientRect().left + "px",
                width: this.state.elem.getBoundingClientRect().width +  "px"
            }
        }
        return (
            <nav>
                <ul>
                    <img src = {bird} alt = "Laplas" width = "70"></img>
                    {this.navElements.map((elem)=>{
                        return <NavElem 
                            key = {elem.key}
                            ref = {elem.key === this.currentKey? this.curNavRef : null}
                            current={elem.key === this.currentKey}
                            onMouseOver = {(event)=>this.handleMouseOver(event)} 
                            onMouseOut = {this.handleMouseOut.bind(this)}>
                            {elem.title}
                        </NavElem>
                    })}
                </ul>
                <div style = {style} className = "underline"> </div>
            </nav>
        ); 
    }    
}
class NavElem extends Component{
    constructor(props){
        super(props);
        this.liRef = React.createRef();
    }
    render(){
        return <li 
            ref = {this.liRef}
            className = {this.props.current ? "current" : ""}
            onMouseOver = {this.props.onMouseOver}
            onMouseOut = {this.props.onMouseOut}>
            {this.props.children}
        </li>
    }
}
const Header = ()=>(
    <div id = "header">
        <Navigation/>
    </div>
)

export { Header }