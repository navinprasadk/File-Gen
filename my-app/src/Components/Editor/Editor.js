import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import properties from "./../../Config/properties.json";
import Axios from "axios";
import "./Editor.css";

export default class Editor extends Component {
  state = {
    updatedProperties: [],
    currentTool: "",
    selectedTools: [],
    entireJSON: {},
    stages: [],
    stageCount: 1
  };

  componentDidMount = () => {
    this.readData();
  };

  //   handleChangeValue = (e, currentTool, key) => {
  //     let context = this;
  //     console.log("cuurentTool", currentTool);
  //     console.log("e", e.target.value);
  //     console.log("key", key);
  //     let currentStageVal = this.state.stages;

  //     console.log("stagessss onchange", JSON.stringify(currentStageVal));

  //     let currentProp =
  //       currentStageVal[this.props.activeStageNumber]["steps"] != undefined
  //         ? currentStageVal[this.props.activeStageNumber]["steps"]
  //         : [];
  //     console.log("currrentProp", currentProp);
  //     currentProp[currentTool] =
  //       currentProp[currentTool] != undefined
  //         ? Object.keys(currentProp[currentTool]).length
  //           ? currentProp[currentTool]
  //           : properties[currentTool]
  //         : properties[currentTool];
  //     console.log("currrentProp", currentProp);
  //     currentProp[currentTool][key] = e.target.value;

  //     console.log("currentProp", currentProp);
  //     console.log("this.props.activeStageNumber", this.props.activeStageNumber);
  //     console.log("currentStageValsssstyuui", JSON.stringify(currentStageVal));
  //     let updatedValue = currentStageVal;
  //     console.log("updatedValue", updatedValue);

  //     context.setState(
  //       {
  //         updatedProperties: updatedValue
  //       },
  //       () => {
  //         console.log(
  //           "updatedValue",
  //           JSON.stringify(context.state.updatedProperties)
  //         );
  //       }
  //     );
  //   };

  readData = () => {
    let context = this;
    Axios.get("/fileRead")
      .then(res => {
        context.setState({
          entireJSON: res.data,
          stages:
            res.data.pipeline.stages != undefined
              ? res.data.pipeline.stages
              : [],
          stageCount:
            res.data.pipeline.stages != undefined
              ? res.data.pipeline.stages.length
              : 1
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  updateData = () => {
    let data = this.state.entireJSON;
    data.pipeline["stages"] = this.state.updatedProperties;
    Axios.post("/fileWrite", data)
      .then(res => {
        console.log("resssssss", res);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      currentTool: nextProps.currentTool,
      selectedTools: nextProps.selectedTools
    });
  };

  // createStages = () => {
  //     let stageContent = [];
  //     let { entireJSON, stages} = thi.state;
  //     if(Object.keys(entireJSON).length) {
  //         if(stages.length) {
  //             let keys = [];
  //             keys = Object.keys(savedData);
  //             for(let i = 0; i < stageContent ; i++) {
  //                 environmentDisplayContent.push(
  //                     <Form.Group widths='equal' key={i}>
  //                         <Form.Input fluid placeholder='Key' defaultValue={keys[i]} onChange={(e) => {this.handleKeyChange(e,i)}}/>
  //                         <Form.Input fluid placeholder='Value' defaultValue={savedData[keys[i]]} onChange={(e) => {this.handleValueChange(e,i)}}/>
  //                     </Form.Group>
  //                 )
  //             }
  //         }
  //     } else {
  //         for(let i = 0; i < envVariablesCount ; i++) {
  //             environmentDisplayContent.push(
  //                 <Form.Group widths='equal' key={i}>
  //                     <Form.Input fluid placeholder='Key' onChange={(e) => {this.handleKeyChange(e,i)}}/>
  //                     <Form.Input fluid placeholder='Value' onChange={(e) => {this.handleValueChange(e,i)}}/>
  //                 </Form.Group>
  //             )
  //         }
  //     }

  //     return environmentDisplayContent;
  // }

  render() {
    let currentTool =
      this.props.currentTool != undefined
        ? this.props.currentTool.toLowerCase().replace(" ", "_")
        : "";

    let keys = currentTool ? Object.keys(properties[currentTool]) : [];

    return (
      <React.Fragment>
        {currentTool.length ? (
          <div>
            <p className="Editor_title">{currentTool.replace("_", " ")}</p>
            {keys.length
              ? keys.map(key => {
                  let defaultValue = properties[currentTool][key];
                  return (
                    <div>
                      <p className="Editor_property_name">{key}</p>
                      <Input
                        key={key}
                        placeholder={key}
                        defaultValue={defaultValue}
                        onChange={e => {
                          this.props.handleChangeValue(e, currentTool, key);
                        }}
                      />
                    </div>
                  );
                })
              : null}
            {/* {keys.length ? <Button size='tiny' color='black' className='Editor_save_button' onClick={this.updateData}>SAVE</Button> : null} */}
          </div>
        ) : (
          <center className="Editor_empty_message">
            <p>No selected Tools</p>
          </center>
        )}
      </React.Fragment>
    );
  }
}
