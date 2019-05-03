import React from 'react';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Tabs from 'antd/lib/tabs';
import Select from 'antd/lib/select';
import { guitarString } from './guitarUtils';

export default class NoteTrain extends React.Component {
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
        // 从xx品开始
        fFrom: 0,
        // 从xx品结束
        fTo: 12,
        // 玩家的回答
        answer: '',
        // 正确的音
        sound: null,
        // 点击检查后显示的内容
        checked: null,
    };

    componentWillMount() {
        this.handleRedo();
    }

    handleRedo = () => {
        const { fFrom, fTo, string, stringType } = this.state;
        const fret = Math.floor(Math.random() * (fTo - fFrom + 1) + fFrom);
        let sound = guitarString[stringType][string - 1];
        for (let i = 0; i < fret; i += 1) {
            sound = sound.next;
        }
        this.setState({
            fret,
            sound,
            checked: null,
            answer: '',
        });
    };

    handleCheck = () => {
        const { fret, answer } = this.state;
        const fretAnswer = Number(answer);
        const checked = fretAnswer === fret || fretAnswer === fret + 12
            ? <span style={{ color: 'green' }}>回答正确</span>
            : <span style={{ color: 'red' }}>回答错误，正确答案是第{fret}品</span>;
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
        const { fFrom, fTo, string, checked, sound, stringType, answer } = this.state;
        return (
            <Card className="guitar-card-size">
                <Tabs defaultActiveKey="play">
                    <Tabs.TabPane tab="音符练习" key="play">
                        <p>根据提示，写出对应位置的品格</p>
                        <div className="mb-s">
                            <strong>弦数：</strong>
                            <Select
                                value={string}
                                className="guitar-ele-m"
                                onChange={(value) => { this.setState({ string: value }); }}
                            >
                                {guitarString[stringType]
                                    .map((e, i) => <Select.Option value={i + 1} key={e.name}>{i + 1}</Select.Option>)}
                            </Select>
                        </div>
                        <p><strong>音名：</strong>{sound.name}</p>
                        <div>
                            <Input
                                value={answer}
                                placeholder="请输入正确的品数"
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
                                onChange={(value) => { this.setState({ stringType: value, string: 1 }); }}
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
                                {this.fretOption}
                            </Select>
                            <span className="ml-ss">到：</span>
                            <Select
                                value={fTo}
                                className="guitar-ele-s"
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
