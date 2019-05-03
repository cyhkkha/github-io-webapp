import sound from './sound.json';
import guitarString from './guitarString.json';
import scale from './scale.json';

sound.forEach((e, i) => {
    e.next = sound[i + 1] || sound[0];
    e.pre = sound[i - 1] || sound[sound.length - 1];
    /** @namespace e.alias */
    e.equalOf = o => e.alias.indexOf(o.level) >= 0;
    e.is = o => e.alias.indexOf(o) >= 0;
});

/** @namespace guitarString.keys */
Object.keys(guitarString).forEach((key) => {
    guitarString[key] = guitarString[key]
        .map(name => sound
            .find(e => e.is(name)));
});

Object.keys(scale).forEach((key) => {
    scale[key] = scale[key]
        .map(name => sound
            .find(e => e.is(name)));
});

export {
    sound,
    guitarString,
    scale,
};
