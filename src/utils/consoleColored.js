const succesStyle = [
    'background: rgba(0,255,0,0.1)',
    'color: rgb(0,255,0)',
    'padding: 5px 20px',
    'margin: 5px',
    'font-size: 20px',
].join(';');
const errorStyle = [
    'background: rgba(150,0,0,0.1)',
    'color: rgb(255,0,0)',
    'padding: 5px 20px',
    'margin: 5px',
    'font-size: 15px',
].join(';');
const warningStyle = [
    'background: rgba(0,255,0,0.1)',
    'color: yellow',
    'padding: 5px 20px',
    'margin: 5px',
    'font-size: 20px',
].join(';');

export class ConsoleLog {
    static error(...message) {
        message.forEach((mes) => console.log(`%c${mes}`, errorStyle))
    }
    static success(...message) {
        message.forEach((mes) => console.log(`%c${mes}`, succesStyle))
    }
    static warning(...message) {
        message.forEach((mes) => console.log(`%c${mes}`, warningStyle))
    }
}

