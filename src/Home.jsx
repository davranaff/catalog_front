import Menu from "./components/Menu/Menu";
import React, {useContext, useEffect, useState} from "react";
import {MenuServices} from "./services/menu/menu";
import {BaseContext} from "./App";


export default function Home() {
    const [menu, setMenu] = useState(null)
    const {globalState, setGlobalState} = useContext(BaseContext)


    useEffect(() => {
        MenuServices.get_list()
            .then((res) => {
                setMenu(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    function create(event) {
        event.preventDefault()
        console.log(globalState)
        globalState.type === null && MenuServices.create(globalState)
            .then(res => {
                setMenu({data: [...menu.data, res.data]})
                setGlobalState({id: null, created_at: null, name: '', description: '', type: 'create'})
            })
            .catch(err => console.error(err))

        globalState.type === 'edit' && MenuServices.update({
            name: globalState.name,
            description: globalState.description
        }, globalState.id).then(res => {
            setMenu(prev => ({
                data: prev.data.map(value => {
                    if (value.id === globalState.id) {
                        return res.data.data
                    }
                    return value
                })
            }))
        }).catch(err => console.error(err))
    }

    return (
        <section className='section'>
            <form action="" className='form' onSubmit={create}>
                <input value={globalState.name} type="text" required={true}
                       onInput={e => setGlobalState({...globalState, name: e.target.value})}/>
                <textarea value={globalState.description} name="" id="" cols="30" rows="10" required={true}
                          onInput={e => setGlobalState({...globalState, description: e.target.value})}></textarea>
                <button>Create</button>
            </form>
            <div className="menu">
                {menu && menu.data && menu.data.length ? menu.data.map(value => <Menu key={value.id} data={value} setMenu={setMenu}/>) :
                    <div className='empty'>Пока что тут тихо...</div>}
            </div>
        </section>
    )
}