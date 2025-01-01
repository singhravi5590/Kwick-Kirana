import { useRouteError } from "react-router"

const ErrorComponent = () => {
    const err = useRouteError();
    console.log(err);
    return <div>
        <h1>Oops</h1>
        <br/>
        <p>Something Went Wrong</p>
        <br/>
        <h3>{err.status + " " + err.statusText}</h3>
    </div>
}

export default ErrorComponent