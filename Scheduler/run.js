import Scheduler from './index.js';

const timeout = ms => new Promise(resolve => {
    setTimeout(resolve, ms);
})

const scheduler = new Scheduler(3);

const addTask = (time, order, key) =>
    scheduler.add(() => timeout(time), key).then(() => {
        console.log(order)
    });

addTask(5000, '1');
addTask(100, '2');
addTask(3000, '3');
addTask(400, '4');
addTask(800, '5');
addTask(200, '6');
addTask(600, '7');