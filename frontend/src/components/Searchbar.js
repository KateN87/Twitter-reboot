import { useState } from 'react';
export const Searchbar = () => {
    return (
        <form id="search">
            <input type="text" placeholder='Sök på twitter' id="searchbar"></input>
            <div id="tabs">
                <p className='trending'>För dig</p>
                <p className='trending'>Trendar</p>
            </div>
        </form>
    )
}