import React, { Component } from "react";
import Item from "./Item";
import styled from "styled-components";

//region: components
const NaviHead = styled.div`
  width: ${props => (props.isExtend ? "1200px" : "100%")};
  position: relative;
  margin: 0px auto;
  box-sizing: border-box;
  overflow-x: ${props => (props.isExtend ? "hidden" : "scroll")};
  white-space: ${props => (props.isExtend ? "normal" : "nowrap")};
  scrollbar-width: none;
`;

const ArrowBtn = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  width: 130px;
  height: 204px;
  text-align: center;
  padding-right: 10px;
  background: #ffffff;
  cursor: pointer;
`;

const EnTitle = styled.p`
  display: ${props => (props.isExtend ? "inline-block" : "none")};
  font-size: 1.75rem;
  color: #2c3e50;
  font-weight: 600;
  letter-spacing: 0;
  text-align: center;
  margin-top: 10px;
`;

const EmptyBox = styled.div`
  display: inline-block;
  width: 130px;
`;
//endregion

const botArrow =
  "M16.6732 16.4451L0.676544 2.70556L2.98534 0.722534L16.6732 12.479L30.361 0.722534L32.6698 2.70556L16.6732 16.4451Z";
const topArrow =
  "M16.6732 0.722543L32.6698 14.4621L30.361 16.4451L16.6732 4.68859L2.98534 16.4451L0.676548 14.4621L16.6732 0.722543Z";

class NaviItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExtend: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  //확장 or 축소
  handleArrowClick = event => {
    this.setState(state => ({ isExtend: !state.isExtend }));
  };

  //항목 검색
  handleItemClick = async (item, event) => {
    await this.setState({ isExtend: false });

    this.props.Callbacks.handleClickKind(item);
  };

  render() {
    const { kinds, clickKind } = this.props;
    const { isExtend } = this.state;

    return (
      <NaviHead className={"navi"} isExtend={isExtend}>
        <EnTitle isExtend={isExtend}>전체보기</EnTitle>
        <div style={{ padding: "10px 0px 0px 35px" }}>
          {kinds.map((item, idx) => {
            return (
              <Item
                key={idx}
                id={`item${idx}`}
                title={item}
                clickKind={clickKind}
                Callbacks={{
                  handleItemClick: this.handleItemClick.bind(this, item)
                }}
              />
            );
          })}
          <EmptyBox />
        </div>
        <ArrowBtn onClick={this.handleArrowClick}>
          <svg
            width="33"
            height={isExtend ? "115px" : "100%"}
            viewBox="0 0 33 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={isExtend ? topArrow : botArrow} fill="#363232" />
          </svg>
        </ArrowBtn>
      </NaviHead>
    );
  }
}

export default NaviItems;
