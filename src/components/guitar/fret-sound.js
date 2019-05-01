import React from 'react';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Tabs from 'antd/lib/tabs';
import Select from 'antd/lib/select';
import { guitarString } from './guitarUtils';

export default class FretSound extends React.Component {
    state = {
        string: Math.floor(Math.random() * 6 + 1),
        fret: Math.floor(Math.random() * 12 + 1),
        checked: null,
        sFrom: 1,
        sTo: 6,
        fFrom: 0,
        fTo: 12,
        answer: '',
        correct: null,
        stringType: 'standard',
    };

    constructor(props) {
        super(props);
        this.fScope = [...Array(25)
            .fill('').keys()]
            .map(o => <Select.Option key={o} value={o}>{o}</Select.Option>);
    }

    handleRedo = () => {
        const { sFrom, sTo, fFrom, fTo, stringType } = this.state;
        const fret = Math.floor(Math.random() * (fTo - fFrom + 1) + fFrom);
        const string = Math.floor(Math.random() * (sTo - sFrom + 1) + sFrom);
        let correct = guitarString[stringType][string - 1];
        for (let i = 0; i < fret; i += 1) {
            correct = correct.next;
        }
        this.setState({
            fret,
            string,
            correct,
            checked: null,
        });
    };

    handleCheck = () => {
        const { answer, correct } = this.state;
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
        const { fFrom, fTo, sFrom, sTo, fret, string, checked, stringType } = this.state;
        const sScope = guitarString[stringType]
            .map((e, i) => <Select.Option value={i + 1} key={e.name}>{i + 1}</Select.Option>);
        return (
            <Card title="指板音练习" style={{ width: 400 }}>
                <Tabs defaultActiveKey="play">
                    <Tabs.TabPane tab="随机音符" key="play">
                        <p>根据提示，写出对应位置的音名</p>
                        <p>
                            <span><strong>弦数：</strong>{string}</span>
                        </p>
                        <p><strong>品数：</strong>{fret}</p>
                        <div>
                            <Input
                                placeholder="请输入正确的音符"
                                style={{ width: '150px' }}
                                onChange={(e) => { this.setState({ answer: e.target.value }); }}
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
                            <p>{checked}</p>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="设置" key="setting">
                        <p>品格范围：</p>
                        <div>
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
                        <div>
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
