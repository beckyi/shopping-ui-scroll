import React, { Component } from 'react'
import styled from 'styled-components'

const InformArea = styled.div`
  font-size: 0;
  font-family: Roboto-Regular, '나눔바른고딕', NanumBarunGothic, dotum, sans-serif;
`
const CoTitle = styled.div`padding-bottom: 5px;`

const BigText = styled.strong`
  display: block;
  color: #222;
  font-size: 13px;
  line-height: 18px;
  margin-bottom: 1px;
  overflow: hidden;
  height: 18px;
  font-weight: normal;
  font-family: Roboto-Medium, NanumBarunGothicBold, dotum, sans-serif;
`

const SmallText = styled.p`
  display: inline-block;
  overflow: hidden;
  max-height: 60px;
  font-size: 13px;
  line-height: 17px;
  color: #555;
  vertical-align: top;
`

class Contents extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isExtend: false
    }
  }

  render () {
    return (
      <div style={{ cursor: 'pointer' }}>
        <div className='conImg' style={{ width: '500px', height: '550px' }}>
          <img src='https://via.placeholder.com/500X550.png' />
        </div>
        <InformArea>
          <div style={{ marginBottom: '5px' }}>
            <CoTitle>
              <BigText>dddd</BigText>
              <SmallText>sdas</SmallText>
            </CoTitle>
          </div>
        </InformArea>
      </div>
    )
  }
}

Contents.propTypes = {}

export default Contents

/** {itemArr.map((item, idx) => {
          return <Item key={`item${idx}`} title={item} />
        })} */
