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
      addChilds: []
    };
  }

  componentWillMount = async () => {
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
            response_dummy.push(responJSON[0]);
          }
        }

        return response_dummy;
      });

    await this.setState({ dummyData });

    //scroll event
    this.catchScrollEvent();
  };

  catchScrollEvent() {
    let isMaking = false;
    let count = 0;

    window.onscroll = e => {
      console.log(
        window.scrollY,
        "scrollY",
        window.innerHeigh,
        document,
        document.body.offsetHeight
      );
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
        count++;
        console.log(count);
        //window height + window scrollY 값이 document height보다 클 경우,
        //실행할 로직 (콘텐츠 추가)
        isMaking = true;

        let copyChild = this.state.addChilds.slice();

        for (let i = 0; i < 30; i++) {
          copyChild.push(
            <CLi>
              <Contents />
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
      // click 이벤트를 감지하여 계산기 open 여부를 적용하기 위한 이벤트 연결
      // window.addEventListener("scroll", this.onTopChange);
    };
  }

  onTopChange = (event, a, b) => {
    console.log("onTopChange", event, a, b);
  };

  componentDidMount() {}

  //어아탬 클릭 이벤트 처리
  handleClickKind = model => {
    let changeState = {};

    //다를 경우에만 저장
    if (this.state.clickKind !== model) {
      changeState.clickKind = model;

      //api 호출 (비동기) :: fake api
      fetch(
        "https://my-json-server.typicode.com/beckyi/demo/items?category=" +
          model
      )
        .then(response => response.json())
        .then(responJSON => {
          console.log(responJSON);

          let response_dummy = [];

          if (responJSON && responJSON.length > 0) {
            //default 4개
            for (let i = 0; i < 4; i++) {
              response_dummy.push(responJSON[0]);
            }
          }

          this.setState({ dummyData: response_dummy, addChilds: [] });
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
    const { isTop, clickKind, addChilds, dummyData } = this.state;
    return (
      <div id="main">
        <NaviContainer
          isTop={isTop}
          clickKind={clickKind}
          Callbacks={{ handleClickKind: this.handleClickKind }}
        />
        <ContentContainer dummyData={dummyData} addChilds={addChilds} />
      </div>
    );
  }
}

Main.propTypes = {};

export default Main;
