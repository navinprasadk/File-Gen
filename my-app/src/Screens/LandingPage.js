import React, { Component } from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import MenuBarTop from "../Components/MenuBar/MenuBarTop";
import Axios from "axios";
import history from "./../history";

export default class LandingPage extends Component {
  state = {
    envVariablesCount: 1,
    prevKey: "",
    prevIndex: 0,
    savedData: {},
    agentName: "any",
    entireJSON: {}
  };

  componentDidMount = () => {
    this.readData();
  };

  readData = () => {
    let context = this;
    Axios.get("/fileRead")
      .then(res => {
        context.setState({
          envVariablesCount: Object.keys(res.data.pipeline.environment).length
            ? Object.keys(res.data.pipeline.environment).length
            : 1,
          entireJSON: res.data,
          savedData:
            res.data.pipeline.environment != undefined
              ? res.data.pipeline.environment
              : {},
          agentName:
            res.data.pipeline.agent != undefined ? res.data.pipeline.agent : ""
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleSave = () => {
    let { entireJSON } = this.state;
    if (Object.keys(entireJSON).length) {
      entireJSON.pipeline["environment"] = this.state.savedData;
      entireJSON.pipeline["agent"] = this.state.agentName.length
        ? this.state.agentName
        : "any";
      entireJSON.pipeline["stages"] = [
        {
          stageName: "",
          steps: []
        }
      ];
    } else {
      entireJSON["pipeline"] = {};
      entireJSON.pipeline["environment"] = this.state.savedData;
      console.log("entireJSON", entireJSON);
      if (entireJSON.pipeline.agent != undefined) {
        entireJSON.pipeline["agent"] = this.state.agentName.length
          ? this.state.agentName.length
          : "any";
      } else {
        entireJSON.pipeline["agent"] = "";
        entireJSON.pipeline["agent"] = this.state.agentName.length
          ? this.state.agentName.length
          : "any";
      }
      entireJSON.pipeline["stages"] = [
        {
          stageName: "",
          steps: []
        }
      ];
    }

    Axios.post("/fileWrite", entireJSON)
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/createJenkinsFile");
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleKeyChange = (e, index) => {
    let { savedData, prevIndex, prevKey } = this.state;
    if (prevIndex === index && Object.keys(savedData).length) {
      if (prevKey !== e.target.value) {
        Object.defineProperty(
          savedData,
          e.target.value,
          Object.getOwnPropertyDescriptor(savedData, prevKey)
        );
        delete savedData[prevKey];
      }
    }
    savedData[e.target.value] = "";
    this.setState({
      savedData,
      prevKey: e.target.value,
      prevIndex: index
    });
  };

  handleValueChange = (e, index) => {
    let { savedData } = this.state;
    let i = 0,
      key;
    let keyToUpdate = "";
    for (key in savedData) {
      if (i == index) {
        keyToUpdate = key;
      }

      i++;
    }
    if (keyToUpdate) {
      savedData[keyToUpdate] = e.target.value;
    }
    this.setState(
      {
        savedData
      },
      () => {
        console.log("envvvvvvvv", this.state.savedData);
      }
    );
  };

  envVariablesDisplay = () => {
    let { envVariablesCount, savedData } = this.state;
    let environmentDisplayContent = [];

    if (Object.keys(savedData).length) {
      if (Object.keys(savedData).length) {
        let keys = [];
        keys = Object.keys(savedData);
        for (let i = 0; i < envVariablesCount; i++) {
          environmentDisplayContent.push(
            <Form.Group widths="equal" key={i}>
              <Form.Input
                fluid
                placeholder="Key"
                defaultValue={keys[i]}
                onChange={e => {
                  this.handleKeyChange(e, i);
                }}
              />{" "}
              <Form.Input
                fluid
                placeholder="Value"
                defaultValue={savedData[keys[i]]}
                onChange={e => {
                  this.handleValueChange(e, i);
                }}
              />{" "}
            </Form.Group>
          );
        }
      }
    } else {
      for (let i = 0; i < envVariablesCount; i++) {
        environmentDisplayContent.push(
          <Form.Group widths="equal" key={i}>
            <Form.Input
              fluid
              placeholder="Key"
              onChange={e => {
                this.handleKeyChange(e, i);
              }}
            />{" "}
            <Form.Input
              fluid
              placeholder="Value"
              onChange={e => {
                this.handleValueChange(e, i);
              }}
            />{" "}
          </Form.Group>
        );
      }
    }

    return environmentDisplayContent;
  };

  render() {
    let { agentName } = this.state;
    return (
      <React.Fragment>
        <MenuBarTop />
        <Form
          className="agent-form"
          style={{
            marginLeft: "25%",
            width: "50%",
            marginTop: "4%"
          }}
        >
          <Form.Field>
            <label
              style={{
                fontSize: "110%"
              }}
            >
              {" "}
              Agent{" "}
            </label>{" "}
            <input
              placeholder="Agent"
              defaultValue={agentName}
              onChange={e => {
                this.setState({
                  agentName: e.target.value
                });
              }}
            />{" "}
          </Form.Field>{" "}
          <Form.Field>
            <label
              style={{
                fontSize: "110%"
              }}
            >
              {" "}
              Environment{" "}
            </label>{" "}
          </Form.Field>{" "}
          {this.envVariablesDisplay()}{" "}
          <Form.Field>
            <Icon
              name="add circle"
              position="right"
              size="large"
              style={{
                float: "right"
              }}
              onClick={() => {
                this.setState({
                  envVariablesCount: this.state.envVariablesCount + 1
                });
              }}
            />{" "}
          </Form.Field>{" "}
          <center>
            <Button
              style={{
                marginBottom: "4%",
                marginTop: "4%",
                letterSpacing: "1px",
                boxShadow: "3px 3px 11px 0 #9a9a9a"
              }}
              color="black"
              content="Proceed"
              onClick={this.handleSave}
            />{" "}
          </center>{" "}
        </Form>{" "}
      </React.Fragment>
    );
  }
}
