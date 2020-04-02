import React from 'react'
import NaviItems from './NaviItems'
import NaviHead from './NaviHead'

export const kinds = [
  'DRESS',
  'TOP',
  'OUTER',
  'BOTTOM',
  'SHOES',
  'BAGS',
  'ACCESSORY',
  'JEWELRY',
  'ETC',
  'MAIN'
]

const NaviContainer = ({ isTop, clickKind, Callbacks }) => {
  return (
    <div>
      {isTop
        ? <NaviItems
          kinds={kinds}
          clickKind={clickKind}
          Callbacks={Callbacks}
          />
        : <NaviHead
          kinds={kinds}
          clickKind={clickKind}
          Callbacks={Callbacks}
          />}
    </div>
  )
}

export default NaviContainer
