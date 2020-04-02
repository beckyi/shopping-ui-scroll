import React, { Component } from "react";
import PropTypes from "prop-types";
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

const BotBtn = styled.div`
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

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  //확장 or 축소
  handleArrowClick = event => {
    console.log("event1", event);
    this.setState(state => ({ isExtend: !state.isExtend }));
  };

  //항목 검색
  handleItemClick = (key, event) => {
    console.log(key, "event2", event);
  };

  render() {
    const { kinds, clickKind, Callbacks } = this.props;
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
                  handleItemClick: Callbacks.handleClickKind.bind(this, item)
                }}
              />
            );
          })}
        </div>
        <BotBtn onClick={this.handleArrowClick}>
          <svg
            width="33"
            height="100%"
            viewBox="0 0 33 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={isExtend ? topArrow : botArrow} fill="#363232" />
          </svg>
        </BotBtn>
      </NaviHead>
    );
  }
}

NaviItems.propTypes = {};

export default NaviItems;

/** {itemArr.map((item, idx) => {
          return <Item key={`item${idx}`} title={item} />
        })} */
