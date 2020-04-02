import React from 'react'
import styled from 'styled-components'

const HeadBox = styled.div`
  display: inline-block;
  margin: 15px 25px 10px;
  cursor: pointer;
`

const ImgItem = styled.img`border-radius: 70%;`

const Title = styled.h5`
  /*font-size: 1.75rem; 600*/
  x: ${props => (props.bool ? '#2c3e50' : '#9a9a9a')};
  font-weight: ${props => (props.bool ? '550' : '400')};
  letter-spacing: 0;
  text-align: center;
`

const Item = ({ title, clickKind, Callbacks }) => {
  return (
    <HeadBox onClick={Callbacks.handleItemClick.bind(this, title)}>
      <ImgItem src='https://via.placeholder.com/150.png' />
      <Title bool={title === clickKind}>
        {title}
      </Title>
    </HeadBox>
  )
}

export default Item
