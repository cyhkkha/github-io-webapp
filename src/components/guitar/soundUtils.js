/* eslint-disable prefer-destructuring */
class MusicNote {
    constructor(flag) {
        this.getFlag = () => {
            let temp = flag[1];
            if (temp.length > 1) {
                temp = temp[0] + temp[1].toUpperCase();
                return temp;
            }
            return temp.toUpperCase();
        };
        this.getSing = () => flag[0];
        this.equalOf = (note) => {
            if (note instanceof MusicNote) {
                return flag.indexOf(note.getSing()) > -1;
            }
            return flag.indexOf(note.toLowerCase()) > -1;
        };
    }
}

const notes = [
    new MusicNote(['1', 'c', '#7', '#B']), // 0 C
    new MusicNote(['#1', '#c', 'b2', 'bd']), // 1
    new MusicNote(['2', 'd']), // 2 D
    new MusicNote(['#2', '#d', 'b3', 'be']), // 3
    new MusicNote(['3', 'e', 'b4', 'bf']), // 4 E
    new MusicNote(['4', 'f', '#3', '#e']), // 5 F
    new MusicNote(['#4', '#f', 'b5', 'bg']), // 6
    new MusicNote(['5', 'g']), // 7 G
    new MusicNote(['#5', '#g', 'b6', 'ba']), // 8
    new MusicNote(['6', 'a']), // 9 A
    new MusicNote(['#6', '#a', 'b7', 'bb']), // 10
    new MusicNote(['7', 'b', 'b1', 'bc']), // 11 B
];
notes[0].pre = notes[11];
notes[0].next = notes[1];
notes[11].pre = notes[10];
notes[11].next = notes[0];
for (let i = 1; i < 11; i += 1) {
    notes[i].pre = notes[i - 1];
    notes[i].next = notes[i + 1];
}

const stander = [undefined, notes[4], notes[11], notes[7], notes[2], notes[9], notes[4]];

export default stander;
