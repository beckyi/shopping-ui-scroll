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

const DummyImg = styled.img`
  max-width: 500px;
  min-width: 500px;
  max-height: 550px;
  min-height: 550px;
`

class Contents extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isExtend: false
    }
  }

  render () {
    const { page, brand, info } = this.props
    console.log('!!!!', info)
    return (
      <div style={{ cursor: 'pointer' }}>
        <div className='conImg' style={{ width: '500px', height: '550px' }}>
          <DummyImg src='https://via.placeholder.com/500X550.png' />
        </div>
        <InformArea>
          <div style={{ marginTop: '5px' }}>
            <CoTitle>
              <BigText>
                PAGE: {page} {brand}
              </BigText>
              <SmallText>
                {info}
              </SmallText>
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
