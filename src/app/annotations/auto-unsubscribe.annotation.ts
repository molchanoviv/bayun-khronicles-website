'use strict';

// noinspection TsLint
/**
 * @Annotation
 */
export function AutoUnsubscribe(): ClassDecorator {
    return function (constructor: any): void {
        const original = constructor.prototype.ngOnDestroy;
        const unsubscribe = (property: any): void => {
            if (property && (typeof property.unsubscribe === 'function')) {
                property.unsubscribe();
            }
        };
        constructor.prototype.ngOnDestroy = function (this: any): void {
            for (const prop of Object.keys(this)) {
                const property = this[prop];
                if (Array.isArray(property)) {
                    property.forEach(unsubscribe);
                } else {
                    unsubscribe(property);
                }
            }
            if (typeof original === 'function') {
                original.apply(this, arguments);
            }
        };

    };
}
