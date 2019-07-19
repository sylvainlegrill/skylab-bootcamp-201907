'use strict';

describe('Curray', function () {
    describe('push', function () {
        it('should push a string', function () {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0]).toBe('hola mundo');
            expect(result).toBe(1);
        });
    });

    describe('pop', function () {
        it('should pop a string', function () {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result).toBe('mundo');
            expect(curray.length).toBe(1);
            expect(curray[1]).toBeUndefined();
        });
    });

    describe('forEach', function () {
        it('should output each element index and curray', function () {
            var curray = new Curray('a', 'b', 'c');

            var outputs = [];

            curray.forEach(function (element, index, curray) {
                outputs.push([element, index, curray]);
            });

            expect(outputs).toEqual([
                ['a', 0, curray],
                ['b', 1, curray],
                ['c', 2, curray]
            ]);
        });

        it('should fail on no arguments', function() {
            var curray = new Curray();

            expect(function() {
                curray.forEach();
            }).toThrowError(TypeError, 'missing argument 0 when calling function forEach');
        });
    });

    describe('arrayConcat', function() {
        it('should concat 2 elements', function() {
            var curray = new Curray (1 ,2, 3);
            var curray2 = new Curray (4, 5, 6);
 
            var result = curray.concat(curray2);
            expect(result).toEqual[1, 2, 3, 4, 5, 6];
        });
    });

    describe('flat', function() {
            it('should flatten a curray', function() {
                
                    var curray1 = new Curray;

                curray1 = [1, 2, 3, ['a', 'b', 'c', [true, false]]];


                var result = curray1.flat();
        
                expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', [true, false]]);
            });

            it('should be flatten a curray/two level', function() {
                
                var curray2 = new Curray;

            curray2 = [1, 2, 3, ['a', 'b', 'c', [true, false, [undefined, null]]]];
            var result = curray2.flat(2);
            expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', true, false, [undefined, null]]);
            });
    });

    describe('copyWithin', function() {
        it('should change the target and give a new arrays', function() {
            
            var curray1 = new Curray;
            curray1 = ([1,2,3]);

            var result = arrayWithin(array1, 2 , 1);
 
            var result = curray1.copyWithin(2,1);
            expect(result).toEqual([1, 2, 3, 4, 5, 6]);
        });
    });



});