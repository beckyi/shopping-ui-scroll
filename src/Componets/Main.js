import React, { Component } from "react";
import NaviContainer from "./Navigation/NaviContainer";
import ContentContainer, { CLi } from "./Content/ContentContainer";
import Contents from "./Content/Contents";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTop: true,
      clickKind: "DRESS",
      dummyData: [],
      addChilds: [],
      showProgress: false
    };
  }

  componentWillMount = async () => {
    await this.setState({ showProgress: true });

    //동기 (await)
    let dummyData = await fetch(
      "https://my-json-server.typicode.com/beckyi/demo/items?category=DRESS"
    )
      .then(response => response.json())
      .then(responJSON => {
        console.log(responJSON);

        let response_dummy = [];

        if (responJSON && responJSON.length > 0) {
          //default 4개
          for (let i = 0; i < 4; i++) {
            let pObj = Object.assign({}, { page: 1 }, responJSON[0]);
            response_dummy.push(pObj);
          }
        }

        return response_dummy;
      });

    await this.setState({ dummyData, showProgress: false });

    //scroll event
    this.catchScrollEvent();
  };

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
            <CLi>
              <Contents info={upObj} />
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

          if (responJSON && responJSON.length > 0) {
            //default 4개
            for (let i = 0; i < 4; i++) {
              let pObj = Object.assign({}, { page: 1 }, responJSON[0]);
              response_dummy.push(pObj);
            }
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
