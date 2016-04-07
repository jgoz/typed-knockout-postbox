// Type definitions for knockout-postbox
// Project: https://github.com/rniemeyer/knockout-postbox
// Definitions by: Judah Gabriel Himango <https://debuggerdotbreak.wordpress.com>,
//                 John Gozde <https://github.com/jgoz>
// Definitions: https://github.com/jgoz/typed-knockout-postbox

import * as ko from "knockout";

// Extensions to knockout interfaces
declare module "knockout" {

    interface SubscribableFunctions<T> {

        /**
         * Tells an observable to automatically update itself whenever it receives a message on a topic.
         * @param topic
         *     Topic to subscribe to.
         * @param initializeWithLatestValue?
         *     If true, the observable will be initialized with the last value published to 'topic'.
         * @param transform?
         *     If provided, will be executed on new topic values and the result will become the observable value.
         * @returns
         *     Target observable.
         */
        subscribeTo(topic: string, initializeWithLatestValue?: boolean, transform?: (val: any) => T): Observable<T>;

        /**
         * Removes the subscription that an observable has on a topic.
         * @param topic
         *     Topic to unsubscribe from.
         * @returns
         *     Target observable.
         */
        unsubscribeFrom(topic: string): Observable<T>;

        /**
         * Tells an observable to automatically publish its value on a topic whenever it changes.
         * @param topic
         *     Topic to publish to.
         * @param skipInitialPublish?
         *     If true, the initial value of the observable will not be published to the topic.
         * @param equalityComparer?
         *     If provided, will be used to compare new and previous values to determine whether
         *     the new value should be published. By default, strict equality `===` is used.
         * @returns
         *     Target observable.
         */
        publishOn(topic: string, skipInitialPublish?: boolean, equalityComparer?: (newValue: T, oldValue: T) => boolean): Observable<T>;

        /**
         * Removes the subscription used to automatically publish changes to the observable.
         * @param topic
         *     Topic to stop publishing on.
         * @returns
         *     Target observable.
         */
        stopPublishingOn(topic: string): Observable<T>;

        /**
         * Tells an observable to both subscribe and publish on a topic.
         * This allows observables in two different view models to stay in sync with each
         * other without having direct knowledge of its counterpart.
         * @param topic
         *     Topic to publish on and subscribe to.
         * @param initializeWithLatestValue?
         *     If true, the observable will be initialized with the last value published to 'topic'.
         * @param skipInitialPublish?
         *     If true, the initial value of the observable will not be published to the topic.
         * @param equalityComparer?
         *     If provided, will be used to compare new and previous values to determine whether
         *     the new value should be published. By default, strict equality `===` is used.
         * @returns
         *     Target observable.
         */
        syncWith(topic: string, initializeWithLatestValue?: boolean, skipInitialPublish?: boolean, equalityComparer?: (newValue: T, oldValue: T) => boolean): Observable<T>;

    }

}

/**
 * Subscribe to a topic.
 * @param topic
 *     Topic to subscribe to.
 * @param handler
 *     Callback that will be executed when a new value is published to the topic.
 * @param target?
 *     Value to use for 'this' when executing 'handler'.
 * @returns
 *     Knockout subscription instance that can be used to dispose this subscription.
 */
export function subscribe<T>(topic: string, handler: (value: T) => void, target?: any): ko.subscription<T>;

/**
 * Publish a new value to a topic.
 * @param topic
 *     Topic to publish to.
 * @param value?
 *     Value to publish.
 */
export function publish<T>(topic: string, value?: T): void;

/**
 * Disposes all postbox subscriptions and clears any stored references to those subscriptions.
 */
export function reset(): void;

/**
 * The default comparer to determine whether a value should be published.
 * @description
 *     Simply uses `===`. At run-time you can supply your own default comparison
 *     function by overriding ko.postbox.defaultComparer.
 * @param newValue
 *     New value being published.
 * @param oldValue
 *     The previous topic value.
 * @returns
 *     True if the values are equal, false otherwise.
 */
export let defaultComparer: <T>(newValue: T, oldValue: T) => boolean;

/**
 * Function used to serialize values for the topic cache.
 * @default ko.toJSON
 */
export let serializer: (object: any) => string;

/**
 * Current set of active postbox subscriptions.
 */
export const subscriptions: { [subId: number]: ko.subscription<any> };

/**
 * Cache containing latest topic values.
 */
export const topicCache: { [topic: string]: { value: any, serialized: string } };
