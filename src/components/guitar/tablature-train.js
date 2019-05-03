import React from 'react';
import Card from 'antd/lib/card';
import Tabs from 'antd/lib/tabs';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import { guitarString } from './guitarUtils';

export default class TablatureTrain extends React.Component {
    state = {
        stringType: 'standard',
        frets: [{ fret: 0, disabled: false }],
        answers: [''],
        checks: [''],
        sFrom: 1,
        sTo: 6,
        fFrom: 0,
        fTo: 12,
    };

    constructor(props) {
        super(props);
        this.fScope = [...Array(25)
            .fill('').keys()]
            .map(o => <Select.Option key={o} value={o}>{o}</Select.Option>);
    }

    componentWillMount() {
        this.handleRedo();
    }

    handelAnswerChange = (index, e) => {
        const { answers } = this.state;
        answers[index] = e.target.value.trim();
        this.setState({ answers });
    };

    handleRedo = () => {
        const { fFrom, fTo, sFrom, sTo, stringType } = this.state;
        const frets = guitarString[stringType].map((e, i) => {
            const o = { fret: 0, disabled: false };
            if (i < sFrom - 1 || i > sTo - 1) {
                o.disabled = true;
                return o;
            }
            o.fret = Math.floor(Math.random() * (fTo - fFrom + 1) + fFrom);
            return o;
        });
        this.setState({
            frets,
            answers: Array(guitarString[stringType].length).fill(''),
            checks: Array(guitarString[stringType].length).fill(''),
        });
    };

    handleCheck = () => {
        const { stringType, frets, checks, answers } = this.state;
        const fretSound = guitarString[stringType].map((s, index) => {
            if (frets[index].disabled) {
                return null;
            }
            let correct = s;
            for (let i = 0; i < frets[index].fret; i += 1) {
                correct = correct.next;
            }
            return correct;
        });
        fretSound.forEach((correct, index) => {
            if (correct) {
                checks[index] = correct.is(answers[index])
                    ? <span className="ml-s" style={{ color: 'green' }}>回答正确</span>
                    : (
                        <span className="ml-s" style={{ color: 'red' }}>
                            {`${correct.name}/${correct.level}`}
                        </span>
                    );
            }
        });
        this.setState({ checks });
    };

    fixFret = (f, t, isFrom) => {
        let fFrom = f;
        let fTo = t;
        if (fFrom > fTo) {
            if (isFrom) {
                fTo = fFrom;
            } else {
                fFrom = fTo;
            }
        }
        this.setState({
            fFrom,
            fTo,
        });
    };

    fixString = (f, t, isFrom) => {
        let sFrom = f;
        let sTo = t;
        if (sFrom > sTo) {
            if (isFrom) {
                sTo = sFrom;
            } else {
                sFrom = sTo;
            }
        }
        this.setState({
            sFrom,
            sTo,
        });
    };

    render() {
        const { frets, checks, sFrom, sTo, fFrom, fTo, stringType } = this.state;
        const sScope = guitarString[stringType]
            .map((e, i) => <Select.Option value={i + 1} key={e.name}>{i + 1}</Select.Option>);
        return (
            <Card className="mr-s mb-s" style={{ width: 400 }}>
                <Tabs defaultActiveKey="play">
                    <Tabs.TabPane tab="识谱练习" key="play">
                        <p>根据六线谱，写出对应位置的音符</p>
                        <div className="mb-s">
                            {frets.map(({ fret, disabled }, index) => (
                                <div key={index}>
                                    <span>
                                        ———
                                        <strong
                                            className="ds-ib"
                                            style={{ width: '2em', textAlign: 'center' }}
                                        >{fret}</strong>
                                        ———
                                    </span>
                                    <Input
                                        disabled={disabled}
                                        placeholder="请输入音符"
                                        className="ml-s"
                                        style={{ width: '100px' }}
                                        onChange={e => this.handelAnswerChange(index, e)}
                                    />
                                    <span>{checks[index]}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <Button
                                type="primary"
                                className="ml-s"
                                onClick={this.handleCheck}
                                htmlType="button"
                            >验证</Button>
                            <Button
                                type="circle"
                                className="ml-s"
                                icon="redo"
                                onClick={this.handleRedo}
                                htmlType="button"
                            />
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="设置" key="setting">
                        <div className="mb-s">
                            <span>调弦方式：</span>
                            <Select
                                value={stringType}
                                style={{ width: 100 }}
                                onChange={(value) => { this.setState({ stringType: value }); }}
                            >
                                {Object.keys(guitarString)
                                    .map(name => <Select.Option key={name} value={name}>{name}</Select.Option>)}
                            </Select>
                        </div>
                        <p>品格范围：</p>
                        <div className="mb-s">
                            <span>从：</span>
                            <Select
                                value={fFrom}
                                style={{ width: 100 }}
                                onChange={(value) => { this.fixFret(value, fTo, true); }}
                            >
                                {this.fScope}
                            </Select>
                            <span className="ml-ss">到：</span>
                            <Select
                                value={fTo}
                                style={{ width: 100 }}
                                onChange={(value) => { this.fixFret(fFrom, value, false); }}
                            >
                                {this.fScope}
                            </Select>
                            <span className="ml-ss">品</span>
                        </div>
                        <p>弦范围：</p>
                        <div className="mb-s">
                            <span>从：</span>
                            <Select
                                value={sFrom}
                                style={{ width: 100 }}
                                onChange={(value) => { this.fixString(value, sTo, true); }}
                            >
                                {sScope}
                            </Select>
                            <span className="ml-ss">到：</span>
                            <Select
                                value={sTo}
                                style={{ width: 100 }}
                                onChange={(value) => { this.fixString(sFrom, value, false); }}
                            >
                                {sScope}
                            </Select>
                            <span className="ml-ss">弦</span>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        );
    }
}
