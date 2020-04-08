import React, { Component } from "react";
import NaviContainer, { kinds } from "./Navigation/NaviContainer";
import ContentContainer, { CLi } from "./Content/ContentContainer";
import Contents from "./Content/Contents";

const target = "storeList"; //스토리지 key

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTop: true,
      clickKind: "DRESS",
      dummyData: [],
      addChilds: [],
      showProgress: true
    };
  }

  //UNSAFE_componentWillMount
  componentWillMount = async () => {
    //스토리지에서 저장 정보 조회
    let data = window.localStorage.getItem(target);
    //변환 작업
    // if (data !== null) {
    //   //저장되어 있을 경우 다시 바인딩
    //   if (/[.*]|{.*}/.test(data)) {
    //     let stateObj = JSON.parse(data);

    //     const _isTop = stateObj.isTop;
    //     const _scrollY = stateObj.scrollY ? stateObj.scrollY : 0;
    //     const _naviScrollX = stateObj.naviScrollX ? stateObj.naviScrollX : 0;

    //     //불필요요소 삭제
    //     delete stateObj.scrollY;
    //     delete stateObj.naviScrollX;
    //     let tempObj = Object.assign({}, stateObj.dummyData["0"]);
    //     stateObj.dummyData.shift();
    //     stateObj.dummyData.unshift(tempObj);

    //     await this.setState(stateObj, () => {
    //       //move scroll
    //       if (_isTop) {
    //         let headElem = document.getElementsByClassName("navi");
    //         let value =
    //           _naviScrollX === 0 && kinds.indexOf(this.state.clickKind) > 4
    //             ? 1000
    //             : _naviScrollX;
    //         headElem[0].scrollBy(value, 0);
    //       } else {
    //         window.scrollTo(0, _scrollY);
    //       }
    //     });
    //   }
    // } else {
    //저장되어 있지 않을 경우 새로 불러오기
    //동기 (await)
    let dummyData = await fetch(
      "https://my-json-server.typicode.com/beckyi/demo/items?category=DRESS"
    )
      .then(response => response.json())
      .then(responJSON => {
        try {
          let response_dummy = [];

          if (responJSON && responJSON.length > 0) {
            //default 4개
            for (let i = 0; i < 4; i++) {
              let pObj = Object.assign({}, { page: 1 }, responJSON[0]);
              response_dummy.push(pObj);
            }
          }

          return response_dummy;
        } catch (error) {
          console.warn(error);
          return [];
        }
      });

    await this.setState({ dummyData, showProgress: false });
    // }

    //화면 변경되기 전에 현재 상태 저장
    this.saveBeforeOut();

    //scroll event
    this.catchScrollEvent();
  };

  //화면 변경하기 전에 데이터 스토리지에 저장
  saveBeforeOut() {
    window.onbeforeunload = e => {
      let saveObj = Object.assign(
        {
          naviScrollX: document.getElementsByClassName("navi")[0].scrollLeft,
          scrollY: window.scrollY
        },
        this.state
      );

      window.localStorage.setItem(target, JSON.stringify(saveObj));
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.isTop !== this.state.isTop &&
      (!prevState.isTop && this.state.isTop)
    ) {
      //clickKind
      let headElem = document.getElementsByClassName("navi");

      if (headElem && headElem[0]) {
        let idx = kinds.indexOf(this.state.clickKind);
        let focusWhere = idx > 4 ? 1000 : 0;
        headElem[0].scrollBy(focusWhere, 0); //가려지지 않도록
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveBeforeOut);

    window.removeEventListener("scroll", this.catchScrollEvent);
  }

  catchScrollEvent() {
    let isMaking = false;

    window.onscroll = e => {
      let bool = window.scrollY === 0;

      if (bool !== this.state.isTop) {
        this.setState({
          isTop: bool
        });
      }
      if (
        !isMaking &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      ) {
        //생성 중일 경우 끝날 떄까지 대기
        isMaking = true;

        const formObj = Object.assign({}, this.state.dummyData[0]);
        let copyChild = this.state.addChilds.slice();
        let pageN = parseInt(this.state.addChilds.length / 30) + 2;

        for (let i = 0; i < 30; i++) {
          let upObj = Object.assign({}, formObj, { page: pageN });

          copyChild.push(
            <CLi key={i + "li"}>
              <Contents
                page={upObj.page} /** obj error */
                brand={upObj.brand}
                info={upObj.info}
              />
            </CLi>
          );
        }

        this.setState(
          {
            addChilds: copyChild
          },
          () => {
            isMaking = false;
          }
        );
      }
    };
  }

  //어아탬 클릭 이벤트 처리
  handleClickKind = async model => {
    let changeState = {};

    //다를 경우에만 저장
    if (this.state.clickKind !== model) {
      changeState.clickKind = model;

      await this.setState({ showProgress: true });

      //api 호출 (비동기) :: fake api
      fetch(
        "https://my-json-server.typicode.com/beckyi/demo/items?category=" +
          model
      )
        .then(response => response.json())
        .then(responJSON => {
          let response_dummy = [];

          try {
            if (responJSON && responJSON.length > 0) {
              //default 4개
              for (let i = 0; i < 4; i++) {
                let pObj = Object.assign({}, { page: 1 }, responJSON[0]);
                response_dummy.push(pObj);
              }
            }
          } catch (error) {
            console.warn(error);
          }
          this.setState({
            dummyData: response_dummy,
            addChilds: [],
            showProgress: false
          });
        });
    }

    //최상단이 아닐 경우
    if (!this.state.isTop) {
      changeState.isTop = false;

      window.scrollTo(0, 0); //move to top
    }

    if (Object.keys(changeState).length > 0) this.setState(changeState);
  };

  render() {
    const { isTop, clickKind, addChilds, dummyData, showProgress } = this.state;
    return (
      <div id="main">
        <NaviContainer
          isTop={isTop}
          clickKind={clickKind}
          Callbacks={{ handleClickKind: this.handleClickKind }}
        />
        <ContentContainer
          dummyData={dummyData}
          addChilds={addChilds}
          showProgress={showProgress}
        />
      </div>
    );
  }
}

Main.propTypes = {};

export default Main;
