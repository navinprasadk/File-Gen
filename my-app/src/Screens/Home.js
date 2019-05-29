import React, { Component } from "react";
import { Grid, Icon, Button } from "semantic-ui-react";
import MenuBarTop from "../Components/MenuBar/MenuBarTop";
import SideBar from "../Components/SideBar/SideBar";
import data from "./../Config/data.js";
import properties from "./../Config/properties.json";
import WorkFlowEditor from "./../Components/WorkFlowEditor/WorkFlowEditor";
import Editor from "./../Components/Editor/Editor";
import BlurredModal from "./../Components/Modal/BlurredModal";
import Axios from "axios";
export default class Home extends Component {
  state = {
    selectedTools: [],
    dataSource: [],
    currentTool: "",
    stageCount: 1,
    stages: [{ stageName: "", steps: {} }],
    entireJSON: {},
    activeStageNumber: 0,
    prevStageNumber: 0,
    stageName: ""
  };

  componentDidMount = () => {
    this.setState({
      dataSource: data
    });
    this.readData();
  };

  readData = () => {
    let context = this;
    Axios.get("/fileRead")
      .then(res => {
        context.setState({
          entireJSON: res.data
          //   stages:
          //     res.data.pipeline.stages != undefined
          //       ? res.data.pipeline.stages
          //       : [{}],
          //   stageCount:
          //     res.data.pipeline.stages != undefined
          //       ? res.data.pipeline.stages.length
          //       : 1
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  updateCurrentTool = toolName => {
    this.setState(
      {
        currentTool: ""
      },
      () => {
        this.setState({
          currentTool: toolName
        });
      }
    );
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = (e, status, stageNumber) => {
    this.setState({
      activeStageNumber: stageNumber
    });

    let {
      currentTool,
      stages,
      dataSource,
      selectedTools,
      prevStageNumber,
      activeStageNumber
    } = this.state;

    console.log("prevStageNumber", prevStageNumber);
    console.log("activeStageNumber", activeStageNumber);

    let key = e.dataTransfer.getData("key");
    let optionIndex = e.dataTransfer.getData("optionIndex");
    let copy = [];
    console.log(
      stages[stageNumber] != undefined,
      Object.keys(stages[stageNumber]) != undefined,
      Object.keys(stages[stageNumber]["steps"]).length
    );
    if (
      stages[stageNumber] != undefined &&
      Object.keys(stages[stageNumber]) != undefined &&
      Object.keys(stages[stageNumber]["steps"]).length
    ) {
      copy.concat(selectedTools);
      copy.concat(Object.keys(stages[stageNumber]["steps"]));
    } else {
      copy = [];
    }

    if (copy.length === 0) {
      copy.push(dataSource[key].options[optionIndex]);
      currentTool = dataSource[key].options[optionIndex];
    } else {
      if (copy.indexOf(dataSource[key].options[optionIndex]) === -1) {
        copy.push(dataSource[key].options[optionIndex]);
        currentTool = dataSource[key].options[optionIndex];
      } else {
        alert("Component Already Exists");
      }
    }

    console.log("copy", copy);

    copy.map(tool => {
      let tools = tool.toLowerCase().replace(" ", "_");
      if (stages[stageNumber] == undefined) {
        stages.push({ stageName: "", steps: {} });
      }
      console.log("stages", stages);

      let property = properties[tools];
      console.log(stages[stageNumber]["steps"][tools]);
      if (
        stages[stageNumber]["steps"] === undefined &&
        !Object.keys(stages[stageNumber]["steps"]).length
      ) {
        stages[stageNumber]["steps"] = {};
      }
      stages[stageNumber]["steps"][tools] = property;

      console.log("stages22222222", stages);
    });

    this.setState(
      {
        selectedTools: copy,
        currentTool,
        stages
      },
      () => {
        console.log("stagessssss", this.state.stages);
      }
    );
  };

  handlestageNameChange = (e, number) => {
    this.setState(
      {
        stageName: e.target.value
      },
      () => {
        let { stages } = this.state;
        stages[number]["stageName"] = this.state.stageName;
        this.setState(
          {
            stages: stages
          },
          () => {
            // this.updateData();
          }
        );
      }
    );
  };

  createStages = () => {
    let stageToBeDisplayed = [];
    let {
      stageCount,
      stages,
      activeStageNumber,
      selectedTools,
      currentTool
    } = this.state;

    console.log("stagesss", JSON.stringify(stages));

    for (let i = 0; i < stageCount; i++) {
      //   console.log(
      //     "jhjkjkjkk",
      //     activeStageNumber == 0 || stages.length,
      //     stages[i] != undefined &&
      //       Object.keys(stages[i]["steps"]).length &&
      //       Object.keys(stages[i]["steps"]) != "0",
      //     Object.keys(stages[i]["steps"]),
      //     selectedTools,
      //     selectedTools
      //   );
      console.log("ssdfsdfsdf", Object.keys(stages[i]["steps"]));
      stageToBeDisplayed.push(
        <div
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "dropped", i)}
          key={i}
        >
          <WorkFlowEditor
            selectedTools={
              activeStageNumber === 0 || stages.length
                ? stages[i] != undefined &&
                  stages[i]["steps"] != undefined &&
                  Object.keys(stages[i]["steps"]).length
                  ? Object.keys(stages[i]["steps"])
                  : activeStageNumber === i
                  ? selectedTools
                  : []
                : []
            }
            delete={this.delete}
            updateCurrentTool={this.updateCurrentTool}
            stageNumber={i}
            currentTool={currentTool}
            stageName={
              stages.length
                ? stages[i] != undefined && stages[i]["stageName"] != undefined
                  ? stages[i]["stageName"]
                  : ""
                : ""
            }
            handlestageNameChange={this.handlestageNameChange}
            deleteStage={this.deleteStage}
          />
        </div>
      );
    }
    return stageToBeDisplayed;
  };

  delete = (index, stageNumber) => {
    let copy = [...this.state.selectedTools];

    copy.splice(index, 1);
    let { stages } = this.state;
    let keys = Object.keys(stages[stageNumber]["steps"]);
    delete stages[stageNumber]["steps"][keys[index]];
    this.setState(
      {
        selectedTools: copy,
        stages,
        currentTool: "",
        stageNumber: stageNumber
      },
      () => {
        // this.updateData();
        // this.createStages();
      }
    );
  };

  deleteStage = stageNumber => {
    let { stages } = this.state;
    console.log("stages", JSON.stringify(stages));
    console.log("stageNumber", stageNumber);
    stages.splice(stageNumber, 1);
    console.log("stages", JSON.stringify(stages));
    this.setState(
      {
        stages,
        stageCount: stages.length
      },
      () => {
        JSON.stringify(this.state.stages);
        this.createStages();
      }
    );
  };

  updateData = () => {
    let data = this.state.entireJSON;
    data.pipeline["stages"] = this.state.stages;
    this.generateData(data);
    let context = this;

    console.log("sadd");
    Axios.post("/fileWrite", data)
      .then(res => {
        console.log("res", res);
        context.readData();
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  generateData = data => {
    let context = this;
    Axios.post("/api/fileOperations/generate", data)
      .then(res => {
        console.log("res", res);
        context.readData();
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleChangeValue = (e, currentTool, key) => {
    let { stages, activeStageNumber } = this.state;

    let currentProp =
      stages[activeStageNumber]["steps"] != undefined
        ? stages[activeStageNumber]["steps"]
        : [];
    currentProp[currentTool] =
      currentProp[currentTool] != undefined
        ? Object.keys(currentProp[currentTool]).length
          ? currentProp[currentTool]
          : properties[currentTool]
        : properties[currentTool];
    currentProp[currentTool][key] = e.target.value;

    this.setState({
      stages
    });
  };

  render() {
    console.log("stages", JSON.stringify(this.state.stages));
    return (
      <React.Fragment>
        <MenuBarTop />
        <Grid>
          <Grid.Row>
            {/* <BlurredModal/> */}
            <Grid.Column
              width={4}
              style={{
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "#fff"
              }}
            >
              <SideBar />
            </Grid.Column>

            <Grid.Column
              width={7}
              style={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}
            >
              {this.state.stages != undefined && this.state.stages.length ? (
                <div>
                  <b className="Work_flow_editor_title">Work Flow </b>
                  {this.createStages()}
                </div>
              ) : (
                <div>
                  <center><Button
                    size="SMALL"
                    color="black"
                    className="add_stage"
                    onClick={() => {
                      this.setState({
                        stageCount: this.state.stageCount + 1,
                        selectedTools: [],
                        currentTool: "",
                        stages: [
                          ...this.state.stages,
                          { stageName: "", steps: {} }
                        ]
                      });
                    }}
                    style={{marginTop:'5%'}}
                  >
                    ADD STAGE
                  </Button></center>
                </div>
              )}
              {this.state.stages.length ? (
                Object.keys(
                  this.state.stages[this.state.stages.length - 1]["steps"]
                ).length &&
                this.state.stages[this.state.stages.length - 1]["stageName"]
                  .length ? (
                  <div>
                    <Icon
                      name="add circle"
                      size="big"
                      style={{ float: "right", marginTop: "5%" }}
                      onClick={() => {
                        this.setState({
                          stageCount: this.state.stageCount + 1,
                          selectedTools: [],
                          currentTool: "",
                          stages: [
                            ...this.state.stages,
                            { stageName: "", steps: {} }
                          ]
                        });
                      }}
                    />
                    <center><Button
                      size="tiny"
                      color="black"
                      className="Editor_save_button"
                      onClick={this.updateData}
                    >
                      Generate
                    </Button></center>
                  </div>
                ) : null
              ) : null}
            </Grid.Column>

            <Grid.Column width={5}>
              <Editor
                currentTool={this.state.currentTool}
                selectedTools={this.state.selectedTools}
                activeStageNumber={this.state.activeStageNumber}
                handleChangeValue={this.handleChangeValue}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}
