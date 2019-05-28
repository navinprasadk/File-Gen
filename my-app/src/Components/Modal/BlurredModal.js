import React, { Component } from 'react'
import { Button, Header, Modal, Form } from 'semantic-ui-react'
class BlurredModal extends Component {
  state = { open: true }

//   show = dimmer => () => this.setState({ dimmer, open: true })
  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }
  close = () => {
    
    this.setState({ open: false })
  }

  render() {
    const { open, closeOnDimmerClick, closeOnEscape } = this.state

    return (
      <div>

        <Modal closeOnDimmerClick={closeOnDimmerClick} open={open} onClose={this.close}>
          <Modal.Header>Jenkins File Generator: <i>Initial Setup</i></Modal.Header>
          <Modal.Content>
            
            <Modal.Description>
              <Header> </Header>
            <Form>
                <Form.Field>
                    <label>Agent</label>
                    <input placeholder='' />
                </Form.Field>
                <Form.Field>
                    <label>Environment</label>
                </Form.Field>
                <Form.Group widths='equal'>
          <Form.Input fluid placeholder='Key' />
          <Form.Input fluid placeholder='Value' />
        </Form.Group>
                <Button
                style={{ float:'right', marginBottom: '2%'}}
              color='black'
            //   icon='checkmark'
            // labelPosition='right'
              content="Proceed"
              onClick={this.close}
            />
              </Form>
            </Modal.Description>
          </Modal.Content>
          
        </Modal>
      </div>
    )
  }
}

export default BlurredModal