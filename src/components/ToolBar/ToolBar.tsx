import React from 'react';
import './ToolBar.scss';

function ToolBar({onAdd, title, onChange} :any) {
    return (
        <div className='toolbar' style={{borderBottom: '1px solid #000'}}>
            <form action="" onSubmit={onAdd}>
                <input type="text" placeholder='введите текст' value={title} onChange={onChange}/>
                <button type='submit'>Создать</button>
            </form>
        </div>
    );
}

export default ToolBar;