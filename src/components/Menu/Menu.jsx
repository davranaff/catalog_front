import React, {useContext, useState} from "react";
import {BaseContext} from "../../App";
import {NavLink} from "react-router-dom";
import {MenuServices} from "../../services/menu/menu";


export default function Menu({data, setMenu}) {
    const [show, setShow] = useState(false)
    const {setGlobalState} = useContext(BaseContext)

    function del_item(id) {
        MenuServices.delete(id)
            .then(res => {
                setMenu(prev => ({data: prev.data.filter(value => value.id !== id)}))
            })
            .catch(err => console.error(err))
    }

    return (
        <div className='menu__item' onClick={_ => setShow(!show)}>
            <div className='menu__item_content'>
                <p>{data.name}</p>
                <span>
                    <NavLink to={`/menu/${data.id}`}>MORE</NavLink>
                    <button onClick={_ => setGlobalState({...data, type: 'edit'})}>edit</button>
                    <button onClick={_ => del_item(data.id)}>delete</button>
                </span>
            </div>
        </div>
    )
}