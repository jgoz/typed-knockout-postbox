import test = require("blue-tape");

import * as postbox from "knockout-postbox";
import * as ko from "knockout";

const defaultComparer = postbox.defaultComparer;
const serializer = postbox.serializer;

test("publish, subscribe", {}, t => {
    let values: number[] = [];

    postbox.publish("t", 0);
    postbox.subscribe<number>("t", v => { values.push(v); }, null, true);
    postbox.publish("t", 1);

    t.deepEqual(values, [0, 1]);
    t.end();
});

test("topicCache", {}, t => {
    postbox.publish("t", 1);

    t.deepEqual(postbox.topicCache, { "t": { value: 1, serialized: "1" } });
    t.end();
});

test("serializer", {}, t => {
    postbox.serializer = v => "asdf";

    postbox.publish("t", 1);
    t.deepEqual(postbox.topicCache, { "t": { value: 1, serialized: "asdf" } });

    postbox.serializer = serializer;
    t.end();
});

test("defaultComparer", {}, t => {
    let value: number;

    postbox.defaultComparer = (a, b) => true;

    postbox.subscribe<number>("t", v => { value = v; });
    const o = ko.observable(1).publishOn("t");

    o(2);

    t.equals(value, 1);

    postbox.defaultComparer = defaultComparer;
    t.end();
});

test("reset", {}, t => {
    postbox.publish("t", 1);
    postbox.publish("u", 2);

    t.notDeepEqual(postbox.topicCache, {});

    postbox.reset();

    t.deepEqual(postbox.topicCache, {});
    t.end();
});

test("subscriptions", {}, t => {
    postbox.subscribe("t", () => {});

    t.equals(Object.keys(postbox.subscriptions).length, 1);
    t.end();
});

test("subscribeTo", {}, t => {
    const o = ko.observable(1).subscribeTo("t");

    postbox.publish("t", 2);

    t.equals(o(), 2);
    t.end();
});

test("subscribeTo", {}, t => {
    const o = ko.observable(1).subscribeTo("t");

    postbox.publish("t", 2);

    t.equals(o(), 2);
    t.end();
});


test("unsubscribeFrom", {}, t => {
    const o = ko.observable(1).subscribeTo("t");

    postbox.publish("t", 2);

    t.equals(o(), 2);

    o.unsubscribeFrom("t");

    postbox.publish("t", 3);
    t.equals(o(), 2);

    t.end();
});

test("publishOn", {}, t => {
    const o = ko.observableArray().subscribeTo("t");
    const p = ko.observableArray().publishOn("t");

    p([2]);

    t.deepEqual(o(), [2]);
    t.end();
});


test("stopPublishingOn", {}, t => {
    const o = ko.observableArray().subscribeTo("t");
    const p = ko.observableArray().publishOn("t");

    p([2]);
    t.deepEqual(o(), [2]);

    p.stopPublishingOn("t");

    p([3]);
    t.deepEqual(o(), [2]);

    t.end();
});

test("syncWith", {}, t => {
    const n = ko.observable(1);
    const o = ko.observable(1).syncWith("t");
    const p = ko.computed(() => n()).publishOn("t");
    const q = ko.observable().subscribeTo("t");

    n(2);
    t.equals(o(), 2);

    o(3);
    t.equals(q(), 3);

    t.end();
});
