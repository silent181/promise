import MessageQueue from './index.js';

const timeout = ms => new Promise(resolve => {
    setTimeout(resolve, ms);
})

const queue = new MessageQueue();

const addTask = (time, order) =>
    queue.add(() => timeout(time)).then(() => {
        console.log(order)
    });

addTask(500, '1');
addTask(1000, '2');
addTask(300, '3');
addTask(1400, '4');
addTask(800, '5');
addTask(2000, '6');
addTask(600, '7');