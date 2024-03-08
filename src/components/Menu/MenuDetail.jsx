import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {MenuServices} from "../../services/menu/menu";


export default function MenuDetail(props) {
    const {id} = useParams()
    const [detail, setDetail] = useState(null)

    useEffect(() => {
        MenuServices.get_detail(id)
            .then(res => setDetail(res.data))
            .catch(err => console.error(err))
    }, []);

    return (
        <>
            {detail ? <div>
                <p>#{detail.data.id} - {detail.data.name}</p>
                <p>{detail.data.created_at}</p>
                <p>{detail.data.description}</p>
            </div>  : <div>loading...</div>}
        </>
    )
}
