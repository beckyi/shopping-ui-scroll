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
// 초기 데이터 4개 세팅
// const dummyData = []

// for (let i = 0; i < 4; i++) {
//   dummyData.push({
//     pageNo: 1,
//     category: 'DRESS',
//     brand: '브랜드명',
//     info: '상품명상품명상품명 abcdefg 1234'
//   })
// }

const ContentContainer = ({ addChilds, dummyData }) => {
  console.log('>>>', dummyData, '<>', addChilds)

  const mapData = dummyData.map(item => {
    return (
      <CLi>
        <Contents />
      </CLi>
    )
  })

  return (
    <MainBoard>
      <div
        id='contentBody'
        style={{
          marginTop: '10px',
          width: '1200px',
          margin: '50px auto',
          textAlign: 'center'
        }}
      >
        <ul id={'content_ul'} style={{ width: '1200px', paddingLeft: '0' }}>
          {dummyData && dummyData.length > 0 ? mapData : '해당 카테고리에 상품이 없습니다.'}
          {addChilds}
        </ul>
      </div>
    </MainBoard>
  )
}

export default ContentContainer
