import { Col, Row, Grid, FormControl, Button, Checkbox, FormGroup, ControlLabel} from 'react-bootstrap';
import React from 'react'
import {findDOMNode} from 'react-dom'
import { findSelected } from '../../../util/dom';
import styles from './home.scss'
import HCheckbox from '../../../components/Checkbox'
import {Radio, RadioGroup} from '../../../components/RadioGroup'


class DataProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  shouldComponentUpdate () {
    return true;
  }
  // Set state from props
  componentWillReceiveProps(nextProps) {
    this.setState({});
  }
  render () {
    return (
      <div className={styles.wrapper}>
        <div className="content-header">DDMO</div>
        <Grid>
          <div>
            <Row className="show-grid">
              <Col xs={3} md={2}>
                <label>字段1：</label>
              </Col>
              <Col xs={9} md={10}>
                <RadioGroup name="dataSource" selectedValue={this.state.dataSource} ref="dataSource">
                  <span className="radio-block">
                    <Radio value="landsat8" defaultChecked>1号</Radio>
                  </span>
                  <span className="radio-block">
                    <Radio value="gaofen-2">2号</Radio>
                  </span>
                </RadioGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={3} md={2}>
                <label>字段2：</label>
              </Col>
              <Col xs={9} md={10}>
                <div ref="waveCombine">
                  <span className="radio-block">
                    <HCheckbox name="waveCombine" value="421" defaultChecked value="421" inline>421</HCheckbox>
                  </span>
                  <span className="radio-block">
                    <HCheckbox inline name="waveCombine" value="654">654</HCheckbox>
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        </Grid>
      </div>
    );
  }
}

export default DataProcess
