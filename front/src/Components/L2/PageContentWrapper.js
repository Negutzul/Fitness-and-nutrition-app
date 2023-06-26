import "./styles.css"
const PageContentWrapper = (props) =>{
    return(<div className="contentWrapper">{props.children} </div>);
}
export default PageContentWrapper;