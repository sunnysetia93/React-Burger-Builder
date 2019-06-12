import React from 'react'
import Aux from '../../hoc/Auxiliary';

import cssClasses from './Layout.css'

const layout = (props) => (
    <Aux>
        <div>
            toolbar,Sidedrawer, backdrop
        </div>
        <main className={cssClasses.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layout;