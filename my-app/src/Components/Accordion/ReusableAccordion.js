import React, { Component } from "react";
import {
  Accordion,
  Icon,
  Segment,
  Button,
  Grid,
  Label
} from "semantic-ui-react";
import data from "../../Config/data.js";
import "./ReusableAccordion.css";

export default class ReusableAccordion extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  onDragStart = (e, id) => {
    e.dataTransfer.setData("key", id.key);
    e.dataTransfer.setData("optionIndex", id.optionIndex);
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <Accordion>
        {data.map((item, key) => {
          return (
            <>
              <Accordion.Title
                className="Accordion_title"
                active={activeIndex === key}
                index={key}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                {item.name}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === key}>
                {item.options.map((option, optionIndex) => {
                  return (
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={3} />
                        <Grid.Column width={11}>
                          <div
                            onDragStart={e => {
                              this.onDragStart(e, {
                                key,
                                optionIndex
                              });
                            }}
                            draggable
                            style={{ marginTop: "4%" }}
                          >
                            <Button
                              fluid
                              className="Accordion_option_style"
                              key={optionIndex}
                            >
                              {option}
                              {/* <Icon name='info circle' size='small' style={{ float: 'right' }} /> */}
                            </Button>
                          </div>
                        </Grid.Column>
                        <Grid.Column width={2} />
                      </Grid.Row>
                    </Grid>
                  );
                })}
              </Accordion.Content>
            </>
          );
        })}
      </Accordion>
    );
  }
}
