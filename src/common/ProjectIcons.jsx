import React from 'react'
import { withBaseIcon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon'
import {ic_delete} from 'react-icons-kit/md/ic_delete'
//lets say the icons on your side navigation are all color red
const SideIconContainer =
    withBaseIcon({ size: 45,
       style: {
         color: '#F17070',
         whitespace: "normal",
         width: "50%",
         marginLeft: "15%",
         marginRight: "15%",
         whitespace: "normal",
         paddingLeft: "5%",
         paddingRight: "5%"
       }
     })

export const HomeIcon = () => <SideIconContainer icon={home}/>
export const DeleteIcon = () => <SideIconContainer icon={ic_delete}/>
