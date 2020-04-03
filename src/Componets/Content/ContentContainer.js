import React from 'react'
import styled from 'styled-components'
import Contents from './Contents'

const MainBoard = styled.div`
  display: inline-block;
  width: 100%;
`

export const CLi = styled.li`
  display: inline-block;
  vertical-align: top;
  padding-top: 30px;
  width: 500px;
  margin-right: 60px;
`

const Board = styled.div`
  margin-top: 10px;
  width: 1200px;
  margin: 50px auto;
  text-align: center;
`

const Waiting = styled.h5`
  text-align: center;
  margin-top: 50px;
`
const ContentContainer = ({ addChilds, dummyData, showProgress }) => {
  const mapData = dummyData.map((item, idx) => {
    console.log(item, '??? >>>')
    return (
      <CLi key={`li${idx}`}>
        <Contents
          key={`Cor${idx}`}
          page={item.page} /** obj error */
          brand={item.brand}
          info={item.info}
        />
      </CLi>
    )
  })
  console.log(mapData, '!!!', dummyData)
  return (
    <MainBoard>
      {showProgress
        ? <Waiting>데이터를 불러오고 있습니다. 잠시만 기다려주십시오.</Waiting>
        : <Board id='contentBody'>
          <ul id={'content_ul'} style={{ width: '1200px', paddingLeft: '0' }}>
            {dummyData && dummyData.length > 0
                ? mapData
                : '해당 카테고리에 상품이 없습니다.'}
            {addChilds}
          </ul>
        </Board>}
    </MainBoard>
  )
}

export default ContentContainer
