import './TextField.css';

// Ugly. Should probably learn about dynamic styles to hide the error message.
const TextField = (props) => {
    const classes = 'text-field ' + (props.className ? props.className : ''); 

    if (props.errorMessage) {
        return (
        <div className={classes}>
            <input style={props.style} id={props.id} checked={props.checked} type={props.type} onChange={props.onChange} placeholder={props.placeholder} value={props.value} />
            <div className="error">{props.errorMessage}</div>
        </div>
    )} else {
        return (
        <div className={classes}>
            <input style={props.style} id={props.id} checked={props.checked} type={props.type} onChange={props.onChange} placeholder={props.placeholder} value={props.value} />
        </div>
        )
    }
};

export default TextField;