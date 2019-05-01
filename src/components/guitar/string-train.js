import React from 'react';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Tabs from 'antd/lib/tabs';
import Select from 'antd/lib/select';
import CheckBox from 'antd/lib/checkbox';
import { guitarString } from './guitarUtils';

export default class StringTrain extends React.Component {
    constructor(ps) {
        super(ps);
        this.fretOption = [...Array(25)
            .fill('').keys()]
            .map(o => <Select.Option key={o} value={o}>{o}</Select.Option>);
    }

    state = {
        // 调弦规则
        stringType: 'standard',
        // 弦数
        string: 6,
        // 品数
        fret: 0,
        // 是否为给出音找弦
        reverse: false,
        // 从xx品开始
        fFrom: 0,
        // 从xx品结束
        fTo: 12,
        // 玩家的回答
        answer: '',
        // 正确的音
        correct: null,
        // 点击检查后显示的内容
        checked: null,
    };

    componentDidMount() {
        this.handleRedo();
    }

    handleRedo = () => {
        const { fFrom, fTo, string, stringType } = this.state;
        const fret = Math.floor(Math.random() * (fTo - fFrom + 1) + fFrom);
        let correct = guitarString[stringType][string - 1];
        for (let i = 0; i < fret; i += 1) {
            correct = correct.next;
        }
        this.setState({
            fret,
            correct,
            checked: null,
        });
    };

    handleCheck = () => {
        const { fret, answer, reverse, correct } = this.state;
        let checked = null;
        if (!reverse) {
            checked = correct.is(answer)
                ? <span style={{ color: 'green' }}>回答正确</span>
                : <span style={{ color: 'red' }}>回答错误，正确答案是{correct.name}或{correct.level}</span>;
        } else {
            const fretAnswer = Number(answer);
            checked = fretAnswer === fret || fretAnswer === fret + 12
                ? <span style={{ color: 'green' }}>回答正确</span>
                : <span style={{ color: 'red' }}>回答错误，正确答案是第{fret}品</span>;
        }
        this.setState({
            checked,
        });
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

    render() {
        const { fFrom, fTo, fret, string, checked, reverse, correct, stringType } = this.state;
        return (
            <Card title="弦音练习" style={{ width: 400 }} className="ml-s">
                <Tabs defaultActiveKey="play">
                    <Tabs.TabPane tab={reverse ? '随机品格' : '随机音符'} key="play">
                        <p>根据提示，写出对应位置的{reverse ? '品格' : '音符'}</p>
                        <div className="mb-s">
                            <strong>弦数：</strong>
                            <Select
                                value={string}
                                style={{ width: 100 }}
                                onChange={(value) => { this.setState({ string: value }); }}
                            >
                                {guitarString[stringType]
                                    .map((e, i) => <Select.Option value={i + 1} key={e.name}>{i + 1}</Select.Option>)}
                            </Select>
                        </div>
                        {reverse
                            ? <p><strong>音名：</strong>{correct.name}</p>
                            : <p><strong>品数：</strong>{fret}</p>
                        }
                        <div>
                            <Input
                                placeholder={reverse ? '请输入正确的品数' : '请输入正确的音符'}
                                style={{ width: '150px' }}
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
                            <p>{checked}</p>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="设置" key="setting">
                        <div className="mb-s">
                            <CheckBox
                                checked={reverse}
                                onChange={(e) => { this.setState({ reverse: e.target.checked }); }}
                            >
                                通过给出的音找品格：
                            </CheckBox>
                        </div>
                        <div className="mb-s">
                            <span>调弦方式：</span>
                            <Select
                                value={stringType}
                                style={{ width: 100 }}
                                onChange={(value) => { this.setState({ stringType: value, string: 1 }); }}
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
                                {this.fretOption}
                            </Select>
                            <span className="ml-ss">到：</span>
                            <Select
                                value={fTo}
                                style={{ width: 100 }}
                                onChange={(value) => { this.fixFret(fFrom, value, false); }}
                            >
                                {this.fretOption}
                            </Select>
                            <span className="ml-ss">品</span>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        );
    }
}
