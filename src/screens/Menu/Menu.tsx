import { Link } from 'react-router-dom';

export default function Menu(){
    return (
        <>
            <ul>
                <li>
                    <Link to={`/`}>Home</Link>
                </li>
                <li>
                    <Link to={`app`}>App</Link>
                </li>
                <li>
                    <Link to={`feed`}>Feed</Link>
                </li>
            </ul>
        </>
    )
}