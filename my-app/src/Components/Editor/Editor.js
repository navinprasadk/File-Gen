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
