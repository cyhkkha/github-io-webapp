import React from 'react';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Tabs from 'antd/lib/tabs';
import Select from 'antd/lib/select';
import { guitarString } from './guitarUtils';

export default class FretTrain extends React.Component {
    state = {
        string: 1,
        fret: 0,
        checked: null,
        sFrom: 1,
        sTo: 6,
        fFrom: 0,
        fTo: 12,
        answer: '',
        stringType: 'standard',
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

    handleRedo = () => {
        const { sFrom, sTo, fFrom, fTo } = this.state;
        const fret = Math.floor(Math.random() * (fTo - fFrom + 1) + fFrom);
        const string = Math.floor(Math.random() * (sTo - sFrom + 1) + sFrom);
        this.setState({
            fret,
            string,
            checked: null,
            answer: '',
        });
    };

    handleCheck = () => {
        const { answer, stringType, string, fret } = this.state;
        let correct = guitarString[stringType][string - 1];
        for (let i = 0; i < fret; i += 1) {
            correct = correct.next;
        }
        const checked = correct.is(answer)
            ? <span style={{ color: 'green' }}>回答正确</span>
            : <span style={{ color: 'red' }}>回答错误，正确答案是{correct.name}或{correct.level}</span>;
        this.setState({ checked });
    };

    fixFret(f, t, isFrom) {
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
    }

    fixString(f, t, isFrom) {
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
    }

    render() {
        const { fFrom, fTo, sFrom, sTo, fret, string, checked, stringType, answer } = this.state;
        const sScope = guitarString[stringType]
            .map((e, i) => <Select.Option value={i + 1} key={e.name}>{i + 1}</Select.Option>);
        return (
            <Card className="guitar-card-size">
                <Tabs defaultActiveKey="play">
                    <Tabs.TabPane tab="指板练习" key="play">
                        <p>根据提示，写出对应位置的音名</p>
                        <p>
                            <span><strong>弦数：</strong>{string}</span>
                        </p>
                        <p><strong>品数：</strong>{fret}</p>
                        <div>
                            <Input
                                value={answer}
                                placeholder="请输入正确的音符"
                                className="guitar-ele-l"
                                onChange={(e) => { this.setState({ answer: e.target.value.trim() }); }}
                            />
                            <Button
                                type="primary"
                                className="ml-ss"
                                onClick={this.handleCheck}
                                htmlType="button"
                            >验证</Button>
                            <Button
                                type="circle"
                                className="ml-ss"
                                icon="redo"
                                onClick={this.handleRedo}
                                htmlType="button"
                            />
                            <div style={{ height: '2em' }}>{checked}</div>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="设置" key="setting">
                        <div className="mb-s">
                            <strong>调弦方式：</strong>
                            <Select
                                value={stringType}
                                className="guitar-ele-m"
                                onChange={(value) => { this.setState({ stringType: value }); }}
                            >
                                {Object.keys(guitarString)
                                    .map(name => <Select.Option key={name} value={name}>{name}</Select.Option>)}
                            </Select>
                        </div>
                        <p><strong>品格范围：</strong></p>
                        <div className="mb-s">
                            <span>从：</span>
                            <Select
                                value={fFrom}
                                className="guitar-ele-s"
                                onChange={(value) => { this.fixFret(value, fTo, true); }}
                            >
                                {this.fScope}
                            </Select>
                            <span className="ml-ss">到：</span>
                            <Select
                                value={fTo}
                                className="guitar-ele-s"
                                onChange={(value) => { this.fixFret(fFrom, value, false); }}
                            >
                                {this.fScope}
                            </Select>
                            <span className="ml-ss">品</span>
                        </div>
                        <p><strong>弦范围：</strong></p>
                        <div className="mb-s">
                            <span>从：</span>
                            <Select
                                value={sFrom}
                                className="guitar-ele-s"
                                onChange={(value) => { this.fixString(value, sTo, true); }}
                            >
                                {sScope}
                            </Select>
                            <span className="ml-ss">到：</span>
                            <Select
                                value={sTo}
                                className="guitar-ele-s"
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
