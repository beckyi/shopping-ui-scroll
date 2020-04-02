import React from 'react'
import styled from 'styled-components'

const TopArea = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 35px;
  text-align: center;
  background: #ffffff;
  border-bottom: 0.1px solid #e6e6e6;
  padding: 7px 0px;
`

const TLi = styled.li`
  display: inline-block;
  cursor: pointer;
`

const NavTitle = styled.div`
  display: inline-block;
  padding: 5px 10px 3px;
  margin: '0px 5px';
  line-height: 30px;
  letter-spacing: 0;
  text-align: center;
  font-weight: ${props => (props.bool ? '500' : '400')};
  color: ${props => (props.bool ? '#2c3e50' : '#9a9a9a')};
  border-bottom: ${props => (props.bool ? '4px solid' : '0px')};
`

const NaviHead = ({ kinds, clickKind, Callbacks }) => {
  return (
    <TopArea className='aniHead'>
      <ul>
        {kinds.map((item, idx) => {
          return (
            <TLi key={idx} onClick={Callbacks.handleClickKind.bind(this, item)}>
              <NavTitle bool={item === clickKind}>
                {item}
              </NavTitle>
            </TLi>
          )
        })}
      </ul>
    </TopArea>
  )
}

export default NaviHead
